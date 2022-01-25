import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    // https://next-auth.js.org/configuration/providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      })
    ],
    secret: process.env.SECRET,
    session: {
      strategy: "jwt",
    },
    theme: {
      colorScheme: "light",
    },
    callbacks: {
      redirect({ url, baseUrl }) {
        if (url.startsWith(baseUrl)) return url
        else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
        return baseUrl
      }
    },
})