import api from "./api";

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export const getProducts = async (): Promise<Product[]> => {
    const men = await api.get("/products/category/men's clothing");
    const women = await api.get("/products/category/women's clothing");
    return [...men.data, ...women.data];
}

