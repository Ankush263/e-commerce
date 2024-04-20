import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './lib/db';
import Github from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
	throw new Error('Missing github oauth crefentials');
}

let currentRole = 'consumer';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	providers: [
		Github({
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
			profile(profile): any {
				const [firstName, lastName] = profile.name!.split(' ');
				const role = currentRole === 'admin' ? 'admin' : 'consumer';

				return {
					id: profile.id,
					firstName: firstName,
					lastName: lastName,
					email: profile.email,
					image: profile.avatar_url,
					password: profile.password,
					role: role,
				};
			},
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				firstName: {},
				lastName: {},
				email: {},
				password: {},
			},
			async authorize(credentials, req) {
				const response = await fetch(
					'http://localhost:8000/api/v1/auth/signup',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							firstName: credentials.firstName,
							lastName: credentials.lastName,
							email: credentials.email,
							password: credentials.password,
						}),
					}
				);
				const user = await response.json();

				if (response.ok && user.email) {
					return {
						email: user.email,
					};
				}
				return null;
			},
		}),
	],
	callbacks: {
		// Usually not needed, here we are fixing a bug in nextauth
		async session({ session, user }: any) {
			if (session && user) {
				session.user.id = user.id;
			}

			return session;
		},

		async redirect() {
			return '/';
		},

		jwt: async ({ session, user, token }) => {
			if (user) {
				token.email = user.email;
				token.id = user.id;
			}

			return token;
		},
	},
});

export const updateRole = (newRole: string) => {
	currentRole = newRole;
};
