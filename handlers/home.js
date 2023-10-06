const HomeHandler = (req, res) => {
  // checks if this particular session has userid property
  if (!req.session.userid) {
    return res.redirect("/login");
  }
  // set header for response
  res.setHeader("Content-Type", "text/HTML");
  res.write(`
    <h1>Welcome back ${req.session.userid}</h1>
    <a href="/logout">Logout</a>
  `);

  res.end();
};

export default HomeHandler;
