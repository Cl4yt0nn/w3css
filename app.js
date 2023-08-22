const http = require('http');
const fs = require('fs');
const hostname = "127.0.0.1";

const homePage = fs.readFileSync("index.html");
const portfolioPage = fs.readFileSync("portfolio.html");
const contactPage = fs.readFileSync("contact.html");

const port = 3000;
const server = http.createServer((req, res) => {
 
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(homePage);
    } else if (req.url === "/portfolio.html") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(portfolioPage);
    } else if (req.url === "/contact.html") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(contactPage);
    } else if (req.url.match("\.jpg$")) {
        try {
            res.statusCode = 200;
            res.setHeader("Content-Type", "image/jpg");
            imgLoc = req.url.replace("/", "./");
            console.log(imgLoc);
            image = fs.readFileSync(imgLoc);
            res.end(image);
        } catch {
            res.statusCode = 404;
            res.write("404");
            console.log(imgLoc);
            console.log(req.url);
        }
    } else {
        res.statusCode = 404;
        res.write("404");
        console.log(req.url);
    };
    res.end();
});

server.listen(port, hostname, (error) => {
    if (error) {
        console.log("Something went wrong.", error);
    } else {
        console.log('Server is listening to the port ' + port);
    }
});