import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3333;

app.use(express.json());

const prisma = new PrismaClient();

// Index route
app.get("/", (request: Request, response: Response) => {
    response.json({
        message: "Seja bem-vindo a aplicação vulnerável a IDOR.",
        status: 200,
        routeList: [
            "POST /user",
            "DELETE /user/:id",
            "GET /users",
            "GET /user/:id",
            "PUT /user/:id",
        ],
    });
});

// List all users
app.post("/user", async (request: Request, response: Response) => {

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
            name
        }
    });
    response.status(201).json({
        message: "Usuário criado com sucesso.",
        status: 201,
        data: user
    });
});

// List all users
app.get("/users", async (request: Request, response: Response) => {
    response.status(200).json({
        message: "Lista de todos os usuários cadastrados",
        status: 200,
        data: await prisma.user.findMany({
            select: {
                name: true,
                lastName: true,
            },
        }),
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`The server is running at ${PORT}`);
});
