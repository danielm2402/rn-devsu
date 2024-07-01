export interface Products {
    data: Product[]
};

export interface CProducto {
    data: Product
};

export interface Product {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
}