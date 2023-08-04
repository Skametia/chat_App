const http = require("http");
const fs = require("fs");
let result = "";
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write(
      `<html><body><h3>${result}</h3><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body></html>`
    );
    return res.end();
  } else if (req.url === "/message" && req.method === "POST") {
    const data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    return req.on("end", () => {
      const parsedData = Buffer.concat(data).toString();
      const body = parsedData.split("=")[1];
      result = body;
      fs.writeFile("message.txt", body)
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
  }
});

server.listen(3000);
