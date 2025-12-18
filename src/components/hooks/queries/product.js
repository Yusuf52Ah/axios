import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import productService from "@/services/product-service";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => qc.invalidateQueries(["products"]),
  });
};

export const useUpdateProductPut = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => productService.updateProductPut({ id, data }),
    onSuccess: () => qc.invalidateQueries(["products"]),
  });
};

export const useUpdateProductPatch = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => productService.updateProductPatch({ id, data }),
    onSuccess: () => qc.invalidateQueries(["products"]),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => qc.invalidateQueries(["products"]),
  });
};
export const useUpdateProduct = useUpdateProductPatch;