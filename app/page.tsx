'use client';

import {  useEffect, useState } from 'react';

type Product = {
    id: string;
    text: string;
    productName:string;
    price:number;
    category:string;
};

export default function Home() {
    const [carts, setCarts] = useState<Product[]>([]);

    async function loadCarts() {
        const response = await fetch('/api/test');
        const data = await response.json();
         setCarts(data)
    }

    useEffect(() => {
        const result = () => loadCarts();
        result()
    },[])

   

    return (
        <>
            <div className='text-center'>
                <h2 className='text-2xl text-green-500 font-bold'>Carts</h2>
                 </div>
                <ul className='m-3 gap-3 flex-1'>
                    {carts.map((cart) => (
                        <li key={cart.id} className='px-5 py-2 border-2 mb-2 border-gray-300 bg-orange-300 flex justify-between gap-5 '>
                            <span className='border-2 p-2 border-black mr-3 bg-red-300'>{cart.id}</span>
                            <span className='text-xl text-white font-bold mr-2'>{cart.productName}</span>
                            <span className='text-2xl text-red-600 font-extrabold'>{cart.price}.uah</span>
                            <span className='text-2xl text-blue-300 font-extrabold'>{cart.category}.uah</span>
                            {cart.text}</li>

                    ))}
                </ul>
           
        </>
    );
}
