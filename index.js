import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();
server.use((req, res, next) => {
  // res.setHeader(
  //   "Access-Control-Allow-Origin",
  //   "https://main--floristeria-valencia.netlify.app"
  // );
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  // );
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  // );
  // res.setHeader("Access-Control-Allow-Credentials", true);
  // res.setHeader("Access-Control-Allow-Private-Network", true);
  // //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  // res.setHeader("Access-Control-Max-Age", 7200);

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')

  next();
})

const router = jsonServer.router('./data/db.json');
server.use('/api', router);
server.db = router.db

const middlewares = jsonServer.defaults()
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  orders: 660,
  users: 600
});

server.use(rules)
server.use(auth)
server.use(middlewares)
server.use(router)

server.listen(8000);
