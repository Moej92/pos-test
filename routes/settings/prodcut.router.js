const router = require("express").Router();

const { 
    products_management,
    addCategory,
    editCategory,
    deleteCategory,
    addProduct,
    editProduct,
    deleteProduct
} = require("../../controllers/settings/products.contoller")

router.get("/settings/products-management", products_management);
router.post("/settings/products-management/add-category", addCategory);
router.post("/settings/products-management/edit-category", editCategory);
router.post("/settings/products-management/delete-category", deleteCategory);
router.post("/settings/products-management/add-product", addProduct);
router.post("/settings/products-management/edit-product", editProduct);
router.post("/settings/products-management/delete-product", deleteProduct);

module.exports = router;