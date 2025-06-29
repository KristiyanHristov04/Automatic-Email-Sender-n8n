# Email Automation Web Application

A simple, modern frontend web application that integrates with n8n workflows to automate email sending using natural language instructions.

![emailautomation](https://github.com/user-attachments/assets/1d08600a-7399-4de0-8b06-4c0d49557101)
![workflow](https://github.com/user-attachments/assets/86919154-3450-40f7-aa59-c206a16c9ab3)


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

**Copy from README (Easy Setup)**
1. **Copy the workflow JSON** from the [Workflow JSON](#-n8n-workflow-json) section below
2. **Go to your n8n instance** → Import → Paste JSON
3. **Configure your credentials:**
   - OpenAI API key (or use n8n free credits)
   - Gmail OAuth2 authentication
4. **Activate the workflow**
5. **Copy your webhook URL** from the Webhook node

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

## 📋 n8n Workflow JSON

Copy the entire JSON below and paste it into your n8n instance (Import → Paste JSON):

<details>
<summary><strong>📋 Click to expand workflow JSON</strong></summary>

```json
{
  "name": "Email Automation",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "send-email",
        "responseMode": "responseNode",
        "options": {}
      },
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [
        0,
        0
      ],
      "id": "9eb45f87-3f37-4f49-83c5-b8145ce0c090",
      "name": "Webhook",
      "webhookId": "e62f96c0-5f18-4804-8930-f34b9c4695e4"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.body.text }}",
        "options": {
          "systemMessage": "You are an email automation assistant. When you receive a natural language email request, you should:\n\n1. Parse the request to extract the recipient email address\n2. Generate an appropriate subject line  \n3. Create a professional email body\n4. Use the Gmail tool to send the email\n\nIMPORTANT: You have access to a Gmail tool. Use it to send emails with these parameters:\n- to: (recipient email address)\n- subject: (generated subject line)\n- message: (professional email body)\n\nExamples:\nInput: \"Send an email to boss@company.com that I'm running late\"\nAction: Use Gmail tool with:\n- to: boss@company.com\n- subject: \"Running Late Today\" \n- message: \"Dear Boss,\\n\\nI wanted to let you know that I am running late today. I apologize for any inconvenience this may cause.\\n\\nBest regards\"\n\nAlways confirm when the email has been sent successfully."
        }
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 2,
      "position": [
        220,
        0
      ],
      "id": "7d1a8d0f-c8de-44c1-b5b5-884557507f12",
      "name": "AI Agent"
    },
    {
      "parameters": {
        "model": {
          "__rl": true,
          "mode": "list",
          "value": "gpt-4.1-mini"
        },
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "position": [
        220,
        200
      ],
      "id": "97ae2a99-5f42-4167-ac43-fd82b3b9fa8f",
      "name": "OpenAI Chat Model",
      "credentials": {
        "openAiApi": {
          "id": "qsrVNzLhHX2N3yvV",
          "name": "n8n free OpenAI API credits"
        }
      }
    },
    {
      "parameters": {
        "descriptionType": "manual",
        "toolDescription": "Use this tool to send emails. The AI will provide these parameters:\n- to: recipient email address (required)\n- subject: email subject line (required) \n- message: email body content (required)\n\nAlways extract the recipient email from the user's natural language request and generate appropriate professional subject lines and email content.",
        "sendTo": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('To', ``, 'string') }}",
        "subject": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Subject', ``, 'string') }}",
        "emailType": "text",
        "message": "={{ /*n8n-auto-generated-fromAI-override*/ $fromAI('Message', ``, 'string') }}",
        "options": {}
      },
      "type": "n8n-nodes-base.gmailTool",
      "typeVersion": 2.1,
      "position": [
        380,
        200
      ],
      "id": "f427c998-c979-441a-8a3a-88bcf4270f50",
      "name": "Gmail",
      "webhookId": "e71d5788-0f59-422f-a0e7-b048ad6fea2c",
      "credentials": {
        "gmailOAuth2": {
          "id": "XXJLD3Frts3yb7hZ",
          "name": "Gmail account 3"
        }
      }
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "{\n  \"success\": true,\n  \"message\": \"{{ $json.output }}\",\n  \"agent_response\": \"Email processed and sent successfully\"\n}",
        "options": {}
      },
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.4,
      "position": [
        580,
        0
      ],
      "id": "0a196a8c-1885-4e04-a73e-6fe0215df07c",
      "name": "Respond to Webhook"
    }
  ],
  "pinData": {},
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Gmail": {
      "ai_tool": [
        [
          {
            "node": "AI Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": true,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "cd2044ed-fd89-4fc3-a585-2c6892123a1e",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "d3718f0add37847c7ebb776760910702017bd6f9f4200df4f3e137c6af82926a"
  },
  "id": "Yz7AMjSHjUYy7u88",
  "tags": []
}
```

</details>

### 🔧 After Import Setup:

1. **Configure OpenAI credentials** (or use the free n8n credits)
2. **Set up Gmail OAuth2** authentication 
3. **Activate the workflow**
4. **Copy the webhook URL** from the Webhook node
5. **Test with your frontend application**

## 🤝 Contributing

Found an issue or want to improve the workflow?
- **Report bugs**: Create an issue on GitHub
- **Suggest features**: Submit a feature request
- **Contribute code**: Fork and create a pull request

---

**Ready to automate your emails?** 
👉 **[Copy the workflow JSON](#-n8n-workflow-json)** above and import it to your n8n instance to get started! 🎉 
