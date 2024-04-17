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
import { useFormState } from 'react-dom';
import * as actions from '@/actions/index';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignUp() {
	const [formState, action] = useFormState(actions.signupMethod, {});
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
						<h2 className="font-bold">Sign Up Form</h2>
					</CardHeader>
					<CardBody className="flex flex-col gap-4">
						<div className="flex gap-4">
							<Input name="firstName" label="First Name" />
							<Input name="lastName" label="Last Name" />
						</div>
						<Input name="email" type="email" label="Email" />
						<Input name="password" type="password" label="Password" />
						<Button type="submit" variant="solid" color="primary">
							Sign Up
						</Button>
					</CardBody>
					<CardFooter className="flex justify-center text-sm">
						<span>
							Already have an account, <Link href={'/login'}>Login here</Link>
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
