import type { Products } from "@/types/products";

   export async function getProducts():Promise<Products[]>{
    const response = await fetch('/api/products');
        if(!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        return data
 }

 


   export async function createProduct(
         name: string,
         price: string,
         text: string,
     ): Promise<Response | undefined> {
         const productArray = {
             productName: name,
             price: price,
             text: text,
         };
 
         const response = await fetch('/api/products/', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(productArray),
         });
 
         if (response.status === 404) {
             return Response.json(
                 { message: 'Sorry , but create new product is failed' },
                 { status: 404 },
             );
         }
         if (!response.ok) throw new Error('Failed to fetch create new product');
 
         
     }