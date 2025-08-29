const adminAuth = (req, res, next) => {
  console.log("Admin is get authorized");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.send("Unauthorized access");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  console.log("User is get authorized");
  const token = "xyzsdfojosd";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.send("Unauthorized access");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth
};
