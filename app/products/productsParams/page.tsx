

'use client';

import { Products } from '@/types/products';
import { useState } from 'react';

function ProductSearchPage() {
    const [productsParams, setProductsParams] = useState<Products[]>([]);
    const [params, setParams] = useState('');

    async function findParams(params:string) {
        const response =  await fetch(`/api/products?category=${params}`)
         if (!response.ok) {
        alert("Product with this ID was not found");
        return;
    }
        const data = await response.json();
        
        setParams("")
        setProductsParams(data);
    }

    return (
        <div className="mx-4 mt-8">
            {/* Header */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="px-6 py-5">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-800">
                        Find product :
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Search for a product by its Category
                    </p>
               
                {productsParams.map((product) => (
                    <div key={product.id} className='border-2 border-gray-400 p-3 rounded-sm mt-2'>
                        <p className="mt-1 text-sm text-gray-500">{product.productName}</p>
                        <p className="mt-1 text-sm text-gray-500">{product.price}</p>
                        <p className="mt-1 text-sm text-gray-500">{product.text}</p>
                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    </div>
                ))}
 </div>
                {/* Search block */}
                <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            findParams(params);
                        }}
                        className="flex flex-col gap-3 sm:flex-row"
                    >
                        <input
                            value={params}
                            onChange={(e) => setParams(e.target.value)}
                            type="text"
                            placeholder="Enter product Category"
                            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
                        >
                            Find product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductSearchPage;
