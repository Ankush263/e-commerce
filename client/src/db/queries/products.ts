const URL = 'http://localhost:8000/api/v1/product/';

export async function getAllProducts() {
	const product = await fetch(URL, { cache: 'force-cache' });

	// console.log('product: ', await product);
	// const res = await product;

	return product;
}
