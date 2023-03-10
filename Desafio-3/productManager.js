import { promises as fs } from "fs";
class Producto {
  constructor(titulo, descripcion, precio, img, code, stock) {
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.precio = precio;
      this.img = img;
      this.code = code;
      this.stock = stock;
  }
}
class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async addProduct(newProduct) {
    try {
      const read = await fs.readFile(this.path, "utf8");
      const data = JSON.parse(read);
      const objCode = data.map((product) => product.code);
      const objExist = objCode.includes(newProduct.code);
      if (objExist) {
        console.log("Codigo de producto existente, intente otro");
      } else if (Object.values(newProduct).includes("")) {
        console.log(
          "Todos los campos del producto deben estar completos para poder ser ingresado"
        );
      } else {
        let id;
        data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1)
        const newObject = { ...newProduct, id };
        data.push(newObject);
        await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
        return console.log(
          `Agregaste el producto con id: ${newObject.id} exitosamente`
        );
      }
    } catch (error) {
      throw error;
    }
  }
  async getProducts() {
    try {
      const read = await fs.readFile(this.path, "utf8");
      return JSON.parse(read);
    } catch (error) {
      throw error;
    }
  }

  
  async getById(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      const product = data.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        console.log("Not Found");
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      const productoEliminado = JSON.stringify(
        data.find((product) => product.id === id)
      );
      const newData = data.filter((product) => product.id !== id);
      await fs.writeFile(this.path, JSON.stringify(newData), "utf-8");
      return console.log(
        `El producto ${productoEliminado} ha sido eliminado exitosamente`
      );
    } catch (error) {
      throw error;
    }
  }
  async updateProduct(id, entry, value) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      const index = data.findIndex((product) => product.id === id);
      if(!data[index][entry]){
        throw Error
      }
      data[index][entry] = value;
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
      return console.log(data); 
    } catch (error) {
      console.log('Not found');
    }
  }
}/*
const producto1 = new Producto("Prueba", "Producto", 490, "https://google.com.ar", "awd2", 3);
const productManager = new ProductManager("./data.json");

const tests = async()=>{
  console.log(await productManager.getProducts())
  await productManager.addProduct(producto1)
  console.log(await productManager.getProducts());
  console.log(await productManager.getById(2));
  console.log(await productManager.updateProduct(4, "precio", 4500))
  console.log(await productManager.getById(4))
  console.log(await productManager.deleteProduct(5));

}
tests(); */

export default ProductManager;

