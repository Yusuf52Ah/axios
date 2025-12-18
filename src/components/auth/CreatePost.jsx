import { useState } from "react";
import { useCreateProduct } from "@/components/hooks/queries/product";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const { mutate, isLoading } = useCreateProduct();

  const submit = (e) => {
    e.preventDefault();
    mutate({
      title,
      price: Number(price),
      description: "New product",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"],
    });
    setTitle("");
    setPrice("");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded-xl shadow max-w-md mx-auto mt-10 space-y-4"
    >
      <h2 className="text-xl font-bold text-center">Add Product</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        className="w-full border p-2 rounded"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button
        className="w-full bg-black text-white py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
