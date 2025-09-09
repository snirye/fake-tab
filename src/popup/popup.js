// Popup script for Fake Tab extension
document.addEventListener('DOMContentLoaded', function() {

    // Render preset buttons dynamically
    const presetButtonsContainer = document.querySelector('.preset-buttons');
    if (presetButtonsContainer && Array.isArray(window.TAB_PRESETS)) {
        presetButtonsContainer.innerHTML = '';
        window.TAB_PRESETS.forEach(preset => {
            const btn = document.createElement('button');
            btn.className = 'preset-btn';
            btn.setAttribute('data-title', preset.title);
            btn.innerHTML = `${preset.emoji} ${preset.label}`;
            btn.addEventListener('click', function() {
                createFakeTab(preset.title);
                showSuccessMessage('Tab created!');
            });
            presetButtonsContainer.appendChild(btn);
        });
    }

    const customTitleInput = document.getElementById('customTitle');
    const createCustomTabBtn = document.getElementById('createCustomTab');

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
        const encodedTitle = encodeURIComponent(title);
        const fakePageUrl = chrome.runtime.getURL('fake_page.html') + '?title=' + encodedTitle;
        
        console.log('Creating fake tab with title:', title);
        console.log('Encoded title:', encodedTitle);
        console.log('Final URL:', fakePageUrl);
        
        chrome.tabs.create({
            url: fakePageUrl,
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
        const isPreset = Array.isArray(window.TAB_PRESETS) && window.TAB_PRESETS.some(p => p.title === title);
        if (!isPreset) {
            saveCustomTitle(title);
        }
        originalCreateFakeTab(title);
    };
});
