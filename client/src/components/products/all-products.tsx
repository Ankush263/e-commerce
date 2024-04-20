import { Card } from '@nextui-org/react';
import { getAllProducts } from '@/db/queries/products';

export default async function GatAllProducts() {
	const products = await getAllProducts();
	const res = await products.json();

	return <div>{JSON.stringify(res.data.data)}</div>;
}
