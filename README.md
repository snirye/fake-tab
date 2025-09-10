
# 🎭 Fake Tab - Embarrassing Titles Chrome Extension

Fake Tab is a playful Chrome extension that lets you instantly open tabs with custom or preset embarrassing titles—perfect for harmless fun during screen sharing or video calls. All titles are safe and meant for entertainment only.


## Features

- **Quick Presets:** 6 ready-to-use embarrassing tab titles
- **Custom Titles:** Make your own funny tab titles
- **Minimalist Design:** Clean, user-friendly popup
- **Instant Creation:** One-click to open a new tab
- **Safe Content:** All titles are lighthearted and non-offensive


## Installation

### Developer Mode (Recommended for testing)
1. Download or clone this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the `src` folder.
5. The extension will appear in your extensions list.

### Chrome Web Store
*Not yet published.*


## Usage

1. Click the Fake Tab extension icon in Chrome.
2. Pick a preset or enter a custom title.
3. A new tab opens with your chosen title.
4. Share your screen and enjoy the reactions! 😄


## Preset Titles

- 🤫 How to hide browser history from mom
- 💔 Why do I keep getting rejected on dating apps?
- 🪴 Is it normal to talk to my plants?
- 💸 How to pretend you understand cryptocurrency
- 🐱 Signs your cat is plotting against you
- 😅 Why does everyone else look so put together?

fake_tab/

## Development

### Project Structure
```
fake_tab/
├── src/
│   ├── manifest.json       # Extension manifest
│   ├── background.js       # Background service worker
│   └── popup/
│       ├── popup.html      # Popup UI
│       ├── popup.css       # Popup styling
│       └── popup.js        # Popup logic
├── icons/                  # Extension icons
└── README.md
```

### Technologies
- **Manifest V3**
- **HTML5 & CSS3**
- **Vanilla JavaScript**
- **Chrome APIs:** storage, contextMenus

### Permissions
- `storage`: Save custom titles


## Contributing

Contributions are welcome! You can:
- Suggest new preset titles
- Improve UI/UX
- Add features
- Report bugs


## Disclaimer

This extension is for entertainment only. All titles are meant to be silly and non-offensive. Please use responsibly and consider your audience when sharing your screen.


## License

MIT License


## Version History

- **v1.0.0**: Initial release
  - 6 preset titles
  - Custom title creation
  - Clean popup interface
  - Tab creation with custom titles
