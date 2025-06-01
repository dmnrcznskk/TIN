const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const fileName = decodeURIComponent(parsedUrl.pathname.slice(1));

    if (!fileName) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Brak nazwy pliku\n');
        return;
    }

    if (req.method === 'GET') {
        if (!fs.existsSync(fileName)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Plik nie istnieje\n');
            return;
        }

        const content = fs.readFileSync(fileName, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(content);
    }

    else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        fs.appendFileSync(fileName, body.trim() + '\n');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Dopisano do pliku\n');
    });
}


    else if (req.method === 'DELETE') {
        if (!fs.existsSync(fileName)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Plik nie istnieje\n');
            return;
        }

        fs.unlinkSync(fileName);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Plik usunięty\n');
    }

    else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Nieobsługiwana metoda\n');
    }
});

server.listen(3000, () => {
    console.log('Serwer działa na porcie 3000');
});
