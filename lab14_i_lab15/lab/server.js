const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const clients = new Map();

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';

    const ext = path.extname(filePath);
    const types = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    };
    const contentType = types[ext] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Błąd serwera');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

const wss = new WebSocket.Server({ server });

function broadcastUsersList() {
    const userList = [...clients.values()];
    for (let client of clients.keys()) {
        client.send(JSON.stringify({ type: 'users', users: userList }));
    }
}

wss.on('connection', (ws) => {
    let nick = null;

    ws.on('message', (msg) => {
        try {
            const data = JSON.parse(msg);

            if (data.type === 'join') {
                nick = data.nick;
                clients.set(ws, nick);
                console.log('Użytkownicy:', [...clients.values()]);
                broadcastUsersList();
            }

            else if (data.type === 'msg') {
                const message = `${nick}: ${data.text}`;
                for (let client of clients.keys()) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'msg', text: message }));
                    }
                }
            }

            else if (data.type === 'private') {
                const message = `[PM od ${nick} → ${data.to}]: ${data.text}`;
                for (let [client, name] of clients.entries()) {
                    if (name === data.to && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'private', text: message }));
                    }
                }
            }

        } catch (err) {
            console.error('Nieprawidłowa wiadomość:', msg);
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
        broadcastUsersList();
    });
});

server.listen(3000, () => {
    console.log('Serwer działa na http://localhost:3000');
});
