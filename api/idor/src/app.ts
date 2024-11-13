import express, { NextFunction, Request, Response } from "express";

const app = express();
const PORT = 3333;

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.json({
    message: "Seja bem-vindo a aplicação vulnerável a IDOR.",
    routeList: ["POST /user", "DELETE /user/:id", "GET /user/:id","PUT /user/:id"],
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`The server is running at ${PORT}`);
});
