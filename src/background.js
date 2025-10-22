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
    const encodedTitle = encodeURIComponent(title);
    const fakePageUrl = chrome.runtime.getURL('fake_page.html') + '?title=' + encodedTitle;
    
    chrome.tabs.create({
        url: fakePageUrl,
        active: false
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
