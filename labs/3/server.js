const http = require("http")
const url = require("url")
const path = require("path")
const fs = require("fs")
const utils = require("./modules/utils")

const PORT = process.env.PORT || 3000

const filePath = path.resolve(__dirname, "../../locals/en/en.json");
const messages = JSON.parse(fs.readFileSync(filePath, "utf8"))

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const queryObject = parsedUrl.query;

    if (parsedUrl.pathname === "/labs/3/getDate" || parsedUrl.pathname === "/labs/3/getDate/") {
        const name = queryObject.name || "Guest";
        const date = utils.getDate();

        const responseMessage = messages.greeting
            .replace("%NAME%", name)
            .replace("%DATE%", date);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<div style="color: blue;">${responseMessage}</div>`);
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Not Found");
    }
};

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    http.createServer(module.exports).listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}