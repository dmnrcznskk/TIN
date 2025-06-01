let ws = null;

document.getElementById('connect').onclick = function () {
  const nick = document.getElementById('nick').value;
  if (!nick) return alert("Podaj nick");

  ws = new WebSocket('ws://localhost:3000');

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'join', nick }));
    document.getElementById('login').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'msg' || data.type === 'private') {
      const div = document.createElement('div');
      div.textContent = data.text;
      document.getElementById('chat-box').appendChild(div);
    }

    if (data.type === 'users') {
      const list = document.getElementById('userList');
      list.innerHTML = '<option value="*">Wszyscy</option>';
      for (const user of data.users) {
        if (user !== nick) {
          const option = document.createElement('option');
          option.value = user;
          option.textContent = user;
          list.appendChild(option);
        }
      }
    }
  };

  ws.onclose = () => {
    alert("Rozłączono z serwerem");
    location.reload();
  };
};

document.getElementById('chat-form').onsubmit = function (e) {
  e.preventDefault();
  const text = document.getElementById('msg').value;
  const to = document.getElementById('userList').value;

  if (!text) return;

  const type = to === '*' ? 'msg' : 'private';
  ws.send(JSON.stringify({ type, text, to }));
  document.getElementById('msg').value = '';
};

document.getElementById('disconnect').onclick = function () {
  if (ws) {
    ws.close();
  }
};
