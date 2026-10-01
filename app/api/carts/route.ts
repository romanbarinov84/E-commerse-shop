export async function GET(request:Request) {
     const url = new URL(request.url)
     console.log(url);
     console.log(url.hostname);
     console.log(url.host);
     console.log(url.search);
      console.log(url.searchParams);
      console.log(url.searchParams.get("limit"));
      console.log(url.searchParams.get("page"));
      
    
     
     
     
     
    
    
    const response = await fetch(
        'https://67d67177286fdac89bc1ec9d.mockapi.io/Carts',
    );

    const data = await response.json();

    return Response.json(data);
}
