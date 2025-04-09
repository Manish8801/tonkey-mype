const asyncRouteHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncRouteHandler;

// returns a function that takes three arguments
// req, res and next
// try the async route handler
// and execute it in a promise
// if errors occurs, execute the next middleware
// which will be error handler middleware for unknown errors
// if not then all good
