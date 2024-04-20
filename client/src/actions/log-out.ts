'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutMethod() {
	cookies().delete('Token');
	redirect('/');
}
