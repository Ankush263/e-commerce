'use client';

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Input,
	Button,
} from '@nextui-org/react';
import Link from 'next/link';
import { IconShoppingCart } from '@tabler/icons-react';
// import { cookies } from 'next/headers';
import * as actions from '@/actions';
import { useSession } from 'next-auth/react';

export default function Header() {
	const session = useSession();

	return (
		<Navbar className="shadow mb-6 flex">
			<NavbarBrand>
				<Link href={'/'} className="font-bold">
					E-commerce
				</Link>
				<button onClick={() => console.log(session)} className="font-bold">
					E-commerce
				</button>
			</NavbarBrand>

			<NavbarContent justify="center">
				<NavbarItem>
					<Input placeholder="Search products" />
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="center">
				<NavbarItem>
					<IconShoppingCart />
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="center">
				{/* <Link href={'/signup'} color="secondary">
					Sign Up / Sign In
				</Link> */}
				{!session.data?.user ? (
					<Link href={'/signup'} color="secondary">
						Sign Up / Sign In
					</Link>
				) : (
					<form action={actions.logoutMethod}>
						<Button variant="bordered" type="submit">
							Logout
						</Button>
					</form>
				)}
			</NavbarContent>
		</Navbar>
	);
}
