"use client";

import { useState } from "react";

const UpdateProductPage = () => {
    const [productId, setProductId] = useState<string>("");
    const [productTextUpdate, setProductTextUpdate] = useState<string>("");
    const [display, setDisplay] = useState(false);

    async function updateProduct(id: string, text: string) {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            if (!response.ok)
                throw new Error(
                    "An error occurred while trying to update the text"
                );

            if (response) {
                setProductId("");
                setProductTextUpdate("");
                setDisplay(true);
            }
        } catch {
            return Response.json(
                { message: "Server error" },
                { status: 500 }
            );
        }
    }

    return (
        <>
          <div className="mx-4 mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                {/* Header */}
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-5">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-800">
                        Update product
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Enter the product ID and the new text.
                    </p>
                </div>

                {/* Form */}
                <form
                    className="flex flex-col gap-5 p-6"
                    onSubmit={(event) => {
                        event.preventDefault();
                        updateProduct(productId, productTextUpdate);
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="productId"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Product ID
                        </label>
                        <input
                            id="productId"
                            value={productId}
                            onChange={(event) =>
                                setProductId(event.target.value)
                            }
                            type="text"
                            placeholder="Enter product ID"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="productText"
                            className="text-sm font-semibold text-gray-700"
                        >
                            New product text
                        </label>
                        <input
                            id="productText"
                            value={productTextUpdate}
                            onChange={(event) =>
                                setProductTextUpdate(event.target.value)
                            }
                            type="text"
                            placeholder="Enter new text"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Update product
                    </button>

                    {display && (
                        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                            Product updated successfully!
                        </p>
                    )}
                </form>
            </div>
        </div>
        </>
      
    );
};

export default UpdateProductPage;