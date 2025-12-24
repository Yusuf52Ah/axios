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
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useUpdateProductPatch = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      productService.updateProductPatch({ id, data }),

    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: ["products"] });

      const previousProducts = qc.getQueryData(["products"]);

      qc.setQueryData(["products"], (old) => {
        const products = old?.data ?? old;
        if (!Array.isArray(products)) return old;

        return {
          ...old,
          data: products.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        };
      });

      return { previousProducts };
    },

    onError: (err, variables, context) => {
      if (context?.previousProducts) {
        qc.setQueryData(["products"], context.previousProducts);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useUpdateProduct = useUpdateProductPatch;
