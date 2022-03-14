// Error handling middleware

// 404 errors
function notFound (req, res, next) {
  const err = new Error('NOT FOUND');
  err.statusCode = 404;
  next(err);
}

// handles all error responses
function errHandling (err, req, res, next) {
  // if error statusCode not set: default is statusCode 500.
  err.statusCode = err.statusCode ? err.statusCode : 500;
  res.status(err.statusCode)
  .json({
    message: `${err.statusCode}: ${err.message}`,
    severity: 'error',
  });
}

module.exports.notFound = notFound;
module.exports.errHandling = errHandling;