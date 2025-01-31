exports.home = async (req, res, next) => {
  try {
    return res.render("home/home");
  } catch (err) {
    next(err);
  }
};
