const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // sometimes we have an error even the status is 200
  // if that happens, we want to send a 500 status and the message (only if dev)
  const error = req.statusCode === 200 ? 500 : res.statusCode;
  res.status(error);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
