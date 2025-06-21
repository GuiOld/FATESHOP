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
    const categories = [
        "men's clothing",
        "women's clothing"
    ];

    const promises = categories.map(category => api.get(`/products/category/${category}`));
    const results = await Promise.all(promises);

    // juntar todos os produtos num único array
    const allProducts = results.flatMap(res => res.data);

    // opcional: limitar a 30 produtos (se quiser)
    return allProducts.slice(0, 30);
}
