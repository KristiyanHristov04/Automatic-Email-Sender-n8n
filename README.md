# Email Automation Web Application

A simple, modern frontend web application that integrates with n8n workflows to automate email sending using natural language instructions.

## 🚀 Features

- **Natural Language Input**: Type instructions like "Send an email to john@example.com about that I am ill and won't be coming to work today"
- **Modern UI**: Clean, responsive design with gradient backgrounds and smooth animations
- **Real-time Status**: Live feedback during email sending process
- **URL Persistence**: Automatically saves your n8n webhook URL for future use
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + Enter` to send email
  - `Ctrl/Cmd + K` to focus webhook URL field
  - `Escape` to clear status messages

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## 🛠️ Quick Setup (2 Minutes)

### 1. Import the n8n Workflow

**Option A: One-Click Import (Recommended)**
👉 **[Import Workflow to n8n](https://n8n.io/workflows/[YOUR_WORKFLOW_ID])** 

**Option B: Manual Import**
1. Copy this workflow JSON: **[GitHub Workflow File](https://github.com/your-username/Automatic-Email-Sender/blob/main/n8n-email-automation-workflow.json)**
2. Go to your n8n instance → Import → Paste JSON
3. Configure your email credentials (Gmail/SMTP)
4. Activate the workflow

### 2. Use the Application

1. **Download/Clone** this project
2. **Open `index.html`** in your browser
3. **Enter your n8n webhook URL** (from the imported workflow)
4. **Start sending emails** with natural language!

## 📧 Example Usage

Simply type natural language instructions:
- "Send an email to boss@company.com that I'm running late"
- "Email support@service.com about the billing issue I'm experiencing"  
- "Send a message to team@project.com about today's meeting being moved to 3 PM"

The AI will automatically:
- Extract the recipient email
- Generate an appropriate subject line
- Rewrite your message professionally
- Send the email

## 🔧 Technical Details

### Frontend Technology Stack
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations and responsive design
- **Vanilla JavaScript**: No frameworks, pure ES6+ JavaScript

### n8n Workflow Features
- **OpenAI Integration**: Extracts emails and improves content
- **Gmail/SMTP Support**: Send via your preferred email service
- **Error Handling**: Comprehensive error responses
- **Rate Limiting**: Built-in request throttling

### Key Features
- **Fetch API**: For HTTP requests to n8n webhook
- **LocalStorage**: Persists webhook URL between sessions
- **AbortController**: Request timeout handling (30 seconds)
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🎨 Customization

### Styling
- Modify `styles.css` to change colors, fonts, or layout
- The design uses CSS custom properties for easy theming

### n8n Workflow
- Fork the workflow to customize AI prompts
- Add additional email providers
- Modify response format
- Add custom validation rules

## 🧪 Testing

To test without setting up the full workflow:
1. Use the **[Test Webhook URL]**(https://webhook.site/#!/your-test-id)
2. Enter the test URL in the webhook field  
3. Send a test message to see the request structure

## 🚀 Deployment

### Frontend Hosting
Deploy to any static hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Enable in repository settings

### n8n Hosting
- **n8n Cloud**: Easiest option with built-in hosting
- **Self-hosted**: Deploy on your own server
- **Railway/Render**: One-click n8n deployment

## 🔒 Security & Best Practices

- **HTTPS Only**: Use HTTPS webhook URLs in production
- **Environment Variables**: Store email credentials securely in n8n
- **Rate Limiting**: Built into the n8n workflow
- **Input Validation**: AI validates and sanitizes inputs

## 🐛 Troubleshooting

### Common Issues

**"Network error occurred"**
- Verify the webhook URL is correct and accessible
- Check if n8n workflow is activated
- Ensure stable internet connection

**"Request timed out"**  
- Check n8n workflow execution logs
- Verify OpenAI API key is configured
- Ensure email credentials are valid

## 📄 Workflow Details

The n8n workflow includes:
- **Webhook Trigger**: Receives POST requests
- **OpenAI Node**: Extracts email and improves content  
- **Gmail/SMTP Node**: Sends the processed email
- **Response Node**: Returns success/error status

## 🤝 Contributing

Found an issue or want to improve the workflow?
- **Report bugs**: Create an issue on GitHub
- **Suggest features**: Submit a feature request
- **Contribute code**: Fork and create a pull request

---

**Ready to automate your emails?** 
👉 **[Import the n8n Workflow](https://n8n.io/workflows/[YOUR_WORKFLOW_ID])** and start sending emails with AI! 🎉 