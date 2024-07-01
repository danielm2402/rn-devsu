import { useState, useEffect, useCallback } from 'react';
import ProductsService from '../../infrastructure/services/Products';
import { Products } from '../../infrastructure/types/product';

const useGetProducts = () => {
    const [products, setProducts] = useState<Products>({ data: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await ProductsService.getProducts();
            setProducts(data);
        } catch (err: any) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products: products.data, loading, error, fetchProducts };
};

export default useGetProducts;