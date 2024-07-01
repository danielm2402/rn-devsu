import HttpProducts from "../http/ProductsClientHttp";
import { Product, Products, CProducto } from "../types/product";

export default {
    async getProducts(): Promise<Products> {
        const { data } = await HttpProducts.get<Products>('bp/products')

        return data;
    },

    async createProduct(product: Product): Promise<CProducto> {

        const { data } = await HttpProducts.post<CProducto>('bp/products',
            product
        )

        return data

    },
    async verifyId(id: String): Promise<boolean> {
        const { data } = await HttpProducts.get<boolean>('bp/products/verification/' + id)
        return data

    }
}