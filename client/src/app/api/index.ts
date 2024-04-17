'use server';

import axios from 'axios';

const URL = 'http://localhost:8000';

const AUTH_URL = `${URL}/api/v1/auth`;

const AUTH_API = axios.create({ baseURL: AUTH_URL });

export const signup = (details: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}) => AUTH_API.post('/signup', details);

export const login = (details: { email: string; password: string }) =>
	AUTH_API.post('/login', details);
