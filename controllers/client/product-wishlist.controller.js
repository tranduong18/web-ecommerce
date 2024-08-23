const ProductWishlist = require("../../models/product-wishlist.model");
const Product = require("../../models/product.model");

// [GET] /wishlist
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const wishlist = await ProductWishlist.findOne({
        userId: userId
    });

    if(wishlist.products.length > 0){
        for(const item of wishlist.products){
            const productId = item.productId;
    
            const productInfo = await Product.findOne({
                _id: productId
            }).select("title thumbnail slug price discountPercentage");
            productInfo.priceNew = (1 - productInfo.discountPercentage/100) * productInfo.price
            item.productInfo = productInfo;
        }
    }
    
    res.render("client/pages/products/wishlist", {
        pageTitle: "Yêu thích",
        wishlist: wishlist
    });
    
}

// [POST] /wishlist/add/:productId
module.exports.addPost = async (req, res) => {
    const productId = req.params.productId;
    const userId = res.locals.user.id;

    const data = {
        userId: userId,
        products: [
            {
                productId: productId
            }
        ]
    }

    const wishlist = await ProductWishlist.findOne({
        userId: userId
    });

    
    await ProductWishlist.updateOne({
        userId: userId
    }, {
        $push: {
            products: {
                productId: productId
            }
        }
    })

    await Product.updateOne({
        _id: productId
    }, {
        $push: {
            isLoved: {
                userId: userId
            }
        }
    });

    req.flash("success", "Thêm sản phẩm vào danh sách yêu thích!");

    res.json({
        code: 200
    })
}

// [DELETE] /wishlist/delete/:productId
module.exports.delete = async (req, res) => {
    const productId = req.params.productId;
    const userId = res.locals.user.id;

    const data = {
        userId: userId,
        products: [
            {
                productId: productId
            }
        ]
    }


    const wishlist = await ProductWishlist.findOne({
        userId: userId
    });

    
    await ProductWishlist.updateOne({
        userId: userId
    }, {
        $pull: {
            products: {
                productId: productId
            }
        }
    })

    await Product.updateOne({
        _id: productId
    }, {
        $pull: {
            isLoved: {
                userId: userId
            }
        }
    });

    req.flash("success", "Xóa khỏi danh sách yêu thích!");

    res.json({
        code: 200
    })
}

