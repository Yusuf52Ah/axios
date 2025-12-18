import instance from "@/lib/axios";

const productService = {
  getProducts: (params) => instance.get("/products", { params }),
  getProductById: (id) => instance.get(`/products/${id}`),
  createProduct: (data) => instance.post("/products", data),
  updateProductPut: ({ id, data }) => instance.put(`/products/${id}`, data),
  updateProductPatch: ({ id, data }) => instance.patch(`/products/${id}`, data),
  deleteProduct: (id) => instance.delete(`/products/${id}`),
};

export default productService; 