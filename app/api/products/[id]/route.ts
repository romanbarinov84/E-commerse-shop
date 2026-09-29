import { api_url } from '../route';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    try {
        const response = await fetch(`${api_url}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product id');
        const productsId = await response.json();
        return Response.json(productsId);
    } catch {
        return new Response(null, { status: 404 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const { text } = await request.json();

    try {
        const response = await fetch(`${api_url}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        if (!response.ok) throw new Error('Update text failed');
        return Response.json(await response.json());
    } catch (error) {}
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    try {
        const response = await fetch(`${api_url}/${id}`, {
            method:"DELETE",
            
        })
        if(!response.ok) throw new Error("Failed to delete");
        return new Response(null , {status:201});
    } catch {
        return new Response(null , {status:500})
    }
}
