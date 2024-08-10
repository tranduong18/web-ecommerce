const Product = require("../../models/product.model");

// [GET] /admin/trash/
module.exports.index = async (req, res) => {
    const productDelete = await Product.find({
        deleted: true
    });

    res.render("admin/pages/trash/index", {
        pageTitle: "Trang thùng rác",
        products: productDelete
    });
}

// [PATCH] /admin/trash/restore/:id
module.exports.restorePatch = async (req, res) => {
    const id = req.params.id;
    
    await Product.updateOne({
        _id: id
    }, {
        deleted: false
    });

    req.flash("success", "Khôi phục thành công!");
    
    res.json({
        code: 200
    });
}

// [DELETE] /admin/trash/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    
    await Product.deleteOne({
        _id: id
    });
    

    req.flash("success", "Xóa vĩnh viễn thành công!");
    
    res.json({
        code: 200
    });
}

