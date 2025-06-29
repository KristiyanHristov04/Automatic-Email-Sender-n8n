// DOM elements
const recipientEmailElement = document.getElementById('recipientEmail');
const emailContentElement = document.getElementById('emailContent');
const webhookUrlElement = document.getElementById('webhookUrl');
const sendButton = document.getElementById('sendBtn');
const statusElement = document.getElementById('status');
const buttonText = document.querySelector('.button-text');
const spinner = document.querySelector('.spinner');

// Configuration
const STORAGE_KEY = 'emailAutomation_webhookUrl';

// Track field interaction state
const fieldState = {
    recipientEmail: { touched: false },
    emailContent: { touched: false },
    webhookUrl: { touched: false }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadSavedWebhookUrl();
    setupEventListeners();
});

// Load saved webhook URL from localStorage
function loadSavedWebhookUrl() {
    const savedUrl = localStorage.getItem(STORAGE_KEY);
    if (savedUrl) {
        webhookUrlElement.value = savedUrl;
    }
}

// Save webhook URL to localStorage
function saveWebhookUrl(url) {
    if (url.trim()) {
        localStorage.setItem(STORAGE_KEY, url.trim());
    }
}

// Setup event listeners
function setupEventListeners() {
    // Send button click handler
    sendButton.addEventListener('click', handleSendEmail);
    
    // Enter key handler for both email and content fields
    recipientEmailElement.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSendEmail();
        }
    });
    
    emailContentElement.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSendEmail();
        }
    });
    
    // Blur events to mark fields as touched
    recipientEmailElement.addEventListener('blur', function() {
        fieldState.recipientEmail.touched = true;
        validateEmail();
    });
    
    emailContentElement.addEventListener('blur', function() {
        fieldState.emailContent.touched = true;
        validateContent();
    });
    
    webhookUrlElement.addEventListener('blur', function() {
        fieldState.webhookUrl.touched = true;
        validateWebhookUrl();
        saveWebhookUrl(this.value);
    });
    
    // Input events for real-time validation (but only if field was touched)
    recipientEmailElement.addEventListener('input', function() {
        clearStatusOnInput();
        if (fieldState.recipientEmail.touched) {
            validateEmail();
        }
    });
    
    emailContentElement.addEventListener('input', function() {
        clearStatusOnInput();
        if (fieldState.emailContent.touched) {
            validateContent();
        }
    });
    
    webhookUrlElement.addEventListener('input', function() {
        clearStatusOnInput();
        if (fieldState.webhookUrl.touched) {
            validateWebhookUrl();
        }
    });
    
    // Focus events to clear validation styling when user starts typing
    recipientEmailElement.addEventListener('focus', function() {
        if (!fieldState.recipientEmail.touched) {
            recipientEmailElement.style.borderColor = '#667eea';
        }
    });
    
    emailContentElement.addEventListener('focus', function() {
        if (!fieldState.emailContent.touched) {
            emailContentElement.style.borderColor = '#667eea';
        }
    });
    
    webhookUrlElement.addEventListener('focus', function() {
        if (!fieldState.webhookUrl.touched) {
            webhookUrlElement.style.borderColor = '#667eea';
        }
    });
}

// Clear status when user types
function clearStatusOnInput() {
    if (statusElement.textContent) {
        clearStatus();
    }
}

// Validate email field
function validateEmail() {
    const email = recipientEmailElement.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!fieldState.recipientEmail.touched) {
        return; // Don't validate until user has interacted
    }
    
    if (!email) {
        recipientEmailElement.style.borderColor = '#e74c3c'; // Red for empty after touch
    } else if (!emailRegex.test(email)) {
        recipientEmailElement.style.borderColor = '#e74c3c'; // Red for invalid format
    } else {
        recipientEmailElement.style.borderColor = '#27ae60'; // Green for valid
    }
}

// Validate content field
function validateContent() {
    const content = emailContentElement.value.trim();
    
    if (!fieldState.emailContent.touched) {
        return; // Don't validate until user has interacted
    }
    
    if (!content) {
        emailContentElement.style.borderColor = '#e74c3c'; // Red for empty after touch
    } else if (content.length < 5) {
        emailContentElement.style.borderColor = '#e74c3c'; // Red for too short
    } else {
        emailContentElement.style.borderColor = '#27ae60'; // Green for valid
    }
}

// Validate webhook URL field
function validateWebhookUrl() {
    const url = webhookUrlElement.value.trim();
    
    if (!fieldState.webhookUrl.touched) {
        return; // Don't validate until user has interacted
    }
    
    if (!url) {
        webhookUrlElement.style.borderColor = '#e74c3c'; // Red for empty after touch
    } else if (!isValidUrl(url)) {
        webhookUrlElement.style.borderColor = '#e74c3c'; // Red for invalid URL
    } else {
        webhookUrlElement.style.borderColor = '#27ae60'; // Green for valid
    }
}

// Main function to handle email sending
async function handleSendEmail() {
    const recipientEmail = recipientEmailElement.value.trim();
    const emailContent = emailContentElement.value.trim();
    const webhookUrl = webhookUrlElement.value.trim();
    
    // Mark all fields as touched when attempting to send
    fieldState.recipientEmail.touched = true;
    fieldState.emailContent.touched = true;
    fieldState.webhookUrl.touched = true;
    
    // Validate all fields
    validateEmail();
    validateContent();
    validateWebhookUrl();
    
    // Validation
    if (!recipientEmail) {
        showStatus('Please enter a recipient email address.', 'error');
        recipientEmailElement.focus();
        return;
    }
    
    if (!isValidEmail(recipientEmail)) {
        showStatus('Please enter a valid email address.', 'error');
        recipientEmailElement.focus();
        return;
    }
    
    if (!emailContent) {
        showStatus('Please enter email content.', 'error');
        emailContentElement.focus();
        return;
    }
    
    if (emailContent.length < 5) {
        showStatus('Email content is too short. Please provide more details.', 'error');
        emailContentElement.focus();
        return;
    }
    
    if (!webhookUrl) {
        showStatus('Please enter your n8n webhook URL.', 'error');
        webhookUrlElement.focus();
        return;
    }
    
    if (!isValidUrl(webhookUrl)) {
        showStatus('Please enter a valid webhook URL.', 'error');
        webhookUrlElement.focus();
        return;
    }
    
    // Save the webhook URL
    saveWebhookUrl(webhookUrl);
    
    // Create the natural language request for n8n
    const naturalLanguageText = `Send an email to ${recipientEmail} with the following content: ${emailContent}`;
    
    // Start sending process
    setLoadingState(true);
    showStatus('Sending your email...', 'sending');
    
    try {
        const response = await sendToWebhook(webhookUrl, naturalLanguageText);
        await handleResponse(response);
    } catch (error) {
        handleError(error);
    } finally {
        setLoadingState(false);
    }
}

// Send request to n8n webhook
async function sendToWebhook(webhookUrl, text) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response;
        
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// Handle the response from the webhook
async function handleResponse(response) {
    try {
        let result;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            result = await response.json();
        } else {
            result = { message: await response.text() };
        }
        
        if (response.ok) {
            const successMessage = result.message || result.success || 'Email sent successfully! 🎉';
            showStatus(successMessage, 'success');
            
            // Clear the form after successful send
            setTimeout(() => {
                recipientEmailElement.value = '';
                emailContentElement.value = '';
                
                // Reset field states
                fieldState.recipientEmail.touched = false;
                fieldState.emailContent.touched = false;
                
                // Reset border colors
                recipientEmailElement.style.borderColor = '#e1e5e9';
                emailContentElement.style.borderColor = '#e1e5e9';
                
                recipientEmailElement.focus();
            }, 1000);
        } else {
            const errorMessage = result.message || result.error || `Request failed with status ${response.status}`;
            showStatus(`Failed to send email: ${errorMessage}`, 'error');
        }
        
    } catch (parseError) {
        if (response.ok) {
            showStatus('Email sent successfully! 🎉', 'success');
            setTimeout(() => {
                recipientEmailElement.value = '';
                emailContentElement.value = '';
                
                // Reset field states
                fieldState.recipientEmail.touched = false;
                fieldState.emailContent.touched = false;
                
                // Reset border colors
                recipientEmailElement.style.borderColor = '#e1e5e9';
                emailContentElement.style.borderColor = '#e1e5e9';
                
                recipientEmailElement.focus();
            }, 1000);
        } else {
            showStatus(`Request failed with status ${response.status}`, 'error');
        }
    }
}

// Handle errors during the request
function handleError(error) {
    console.error('Request error:', error);
    
    let errorMessage = 'An error occurred while sending the email.';
    
    if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again.';
    } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Network error. Please check your connection and webhook URL.';
    } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
    }
    
    showStatus(errorMessage, 'error');
}

// Set loading state for the button
function setLoadingState(isLoading) {
    sendButton.disabled = isLoading;
    
    if (isLoading) {
        buttonText.textContent = 'Sending...';
        spinner.style.display = 'inline';
    } else {
        buttonText.textContent = 'Send Email';
        spinner.style.display = 'none';
    }
}

// Show status message with appropriate styling
function showStatus(message, type = '') {
    statusElement.textContent = message;
    statusElement.className = `status-message ${type}`;
    
    // Auto-clear success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (statusElement.classList.contains('success')) {
                clearStatus();
            }
        }, 5000);
    }
}

// Clear status message
function clearStatus() {
    statusElement.textContent = '';
    statusElement.className = 'status-message';
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate URL format
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// Add some helpful keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key clears status
    if (e.key === 'Escape') {
        clearStatus();
    }
    
    // Ctrl/Cmd + K focuses on webhook URL
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        webhookUrlElement.focus();
        webhookUrlElement.select();
    }
    
    // Ctrl/Cmd + E focuses on email field
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        recipientEmailElement.focus();
        recipientEmailElement.select();
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidUrl,
        sendToWebhook,
        handleResponse,
        handleError
    };
} 