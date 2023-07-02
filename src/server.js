const http = require("http");
require("dotenv").config();

const CtrlUser = require("./controller");
const setResponse = require("./utils/setResponse");
const idValidation = require("./utils/idValidation");
const getReqData = require("./utils/getReqData");

const PORT = process.env.PORT || 4000;
const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/api/users" && req.method === "GET") {
      const users = await new CtrlUser().getUsers();
      setResponse(res, 200, { message: users });
    } else if (req.url.match(/^\/api\/users\/[^/]+$/) && req.method === "GET") {
      const userId = req.url.split("/")[3];
      if (userId && !idValidation(userId)) {
        setResponse(res, 400, { message: "Invalid user id" });
      }

      const user = await new CtrlUser().getUser(userId);
      !user
        ? setResponse(res, 404, {
            message: `user with id ${userId} is not found`,
          })
        : setResponse(res, 200, user);
    } else if (req.url === "/api/users" && req.method === "POST") {
      try {
        const userData = await getReqData(req);
        if (typeof userData !== "object") {
          setResponse(res, 400, {
            message: "Invalid input or missing a field",
          });
        }

        const newUser = await new CtrlUser().addUser(userData);
        setResponse(res, 201, newUser);
      } catch (error) {
        console.log(error);
      }
    } else if (
      req.url.match(/^\/api\/users\/[^/]+$/) &&
      req.method === "DELETE"
    ) {
      const userId = req.url.split("/")[3];
      if (userId && !idValidation(userId)) {
        setResponse(res, 400, { message: "Invalid user id" });
      }

      const isDeleted = await new CtrlUser().removeUser(userId);
      isDeleted
        ? setResponse(res, 204, {
            message: `User with id ${userId} is deleted`,
          })
        : setResponse(res, 404, {
            message: "User with such id is not found",
          });
    } else if (req.url.match(/^\/api\/users\/[^/]+$/) && req.method === "PUT") {
      const userId = req.url.split("/")[3];
      if (userId && !idValidation(userId)) {
        setResponse(res, 400, { message: "Invalid user id" });
      }

      try {
        const userData = await getReqData(req);
        if (typeof userData !== "object") {
          setResponse(res, 400, {
            message: "Invalid input or missing a field",
          });
        }

        const updatedUser = await new CtrlUser().updateUserById(
          userId,
          userData
        );

        updatedUser !== false
          ? setResponse(res, 200, { message: updatedUser })
          : setResponse(res, 404, {
              message: "User with such id is not found",
            });
      } catch (error) {
        console.log(error);
      }
    } else {
      setResponse(res, 404, { message: "Invalid route" });
    }
  } catch (error) {
    setResponse(res, 500, { message: "Server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
