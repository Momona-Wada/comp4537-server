const http = require('http');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 3000;

// リクエストのルーティング
const server = http.createServer((req, res) => {
    if (req.url.startsWith('/labs/3')) {
        // labs/3/server.jsを実行
        const lab3 = spawn('node', ['labs/3/server.js']);

        // 出力をクライアントに転送
        lab3.stdout.on('data', (data) => {
            res.write(data);
        });

        lab3.stderr.on('data', (data) => {
            res.write(data);
        });

        lab3.on('close', (code) => {
            res.end();
        });
    } else if (req.url.startsWith('/labs/4')) {
        // 同様にlabs/4/server.jsを実行
        const lab4 = spawn('node', ['labs/4/server.js']);

        lab4.stdout.on('data', (data) => {
            res.write(data);
        });

        lab4.stderr.on('data', (data) => {
            res.write(data);
        });

        lab4.on('close', (code) => {
            res.end();
        });
    } else {
        // ルートページ
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Welcome to COMP4537 Labs</h1>
            <ul>
                <li><a href="/labs/3/getDate?name=Momona">Lab 3</a></li>
                <li><a href="/labs/4">Lab 4</a></li>
            </ul>
        `);
    }
});

// サーバーの起動
server.listen(PORT, () => {
    console.log(`Main server running on port ${PORT}`);
});
