import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// To get all products
export const handleGetAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: true,
        inventories: true,
        discounts: true,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// to get product by product id
export const handleGetProductById = async (req, res) => {
  try {
    const product = await prisma.product
      .findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          categories: true,
          inventories: true,
          discounts: true,
        },
      })
      .catch((error) => {
        res.status(404).json({
            msg: "product not found", error
        });
      });
    res.status(200).json({ product: product });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// to create a new product
export const handleCreateProduct = async (req, res) => {
  const { name, desc, SKU, category_id, inventory_id, price, discount_id } =
    req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {    // simplified way data: req.body
        P_name: name,
        desc,
        SKU,
        category_id,
        inventory_id,
        price,
        discount_id,
      },
    });

    res
      .status(201)
      .json({ msg: "new product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// to update product
export const handleUpdateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, desc, SKU, category_id, inventory_id, price, discount_id } =
    req.body;
  try {
    const updateProduct = await prisma.product
      .update({
        where: {
          id,
        },
        data: {    // simplified way data: req.body
          P_name: name,
          desc,
          SKU,
          category_id,
          inventory_id,
          price,
          discount_id,
        },
      })
      .catch((error) => {
        console.log("product not found", error);
      });
    res.status(200).json({
      msg: "product updated successfully",
      updateProduct: updateProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// to create a new category
export const handleCreateCategory = async (req, res) => {
  const { name, desc } = req.body;
  try {
    const newCategory = await prisma.product_Category.create({
      data: {
        PC_name: name,
        desc,
      },
    });
    res.status(201).json({Category: newCategory});
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// to find all product related to particular catagory
export const handleGetProductByCategory = async (req, res) => {
  const { category_id } = req.params;
  try {
    const products = await prisma.product.findMany({
        where: {
            category_id: category_id
        },
        include:{
            inventories: true,
            discounts: true
        }
    }).catch(error=>{
        console.log();
        res.status(404).json({msg: `product doesn't exist with this catagory id: ${catagory_id}`, error: error })
    })
  } catch (error) {}
};

// to create a new inventory
export const handleCreateInventory = async (req, res) => {
  const { quantity } = req.body;
  try {
    const newInventory = await prisma.product_Inventory.create({
      data: {
        quantity,
      },
    });
    res.status(201).json(newInventory);
  } catch (error) {
    console.error("Error creating inventory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// to create a new discount
export const handleCreateDiscount = async (req, res) => {
  const { name, desc, discount_percent, active } = req.body;
  try {
    const newDiscount = await prisma.product_Discount.create({
      data: {
        name,
        desc,
        discount_percent,
        active,
      },
    });
    res.status(201).json(newDiscount);
  } catch (error) {
    console.error("Error creating discount:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// module.exports = {
//     handleCreateCategory,
//     handleCreateDiscount,
//     handleCreateInventory,
//     handleCreateProduct,
//     handleGetAllProducts,
//     handleGetProductByCategory,
//     handleGetProductById,
//     handleUpdateProduct
// }