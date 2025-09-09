#!/usr/bin/env python3
"""
Generate icons for the Fake Tab Chrome Extension
Creates 16x16, 48x48, and 128x128 PNG icons with a theater mask theme
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    """Create an icon with theater mask design"""
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Define colors (gradient colors from the extension)
    primary_color = (102, 126, 234, 255)  # #667eea
    secondary_color = (118, 75, 162, 255)  # #764ba2
    
    # Create a simple icon with rounded rectangle background
    padding = max(2, size // 8)
    
    # Draw background circle/rounded rectangle
    draw.ellipse([padding, padding, size-padding, size-padding], 
                fill=primary_color, outline=secondary_color, width=max(1, size//32))
    
    # Draw theater mask elements
    if size >= 48:
        # For larger icons, draw a more detailed mask
        center_x, center_y = size // 2, size // 2
        
        # Eyes (sad and happy)
        eye_size = max(3, size // 8)
        eye_y = center_y - size // 8
        
        # Left eye (sad)
        left_eye_x = center_x - size // 4
        draw.ellipse([left_eye_x - eye_size//2, eye_y - eye_size//2, 
                     left_eye_x + eye_size//2, eye_y + eye_size//2], 
                     fill=(255, 255, 255, 255))
        
        # Right eye (happy)
        right_eye_x = center_x + size // 4
        draw.ellipse([right_eye_x - eye_size//2, eye_y - eye_size//2, 
                     right_eye_x + eye_size//2, eye_y + eye_size//2], 
                     fill=(255, 255, 255, 255))
        
        # Mouth (wavy line representing comedy/tragedy)
        mouth_y = center_y + size // 6
        mouth_width = size // 3
        draw.arc([center_x - mouth_width//2, mouth_y - size//12, 
                 center_x + mouth_width//2, mouth_y + size//12], 
                 start=0, end=180, fill=(255, 255, 255, 255), width=max(2, size//24))
    else:
        # For small icons, just draw a simple face
        center_x, center_y = size // 2, size // 2
        
        # Simple dots for eyes
        eye_size = max(1, size // 6)
        draw.ellipse([center_x - size//4 - eye_size//2, center_y - size//6 - eye_size//2,
                     center_x - size//4 + eye_size//2, center_y - size//6 + eye_size//2],
                     fill=(255, 255, 255, 255))
        draw.ellipse([center_x + size//4 - eye_size//2, center_y - size//6 - eye_size//2,
                     center_x + size//4 + eye_size//2, center_y - size//6 + eye_size//2],
                     fill=(255, 255, 255, 255))
        
        # Simple mouth
        draw.arc([center_x - size//4, center_y, center_x + size//4, center_y + size//3],
                 start=0, end=180, fill=(255, 255, 255, 255), width=1)
    
    return img

def main():
    """Generate all required icons"""
    icons_dir = "/Users/sniryehuda/Documents/Private/Private_Code/fake_tab/icons"
    
    # Ensure icons directory exists
    os.makedirs(icons_dir, exist_ok=True)
    
    # Create icons in different sizes
    sizes = [16, 48, 128]
    
    for size in sizes:
        icon = create_icon(size, f"icon{size}.png")
        icon_path = os.path.join(icons_dir, f"icon{size}.png")
        icon.save(icon_path, "PNG")
        print(f"Created {icon_path}")
    
    print("All icons created successfully!")

if __name__ == "__main__":
    main()
