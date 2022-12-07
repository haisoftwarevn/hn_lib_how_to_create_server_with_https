import http from "http";

const PORT = 3000;

const server = http.createServer();

const hn_friends = [
  { id: 1, name: "Nokia" },
  { id: 2, name: "Apple" },
];

server.on("request", (req, res) => {
  if (req.method === "POST" && req.url === "/json") {
    //todo: receive dữ liệu vào mảng, lưu tạm trong memory
    req.on("data", (data) => {
      const friend = data.toString();
      hn_friends.push(JSON.parse(friend)); // data tạm thời
    });
    // pipe dùng để chứa stream readable và chuyển sang stream writable
    req.pipe(res); // chuyển data từ req, sang res mà chưa sử lý, ở trên là đã sử ly
  } else if (req.method === "GET" && req.url === "/json") {
    //todo: trả dữ liệu về dạng Json
    // // cách 1:
    // res.writeHead(200, {
    //   "Content-Type": "application/json",
    // });
    // cách 2:
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(hn_friends));
    res.end();
  } else if (req.method === "GET" && req.url === "/message") {
    //todo: trả dữ liệu về dạng html
    // với html thì không cần set statusCode = 2000
    res.setHeader("Content-Type", "text/html");
    res.write(`<html lang="en">
    <body>
      <ul>
        My skills
        <li>Nodejs</li>
        <li>Reactjs</li>
      </ul>
    </body>
  </html>`);
    res.end();
  } else {
    //todo: thông báo khi không truy cập đúng url
    res.statusCode = 404;
    res.write("Nothing here");
    res.end();
  }
});

/////
server.listen(PORT, () => {
  console.log("hi, server is starting on port " + PORT);
});
