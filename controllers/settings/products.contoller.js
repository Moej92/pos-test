const Category = require("../../models/category_model");
const Item = require("../../models/item_model");

const products_management = async (req, res) => {
    try {
        const categories = await Category.find({}).exec();
        const locals = {
            page: "/settings",
            categories, 
            section: "products_management",
        };

        if(categories.length) {
            const category = req.query.category || categories[0].name;
            locals.categoryName = category
            const categoryItems = await Item.find({ category });
            locals.items = categoryItems
        }
        return res.render("pug", locals);
    } catch(e) {
        res.render()
    }   
}


const addCategory = async (req, res) => {
    const { category_name } = req.body;

    try {
        const category = await Category.find({ name: category_name });

        if(category.length) return res.json({ error: "Category already exist" });
        
        const newCategory = new Category({
            name: category_name
        });
        await newCategory.save();
        return res.redirect("/settings/products-management");

    } catch(e) {
        console.log(e.message);
        return res.json({ error: e.message });
    }
        
}

const editCategory = async (req, res) => {
    const { category_name, new_category_name } = req.body;

    try {
        const items = await Item.updateMany({ category: category_name }, { category: new_category_name }).exec();
        const updatedCategory = await Category.findOneAndUpdate({ name: category_name }, { name: new_category_name }, { new: true });
        return res.redirect("/settings/products-management");
    } catch(e) {
        console.log(e.message)
        res.json({ error: e.message });
    }
}

const deleteCategory = async (req, res) => {
    const { category_id } = req.body;
    
    try {
        const deletedDoc = await Category.findByIdAndDelete(category_id).exec();
        await Item.deleteMany({ category: deletedDoc.name })
        return res.redirect("/settings/products-management");
    } catch(e) {
        console.error(e.message);
        res.json({ error: e.message });
    }
}

const addProduct = async (req, res) => {
    const { category_name, product_name, product_price } = req.body;
    
    try {
        const newItem = new Item({
            name: product_name,
            price: +product_price,
            category: category_name
        });
        await newItem.save();
        return res.redirect(`/settings/products-management?category=${category_name}`);
    } catch(e) {
        console.error(e.message);
        res.json({ error: e.message })
    }
}

const editProduct = async (req, res) => {
    const {product_id, new_product_name, new_product_price} = req.body;
    if(!new_product_name && !new_product_price) {
        return res.json({ error: "Required field missing" });
    }
    try {
        const updatedDoc = await Item.findByIdAndUpdate(
            { _id: product_id }, 
            { name: new_product_name, price: +new_product_price },
            { new: true }
        );

        return res.redirect("/settings/products-management")
    } catch(e) {
        console.error(e.message);
        res.json({ error: e.message })
    }
}

const deleteProduct = async (req, res) => {
    const { product_id } = req.body;
    try {
        await Item.findByIdAndDelete(product_id)
        return res.redirect("/settings/products-management")
    } catch(e) {
        console.error(e.message);
        res.json({ error: e.message })
    }
}

module.exports = { 
    products_management,
    addCategory,
    editCategory,
    deleteCategory,
    addProduct,
    editProduct,
    deleteProduct
}