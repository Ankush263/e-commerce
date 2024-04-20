'use server';

import { signup } from '@/app/api';
import { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import * as auth from '@/auth';

interface SignUpFormState {
	errors?: {
		firstName?: string[];
		lastName?: string[];
		email?: string[];
		password?: string[];
		_form?: string[];
	};
	success?: boolean;
	data?: string;
}

const SignupSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: 'firstName must be at least 2 characters long.' })
		.trim(),
	lastName: z
		.string()
		.min(2, { message: 'lastName must be at least 2 characters long.' })
		.trim(),
	email: z.string().email({ message: 'Please enter the valid email' }).trim(),
	password: z
		.string()
		.min(6, { message: 'Password must be atleast 6 characters long' })
		.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
		.regex(/[0-9]/, { message: 'Contain at least one number.' })
		.trim(),
});

export async function signupMethod(
	formState: SignUpFormState,
	formData: FormData
): Promise<SignUpFormState> {
	const validatedFields = SignupSchema.safeParse({
		firstName: formData.get('firstName'),
		lastName: formData.get('lastName'),
		email: formData.get('email'),
		password: formData.get('password'),
	});

	if (!validatedFields.success) {
		console.log('error: ', validatedFields.error.flatten().fieldErrors);
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	let user: AxiosResponse;

	try {
		// user = await signup({
		// 	firstName: validatedFields.data.firstName,
		// 	lastName: validatedFields.data.lastName,
		// 	email: validatedFields.data.email,
		// 	password: validatedFields.data.password,
		// });
		await auth.signIn('credentials', {
			firstName: validatedFields.data.firstName,
			lastName: validatedFields.data.lastName,
			email: validatedFields.data.email,
			password: validatedFields.data.password,
			redirect: false,
		});
		// const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		// cookies().set('Token', user?.data?.token as string, {
		// 	httpOnly: true,
		// 	secure: true,
		// 	expires: expiresAt,
		// 	sameSite: 'lax',
		// 	path: '/',
		// });
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
	return auth.signIn('github');
}
