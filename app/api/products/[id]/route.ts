
export async function GET(request:Request ,{params}:{params:Promise<{id:string}>}){

    const {id} = await params;

    try {
        const response = await fetch(`${process.env.MOCK_API_URL}/${id}`);
        if(response.status === 404) throw new Error("Failed to fetch product with ID");
        if(!response.ok) throw new Error("Failed to fetch  products an ID");

        const products = await response.json();
        return Response.json(products)
    } catch {
        return Response.json({ message: "Server error when trying to fetch product" }, {status:500})
    }
}