// Background script for Fake Tab extension
chrome.runtime.onInstalled.addListener(() => {
    console.log('Fake Tab extension installed');
    
    // Initialize storage with some default settings if needed
    chrome.storage.local.get(['customTitles'], (result) => {
        if (!result.customTitles) {
            chrome.storage.local.set({ customTitles: [] });
        }
    });
});

// Handle messages from popup or other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case 'createFakeTab':
            createFakeTabWithTitle(message.title);
            sendResponse({ success: true });
            break;
        
        case 'getSavedTitles':
            chrome.storage.local.get(['customTitles'], (result) => {
                sendResponse({ titles: result.customTitles || [] });
            });
            return true; // Keep message channel open for async response
            
        default:
            sendResponse({ error: 'Unknown action' });
    }
});

// Function to create a fake tab with specified title
function createFakeTabWithTitle(title) {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${escapeHtml(title)}</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-align: center;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                }
                h1 {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                p {
                    font-size: 1.2rem;
                    opacity: 0.9;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }
                .disclaimer {
                    background: rgba(255,255,255,0.1);
                    padding: 20px;
                    border-radius: 10px;
                    font-size: 1rem;
                    backdrop-filter: blur(10px);
                }
                .emoji {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    display: block;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <span class="emoji">🎭</span>
                <h1>Just for Fun!</h1>
                <p>This is a fake tab created for entertainment during screen sharing.</p>
                <div class="disclaimer">
                    <strong>Disclaimer:</strong> This tab was created using the "Fake Tab" Chrome extension 
                    for harmless fun and entertainment purposes only. The title "${escapeHtml(title)}" 
                    is not a real browsing activity.
                </div>
            </div>
        </body>
        </html>
    `;
    
    const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);
    
    chrome.tabs.create({
        url: dataUrl,
        active: true
    });
}

// Helper function to escape HTML entities
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Context menu integration (optional enhancement)
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'createFakeTab',
        title: 'Create Fake Tab',
        contexts: ['page']
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'createFakeTab') {
        // Open the popup or create a quick fake tab
        createFakeTabWithTitle('How to look busy while working from home');
    }
});
