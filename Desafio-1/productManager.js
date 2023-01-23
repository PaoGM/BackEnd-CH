class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        const objCode = this.products.map((product) => product.code);
        const objExist = objCode.includes(product.code);
        if (objExist) {
            console.log("Codigo de producto existente, intente otro");
        } else if (Object.values(product).includes("")) {
            console.log(
                "Todos los campos del producto deben estar completos para poder ser ingresado"
            );
        } else {
            let id;
            this.products.length === 0 ? (id = 1) : (id = this.products.length + 1);
            const newProduct = { ...product, id };
            this.products.push(newProduct);
        }
    }

    getProducts() {
        return this.products;
    }
    getProductById(id) {
        const productFind = this.products.find((product) => id === product.id);
        if (productFind) {
            return JSON.stringify(productFind);
        } else {
            console.log("Error, producto no encontrado :(");
        }
    }
}

const productos = new ProductManager();


productos.addProduct({
    titulo: "Zapatillas",
    descripcion: "Zapatillas urbanas, color Negro, talle 38",
    precio: 6500,
    img: "https://http2.mlstatic.com/D_NQ_NP_735116-MLA44776430902_022021-O.jpg",
    code: 244,
    stock: 7,
});


productos.addProduct({
  titulo: "Sandalias",
  descripcion: "Sandalias de plataforma, color Suela, talle 38",
  precio: 5800,
  img: "https://http2.mlstatic.com/D_NQ_NP_735116-MLA44776430902_022021-O.jpg",
  code: 245,
  stock: 7,
});

productos.addProduct({
    titulo: "Sandalias",
    descripcion: "Sandalias de plataforma, color Negro, talle 36",
    precio: 5900,
    img: "https://http2.mlstatic.com/D_NQ_NP_645391-MLA43793189919_102020-O.jpg",
    code: 247,
    stock: 9,
});

productos.addProduct({
    titulo: "Zapatillas",
    descripcion: "Zapatillas urbanas, color Blanco, talle 37",
    precio: 6000,
    img: "https://http2.mlstatic.com/D_NQ_NP_935953-MLA49703675436_042022-O.jpg",
    code: 246,
    stock: 4,
});


console.log(productos.getProducts());

console.log(productos.getProductById(3));

console.log(productos.getProductById(6));