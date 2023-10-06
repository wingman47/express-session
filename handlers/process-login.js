const ProcessLoginHandler = (req, res) => {
  if (req.body.username !== "admin" || req.body.password !== "admin") {
    res.redirect("/");
  }
  // ! ProcessLoginHandler sets userid when credentials are correct
  // ! which is then used in other handlers
  req.session.userid = req.body.username;
  res.redirect("/");
};

export default ProcessLoginHandler;
