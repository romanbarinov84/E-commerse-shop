export async function GET(request:Request) {

     const url = new URL(request.url);
     const category = url.searchParams.get("category")
    try {
         const response = category ? await fetch(`${process.env.MOCK_API_URL}?category=${category}`) : 
          await fetch(`${process.env.MOCK_API_URL}`) 
      
        if (response.status === 404) {
            return Response.json(
                { message: 'Products not found' },
                { status: 404 },
            );
        }
        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        return Response.json(data);
    } catch {
        return Response.json({ message: 'Server error' }, { status: 500 });
    }
}




export async function POST(request: Request) {
    try {
        const { id, price, text, productName, category } = await request.json();

        const response = await fetch(`${process.env.MOCK_API_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, price, text, productName, category }),
        });
        if (!response.ok) throw new Error('failed to create new product');
        const newProduct = await response.json();
        return new Response(JSON.stringify(newProduct), {
            headers: { 'Content-Type': 'application/json' },
            status: 201,
        });
    } catch {
        return new Response('Server Error', { status: 500 });
    }
}

