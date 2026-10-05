"use client"

import { getProducts } from "@/lib/api/products";
import { useEffect, useState } from "react"


type Products = {
    productName:string;
    price:number;
    text:string;
    id:string;
    
    
    
}

 
const ProductsPage = () => {
    const [products , setProducts] = useState<Products[]>([]);




    async function loadProducts(){
       const data = await getProducts();
         setProducts(data)
        
    }

    useEffect(() => {
        const result = () => loadProducts()
        result()
    },[])


  return (
    <>
    <div className="text-2xl text-green-500 font-bold">Products</div>
     <ul className="flex-1  px-5 py-4  border-2 border-gray-300 rounded-sm ">
        {products.map((product) => (
            <li key={product.id} className="border-2 border-black bg-orange-400 px-5 py-2 flex justify-between items-center text-center">
                {product.text}
                 <span className="bg-orange-300 border-2 border-red-300">{product.price}</span>
                 <span className="bg-green-300 border-2 border-gray-300">{product.productName}</span>
                 </li>
        ))}
     </ul>
    </>
    
  )
}

export default ProductsPage