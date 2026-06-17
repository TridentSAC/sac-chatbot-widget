const CAI_TOKEN = "4905d893aff7ca532cf7f9d5b3fe06df";
const CAI_URL = "https://api.cai.tools.sap/train/v2/request";

class SACChatbot extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="font-family:Arial; padding:10px;">
        <div id="chat-log" style="height:250px; overflow-y:auto; border:1px solid #ccc; padding:8px; margin-bottom:8px; background:#f9f9f9;"></div>
        <div style="display:flex; gap:5px;">
          <input id="user-input" type="text" placeholder="Ask about MRP data..." 
            style="flex:1; padding:8px; border:1px solid #ccc; border-radius:4px;"/>
          <button id="send-btn" 
            style="padding:8px 16px; background:#0070F2; color:white; border:none; border-radius:4px; cursor:pointer;">
            Send
          </button>
        </div>
      </div>
    `;
    this.querySelector('#send-btn').addEventListener('click', () => this._send());
    this.querySelector('#user-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this._send();
    });
  }

  _send() {
    const input = this.querySelector('#user-input');
    const log = this.querySelector('#chat-log');
    const text = input.value.trim();
    if (!text) return;

    log.innerHTML += `<div style="text-align:right; margin:4px;"><b>You:</b> ${text}</div>`;
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
      const reply = data.results?.messages?.[0]?.content || "I didn't understand that.";
      log.innerHTML += `<div style="text-align:left; margin:4px; color:#0070F2;"><b>Bot:</b> ${reply}</div>`;
      log.scrollTop = log.scrollHeight;
    })
    .catch(() => {
      log.innerHTML += `<div style="color:red;">Error connecting to bot.</div>`;
    });
  }
}

customElements.define('com-trident-sac-chatbot', SACChatbot);
