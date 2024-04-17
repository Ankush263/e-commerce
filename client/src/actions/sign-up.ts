'use server';

import { signup } from '@/app/api';
import { AxiosResponse } from 'axios';

interface SignUpFormState {
	errors?: {
		message: string;
	};
	success?: boolean;
	data?: string;
}

export async function signupMethod(
	formState: SignUpFormState,
	formData: FormData
): Promise<SignUpFormState> {
	const firstName = formData.get('firstName');
	const lastName = formData.get('lastName');
	const email = formData.get('email');
	const password = formData.get('password');

	if (
		typeof firstName !== 'string' ||
		typeof lastName !== 'string' ||
		typeof email !== 'string' ||
		typeof password !== 'string'
	) {
		return {
			errors: {
				message: 'Form inputs are invalid',
			},
		};
	}

	let user: AxiosResponse;

	try {
		user = await signup({ firstName, lastName, email, password });
	} catch (error: any) {
		return {
			success: false,
			errors: {
				message: error.response.data.message,
			},
		};
	}

	return {
		success: true,
		data: user.data.token,
	};
}
