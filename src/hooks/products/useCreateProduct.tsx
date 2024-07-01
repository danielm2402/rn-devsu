import { useState } from 'react';
import ProductsService from '../../infrastructure/services/Products';
import { Product } from '../../infrastructure/types/product';

const useCreateProduct = () => {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const createProduct = async (product: Product) => {
        setLoading(true);
        try {

            const verifyId = await ProductsService.verifyId(product.id)

            if (verifyId)
                return { result: false, message: "El ID ya se encuentra registrado, modifique el ID y vuelva a intentarlo" }

            const data = await ProductsService.createProduct(product);
            setProduct(data.data)
            return { result: true, message: "Producto agregado correctamente" }
        } catch (err: any) {
            setError("Error, no se pudo crear el producto, por favor contacte al administrador");
            return { result: false, message: "No se pudo agregar el producto" }
        } finally {
            setLoading(false);
        }
    };

    return { product: product, loading, createProduct };
};

export default useCreateProduct;