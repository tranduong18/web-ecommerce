const Blog = require("../../models/blog.model");
const BlogCategory = require("../../models/blog-category.model");

// [GET] /blogs/
module.exports.index = async(req, res) => {
    const blogs = await Blog.find({
        status: "active",
        deleted: false
    }).sort({
        position: "desc"
    });

    for(const item of blogs){
        const category = await BlogCategory.findOne({
            _id: item.blog_category_id
        })

        if(category){
            item.categoryName = category.title;
        }
    }

    res.render("client/pages/blogs/index", {
        pageTitle: "Danh sách bài viết",
        blogs: blogs
    });
}

// [GET] /blogs/:slugCategory
module.exports.category = async(req, res) => {
    const slugCategory = req.params.slugCategory;

    const category = await BlogCategory.findOne({
        slug: slugCategory,
        status: "active",
        deleted: false
    });


    const blogs = await Blog.find({
        blog_category_id: category.id,
        status: "active", 
        deleted: false
    }).sort({ position: "desc" });

    res.render("client/pages/blogs/index", {
        pageTitle: category.title,
        blogs: blogs
    });
}

// [GET] /blogs/detail/:slug
module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
    console.log(slug);

    const blog = await Blog.findOne({
       slug: slug,
       deleted: false,
       status: "active" 
    });

    if(blog){
        const category = await BlogCategory.findOne({
            _id: blog.blog_category_id
        })

        if(category){
            blog.category = category
        }

        res.render("client/pages/blogs/detail", {
            pageTitle: "Chi tiết bài viết",
            blog: blog
        });
    }
    else{
        res.redirect("/");
    }
}
