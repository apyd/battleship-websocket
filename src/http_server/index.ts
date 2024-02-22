import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

export const httpServer = http.createServer(function (req, res) {
    const dirname = path.resolve(path.dirname(''));
    const filePath = dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    fs.readFile(filePath, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});
