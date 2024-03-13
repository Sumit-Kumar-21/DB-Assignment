const express = require("express")
const {
    handleCreateCategory,
    handleCreateDiscount,
    handleCreateInventory,
    handleCreateProduct,
    handleGetAllProducts,
    handleGetProductByCategory,
    handleGetProductById,
    handleUpdateProduct
} = require("../controller")
const approuter = express.Router()


approuter.get("/products", handleGetAllProducts)

approuter.post("/product", handleCreateProduct) // create product
approuter.post("/product_category", handleCreateCategory)  // create category
approuter.post("/product_Inventory", handleCreateInventory) // create inventory
approuter.post("/product_Discount", handleCreateDiscount) // create discount

approuter.get("/product/:id", handleGetProductById) // get product by id

approuter.get("/product/:category_id", handleGetProductByCategory) // get products by category id

approuter.put("/product/:id", handleUpdateProduct) //update product




module.exports ={ approuter }
