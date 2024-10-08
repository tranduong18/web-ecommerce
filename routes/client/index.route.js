const homeRoute = require("./home.route");
const productRoute = require("./product.route");
const searchRoute = require("./search.route");
const cartRoute = require("./cart.route");
const checkoutRoute = require("./checkout.route");
const userRoute = require("./user.route");
const blogRoute = require("./blog.route");
const productWislistRoute = require("./product-wishlist.route");
const contactRoute = require("./contact.route");

const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");
const wishlistMiddleware = require("../../middlewares/client/wishlist.middleware");

module.exports.index = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.setting);
    app.use(wishlistMiddleware);

    app.use("/", homeRoute);
    
    app.use("/products", productRoute);
    
    app.use("/blogs", blogRoute); 
    
    app.use("/search", searchRoute);  

    app.use("/cart", cartRoute);

    app.use("/checkout", userMiddleware.requireAuth, checkoutRoute);

    app.use("/user", userRoute);

    app.use("/wishlist", userMiddleware.requireAuth, productWislistRoute);

    app.use("/contact", contactRoute);
}