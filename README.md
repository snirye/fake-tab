# 🎭 Fake Tab - Embarrassing Titles Chrome Extension

A fun Chrome extension that creates tabs with custom embarrassing titles for harmless entertainment during screen sharing in video calls or meetings.

## Features

- **Quick Presets**: 6 pre-made embarrassing tab titles ready to use
- **Custom Titles**: Create your own embarrassing tab titles
- **Minimalist Design**: Clean, user-friendly interface
- **Instant Creation**: One-click tab creation
- **Safe Content**: All titles are harmless and meant for fun

## Installation

### Method 1: Developer Mode (Recommended for testing)

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `src` folder of this extension
5. The extension should now appear in your extensions list

### Method 2: Chrome Web Store (When published)
*This extension is not yet published to the Chrome Web Store*

## Usage

1. Click the Fake Tab extension icon in your Chrome toolbar
2. Choose from the preset embarrassing titles or create your own
3. A new tab will open with your chosen title
4. Share your screen and watch people's reactions! 😄

## Preset Titles

- 🤫 "How to hide browser history from mom"
- 💔 "Why do I keep getting rejected on dating apps?"
- 🪴 "Is it normal to talk to my plants?"
- 💸 "How to pretend you understand cryptocurrency"
- 🐱 "Signs your cat is plotting against you"
- 😅 "Why does everyone else look so put together?"

## Development

### Project Structure
```
fake_tab/
├── src/
│   ├── manifest.json          # Extension manifest
│   ├── background.js          # Background service worker
│   └── popup/
│       ├── popup.html         # Extension popup UI
│       ├── popup.css          # Popup styling
│       └── popup.js           # Popup functionality
├── icons/                     # Extension icons (to be added)
└── README.md
```

### Technologies Used
- **Manifest V3**: Latest Chrome extension format
- **HTML5 & CSS3**: Modern web standards
- **Vanilla JavaScript**: No external dependencies
- **Chrome APIs**: tabs, storage, contextMenus

### Permissions
- `tabs`: To create new tabs
- `storage`: To save custom titles for future use

## Contributing

Feel free to contribute by:
- Adding new preset embarrassing titles
- Improving the UI/UX design
- Adding new features
- Reporting bugs

## Disclaimer

This extension is created purely for entertainment and harmless fun. All preset titles are meant to be silly and non-offensive. Please use responsibly and consider your audience when sharing your screen.

## License

This project is open source and available under the MIT License.

## Version History

- **v1.0.0**: Initial release with basic functionality
  - 6 preset embarrassing titles
  - Custom title creation
  - Clean popup interface
  - Tab creation with custom titles
