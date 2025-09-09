// Popup script for Fake Tab extension
document.addEventListener('DOMContentLoaded', function() {
    const presetButtons = document.querySelectorAll('.preset-btn');
    const customTitleInput = document.getElementById('customTitle');
    const createCustomTabBtn = document.getElementById('createCustomTab');

    // Handle preset button clicks
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            createFakeTab(title);
            showSuccessMessage('Tab created!');
        });
    });

    // Handle custom title creation
    createCustomTabBtn.addEventListener('click', function() {
        const customTitle = customTitleInput.value.trim();
        if (customTitle) {
            createFakeTab(customTitle);
            customTitleInput.value = '';
            showSuccessMessage('Custom tab created!');
        }
    });

    // Handle Enter key in custom title input
    customTitleInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            createCustomTabBtn.click();
        }
    });

    // Enable/disable custom button based on input
    customTitleInput.addEventListener('input', function() {
        createCustomTabBtn.disabled = !this.value.trim();
    });

    // Function to create a fake tab
    function createFakeTab(title) {
        chrome.tabs.create({
            url: 'data:text/html,<!DOCTYPE html><html><head><title>' + 
                 encodeHTMLEntities(title) + 
                 '</title><style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;}h1{font-size:2.5rem;text-align:center;text-shadow:0 2px 4px rgba(0,0,0,0.2);}</style></head><body><h1>🎭 Just for Fun!</h1><p style="text-align:center;margin-top:1rem;opacity:0.8;">This is a fake tab created for entertainment during screen sharing.</p></body></html>',
            active: true
        });
        
        // Close the popup after creating the tab
        window.close();
    }

    // Function to show success message
    function showSuccessMessage(message) {
        const feedback = document.createElement('div');
        feedback.className = 'success-feedback';
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    // Function to safely encode HTML entities
    function encodeHTMLEntities(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Load saved custom titles from storage
    loadSavedTitles();

    function loadSavedTitles() {
        chrome.storage.local.get(['customTitles'], function(result) {
            if (result.customTitles && result.customTitles.length > 0) {
                // Could implement a "Recent Custom Titles" section here
                // For now, we'll keep it simple
            }
        });
    }

    // Save custom titles for future reference
    function saveCustomTitle(title) {
        chrome.storage.local.get(['customTitles'], function(result) {
            let titles = result.customTitles || [];
            titles.unshift(title);
            // Keep only the last 10 titles
            titles = titles.slice(0, 10);
            chrome.storage.local.set({ customTitles: titles });
        });
    }

    // Update the createFakeTab function to save custom titles
    const originalCreateFakeTab = createFakeTab;
    createFakeTab = function(title) {
        // Check if it's a custom title (not from presets)
        const isCustomTitle = !Array.from(presetButtons).some(btn => 
            btn.getAttribute('data-title') === title
        );
        
        if (isCustomTitle) {
            saveCustomTitle(title);
        }
        
        originalCreateFakeTab(title);
    };
});
