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
import { useFormState } from 'react-dom';
import * as actions from '@/actions/index';
import { useEffect, useState } from 'react';
import FormButton from '@/components/common/form-button';
import { IconBrandGithub } from '@tabler/icons-react';

export default function SignUp() {
	const [formState, action] = useFormState(actions.signupMethod, {});
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
						<h2 className="font-bold">Sign Up Form</h2>
					</CardHeader>
					<CardBody className="flex flex-col gap-4">
						<div className="flex gap-4">
							<Input
								name="firstName"
								label="First Name"
								isInvalid={!!formState.errors?.firstName}
								errorMessage={formState.errors?.firstName?.join(', ')}
							/>
							<Input
								name="lastName"
								label="Last Name"
								isInvalid={!!formState.errors?.lastName}
								errorMessage={formState.errors?.lastName?.join(', ')}
							/>
						</div>
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
						<FormButton>Sign Up</FormButton>
					</CardBody>

					{formState.success === false ? (
						<CardFooter className="flex justify-center text-sm">
							<span className="text-white bg-red-500 p-2 rounded">
								Error: {errMessage}
							</span>
						</CardFooter>
					) : null}
				</form>

				<div className="flex flex-col justify-center items-center">
					<span className="text-xl font-bold">OR</span>
				</div>

				<CardBody className="flex justify-center text-sm">
					<form action={actions.signIn}>
						<Button
							type="submit"
							className="bg-black text-white w-full"
							endContent={<IconBrandGithub />}
						>
							Sign Up with GitHub as Consumer
						</Button>
					</form>
				</CardBody>
				<div className="flex flex-col justify-center items-center">
					<span className="text-xl font-bold">OR</span>
				</div>

				<CardBody className="flex justify-center text-sm">
					<form action={actions.signInAsAdmin}>
						<Button
							type="submit"
							className="bg-black text-white w-full"
							endContent={<IconBrandGithub />}
						>
							Sign Up with GitHub as Admin
						</Button>
					</form>
				</CardBody>

				<CardFooter className="flex justify-center text-sm">
					<span>
						Already have an account, <Link href={'/login'}>Login here</Link>
					</span>
				</CardFooter>
			</Card>
		</div>
	);
}
