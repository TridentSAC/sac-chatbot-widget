const CAI_TOKEN = "4905d893aff7ca532cf7f9d5b3fe06df";
const CAI_URL = "https://api.cai.tools.sap/train/v2/request";

class SACChatbot extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="font-family:Arial; position:relative; width:100%; height:100%;">

        <!-- Toggle Button -->
        <div id="sac-toggle-btn" style="
          position:absolute; bottom:10px; right:10px;
          background:#0070F2; color:white; padding:10px 16px;
          border-radius:20px; cursor:pointer; font-size:13px;
          box-shadow:0 2px 6px rgba(0,0,0,0.3); z-index:10;">
          💬 Ask SAC AI
        </div>

        <!-- Chat Panel -->
        <div id="sac-chat-panel" style="
          display:none; position:absolute; bottom:55px; right:10px;
          width:320px; background:white; border:1px solid #ccc;
          border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.2);
          z-index:9; overflow:hidden;">

          <!-- Header -->
          <div style="background:#0070F2; color:white; padding:10px 14px; font-weight:bold; font-size:13px;">
            SAC AI Assistant — MRP Overview
          </div>

          <!-- Chat Log -->
          <div id="sac-chat-log" style="
            height:220px; overflow-y:auto; padding:10px;
            background:#f9f9f9; font-size:13px;">
            <div style="color:#888; text-align:center; margin-top:60px;">Ask me about supply balance, inventory, or MRP data.</div>
          </div>

          <!-- Input -->
          <div style="display:flex; gap:5px; padding:8px; border-top:1px solid #eee;">
            <input id="sac-user-input" type="text" placeholder="Ask about MRP data..."
              style="flex:1; padding:7px; border:1px solid #ccc; border-radius:4px; font-size:13px;"/>
            <button id="sac-send-btn" style="
              padding:7px 14px; background:#0070F2; color:white;
              border:none; border-radius:4px; cursor:pointer; font-size:13px;">
              Send
            </button>
          </div>
        </div>
      </div>
    `;

    const btn = this.querySelector('#sac-toggle-btn');
    const panel = this.querySelector('#sac-chat-panel');
    const sendBtn = this.querySelector('#sac-send-btn');
    const input = this.querySelector('#sac-user-input');

    btn.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });

    sendBtn.addEventListener('click', () => this._send());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this._send();
    });
  }

  _send() {
    const input = this.querySelector('#sac-user-input');
    const log = this.querySelector('#sac-chat-log');
    const text = input.value.trim();
    if (!text) return;

    log.innerHTML += `<div style="text-align:right; margin:4px 0;"><span style="background:#0070F2; color:white; padding:4px 8px; border-radius:10px; display:inline-block;">${text}</span></div>`;
    input.value = '';

    fetch(CAI_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${CAI_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    })
    .then(res => res.json())
    .then(data => {
      const reply = data.results?.messages?.[0]?.content || "I didn't understand that. Try asking about supply balance or inventory.";
      log.innerHTML += `<div style="text-align:left; margin:4px 0;"><span style="background:#e8f0fe; color:#333; padding:4px 8px; border-radius:10px; display:inline-block;">${reply}</span></div>`;
      log.scrollTop = log.scrollHeight;
    })
    .catch(() => {
      log.innerHTML += `<div style="color:red; font-size:12px;">Error connecting to bot.</div>`;
    });
  }
}

customElements.define('com-trident-sac-chatbot', SACChatbot);
