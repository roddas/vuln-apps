import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { STATUS } from "./helper";

const app = express();
const PORT = 3333;

app.use(express.json());

const prisma = new PrismaClient();

// Index route
app.get("/", (request: Request, response: Response) => {
  let statusCode = STATUS.OK;

  response.json({
    message: "Seja bem-vindo a aplicação vulnerável a IDOR.",
    status: statusCode,
    routeList: [
      "GET /users",
      "GET /user/:id",
      "POST /user",
      "DELETE /user/:id",
      "PUT /user/:id",
      "POST /login",
    ],
  });
});

// List all users
app.post("/user", async (request: Request, response: Response) => {
  let statusCode = STATUS.CREATED;

  const { email, name, lastName, password } = request.body;
  /*
    After receive the body data, you need to sanitize  and validate it before insert into the database,
    but I won't do it for the sake of the purpose of the presentation.
    */
  const user = await prisma.user.create({
    data: {
      email,
      lastName,
      password: await bcrypt.hash(password, 10),
      name,
    },
  });
  response.status(statusCode).json({
    message: "Usuário criado com sucesso.",
    status: statusCode,
    data: user,
  });
});

// List all users
app.get("/users", async (request: Request, response: Response) => {
  let statusCode = STATUS.OK;

  response.status(statusCode).json({
    message: "Lista de todos os usuários cadastrados",
    status: statusCode,
    data: await prisma.user.findMany({
      select: {
        name: true,
        lastName: true,
      },
    }),
  });
});

// List all users
app.post("/login", async (request: Request, response: Response) => {
  let statusCode = STATUS.CREATED;

  const { email, password } = request.body;
  /*
    After receive the body data, you need to sanitize  and validate it before insert into the database,
    but I won't do it for the sake of the purpose of the presentation.
    */
  response.json({ email, password });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`The server is running at ${PORT}`);
});
