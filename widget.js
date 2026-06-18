class SACChatbot extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="width:100%; height:100%; position:relative;">

        <!-- Toggle Button -->
        <div id="sac-toggle-btn" style="
          position:absolute; bottom:10px; right:10px;
          background:#0070F2; color:white; padding:10px 16px;
          border-radius:20px; cursor:pointer; font-size:13px;
          box-shadow:0 2px 6px rgba(0,0,0,0.3); z-index:10;">
          💬 Ask SAC AI
        </div>

        <!-- Webchat Panel -->
        <div id="sac-chat-panel" style="
          display:none; position:absolute; bottom:55px; right:10px;
          width:370px; height:500px; z-index:9;
          border-radius:8px; overflow:hidden;
          box-shadow:0 4px 12px rgba(0,0,0,0.2);">
          <iframe
            src="https://webchat.cai.tools.sap/bootstrap.html?channel=7addf50f-8025-4008-81dd-e65b60827435&token=a41a9425cae85a3aa0acf8607a3bc774"
            style="width:100%; height:100%; border:none;">
          </iframe>
        </div>

      </div>
    `;

    const btn = this.querySelector('#sac-toggle-btn');
    const panel = this.querySelector('#sac-chat-panel');

    btn.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
  }
}

customElements.define('com-trident-sac-chatbot', SACChatbot);
