const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const paginationHelper = require("../../helpers/pagination.helper");

// [GET] /products/
module.exports.index = async (req, res) => {
    const find = {
        status: "active",
        deleted: false
    };

    // Truy vấn tất cả sản phẩm phù hợp với điều kiện ban đầu
    let allProducts = await Product.find(find).sort({ position: "desc" });

    // Tính toán và lọc theo `priceNew`
    if (req.query.priceStart && req.query.priceEnd) {
        const priceStart = Number(req.query.priceStart);
        const priceEnd = Number(req.query.priceEnd);

        allProducts = allProducts.filter(product => {
            return product.priceNew >= priceStart && product.priceNew <= priceEnd;
        });
    }

    // Sử dụng module phân trang của bạn
    const pagination = await paginationHelper.productClient(req, allProducts);

    // Phân trang sau khi đã lọc
    const paginatedProducts = allProducts.slice(pagination.skip, pagination.skip + pagination.limitItems);

    // Render kết quả
    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: paginatedProducts,
        pagination: pagination
    });
};

// [GET] /products/:slugCategory
module.exports.category = async(req, res) => {
    const slugCategory = req.params.slugCategory;

    const category = await ProductCategory.findOne({
        slug: slugCategory,
        status: "active",
        deleted: false
    });

    const allSubCategory = [];

    const getSubCategory = async(currentId) => {
        const subCategory = await ProductCategory.find({
            parent_id: currentId,
            status: "active",
            deleted: false
        });

        for(const sub of subCategory){
            allSubCategory.push(sub.id);
            await getSubCategory(sub.id);
        }
    }

    await getSubCategory(category.id);

    const products = await Product.find({
        product_category_id: {
            $in: [
                category.id,
                ...allSubCategory
            ]
        },
        status: "active", 
        deleted: false
    }).sort({ position: "desc" });

    for(const item of products){
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }

    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: products
    });
}

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {
    const slug = req.params.slug;

    const product = await Product.findOne({
       slug: slug,
       deleted: false,
       status: "active" 
    });

    product.priceNew = ((1 - product.discountPercentage/100) * product.price).toFixed(0);

    const similarProduct = await Product.find({
        _id: {$ne: product.id},
        product_category_id: product.product_category_id,
        status: "active",
        deleted: false
    });

    if(product){
        res.render("client/pages/products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            product: product,
            similarProduct: similarProduct
        });
    }
    else{
        res.redirect("/");
    }
}
