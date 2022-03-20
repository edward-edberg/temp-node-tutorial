const http = require("http");

const server = http.createServer((req, res) => {
  // console.log(req);
  if (req.url === "/") {
    res.end("Welcome to our home page");
  }
  // res.write("Welcome to our home page");
  if (req.url === "/about") {
    res.end("Here is out short history");
  }
  res.end(`
  <h1>Oops!</h1>
  <p>We can't find the page you're looking for</p>
  <a href="/">back home</a>
  `);
});

server.listen(5000);
