// Script for fake_page.html to set the custom title
(function() {
    'use strict';
    
    // Get the title and emoji parameters immediately
    const urlParams = new URLSearchParams(window.location.search);
    const titleParam = urlParams.get('title');
    const emojiParam = urlParams.get('emoji');
    
    console.log('Current URL:', window.location.href);
    console.log('Title parameter:', titleParam);
    console.log('Emoji parameter:', emojiParam);
    
    // Set favicon from emoji if provided
    if (emojiParam) {
        try {
            const emoji = decodeURIComponent(emojiParam);
            setEmojiFavicon(emoji);
        } catch (e) {
            console.error('Error setting emoji favicon:', e);
        }
    }
    
    // Set title immediately if we have one
    if (titleParam) {
        try {
            const customTitle = decodeURIComponent(titleParam);
            document.title = customTitle;
            console.log('Title set to:', customTitle);
            
            // Update disclaimer when DOM is ready
            function updateDisclaimer() {
                const originalTitleDisplay = document.getElementById('original-title-display');
                if (originalTitleDisplay) {
                    originalTitleDisplay.textContent = `The title "${customTitle}" is not a real browsing activity.`;
                }
            }
            
            // Run immediately if DOM is already loaded, otherwise wait for it
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', updateDisclaimer);
            } else {
                updateDisclaimer();
            }
            
        } catch (e) {
            console.error('Error decoding title:', e);
            document.title = titleParam; // Use as-is if decoding fails
        }
    } else {
        document.title = "Just for Fun!";
        console.log('No title parameter found, using default');
    }
    
    // Function to create and set an emoji favicon
    function setEmojiFavicon(emoji) {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Draw emoji on canvas
        ctx.font = '48px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, 32, 32);
        
        // Convert canvas to data URL
        const faviconUrl = canvas.toDataURL('image/png');
        
        // Remove existing favicons
        const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
        existingFavicons.forEach(link => link.remove());
        
        // Add new favicon
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = faviconUrl;
        document.head.appendChild(link);
        
        console.log('Emoji favicon set to:', emoji);
    }
})();
