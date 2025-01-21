# Expedia Reconciler Chrome Extension

A Chrome extension designed to automate the cancellation process for Expedia Partner Central reservations. This extension provides a floating, resizable widget that streamlines the process of marking reservations as cancellations with zero fees.

## Features

- Floating, draggable widget interface
- Resizable window
- Position and size persistence between sessions
- Automated three-step cancellation process
- Clean and professional UI
- Compatible with Expedia Partner Central reservation pages

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the directory containing the extension files

## Files Structure

```
expedia-reconciler/
├── manifest.json
├── background.js
├── content.js
├── styles.css
└── README.md
```

## Configuration

### manifest.json
```json
{
  "manifest_version": 3,
  "name": "Expedia Reconciler",
  "version": "1.0",
  "permissions": ["activeTab", "scripting"],
  "action": {
    "default_title": "Expedia Reconciler"
  },
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://apps.expediapartnercentral.com/lodging/*"],
      "js": ["content.js"],
      "css": ["styles.css"]
    }
  ]
}
```

## Usage

1. Navigate to an Expedia Partner Central reservation page
2. Click the extension icon in the Chrome toolbar to open the widget
3. Click "Process Reservation" to start the automation
4. The extension will:
   - Click the "Mark as cancellation" button
   - Set the cancellation fee to 0
   - Save the changes
5. Close the widget using the × button when finished

## Widget Controls

- **Drag**: Click and drag the widget header to move it around
- **Resize**: Click and drag the bottom-right corner to resize
- **Close**: Click the × button in the top-right corner
- **Reopen**: Click the extension icon in the Chrome toolbar

## Technical Details

The extension operates using:
- Chrome Extensions Manifest V3
- Content Scripts for DOM manipulation
- Background Service Worker for extension icon handling
- Local Storage for position/size persistence
- MutationObserver for dynamic content handling

## Compatibility

- Works on Expedia Partner Central reservation pages
- Chrome version 88 or higher (Manifest V3 requirement)
- URLs matching: `https://apps.expediapartnercentral.com/lodging/*`

## Development

To modify the extension:
1. Make changes to the relevant files
2. Save all changes
3. Go to `chrome://extensions/`
4. Click the refresh icon on the extension card
5. Test the changes on an Expedia Partner Central page

## Troubleshooting

If the extension isn't working:
1. Ensure you're on a valid Expedia Partner Central reservation page
2. Check the Chrome console for any error messages
3. Verify the extension is enabled in Chrome
4. Try refreshing the page
5. Reload the extension in `chrome://extensions/`

## Contributing

Feel free to submit issues and pull requests for:
- Bug fixes
- Feature improvements
- Code optimization
- Documentation updates

## License

[Your chosen license here]

## Support

For support, please:
1. Check the troubleshooting section
2. Submit an issue on GitHub
3. Contact [your contact information]

## Changelog

### Version 1.0
- Initial release
- Basic widget functionality
- Automation features
- Position/size persistence

## Credits

Created by Rupan Prasai