const jwt = require("jsonwebtoken");
const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = jwt.verify(authorization.substring(7), process.env.SECRET);
  } else {
    request.token = null;
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
  }
  if (error.name === "JsonWebTokenError") {
    response.status(401).json({
      error: "invalid token",
    });
  }
  next(error);
};

module.exports = {
  tokenExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
