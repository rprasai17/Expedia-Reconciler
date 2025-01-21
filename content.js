class Widget {
    constructor() {
        this.loadPosition();
        this.createWidget();
        this.initializeDrag();
        this.initializeResize();
    }

    static getInstance() {
        if (!Widget.instance) {
            Widget.instance = new Widget();
        }
        return Widget.instance;
    }

    static destroyInstance() {
        Widget.instance = null;
    }

    loadPosition() {
        const savedPosition = localStorage.getItem('widgetPosition');
        this.position = savedPosition ? JSON.parse(savedPosition) : {
            right: '20px',
            top: '50%'
        };
        this.size = JSON.parse(localStorage.getItem('widgetSize') || '{"width": "200px", "height": "150px"}');
    }

    savePosition() {
        const widget = document.querySelector('.floating-widget');
        if (widget) {
            const position = {
                right: widget.style.right,
                top: widget.style.top
            };
            localStorage.setItem('widgetPosition', JSON.stringify(position));

            const size = {
                width: widget.style.width,
                height: widget.style.height
            };
            localStorage.setItem('widgetSize', JSON.stringify(size));
        }
    }

    createWidget() {
        if (!shouldShowWidget()) return;

        // Remove existing widget if present
        const existingWidget = document.querySelector('.floating-widget');
        if (existingWidget) {
            existingWidget.remove();
        }

        const widget = document.createElement('div');
        widget.className = 'floating-widget';
        widget.style.right = this.position.right;
        widget.style.top = this.position.top;
        widget.style.width = this.size.width;
        widget.style.height = this.size.height;

        // Create header
        const header = document.createElement('div');
        header.className = 'widget-header';

        const title = document.createElement('h2');
        title.className = 'widget-title';
        title.textContent = 'Expedia Reconciler';

        const closeButton = document.createElement('button');
        closeButton.className = 'widget-close';
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");

        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M18 6L6 18");

        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "M6 6L18 18");

        svg.appendChild(path1);
        svg.appendChild(path2);
        closeButton.appendChild(svg);
        closeButton.onclick = () => {
            widget.remove();
            Widget.destroyInstance();
        };

        header.appendChild(title);
        header.appendChild(closeButton);

        // Create content area
        const content = document.createElement('div');
        content.className = 'widget-content';

        const button = document.createElement('button');
        button.className = 'widget-button';
        button.textContent = 'Process Reservation';
        button.onclick = processReservation;

        content.appendChild(button);

        widget.appendChild(header);
        widget.appendChild(content);
        document.body.appendChild(widget);
    }

    initializeDrag() {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        document.addEventListener('mousedown', (e) => {
            const header = e.target.closest('.widget-header');
            const widget = e.target.closest('.floating-widget');

            if (header && widget) {
                isDragging = true;
                widget.style.transition = 'none';

                initialX = e.clientX - widget.offsetLeft;
                initialY = e.clientY - widget.offsetTop;
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const widget = document.querySelector('.floating-widget');
            if (!widget) return;

            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            // Ensure widget stays within viewport
            const maxX = window.innerWidth - widget.offsetWidth;
            const maxY = window.innerHeight - widget.offsetHeight;

            currentX = Math.min(Math.max(0, currentX), maxX);
            currentY = Math.min(Math.max(0, currentY), maxY);

            widget.style.left = `${currentX}px`;
            widget.style.top = `${currentY}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                const widget = document.querySelector('.floating-widget');
                if (widget) {
                    widget.style.transition = 'all 0.2s';
                    this.savePosition();
                }
            }
        });
    }

    initializeResize() {
        let resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target.classList.contains('floating-widget')) {
                    this.savePosition();
                }
            }
        });

        const widget = document.querySelector('.floating-widget');
        if (widget) {
            resizeObserver.observe(widget);
        }
    }
}

// Add these styles to your existing CSS
const additionalStyles = `
    .reopen-widget-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 20px;
      background-color: #1a73e8;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      z-index: 999998;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
  
    .reopen-widget-button:hover {
      background-color: #1557b0;
    }
  `;

// Insert additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

function shouldShowWidget() {
    return window.location.href.includes('legacyReservationDetails.html');
}

// Initialize widget
if (shouldShowWidget()) {
    Widget.getInstance();
}

// Handle navigation within single-page application
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        if (shouldShowWidget()) {
            Widget.getInstance();
        }
    }
}).observe(document, { subtree: true, childList: true });


// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleWidget") {
        const existingWidget = document.querySelector('.floating-widget');
        if (existingWidget) {
            existingWidget.remove();
            Widget.destroyInstance();
        } else if (shouldShowWidget()) {
            Widget.getInstance();
        }
    }
});

async function processReservation() {
    try {
        const button = document.querySelector('.widget-button');
        button.disabled = true;
        button.textContent = 'Processing...';

        // Step 1: Click the first button
        const cancelButton = document.querySelector('.markAsCancellationQuickTask');
        if (!cancelButton) throw new Error('Cancel button not found');
        cancelButton.click();

        // Wait for modal to appear and be fully loaded
        console.log('Waiting for modal...');
        const modal = await waitForElement('.modal-body .quickTaskModal');
        console.log('Modal found:', modal);

        // Step 2: Wait for and update the input
        console.log('Waiting for input element...');
        const inputElement = await waitForElement('#cancellationPenaltyAmount');
        console.log('Input element found:', inputElement);

        // Give extra time for any animations
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update input value
        inputElement.value = '0';
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        inputElement.dispatchEvent(new Event('change', { bubbles: true }));

        // Step 3: Find and click the save button
        console.log('Waiting for save button...');
        const saveButton = await waitForElement('button.btn-action.saveCancel');

        if (!saveButton) {
            throw new Error('Save button not found');
        }

        console.log('Save button found, clicking...');
        saveButton.click();

        // Reset widget button
        button.disabled = false;
        button.textContent = 'Process Reservation';

    } catch (error) {
        console.error('Error processing reservation:', error);
        console.log('DOM state at error:', document.querySelector('.modal-body')?.innerHTML);
        alert('Error processing reservation. Please try again.');

        const button = document.querySelector('.widget-button');
        button.disabled = false;
        button.textContent = 'Process Reservation';
    }
}

function waitForElement(selector) {
    return new Promise((resolve, reject) => {
        const checkElement = () => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return true;
            }
            return false;
        };

        // Check immediately
        if (checkElement()) return;

        // If not found, set up an observer
        const observer = new MutationObserver((mutations) => {
            if (checkElement()) {
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style'],
            characterData: true
        });

        // Timeout after 10 seconds
        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Timeout waiting for element: ${selector}`));
        }, 10000);
    });
}