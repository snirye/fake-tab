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
    
    // Function to create and set an emoji favicon using an SVG data URL.
    // Using SVG keeps the emoji crisp at multiple sizes (and on HiDPI displays).
    // We keep the canvas method as a fallback for environments that can't use SVG data URLs.
    function setEmojiFavicon(emoji) {
        try {
            // Template an SVG with the emoji in a <text> element.
            // Use a viewBox of 0 0 100 100 and a large font-size so the emoji scales nicely.
            // Use y='.9em' like the CodePen example to align the emoji baseline nicely.
            // Include common color-emoji font families so platforms pick a proper emoji font.
            const svg = `<?xml version="1.0" encoding="utf-8"?>\n` +
                `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>` +
                `<text x='50%' y='.9em' font-size='90' text-anchor='middle' style="font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', 'NotoEmoji', 'EmojiOne Color', sans-serif">${emoji}</text>` +
                `</svg>`;

            // Encode for use in a data URL. encodeURIComponent keeps characters safe.
            const svgUrl = 'data:image/svg+xml,' + encodeURIComponent(svg);

            // Remove existing favicons
            const existingFavicons = document.querySelectorAll("link[rel*='icon']");
            existingFavicons.forEach(link => link.remove());

            // Add new SVG favicon
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/svg+xml';
            link.href = svgUrl;
            document.head.appendChild(link);

            console.log('Emoji favicon (SVG) set to:', emoji);
            return; // success
        } catch (e) {
            console.warn('SVG favicon failed, falling back to canvas method:', e);
        }

        // Fallback: draw onto a canvas and use PNG data URL (older browsers)
        try {
            const canvas = document.createElement('canvas');
            const size = 128; // larger canvas for higher resolution
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            ctx.font = Math.floor(size * 0.7) + 'px serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Small vertical tweak to better center emoji in the PNG fallback.
            ctx.fillText(emoji, size / 2, size / 2 + Math.floor(size * 0.04));

            const faviconUrl = canvas.toDataURL('image/png');
            const existingFavicons2 = document.querySelectorAll("link[rel*='icon']");
            existingFavicons2.forEach(link => link.remove());

            const link2 = document.createElement('link');
            link2.rel = 'icon';
            link2.type = 'image/png';
            link2.href = faviconUrl;
            document.head.appendChild(link2);

            console.log('Emoji favicon (canvas fallback) set to:', emoji);
        } catch (err) {
            console.error('Failed to set emoji favicon with both SVG and canvas methods:', err);
        }
    }
})();
