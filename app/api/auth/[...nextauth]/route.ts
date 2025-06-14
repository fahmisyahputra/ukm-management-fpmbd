import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        const users = [
          {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin',
          },
          {
            id: '2',
            name: 'Manager User',
            email: 'manager@example.com',
            password: 'manager123',
            role: 'clubManager',
          },
          {
            id: '3',
            name: 'Student User',
            email: 'student@example.com',
            password: 'student123',
            role: 'student',
          },
        ];

        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        return user ?? null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user && 'role' in user) {
        token.role = (user as { role: string }).role;
      }
      return token;
    },
  },
};

// 👇 ekspor authOptions agar bisa diakses di halaman lain
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
