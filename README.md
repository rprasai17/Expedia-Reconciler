# 🔄 Expedia Reconciler

## 📝 Description
A Chrome extension designed to automate the cancellation process for Expedia Partner Central reservations. This extension provides a floating, resizable widget that streamlines the process of marking reservations as cancellations with zero fees.

## ✨ Features
* **Advanced Widget Interface**
  * Floating, draggable design
  * Resizable window functionality
  * Position and size memory between sessions

* **Automation Capabilities**
  * Streamlined three-step cancellation process
  * Zero-fee cancellation automation
  * Professional and intuitive UI

* **Platform Integration**
  * Full Expedia Partner Central compatibility
  * Dynamic content handling
  * Real-time processing updates

## 🚀 Installation

1. Download or clone the repository
```bash
git clone https://github.com/rprasai17/Expedia-Reconciler.git
```

2. Navigate to Chrome Extensions
   * Open Chrome and go to `chrome://extensions/`
   * Enable **"Developer mode"** in the top right corner
   * Click **"Load unpacked"** and select the extension directory

## 📁 File Structure

```
expedia-reconciler/
├── manifest.json
├── background.js
├── content.js
├── styles.css
├── LICENSE
└── README.md
```

## ⚙️ Configuration

Required configuration in `manifest.json`:

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

## 💡 Usage

1. Navigate to an Expedia Partner Central reservation
2. Launch the extension from Chrome toolbar
3. Click **"Process Reservation"** to begin automation
4. The extension will automatically:
   * Trigger "Mark as cancellation"
   * Set cancellation fee to zero
   * Complete the save process

## 🎮 Widget Controls

* **Movement:** Drag widget header
* **Size:** Drag bottom-right corner
* **Exit:** Click × in top-right
* **Relaunch:** Click toolbar icon

## 🔍 Technical Details

### **Core Technologies**
* Chrome Extensions Manifest V3
* Content Scripts for DOM interaction
* Background Service Worker
* Local Storage for preferences
* MutationObserver implementation

## 💻 Compatibility

* **Chrome Version:** 88 or higher required
* **Platform:** Expedia Partner Central
* **URLs:** `https://apps.expediapartnercentral.com/lodging/*`

## 🛠️ Development

### Modification Steps
1. Edit desired files
2. Save changes
3. Access `chrome://extensions/`
4. Refresh extension
5. Test on Expedia platform

## 🐛 Troubleshooting

* Verify page compatibility
* Check Chrome console
* Confirm extension status
* Refresh page if needed
* Reload extension

## 🔒 Security

* Platform-specific operation
* Minimal permissions model
* Local storage only for preferences

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/YourFeature
```
3. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

* **Issues:** Submit via GitHub
* **Questions:** Contact prasairupan@gmail.com

## 📈 Version History

* **0.0.1:** Initial Release
  * Widget implementation
  * Automation features
  * Position/size persistence

## ⚠️ Disclaimer

**Important:** This extension is not affiliated with, endorsed by, or connected to Expedia Partner Central or any of its affiliated companies. Use at your own discretion and in accordance with Expedia Partner Central's terms of service.

## 👤 Author

Rupan Prasai