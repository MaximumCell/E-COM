import {create} from "zustand";
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "Please fill out all fields"};
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return {success: true, message: "Product created successfully"};
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },

    deleteProduct: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) {
            return {success: false, message: data.message};
        }
        set((state) => ({ products: state.products.filter((product) => product._id !== id) })); // update the products array
        return {success: true, message: data.message};
    },

    updateProduct: async (id, updatedProduct) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if(!data.success) {
            return {success: false, message: data.message};
        }
        set((state) => ({
            products: state.products.map((product) => {
                if(product._id === id) {
                    return data.data;
                }
                return product;
            }),
        }));
        return {success: true, message: data.message};
    },
}));
