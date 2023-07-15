const getReqData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        body = JSON.parse(body);
        const { username, age, hobbies } = body;
        if (
          typeof username === "string" &&
          typeof age === "number" &&
          Array.isArray(hobbies) &&
          hobbies.every((item) => typeof item === "string")
        ) {
          resolve(body);
        } else {
          resolve("failed user validation");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = getReqData;
