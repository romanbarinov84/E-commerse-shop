import type { Products } from "@/types/products";

   export async function getProducts():Promise<Products[]>{
    const response = await fetch('/api/products');
        if(!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        return data
 }
