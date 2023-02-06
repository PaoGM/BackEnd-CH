import express from "express";

import ProductManager from "./productManager.js";

const manager = new ProductManager("./Desafio-3/data.json");

const app = express(); 

app.use(express.urlencoded({extended: true})) 
app.use(express.json());

const PORT = 4000;

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

app.get("/products/:id", async (req, res)=>{
const product = await manager.getById(parseInt(req.params.id))
console.log(product);
res.send(product)
})

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});