# Donation Modal Module

A lightweight, customizable donation modal component that supports cryptocurrency addresses (Ethereum/Bitcoin) and Buy Me a Coffee integration. Perfect for adding donation functionality to your web projects with minimal effort.

## Features

- 🎨 Clean, modern design with dark mode support
- 💰 Cryptocurrency support (Ethereum/EVM chains & Bitcoin)
- ☕ Buy Me a Coffee integration
- 📱 Fully responsive and mobile-friendly
- 📋 Click-to-copy addresses with visual feedback
- 🔲 QR code generation for Ethereum address
- 🎯 Zero dependencies (QR code library loaded on-demand)
- 🔧 Easy to customize and integrate
- ♿ Keyboard accessible

## Quick Start

### Option 1: Single File (Recommended)

Include the minified version that contains everything:

```html
<!-- Include the all-in-one file -->
<script src="donation-modal.min.js"></script>

<!-- Initialize the modal -->
<script>
  const donationModal = new DonationModal({
    ethAddress: 'ETHORANYEVMADDRESS',
    btcAddress: 'BTCADDRESS',
    buyMeCoffeeUrl: 'https://www.buymeacoffee.com/yourname'
  });
  
  donationModal.init();
  
  // Attach to a button
  const donateBtn = document.getElementById('donate-btn');
  donationModal.attachToTrigger(donateBtn);
</script>
```

### Option 2: Separate Files

If you prefer to load CSS and JS separately:

```html
<!-- Include CSS -->
<link rel="stylesheet" href="css/donation-modal.css">

<!-- Include JavaScript -->
<script src="js/donation-modal.js"></script>

<!-- Initialize the modal -->
<script>
  const donationModal = new DonationModal({
    ethAddress: 'your-eth-address',
    btcAddress: 'your-btc-address',
    buyMeCoffeeUrl: 'https://buymeacoffee.com/yourname'
  });
  
  donationModal.init();
</script>
```

## Configuration Options

```javascript
const donationModal = new DonationModal({
  // Cryptocurrency addresses
  ethAddress: '',           // Ethereum/EVM address
  btcAddress: '',           // Bitcoin address
  
  // Buy Me a Coffee
  buyMeCoffeeUrl: '',       // Your Buy Me a Coffee URL
  buyMeButtonText: '☕️ Buy Me a Coffee',  // Button text
  
  // Modal content
  modalTitle: 'Simply always free & Ad free.',
  modalDescription: 'This app will always be free...',
  
  // QR code options
  qrCodeOptions: {
    width: 110,
    margin: 1,
    color: {
      dark: '#000',
      light: '#FFF'
    },
    errorCorrectionLevel: 'H'
  }
});
```

## API Methods

### `init()`
Initialize the modal and inject it into the DOM.

```javascript
donationModal.init();
```

### `open()`
Open the donation modal programmatically.

```javascript
donationModal.open();
```

### `close()`
Close the donation modal programmatically.

```javascript
donationModal.close();
```

### `attachToTrigger(element)`
Attach the modal to a trigger element (button, link, etc.).

```javascript
const button = document.getElementById('donate-button');
donationModal.attachToTrigger(button);
```

### `destroy()`
Remove the modal from the DOM and clean up.

```javascript
donationModal.destroy();
```

## Events

The modal dispatches custom events:

```javascript
// Listen for modal open
document.getElementById('donation-modal').addEventListener('donationModalOpened', () => {
  console.log('Donation modal opened');
});

// Listen for modal close
document.getElementById('donation-modal').addEventListener('donationModalClosed', () => {
  console.log('Donation modal closed');
});
```

## Customization

### CSS Variables

The modal uses CSS variables for easy theming:

```css
.donation-modal {
  --bg-container: #ffffff;
  --color-text: #000000;
  --color-muted: #999999;
  --color-accent: #F26D5B;
  --color-accent-hover: #d95b4b;
  --bg-primary: #f5f5f5;
  --border-color: #e0e0e0;
  --color-text-secondary: #666666;
  --highlight-bg: #f0f0f0;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Dark Mode

The modal automatically supports dark mode through CSS media queries:

```css
@media (prefers-color-scheme: dark) {
  .donation-modal {
    --bg-container: #1a1a1a;
    --color-text: #ffffff;
    /* ... other dark mode colors ... */
  }
}
```

### Custom Styling

You can override any styles by targeting the modal classes:

```css
/* Custom modal width */
.donation-content {
  max-width: 600px;
}

/* Custom button style */
.donation-modal .bmc-link {
  background: #FF813F;
  border-radius: 20px;
}

/* Custom address style */
.donation-modal .donation-address {
  font-family: monospace;
  font-size: 12px;
}
```

## Examples

### Basic Implementation

```html
<!DOCTYPE html>
<html>
<head>
  <title>Donation Modal Example</title>
</head>
<body>
  <button id="donate-btn">Donate</button>
  
  <script src="donation-modal.min.js"></script>
  <script>
    // Initialize with your addresses
    const modal = new DonationModal({
      ethAddress: '0x5214e7601682dEE3397666b8bBaeDBD682d19186',
      buyMeCoffeeUrl: 'https://buymeacoffee.com/example'
    });
    
    modal.init();
    modal.attachToTrigger(document.getElementById('donate-btn'));
  </script>
</body>
</html>
```

### Advanced Implementation

```javascript
// Initialize with full configuration
const donationModal = new DonationModal({
  ethAddress: '0x5214e7601682dEE3397666b8bBaeDBD682d19186',
  btcAddress: '3BHETs8Fby8RmYhuqQqFBLfc7vMYD1R1mA',
  buyMeCoffeeUrl: 'https://buymeacoffee.com/yourname',
  buyMeButtonText: '☕ Support My Work',
  modalTitle: 'Support Open Source',
  modalDescription: 'Your support helps keep this project free and ad-free. Thank you!',
  qrCodeOptions: {
    width: 150,
    margin: 2,
    color: {
      dark: '#1a1a1a',
      light: '#ffffff'
    }
  }
});

// Initialize the modal
donationModal.init();

// Attach to multiple triggers
document.querySelectorAll('.donate-trigger').forEach(el => {
  donationModal.attachToTrigger(el);
});

// Listen for events
document.getElementById('donation-modal').addEventListener('donationModalOpened', () => {
  // Track analytics event
  gtag('event', 'donation_modal_opened');
});

// Open programmatically after 30 seconds
setTimeout(() => {
  donationModal.open();
}, 30000);
```

### Minimal Implementation (Only Buy Me a Coffee)

```javascript
const donationModal = new DonationModal({
  buyMeCoffeeUrl: 'https://buymeacoffee.com/yourname'
});

donationModal.init();
donationModal.attachToTrigger(document.getElementById('support-btn'));
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Dependencies

- None! The modal is self-contained.
- QR code library (qrcode.js) is loaded on-demand only if Ethereum address is provided.

## File Structure

```
donation-modal/
├── README.md              # This file
├── template.html          # HTML template (reference only)
├── donation-modal.min.js  # All-in-one minified file (recommended)
├── css/
│   └── donation-modal.css # Standalone CSS file
├── js/
│   └── donation-modal.js  # Standalone JavaScript file
└── demo/
    └── index.html         # Demo implementation
```

## License

MIT License - feel free to use this in your projects!

## Credits

Created by extracting and modularizing the donation functionality from [PadSnap](https://padsnap.app).

## Support

If you find this useful, consider supporting the project using the donation modal itself! 😄