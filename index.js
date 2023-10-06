// * working -

// * when a client has successfully logged in, the server will create a session and store it.
// * the server then responds with a cookie that contains the session unique id.
// * for any subsequent request, the client needs to include the cookie in the header.
// * the server then looks at the session id and looks up the saved session data from a db or memory
// * and gets all relevent information from the db.

import express from "express";
import session from "express-session";
import HomeHandler from "./handlers/home.js";
import LoginHandler from "./handlers/login.js";
import ProcessLoginHandler from "./handlers/process-login.js";
import LogoutHandler from "./handlers/logout.js";

const app = express();

// app.use is used for middlewares in express
app.use(express.json());

app.use(
  session({
    secret: "secretkey!",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
    // session data should be saved to the session store even if
    // the session data has not been modified during the request.
    resave: true,
    // whether a session should be created even if it hasn't been
    // initialized (i.e., no data has been added to it).
    saveUninitialized: false,
  })
);

// used for form data in request body. it sets form label as key and value as
// value. extended allows for nested  object
app.use(express.urlencoded({ extended: true }));

app.get("/", HomeHandler);
app.get("/login", LoginHandler);
// ! ProcessLoginHandler sets userid when credentials are correct
// ! which is then used in other handlers
app.post("/process-login", ProcessLoginHandler);
app.get("/logout", LogoutHandler);

app.listen(3000, () => {
  console.log(`Server Running at port 3000`);
});


// ! count page views using session even after browser is closed
// app.get("/", function (req, res) {
// req.session is specific to each user and is stored on the server, typically in memory or in a database.
// the data stored in req.session is accessible only to the user associated with that session.
//   if (req.session.page_views) {
//     req.session.page_views++;
//     res.send("You visited this page " + req.session.page_views + " times");
//   } else {
//     req.session.page_views = 1;
//     res.send("Welcome to this page for the first time!");
//   }
// });

// used for form inputs. it converts the incoming form data and converts them
// to js object with key-value pairs and populates req.body with it.
// extended: true means nested objects are allowed.
