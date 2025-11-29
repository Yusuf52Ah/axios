import instance from "@/lib/axios";

const productService = {
  getAllProducts: async (params) => {
    return await instance.get("/products", { params });
  },

  getProductById: async (id) => {
    return await instance.get(`/products/${id}`);
  },

  createProduct: async (productData) => {
    return await instance.post("/products/", productData);
  },

  updateProduct: async (id, productData) => {
    return await instance.put(`/products/${id}`, productData);
  },

  deleteProduct: async (id) => {
    return await instance.delete(`/products/${id}`);
  },
  getProductsByCategory: async (categoryId) => {
    return await instance.get(`/categories/${categoryId}/products`);
  }
};

export default productService;
