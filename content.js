function shouldShowWidget() {
    return window.location.href.includes('legacyReservationDetails.html');
  }
  
  function createWidget() {
    // Only create widget on reservation detail pages
    if (!shouldShowWidget()) return;
  
    const widget = document.createElement('div');
    widget.className = 'floating-widget';
    
    const button = document.createElement('button');
    button.className = 'widget-button';
    button.textContent = 'Process Reservation';
    button.onclick = processReservation;
    
    widget.appendChild(button);
    document.body.appendChild(widget);
  }
  
  async function processReservation() {
    try {
      // Disable the button while processing
      const button = document.querySelector('.widget-button');
      button.disabled = true;
      button.textContent = 'Processing...';
  
      // Step 1: Click the first button
      const cancelButton = document.querySelector('.markAsCancellationQuickTask');
      if (!cancelButton) throw new Error('Cancel button not found');
      cancelButton.click();
  
      // Wait for the modal to appear
      await waitForElement('.modal-body');
  
      // Step 2: Change the input value
      await new Promise(resolve => setTimeout(resolve, 500)); // Additional delay for modal
      const inputElement = document.querySelector('#cancellationPenaltyAmount');
      if (!inputElement) throw new Error('Input element not found');
      
      // Update the input value and trigger change event
      inputElement.value = '0';
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      inputElement.dispatchEvent(new Event('change', { bubbles: true }));
  
      // Step 3: Click the save button
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait a bit before clicking save
      const saveButton = document.querySelector('.saveNoShow');
      if (!saveButton) throw new Error('Save button not found');
      saveButton.click();
  
      // Reset button state after completion
      button.disabled = false;
      button.textContent = 'Process Reservation';
  
    } catch (error) {
      console.error('Error processing reservation:', error);
      alert('Error processing reservation. Please try again.');
      
      // Reset button state on error
      const button = document.querySelector('.widget-button');
      button.disabled = false;
      button.textContent = 'Process Reservation';
    }
  }
  
  function waitForElement(selector) {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }
  
      const observer = new MutationObserver((mutations) => {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });
  
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
  
      // Timeout after 5 seconds
      setTimeout(() => {
        observer.disconnect();
        reject(new Error('Element not found within timeout'));
      }, 5000);
    });
  }
  
  // Create the widget when the page loads
  createWidget();
  
  // Also handle navigation within the single-page application if needed
  let lastUrl = location.href; 
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      createWidget();
    }
  }).observe(document, {subtree: true, childList: true});