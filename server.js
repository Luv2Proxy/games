const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 8000;
const basePath = path.join(__dirname, '/');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
    // Set CSP header
    res.setHeader(
        'Content-Security-Policy',
        "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;"
    );    

    let filePath = path.join(basePath, req.url === '/' ? '/index.html' : req.url);
    const ext = path.extname(filePath);

    if (req.url === '/favicon.ico') {
        // Handle favicon requests
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Favicon not found');
        return;
    }

    if (!ext) {
        // If no file extension, assume it's a directory and list contents
        fs.readdir(filePath, (err, files) => {
            if (err) {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
                return;
            }

            const directoryListing = files
                .map(file => `<a href="${path.join(req.url, file)}">${file}</a>`)
                .join('<br>');

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(directoryListing);
        });
        return;
    }

    // Serve files
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
