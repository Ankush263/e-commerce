'use client';

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
	Input,
} from '@nextui-org/react';
import Link from 'next/link';
import * as actions from '@/actions';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function Login() {
	const [formState, action] = useFormState(actions.loginMethod, {});
	const [errMessage, setErrMessage] = useState('');

	useEffect(() => {
		if (formState.success === true) {
			localStorage.setItem('Token', formState?.data as string);
			redirect('/');
		} else if (formState.success === false) {
			setErrMessage(formState.errors?.message as string);
		}
	}, [formState]);

	return (
		<div className="w-full flex justify-center">
			<form action={action}>
				<Card className="flex flex-col p-5">
					<CardHeader className="flex justify-center">
						<h2 className="font-bold">Login Form</h2>
					</CardHeader>
					<CardBody className="flex flex-col gap-4">
						<Input name="email" type="email" label="Email" />
						<Input name="password" type="password" label="Password" />
						<Button type="submit" variant="solid" color="primary">
							Login
						</Button>
					</CardBody>
					<CardFooter className="flex justify-center text-sm">
						<span>
							Dont have an account, <Link href={'/signup'}>Signup here</Link>
						</span>
					</CardFooter>
					{formState.success === false ? (
						<CardFooter className="flex justify-center text-sm">
							<span className="text-white bg-red-500 p-2 rounded">
								Error: {errMessage}
							</span>
						</CardFooter>
					) : null}
				</Card>
			</form>
		</div>
	);
}
