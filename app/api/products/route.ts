
export const api_url = "https://67d67177286fdac89bc1ec9d.mockapi.io/Carts"


export async function GET(){
   
    try {
        const response = await fetch(api_url);
        if(!response.ok){
            throw new Error("Failed to fetch products")
        }
        const products = await response.json();
        return Response.json(products)
    } catch  {
        new Response(null , {status:500})
    }
}


export async function POST(request:Request){
    try {
        const {text} = await request.json();
        const response = await fetch(api_url , 
            {method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({text})
            }
        )
        if(!response.ok) throw new Error("Failed to create comment");
        const newComment = await response.json();
        return new Response (JSON.stringify(newComment),{
             headers:{"Content-Type":"application/json"},
             status:201
            }
    )
        
    } catch {
        new Response(null , {status:400})
    }
}

