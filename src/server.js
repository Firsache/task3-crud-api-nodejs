const http = require("http");
require("dotenv").config();

// const Ctrl = require("./controllers/index");
const CtrlUser = require("./controller");
const setResponse = require("./utils/setResponse");
const idValidation = require("./utils/idValidation");
const getReqData = require("./utils/getReqData");

const PORT = process.env.PORT || 4000;
const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/api/users" && req.method === "GET") {
      // const users = await Ctrl.getAll();

      const users = await new CtrlUser().getUser();
      // console.log(users);
      setResponse(res, 200, { message: users });

      // res.writeHead(200, { "Content-Type": "application/json" });
      // res.end(
      //   JSON.stringify({
      //     data: "Hello World!",
      //   })
      // ); // !!!!!
    } else if (req.url.match(/^\/api\/users\/[^/]+$/) && req.method === "GET") {
      const userId = req.url.split("/")[3];
      if (userId && !idValidation(userId)) {
        setResponse(res, 400, { message: "Invalid userId" });
      }
      // const user = await Ctrl.getUserById(userId);

      const user = await new CtrlUser().getUser(userId);
      // console.log(user);
      !user
        ? setResponse(res, 404, {
            message: `user with id ${userId} is not found`,
          })
        : setResponse(res, 200, user);
    } else if (req.url === "/api/users" && req.method === "POST") {
      const userData = await getReqData(req);

      const newUser = await new CtrlUser().addUser(userData);
      // console.log(newUser);
      setResponse(res, 201, newUser);
    } else if (
      req.url.match(/^\/api\/users\/[^/]+$/) &&
      req.method === "DELETE"
    ) {
      const userId = req.url.split("/")[3];
      if (userId && !idValidation(userId)) {
        setResponse(res, 400, { message: "Invalid userId" });
      }

      const message = await new CtrlUser().removeUser(userId);
      !message
        ? setResponse(res, 404, {
            message: "User with such id is not found",
          })
        : setResponse(res, 204, { message });
    } else if (req.url.match(/^\/api\/users\/[^/]+$/) && req.method === "PUT") {
      const userId = req.url.split("/")[3];
      if (userId && !idValidation(userId)) {
        setResponse(res, 400, { message: "Invalid userId" });
      }
      const userData = await getReqData(req);
      if (typeof userData !== "object") {
        setResponse(res, 400, { message: "Invalid input or missing a field" });
      }

      const updatedUser = await new CtrlUser().removeUser(userId, userData);

      !updatedUser
        ? setResponse(res, 404, {
            message: "User with such id is not found",
          })
        : setResponse(res, 200, { message: updatedUser });
    } else {
      setResponse(res, 404, { message: "Invalid route" });
    }
  } catch (error) {
    setResponse(res, 500, { message: "Server error" });

    // res.status(500).json({ message: "Server error" }); // !!!!!
    //   res.end(
    //     JSON.stringify({
    //       data: "Server error!",
    //     })
    //   );
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
