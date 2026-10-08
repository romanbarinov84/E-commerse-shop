import type { Products } from '@/types/products';

export async function getProducts(): Promise<Products[]> {

    const response =  await fetch('/api/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data;
}

export async function createProduct(name: string, price: string, text: string, category:string) {
    const productArray = {
        productName: name,
        price: price,
        text: text,
        category:category,
    };


    const response = await fetch('/api/products/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productArray),
    });

    if (response.status === 404) {
        throw new Error("create new products is not possible")
    }
    if (!response.ok) throw new Error('Failed to fetch create new product');

    const data = await response.json();
    return data;
}
