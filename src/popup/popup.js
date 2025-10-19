// Popup script for Fake Tab extension
document.addEventListener('DOMContentLoaded', function() {

    // Popular emojis for favicon selection
    const emojiList = [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊',
        '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪',
        '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏',
        '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕',
        '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓',
        '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧',
        '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫',
        '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹',
        '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀',
        '😿', '😾', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
        '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️',
        '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊'
    ];

    let selectedEmoji = '😀'; // Default emoji

    // Initialize emoji grid
    const emojiGrid = document.getElementById('emojiGrid');
    if (emojiGrid) {
        emojiList.forEach(emoji => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'emoji-option';
            btn.textContent = emoji;
            btn.addEventListener('click', function() {
                selectedEmoji = emoji;
                document.getElementById('emojiPicker').textContent = emoji;
                
                // Update selected state
                document.querySelectorAll('.emoji-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                btn.classList.add('selected');
                
                // Close picker
                document.getElementById('emojiPickerPopup').classList.add('hidden');
            });
            emojiGrid.appendChild(btn);
        });
    }

    // Emoji picker button
    const emojiPickerBtn = document.getElementById('emojiPicker');
    const emojiPickerPopup = document.getElementById('emojiPickerPopup');
    const closeEmojiPicker = document.getElementById('closeEmojiPicker');

    if (emojiPickerBtn && emojiPickerPopup) {
        emojiPickerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            emojiPickerPopup.classList.toggle('hidden');
        });
    }

    if (closeEmojiPicker && emojiPickerPopup) {
        closeEmojiPicker.addEventListener('click', function(e) {
            e.preventDefault();
            emojiPickerPopup.classList.add('hidden');
        });
    }

    // Close emoji picker when clicking outside
    document.addEventListener('click', function(e) {
        if (emojiPickerPopup && !emojiPickerPopup.classList.contains('hidden')) {
            if (!emojiPickerPopup.contains(e.target) && e.target !== emojiPickerBtn) {
                emojiPickerPopup.classList.add('hidden');
            }
        }
    });

    // Render preset buttons dynamically
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
                createFakeTab(preset.title, null); // Presets don't use custom emoji favicon
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
            createFakeTab(customTitle, selectedEmoji);
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
    function createFakeTab(title, emoji) {
        const encodedTitle = encodeURIComponent(title);
        const encodedEmoji = emoji ? encodeURIComponent(emoji) : '';
        let fakePageUrl = chrome.runtime.getURL('fake_page.html') + '?title=' + encodedTitle;
        
        if (encodedEmoji) {
            fakePageUrl += '&emoji=' + encodedEmoji;
        }
        
        console.log('Creating fake tab with title:', title);
        console.log('Using emoji:', emoji);
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
            const recentTitlesContainer = document.querySelector('.recent-titles');
            if (!recentTitlesContainer) return;
            recentTitlesContainer.innerHTML = '';
            if (result.customTitles && result.customTitles.length > 0) {
                result.customTitles.forEach(title => {
                    const btn = document.createElement('button');
                    btn.className = 'recent-title-btn';
                    btn.textContent = title;
                    btn.title = title;
                    btn.addEventListener('click', function() {
                        customTitleInput.value = title;
                        customTitleInput.focus();
                        createCustomTabBtn.disabled = !title.trim();
                    });
                    recentTitlesContainer.appendChild(btn);
                });
            } else {
                recentTitlesContainer.innerHTML = '<span class="no-recent">No recent custom titles yet.</span>';
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
    createFakeTab = function(title, emoji) {
        // Check if it's a custom title (not from presets)
        const isPreset = Array.isArray(window.TAB_PRESETS) && window.TAB_PRESETS.some(p => p.title === title);
        if (!isPreset) {
            saveCustomTitle(title);
        }
        originalCreateFakeTab(title, emoji);
    };
});
