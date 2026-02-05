(() => {
    let shadowHost_Lx92 = null;
    let shadowRoot_Lx92 = null;
    let ipBox_Lx92 = null;
    let currentPosition_Lx92 = 'right';
    let currentSettings_Lx92 = {};
  
    function init_Lx92() {
      if (document.getElementById('loruv-tio-root-element-Lx92')) return;
  
      shadowHost_Lx92 = document.createElement('div');
      shadowHost_Lx92.id = 'loruv-tio-root-element-Lx92';
      shadowHost_Lx92.style.position = 'fixed';
      shadowHost_Lx92.style.zIndex = '2147483647';
      shadowHost_Lx92.style.bottom = '0';
      shadowHost_Lx92.style.right = '0';
      shadowHost_Lx92.style.width = '0';
      shadowHost_Lx92.style.height = '0';
      shadowHost_Lx92.style.overflow = 'visible';
      shadowHost_Lx92.style.pointerEvents = 'none';
  
      shadowRoot_Lx92 = shadowHost_Lx92.attachShadow({ mode: 'closed' });
      
      const style_Lx92 = document.createElement('style');
      style_Lx92.textContent = `
        #ip-box-container-Lx92 {
          position: fixed;
          bottom: 15px;
          right: 15px;
          padding: 8px 16px;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          font-weight: 600;
          z-index: 2147483647;
          cursor: default;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          user-select: text;
          pointer-events: auto;
          white-space: nowrap;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(4px);
        }
        #ip-box-container-Lx92.pos-left-Lx92 {
          right: auto;
          left: 15px;
        }
        #ip-box-container-Lx92:hover {
          transform: scale(1.02);
        }
      `;
      
      shadowRoot_Lx92.appendChild(style_Lx92);
  
      ipBox_Lx92 = document.createElement('div');
      ipBox_Lx92.id = 'ip-box-container-Lx92';
      ipBox_Lx92.style.display = 'none';
      
      ipBox_Lx92.addEventListener('mouseenter', handleHover_Lx92);
      
      shadowRoot_Lx92.appendChild(ipBox_Lx92);
      document.documentElement.appendChild(shadowHost_Lx92);
  
      chrome.storage.local.get(['settings_Lx92'], (result) => {
        if (result.settings_Lx92) {
          currentSettings_Lx92 = result.settings_Lx92;
          applySettings_Lx92();
        } else {
          chrome.storage.local.set({
            settings_Lx92: { isActive: true, bgColor: "#1e1e2e", textColor: "#ffffff", fontSize: 13, cornerStyle: "oval", language: "en" }
          }, () => {
            chrome.storage.local.get(['settings_Lx92'], (res) => {
               currentSettings_Lx92 = res.settings_Lx92;
               applySettings_Lx92();
            });
          });
        }
      });
  
      chrome.runtime.sendMessage({ type: 'GET_IP_Lx92' }, (response) => {
        if (response && response.ip) {
          updateDisplay_Lx92(response.ip);
        }
      });
    }
  
    function handleHover_Lx92() {
      if (currentPosition_Lx92 === 'right') {
        currentPosition_Lx92 = 'left';
        ipBox_Lx92.classList.add('pos-left-Lx92');
      } else {
        currentPosition_Lx92 = 'right';
        ipBox_Lx92.classList.remove('pos-left-Lx92');
      }
      updateCornerRadius_Lx92();
    }
  
    function updateCornerRadius_Lx92() {
      if (currentSettings_Lx92.cornerStyle === 'oval') {
        ipBox_Lx92.style.borderRadius = '24px';
      } else {
        ipBox_Lx92.style.borderRadius = '4px';
      }
    }
  
    function updateDisplay_Lx92(ip) {
      if (!ipBox_Lx92) return;
      ipBox_Lx92.textContent = ip;
      if (currentSettings_Lx92.isActive) {
        ipBox_Lx92.style.display = 'block';
      }
    }
  
    function applySettings_Lx92() {
      if (!ipBox_Lx92) return;
  
      if (!currentSettings_Lx92.isActive) {
        ipBox_Lx92.style.display = 'none';
        return;
      } 
      
      ipBox_Lx92.style.display = 'block';
      ipBox_Lx92.style.backgroundColor = currentSettings_Lx92.bgColor;
      ipBox_Lx92.style.color = currentSettings_Lx92.textColor;
      ipBox_Lx92.style.fontSize = `${currentSettings_Lx92.fontSize}px`;
      
      updateCornerRadius_Lx92();
    }
  
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'IP_UPDATE_Lx92') {
        updateDisplay_Lx92(message.ip);
      } else if (message.type === 'SETTINGS_UPDATE_Lx92') {
        currentSettings_Lx92 = message.settings;
        applySettings_Lx92();
      }
    });
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init_Lx92);
    } else {
      init_Lx92();
    }
  })();