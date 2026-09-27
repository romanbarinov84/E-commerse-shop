
const api_url = "https://67d67177286fdac89bc1ec9d.mockapi.io/Carts"


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

