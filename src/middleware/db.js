const dbMiddleware = (db) => {
  return (req, res, next) => {
    req.db = db;

    next();
  };
};

module.exports = dbMiddleware;
