// Script for fake_page.html to set the custom title
(function() {
    'use strict';
    
    // Get the title parameter immediately
    const urlParams = new URLSearchParams(window.location.search);
    const titleParam = urlParams.get('title');
    
    console.log('Current URL:', window.location.href);
    console.log('Title parameter:', titleParam);
    
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
})();
