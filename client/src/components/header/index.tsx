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

export default function Header() {
	return (
		<Navbar className="shadow mb-6 flex">
			<NavbarBrand>
				<Link href={'/'} className="font-bold">
					E-commerce
				</Link>
			</NavbarBrand>

			<NavbarContent justify="center">
				<NavbarItem>
					<Input placeholder="Search products" />
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="center">
				<Link href={'/signup'} color="secondary">
					Sign Up / Sign In
				</Link>
			</NavbarContent>
		</Navbar>
	);
}
