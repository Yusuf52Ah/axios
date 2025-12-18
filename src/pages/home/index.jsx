import { useState, useEffect } from "react";
import CreatePost from "@/components/auth/CreatePost";
import Modal from "@/components/ui/Modal";
import {
  useProducts,
  useUpdateProductPut,
  useDeleteProduct,
} from "@/components/hooks/queries/product";

export default function HomePage() {
  const { data, isLoading } = useProducts();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProductPut();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setPrice(editingProduct.price);
    }
  }, [editingProduct]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  const openModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProduct({
      id: editingProduct.id,
      data: { ...editingProduct, title, price: Number(price) },
    });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-10">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col"
          >
            <h2 className="font-bold">{product.title}</h2>
            <p className="text-gray-600 mb-4">${product.price}</p>

            <div className="mt-auto flex gap-2">
              <button
                onClick={() => openModal(product)}
                className="flex-1 bg-green-500 text-white rounded py-1 hover:bg-green-600"
              >
                PUT
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
                className="flex-1 bg-red-500 text-white rounded py-1 hover:bg-red-600"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreatePost />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
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
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
