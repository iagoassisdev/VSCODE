// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring'); // Importe o módulo querystring

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/' || req.url === '/index.html') {
            const filePath = path.join(__dirname, 'index.html');
            const stream = fs.createReadStream(filePath);
            res.setHeader('Content-Type', 'text/html');
            stream.pipe(res);
        } else if (req.url === '/style.css') {
            const filePath = path.join(__dirname, 'style.css');
            const stream = fs.createReadStream(filePath);
            res.setHeader('Content-Type', 'text/css');
            stream.pipe(res);
        } else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    } else if (req.method === 'POST' && req.url === '/processar.php') { // Verifica se é uma requisição POST para processar.php
        let body = '';

        // Leia os dados do corpo da requisição
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        // Quando todos os dados forem lidos
        req.on('end', () => {
            // Parse os dados do corpo da requisição
            const parsedData = parse(body);

            // Agora você pode usar parsedData para acessar os valores do formulário
            const nome = parsedData.nome;
            const email = parsedData.email;
            const senha = parsedData.senha;

            // Você pode realizar qualquer processamento adicional aqui, como salvar no banco de dados

            // Redirecionar para a página de resultado com os dados como parâmetros da URL
            const redirectUrl = `/resultado.html?nome=${nome}&email=${email}&senha=${senha}`;
            res.writeHead(302, {
                'Location': redirectUrl
            });
            res.end();
        });
    } else if (req.method === 'GET' && req.url === '/resultado.html') {
        // Verifica se é uma requisição GET para resultado.html
        const filePath = path.join(__dirname, 'resultado.html');
        const stream = fs.createReadStream(filePath);
        res.setHeader('Content-Type', 'text/html');
        stream.pipe(res);
    } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor em execução em http://localhost:${port}`);
});