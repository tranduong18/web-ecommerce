const Product = require("../../models/product.model");
const Wishlist = require("../../models/product-wishlist.model");
const Blog = require("../../models/blog.model");
const BlogCategory = require("../../models/blog-category.model");

// [GET] /
module.exports.index = async (req, res) => {
    // Sản phẩm nổi bật
    const productsFeatured = await Product.find({
        featured: "1",
        status: "active",
        deleted: false
    })
    .sort({ position : "desc" }).limit(6)
    .select("-description");

    for(const item of productsFeatured){
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }
    // Hết Sản phẩm nổi bật

    // Sản phẩm mới
    const productsNew = await Product.find({
        status: "active",
        deleted: false
    })
    .sort({ position : "desc" }).limit(6)
    .select("-description");

    for(const item of productsNew){
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }
    // Hết Sản phẩm mới

    // Blog mới 
    const blogsNew = await Blog.find({
        status: "active",
        deleted: false
    })
    .sort({ position : "desc" }).limit(6)
    .select("-description");

    for(const item of blogsNew){
        const category = await BlogCategory.findOne({
            _id: item.blog_category_id
        });
        if(category){
            item.categoryName = category.title
        }
    }
    // Hết Blog mới 

    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productsFeatured: productsFeatured,
        productsNew: productsNew,
        blogsNew: blogsNew
    });
}