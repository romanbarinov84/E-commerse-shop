"use client"

import { getProducts } from "@/lib/api/products";
import type { Products } from "@/types/products";
import { useEffect, useState } from "react"




 
const ProductsPage = () => {
    const [products , setProducts] = useState<Products[]>([]);




    

    useEffect(() => {
       getProducts().then((data) => {
        setProducts(data)
       })
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