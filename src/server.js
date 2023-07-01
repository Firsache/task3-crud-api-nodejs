const http = require("http");
require("dotenv").config();

const setResponse = require("./utils/setResponse");

const PORT = process.env.PORT || 4000;
const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/api/users" && req.method === "GET") {
      setResponse(req, 200, { message: "Hello World" });
      // res.writeHead(, { "Content-Type": "application/json" });
      // res.end(
      //   JSON.stringify({
      //     data: "Hello World!",
      //   })
      // ); // !!!!!
    } else {
      // res.writeHead(200, { "Content-Type": "application/json" });
      // res.status(500).json({ message: "Server error" }); // !!!!!
      //   res.end(
      //     JSON.stringify({
      //       data: "Server error!",
      //     })
      //   );
    }
  } catch (error) {
    setResponse(req, 500, { message: "Server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
