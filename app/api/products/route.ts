

export async function GET(){

    

     try {
        const response = await fetch(`${process.env.MOCK_API_URL}`);
         if(response.status === 404) {
        return Response.json({message:"Products not found"},{status: 404})
     }
     if(!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      return Response.json(data)
     } catch {
        return Response.json({message:"Server error"},{status:500})
     }
    

}