'use client';

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Input,
	Button,
} from '@nextui-org/react';
import Link from 'next/link';
import * as actions from '@/actions';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import FormButton from '@/components/common/form-button';
import { IconBrandGithub } from '@tabler/icons-react';

export default function Login() {
	const [formState, action] = useFormState(actions.loginMethod, {
		errors: {},
	});
	const [errMessage, setErrMessage] = useState<any>();

	useEffect(() => {
		if (formState.success === false) {
			setErrMessage(formState.errors?._form);
		}
	}, [formState]);

	return (
		<div className="w-full flex justify-center">
			<Card className="flex flex-col p-5">
				<form action={action}>
					<CardHeader className="flex justify-center">
						<h2 className="font-bold">Login Form</h2>
					</CardHeader>
					<CardBody className="flex flex-col gap-4">
						<Input
							name="email"
							type="email"
							label="Email"
							isInvalid={!!formState.errors?.email}
							errorMessage={formState.errors?.email?.join(', ')}
						/>
						<Input
							name="password"
							type="password"
							label="Password"
							isInvalid={!!formState.errors?.password}
							errorMessage={formState.errors?.password?.join(', ')}
						/>
						<FormButton>Login</FormButton>
					</CardBody>
					<div className="flex flex-col justify-center items-center">
						<span className="text-xl font-bold">OR</span>
					</div>

					{formState.success === false ? (
						<CardFooter className="flex justify-center text-sm">
							<span className="text-white bg-red-500 p-2 rounded">
								Error: {errMessage}
							</span>
						</CardFooter>
					) : null}
				</form>
				<CardBody className="flex justify-center text-sm ">
					<form action={actions.signIn}>
						<Button
							type="submit"
							className="bg-black text-white w-full"
							endContent={<IconBrandGithub />}
						>
							Sign In with GitHub
						</Button>
					</form>
				</CardBody>
				<CardFooter className="flex justify-center text-sm">
					<span>
						Dont have an account, <Link href={'/signup'}>Signup here</Link>
					</span>
				</CardFooter>
			</Card>
		</div>
	);
}
