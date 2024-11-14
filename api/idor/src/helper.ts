import { PrismaClient, User } from "@prisma/client";
import { compareSync } from "bcrypt";
const { user } = new PrismaClient();

export const STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNPROCESSABLE_ENTITY: 422,
  UNAUTHORIZED: 401,
};

function toHex(str: string): string {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}

export function createLoginToken(email: string): string {
  return "idor_" + toHex(email + Date.now());
}

export async function login(
  email: string,
  password: string
): Promise<User | null> {
  let userData = await user.findFirst({ where: { email } });

  if (userData === null) {
    return null;
  }
  if ((await compareSync(password, userData.password)) === false) {
    return null;
  }
  const userToken = createLoginToken(email);
  userData = await user.update({
    data: {
      token: userToken,
    },
    where: {
      userId: userData.userId,
    },
  });

  return userData;
}

export async function isLogged(token: string): Promise<boolean> {
  const userData = await user.findFirst({
    where: {
      token,
    },
  });

  if (userData) {
    return true;
  }
  return false;
}

// It's vulnerable to IDOR
export async function logout(token: string): Promise<void> {
  const userData = await user.findFirst({
    where: {
      token,
    },
  });

  if (userData) {
    await user.update({
      data: {
        token: null,
      },
      where: {
        userId: userData.userId,
      },
    });
  }
}
