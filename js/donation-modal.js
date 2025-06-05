/**
 * Donation Modal Module
 * A reusable donation modal component with cryptocurrency and Buy Me a Coffee support
 */

(function(window) {
  'use strict';

  // Default configuration
  const defaultConfig = {
    ethAddress: '',
    btcAddress: '',
    buyMeCoffeeUrl: '',
    buyMeButtonText: '☕️ Buy Me a Coffee',
    modalTitle: 'Simply always free & Ad free.',
    modalDescription: 'This app will always be free and clean—just a tool to make your life easier. If you want to support that kinda internet, buy me a coffee 🙏',
    qrCodeOptions: {
      width: 110,
      margin: 1,
      color: {
        dark: '#000',
        light: '#FFF'
      },
      errorCorrectionLevel: 'H'
    }
  };

  // Main DonationModal class
  class DonationModal {
    constructor(config) {
      this.config = Object.assign({}, defaultConfig, config);
      this.modal = null;
      this.isInitialized = false;
      this.qrCodeLibrary = null;
    }

    // Initialize the modal
    init() {
      if (this.isInitialized) {
        console.warn('DonationModal already initialized');
        return;
      }

      // Check for required configuration
      if (!this.config.ethAddress && !this.config.btcAddress && !this.config.buyMeCoffeeUrl) {
        console.error('DonationModal: At least one donation method must be configured');
        return;
      }

      // Load QR code library if needed
      if (this.config.ethAddress && typeof QRCode === 'undefined') {
        this.loadQRCodeLibrary();
      }

      // Create and inject modal
      this.createModal();
      this.attachEventListeners();
      this.isInitialized = true;
    }

    // Load QR code library dynamically
    loadQRCodeLibrary() {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js';
      script.onload = () => {
        this.qrCodeLibrary = window.QRCode;
        this.generateQRCode();
      };
      document.head.appendChild(script);
    }

    // Create modal HTML
    createModal() {
      // Check if modal already exists
      if (document.getElementById('donation-modal')) {
        this.modal = document.getElementById('donation-modal');
        this.updateModalContent();
        return;
      }

      // Create modal container
      const modalHTML = `
        <div id="donation-modal" class="donation-modal" style="display: none !important;">
          <div class="donation-content">
            <span class="donation-close">&times;</span>
            <h3>${this.config.modalTitle}</h3>
            <p>${this.config.modalDescription}</p>
            <div class="donation-methods">
              ${this.createCryptoSection()}
              ${this.createSeparator()}
              ${this.createBuyMeCoffeeSection()}
            </div>
          </div>
        </div>
      `;

      // Inject modal into DOM
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      this.modal = document.getElementById('donation-modal');

      // Set addresses
      this.updateAddresses();
    }

    // Create crypto donation section
    createCryptoSection() {
      if (!this.config.ethAddress && !this.config.btcAddress) return '';

      return `
        <div class="donation-method">
          <div class="crypto-donation">
            <div class="crypto-info">
              ${this.config.ethAddress ? `
                <div class="crypto-address-container">
                  <p>Ethereum / EVM chains:</p>
                  <div id="eth-address" class="donation-address" title="Click to copy">
                    <span class="address-text">${this.config.ethAddress}</span>
                    <span class="copy-indicator">Click to copy</span>
                  </div>
                </div>
              ` : ''}
              ${this.config.btcAddress ? `
                <div class="crypto-address-container">
                  <p>Bitcoin:</p>
                  <div id="btc-address" class="donation-address" title="Click to copy">
                    <span class="address-text">${this.config.btcAddress}</span>
                    <span class="copy-indicator">Click to copy</span>
                  </div>
                </div>
              ` : ''}
            </div>
            ${this.config.ethAddress ? '<div id="eth-qr-code" class="eth-qr"></div>' : ''}
          </div>
        </div>
      `;
    }

    // Create separator
    createSeparator() {
      if ((!this.config.ethAddress && !this.config.btcAddress) || !this.config.buyMeCoffeeUrl) {
        return '';
      }
      return '<div class="donation-separator"><span>or</span></div>';
    }

    // Create Buy Me a Coffee section
    createBuyMeCoffeeSection() {
      if (!this.config.buyMeCoffeeUrl) return '';

      return `
        <div class="donation-method">
          <a id="bmc-link" href="${this.config.buyMeCoffeeUrl}" target="_blank" rel="noopener noreferrer" class="bmc-link">
            ${this.config.buyMeButtonText}
          </a>
        </div>
      `;
    }

    // Update modal content if it already exists
    updateModalContent() {
      const title = this.modal.querySelector('h3');
      const description = this.modal.querySelector('p');
      
      if (title) title.textContent = this.config.modalTitle;
      if (description) description.textContent = this.config.modalDescription;
      
      this.updateAddresses();
    }

    // Update addresses in the modal
    updateAddresses() {
      if (this.config.ethAddress) {
        const ethAddressEl = document.getElementById('eth-address');
        if (ethAddressEl) {
          const ethText = ethAddressEl.querySelector('.address-text');
          if (ethText) ethText.textContent = this.config.ethAddress;
        }
      }

      if (this.config.btcAddress) {
        const btcAddressEl = document.getElementById('btc-address');
        if (btcAddressEl) {
          const btcText = btcAddressEl.querySelector('.address-text');
          if (btcText) btcText.textContent = this.config.btcAddress;
        }
      }

      if (this.config.buyMeCoffeeUrl) {
        const bmcLink = document.getElementById('bmc-link');
        if (bmcLink) {
          bmcLink.href = this.config.buyMeCoffeeUrl;
          bmcLink.textContent = this.config.buyMeButtonText;
        }
      }

      // Generate QR code if library is loaded
      if (this.qrCodeLibrary || typeof QRCode !== 'undefined') {
        this.generateQRCode();
      }
    }

    // Generate QR code for Ethereum address
    generateQRCode() {
      const qrContainer = document.getElementById('eth-qr-code');
      if (!qrContainer || !this.config.ethAddress) return;

      const QR = this.qrCodeLibrary || window.QRCode;
      if (!QR) {
        console.log('QRCode library not loaded yet');
        return;
      }

      try {
        // Clear container first
        qrContainer.innerHTML = '';

        // Create ethereum: URI for better wallet compatibility
        const ethQrText = 'ethereum:' + this.config.ethAddress;

        // Create img element
        const qrImg = document.createElement('img');
        qrImg.alt = 'Ethereum QR Code';
        qrImg.style.width = '100%';
        qrImg.style.height = '100%';
        qrContainer.appendChild(qrImg);

        // Generate QR code
        QR.toDataURL(ethQrText, this.config.qrCodeOptions, function(error, url) {
          if (error) {
            console.error('Error generating QR code:', error);
            qrContainer.innerHTML = '<div class="fallback-qr">QR code unavailable</div>';
          } else {
            qrImg.src = url;
          }
        });
      } catch (err) {
        console.error('Failed to generate QR code:', err);
        qrContainer.innerHTML = '<div class="fallback-qr">QR code unavailable</div>';
      }
    }

    // Attach event listeners
    attachEventListeners() {
      // Close button
      const closeBtn = this.modal.querySelector('.donation-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
      }

      // Click outside to close
      window.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });

      // Setup copy functionality
      if (this.config.ethAddress) {
        const ethAddressEl = document.getElementById('eth-address');
        if (ethAddressEl) {
          this.setupCopyAddress(ethAddressEl, this.config.ethAddress);
        }
      }

      if (this.config.btcAddress) {
        const btcAddressEl = document.getElementById('btc-address');
        if (btcAddressEl) {
          this.setupCopyAddress(btcAddressEl, this.config.btcAddress);
        }
      }
    }

    // Setup click-to-copy functionality
    setupCopyAddress(element, address) {
      element.addEventListener('click', () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(address)
            .then(() => this.showCopySuccess(element))
            .catch(err => {
              console.error('Failed to copy:', err);
              this.fallbackCopy(element, address);
            });
        } else {
          this.fallbackCopy(element, address);
        }
      });

      // Keyboard accessibility
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          element.click();
        }
      });

      // Make focusable
      element.setAttribute('tabindex', '0');
    }

    // Fallback copy method
    fallbackCopy(element, text) {
      try {
        const temp = document.createElement('input');
        temp.setAttribute('value', text);
        document.body.appendChild(temp);
        temp.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(temp);
        
        if (successful) {
          this.showCopySuccess(element);
        } else {
          alert('Please copy this address manually: ' + text);
        }
      } catch (err) {
        console.error('Fallback copy failed:', err);
        alert('Please copy this address manually: ' + text);
      }
    }

    // Show copy success feedback
    showCopySuccess(element) {
      const indicator = element.querySelector('.copy-indicator');
      if (indicator) {
        indicator.textContent = 'Copied! ✓';
      }

      element.classList.add('copied');

      setTimeout(() => {
        element.classList.remove('copied');
        if (indicator) {
          indicator.textContent = 'Click to copy';
        }
      }, 2000);
    }

    // Open the modal
    open() {
      if (!this.modal) {
        console.error('DonationModal not initialized');
        return;
      }

      this.modal.style.cssText = 'display: block !important';
      document.body.style.overflow = 'hidden';

      // Trigger opened event
      this.modal.dispatchEvent(new CustomEvent('donationModalOpened'));
    }

    // Close the modal
    close() {
      if (!this.modal) return;

      this.modal.style.cssText = 'display: none !important';
      document.body.style.overflow = '';

      // Trigger closed event
      this.modal.dispatchEvent(new CustomEvent('donationModalClosed'));
    }

    // Destroy the modal
    destroy() {
      if (this.modal) {
        this.modal.remove();
      }
      this.modal = null;
      this.isInitialized = false;
    }

    // Attach to trigger element
    attachToTrigger(triggerElement) {
      if (!triggerElement) {
        console.error('Trigger element not provided');
        return;
      }

      triggerElement.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    }
  }

  // Export to window
  window.DonationModal = DonationModal;

})(window);