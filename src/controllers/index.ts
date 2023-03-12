const path = require("path");
// Define middleware to serve the HOME view

const homeApi = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Cookbook API</title>
    </head>
    <body style="font-family: sans-serif; background-color: #f0f0f0">
      <h1 style="color: #333; text-align: center">Cookbook API</h1>
      <a
        href="/graphql"
        style="
          display: block;
          margin: 0 auto;
          max-width: fit-content;
          text-align: center;
          background-color: #333;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
        "
        >See the Graphql Playground</a
      >
    </body>
  </html>

`;

const serveHome = (req, res) => {
  res.send(homeApi);
};

export default serveHome;
