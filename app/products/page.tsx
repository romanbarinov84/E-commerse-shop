'use client';

import { createProduct, getProducts } from '@/lib/api/products';
import type { Products } from '@/types/products';
import { useEffect, useState } from 'react';

const ProductsPage = () => {
    const [products, setProducts] = useState<Products[]>([]);
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
            <div className="mt-5 mx-3 p-2 border-2 border-gray-300 rounded-sm ">
                <h2 className="text-2xl text-green-500 font-bold">
                    Products table
                </h2>
            </div>
            <ul className=" m-3  px-2 py-4  border-2 border-gray-300 rounded-sm ">
                {products.map((product) => (
                    <li
                        key={product.id}
                        className="border-2 border-black bg-orange-400 px-5 py-2 flex justify-between items-center text-center"
                    >
                        {product.text}
                        <span className="bg-orange-300 border-2 border-red-300">
                            {product.price}
                        </span>
                        <span className="bg-green-300 border-2 border-gray-300">
                            {product.productName}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-5 mx-3 p-2 border-2 border-gray-300 rounded-sm ">
                <h2 className="text-2xl text-green-500 font-bold">
                    Create products
                </h2>
            </div>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    createProduct(
                        newProductName,
                        newProductPrice,
                        newProductText,
                    ).then(() => {
                        setNewProductName('');
                        setNewProductPrice('');
                        setNewProductText('');
                        rebuild();
                    }).catch((error) => {
                       console.log(error);
                       
                    });
                }}
                className="m-3 px-3 py-5 border-2 border-gray-500 rounded-sm bg-orange-200"
            >
                <input
                    type="text"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="Название продукта"
                    className="border p-2 flex-1 mr-2 bg-white rounded-sm focus:outline-2 focus:outline-neutral-200  focus:bg-blue-200 text-gray-500"
                />
                <input
                    type="text"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    placeholder="Цена"
                    className="border p-2 flex-1 mr-2 bg-white rounded-sm focus:outline-2 focus:outline-neutral-200  focus:bg-blue-200 text-gray-500"
                />
                <input
                    type="text"
                    value={newProductText}
                    onChange={(e) => setNewProductText(e.target.value)}
                    placeholder="Описание товара"
                    className="border p-2 flex-1 mr-2  bg-white rounded-sm focus:outline-2 focus:outline-neutral-200  focus:bg-blue-200 text-gray-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Добавить комментарий
                </button>
            </form>
        </>
    );
};

export default ProductsPage;
