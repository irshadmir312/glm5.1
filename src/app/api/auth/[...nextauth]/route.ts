import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Simple in-memory user store for demo authentication (works on Vercel)
const users = new Map<string, { id: string; name: string; email: string }>()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Demo Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Demo authentication: just check non-empty fields
        try {
          let user = users.get(credentials.email)

          if (!user) {
            // Create new user if doesn't exist (in-memory)
            user = {
              id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
              name: credentials.email.split('@')[0],
              email: credentials.email,
            }
            users.set(credentials.email, user)
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'irshad-portfolio-secret-key-2026',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
