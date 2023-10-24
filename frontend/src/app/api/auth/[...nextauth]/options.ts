// import { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { any } from "zod";

// export const options: NextAuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Username: ",
//           type: "text",
//           placeholder: "your-cool-username",
//         },
//         password: {
//           label: "Password: ",
//           type: "password",
//           placeholder: "your password",
//         },
//       },
//       authorize: async function (credentials) {
//         const username = credentials?.username ?? "";
//         const password = credentials?.password ?? "";
//         const token = await login(username, password);
//         if (token) {
//           // Any object returned will be saved in `user` property of the JWT
//           return token;
//         } else {
//           // If you return null then an error will be displayed advising the user to check their details.
//           return null;

//           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "auth/login",
//   },
// };

// const login = async (userName: string, password: string) => {
//   console.log(userName);
//   console.log(password);

//   const baseUrl = "http://localhost:4000"; // Add the protocol before localhost

//   const params = {
//     username: userName,
//     password: password,
//   };

//   try {
//     const response = await fetch(`${baseUrl}/auth/signin`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(params),
//     });

//     const data = await response.json();
//     console.log(data);

//     if (typeof window !== "undefined") {
//       // Code that uses localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//     }

//     return data;
//   } catch (error: any) {
//     console.log(error);
//     if (error.response) {
//       console.log(error.response);
//     } else {
//       console.log("Network error or no response from the server.");
//     }
//     return null;
//   }
// };

import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Backend_URL } from "@/lib/Constants";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const res = await login(credentials.email, credentials.password);
        if (res.status === "ok") {
          console.log(res);
          return res.token;
        } else if (res.status === "error") {
          console.log(res);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {},
};

const login = async (email: string, password: string) => {
  console.log("email: " + email);
  console.log("password: " + password);
  try {
    const response = await fetch(`${Backend_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    if (data.statusCode >= 400) {
      return { status: "error", msg: data.message[0] };
    }
    return { status: "ok", token: data.access_token };
  } catch (error: any) {
    return { status: "error", msg: error.message };
  }
};
