const setResponse = (res, statusCode, data) => {
  if (!res.headersSent) {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  }
};
module.exports = setResponse;
