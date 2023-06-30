import http from "node:http";
import json from "./middlewares/json.js";
import { routes } from "./routes.js";
import extractQueryParams from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {
  await json(req, res);

  const route = routes.find(route => {
    return route.method == req.method && route.path.test(req.url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = { params };
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3000, () => {
  console.log("The server is running at http://www.localhost:3000");
});
