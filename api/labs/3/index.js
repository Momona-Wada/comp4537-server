module.exports = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <h1>Welcome to COMP4537 Labs</h1>
        <ul>
            <li><a href="/labs/3/getDate?name=Momona">Lab 3</a></li>
            <li><a href="/labs/4">Lab 4</a></li>
        </ul>
    `);
};
