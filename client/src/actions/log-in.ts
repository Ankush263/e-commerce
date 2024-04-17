'use server';

import { login } from '@/app/api';
import { AxiosResponse } from 'axios';

interface LoginFormState {
	errors?: {
		message: string;
	};
	success?: boolean;
	data?: string;
}

export async function loginMethod(
	formState: LoginFormState,
	formData: FormData
): Promise<LoginFormState> {
	const email = formData.get('email');
	const password = formData.get('password');

	if (typeof email !== 'string' || typeof password !== 'string') {
		return {
			errors: {
				message: 'Form inputs are invalid',
			},
		};
	}

	let user: AxiosResponse;

	try {
		user = await login({ email, password });
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
