'use server';

import { login } from '@/app/api';
import { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import * as auth from '@/auth';
import { updateRole } from '@/auth';

interface LoginFormState {
	errors?: {
		email?: string[];
		password?: string[];
		_form?: string[];
	};
	success?: boolean;
	data?: string;
}

const LoginSchema = z.object({
	email: z.string().email({ message: 'Please enter the valid email' }).trim(),
	password: z.string().trim(),
});

export async function loginMethod(
	formState: LoginFormState,
	formData: FormData
): Promise<LoginFormState> {
	const validatedFields = LoginSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	let user: AxiosResponse;

	try {
		user = await login({
			email: validatedFields.data.email,
			password: validatedFields.data.password,
		});
		const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		cookies().set('Token', user?.data?.token as string, {
			httpOnly: true,
			secure: true,
			expires: expiresAt,
			sameSite: 'lax',
			path: '/',
		});
	} catch (error: any) {
		return {
			success: false,
			errors: {
				_form: error?.response?.data?.message,
			},
		};
	}

	redirect('/');
}

export async function signIn() {
	updateRole('consumer');
	return auth.signIn('github');
}

export async function signInAsAdmin() {
	updateRole('admin');
	return auth.signIn('github');
}
