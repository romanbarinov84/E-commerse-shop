"use client"

import { useEffect, useState } from "react";


type Product = {
  id:string,
  text:string
}



export default function Home() {

  const [comment , setComment] = useState<Product[]>([]);

 

  useEffect(() => {
  async function loadComments() {
    const res = await fetch("/products")
    const data = await res.json()

    setComment(data)
  }

  loadComments()
}, [])

  return (
 <h2 className="text-2xl font-bold text-red-400">
  <ul className="mb-6">
    {comment.map((comment) => (
      <li key={comment.id} className="mb-3 p-2 border rounded-sm">
        <span className="text-blue-300">{comment.text}</span>
      </li>
    ))}
  </ul>
 </h2>
  );
}
