'use client';

import { createProduct, getProducts } from '@/lib/api/products';

import type { Products } from '@/types/products';

import { useEffect, useState } from 'react';

import ProductIdsPage from './productsId/page';
import ProductSearchPage from './productsParams/page';

const ProductsPage = () => {
    const [products, setProducts] = useState<Products[]>([]);
    const [productCategory , setProductCategory] = useState("");
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState<string>('');
    const [newProductText, setNewProductText] = useState('');

    function rebuild() {
        getProducts().then((data) => {
            setProducts(data);
        });
    }

    useEffect(() => {
        rebuild();
    }, []);

    return (
        <>
            {/* Products header */}
            <div className="mx-4 mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between px-6 py-5">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-800">
                            Products
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage your products and prices
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                        {products.length} products
                    </div>
                </div>
            </div>

            {/* Products table */}
            <div className="mx-4 mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                {/* Table header */}
                <div className="grid grid-cols-[1fr_180px_180px_180px] gap-4 border-b border-gray-200 bg-gray-50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <span className='text-xl text-red-300 font-bold'>Category</span>
                    <span>Description</span>
                    <span>Price</span>
                    <span>Product</span>
                    
                </div>

                <ul>
                    {products.map((product) => (
                        <li
                            key={product.id}
                            className="grid grid-cols-[1fr_180px_180px_180px] items-center gap-4 border-b border-gray-100 px-6 py-4 text-sm transition-colors last:border-b-0 hover:bg-gray-50"
                        >
                            <span className=" text-xl font-medium text-green-500">
                                {product.category}
                            </span>
                            <span className="text-gray-600">
                                {product.text}
                            </span>

                            <span className="font-semibold text-gray-800">
                                {product.price}
                            </span>

                            <span className="font-medium text-gray-700">
                                {product.productName}
                            </span>
                            
                        </li>
                    ))}
                </ul>
            </div>

            <ProductIdsPage />
            <ProductSearchPage />

            {/* Create product header */}
            <div className="mx-4 mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="px-6 py-5">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-800">
                        Create product
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Add a new product to your catalog
                    </p>
                </div>
            </div>

            {/* Create product form */}
            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    createProduct(
                        newProductName,
                        newProductPrice,
                        newProductText,
                        productCategory,
                    )
                        .then(() => {
                            setNewProductName('');
                            setNewProductPrice('');
                            setNewProductText('');
                            setProductCategory("")
                            rebuild();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}
                className="mx-4 mt-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
                <div className="grid gap-5 md:grid-cols-3">
                    {/* Product name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Product name
                        </label>

                        <input
                            type="text"
                            value={newProductName}
                            onChange={(e) =>
                                setNewProductName(e.target.value)
                            }
                            placeholder="Enter product name"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Price
                        </label>

                        <input
                            type="text"
                            value={newProductPrice}
                            onChange={(e) =>
                                setNewProductPrice(e.target.value)
                            }
                            placeholder="Enter price"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Description
                        </label>

                        <input
                            type="text"
                            value={newProductText}
                            onChange={(e) =>
                                setNewProductText(e.target.value)
                            }
                            placeholder="Enter description"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                        <input
                            type="text"
                            value={productCategory}
                            onChange={(e) =>
                                setProductCategory(e.target.value)
                            }
                            placeholder="Enter category"
                            className="w-full rounded-lg mt-4 border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
                    >
                        Add product
                    </button>
                </div>
            </form>
        </>
    );
};

export default ProductsPage;