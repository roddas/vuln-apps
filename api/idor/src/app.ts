import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  STATUS,
  getUserByEmail,
  getUserById,
  getUserByToken,
  isLogged,
  login,
  logout,
} from "./helper";

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
      "POST /logout",
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
    data: getUserByEmail(email),
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

// Get the current user information
app.get("/user/:id", async (request: Request, response: Response) => {
  let statusCode = STATUS.UNAUTHORIZED;
  const authToken = request.get("Authorization")?.split(" ")[1];
  const { id } = request.params;

  if (authToken) {
    if (await isLogged(authToken)) {
      statusCode = STATUS.OK;
      response.status(statusCode).json({
        status: statusCode,
        message: await getUserById(id),
      });
      return;
    }
  }

  response.status(statusCode).json({
    status: statusCode,
    message: "Não autorizado, realize o login primeiro.",
  });
});

// Login
app.post("/login", async (request: Request, response: Response) => {
  const { email, password } = request.body;
  /* 
     SANITIZE THE INPUT FIRSTLY, but I won't do it for the sake of the example.
*/
  const user = await login(email, password);
  if (user !== null) {
    response.status(STATUS.OK).json({
      status: STATUS.OK,
      data: user,
      message: `Seja bem-vindo ao sistema ${user.name} ${user.lastName}`,
    });
    return;
  }
  response.status(STATUS.UNAUTHORIZED).json({
    status: STATUS.UNAUTHORIZED,
    message: "Usuário e/ou senha desconhecidos.",
  });
});

// Logout
app.post("/logout", async (request: Request, response: Response) => {
  let statusCode = STATUS.UNAUTHORIZED;
  const authToken = request.get("Authorization")?.split(" ")[1];

  if (authToken) {
    if (await isLogged(authToken)) {
      statusCode = STATUS.OK;
      logout(authToken);
      response.status(statusCode).json({
        status: statusCode,
        message: "Até mais.",
      });
      return;
    }
  }

  response.status(statusCode).json({
    status: statusCode,
    message: "Não autorizado, realize o login primeiro.",
  });
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`The server is running at ${PORT}`);
});
