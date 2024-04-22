module.exports = {
  getLogin: (req, res) => {
    res.render("login");
  },

  getHome: async (req, res) => {
    try {
      res.render("index", {
        name: req.user.firstName,
      });
    } catch (err) {
      console.error("homepage error", err);
      res.render("error/500");
    }
  },
};
