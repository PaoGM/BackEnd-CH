import express from "express";

import ProductManager from "./productManager.js";

const manager = new ProductManager("./Desafio-3/data.json");

const app = express(); 

app.use(express.urlencoded({extended: true})) 
app.use(express.json());

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Primer servidor con Express");
});


app.get("/products", async (req, res)=>{
const products = await manager.getProducts()
let {limit} = req.query
if(limit){
    res.send(products.slice(0, limit))
}else{
    res.send(products)
}

})

app.get("/products/:pid", async (req, res)=>{
  const productId = parseInt(req.params.pid);
  const product = await manager.getById(productId);
  if (!product) {
    console.error(`El producto con el ID ${productId} no se encontro.`);
    res.status(404).send(`El producto con el ID ${productId} no se encontro.`);
    return;
  }
  console.log(product);
  res.send(product);
})



app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});