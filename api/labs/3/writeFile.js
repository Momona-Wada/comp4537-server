const fs = require("fs")
const path = require("path")
const url = require("url")
const { messages } = require("./lang/messages/en/user")

const PORT = process.env.PORT || 3000

class FileWriter {
    constructor(filename) {
        this.filePath = path.resolve(__dirname, filename);
    }

    appendText(text) {
        return new Promise((resolve, reject) => {
            fs.appendFile(this.filePath, text + "\n", (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve()
                }
            })
        })
        
    }
}

module.exports = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const text = parsedUrl.query.text;

    if (!text) {
        res.writeHead(400, messages.TEXT_NOT_PROVIDED);
        return;
    }

    const fileWriter = new FileWriter("file.txt");
    
    try {
        await fileWriter.appendText(text);
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(messages.TEXT_APPENDED_SUCCESSFULLY);
    } catch {
        res.writeHead(500, {"Content-Type": "text/html"});
        res.end(messages.INTERNAL_SERVER_ERROR);
    }
    
}

// if (process.env.NODE_ENV !== 'production') {
//     const PORT = process.env.PORT || 3000;
//     http.createServer(module.exports).listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }