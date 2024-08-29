// show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    let time = showAlert.getAttribute("show-alert") || 3000;
    time = parseInt(time);

    setTimeout(() => {
        showAlert.classList.add("hidden");
    }, time);
}
// End show-alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        console.log(file);
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}
// End Upload Image

// Cập nhật số lượng sản phẩm trong giỏ hàng
const listInputQuantity = document.querySelectorAll("[cart] input[name='quantity']");
if(listInputQuantity){
    listInputQuantity.forEach(input => {
        input.addEventListener("change", () => {
            const productId = input.getAttribute("product-id");
            const quantity = parseInt(input.value);
            
            if(productId && quantity > 0){
                window.location.href = `/cart/update/${productId}/${quantity}`;
            }
        });
    });
}
// Hết Cập nhật số lượng sản phẩm trong giỏ hàng

// Toggle Password
const passField = document.querySelector("[passField]");
if(passField){
    const passInput = passField.querySelector("[passInput]");
    const buttonTogglePass = passField.querySelector("[togglePassword]");
    const eyeIcon = passField.querySelector(".eye-icon");

    buttonTogglePass.addEventListener("click", () => {
        if(passInput.type === 'password'){
            passInput.type = 'text';
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        }
        else{
            passInput.type = 'password';
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');   
        }
    })
}
// End Toggle Password

// Icon add to Cart 
const listIconAddtoCart = document.querySelectorAll("[add-to-cart]");
if (listIconAddtoCart.length > 0) {
    listIconAddtoCart.forEach(icon => {
        icon.addEventListener("click", () => {
            const link = icon.getAttribute("link");
            fetch(link, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        window.location.reload();
                    }
                })
        });
    });
}
// End Icon add to Cart 

// Add to Wishlist 
const listIconAddtoWishlist = document.querySelectorAll("[add-to-wishlist]");
if (listIconAddtoWishlist.length > 0) {
    listIconAddtoWishlist.forEach(icon => {
        icon.addEventListener("click", () => {
            const link = icon.getAttribute("link");
            fetch(link, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        window.location.reload();
                    }
                })
        });
    });
}
// End Add to Wishlist

// Delete to Wishlist 
const listIconDeletetoWishlist = document.querySelectorAll("[delete-to-wishlist]");
if (listIconDeletetoWishlist.length > 0) {
    listIconDeletetoWishlist.forEach(icon => {
        icon.addEventListener("click", () => {
            const link = icon.getAttribute("link");
            fetch(link, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        window.location.reload();
                    }
                })
        });
    });
}
// End Delete to Wishlist

// Pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if (listButtonPagination.length > 0) {
    let url = new URL(window.location.href);

    listButtonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}
// End Pagination

// Lọc sản phẩm theo giá
const listFilterByPrice = document.querySelectorAll("[filter-price]");
if(listFilterByPrice.length > 0){
    let url = new URL(window.location.href);

    listFilterByPrice.forEach(price => {
        price.addEventListener("click", () => {
            const [priceStart, priceEnd] = price.getAttribute("filter-price").split('-');
            if(priceStart && priceEnd){
                url.searchParams.set("priceStart", priceStart);
                url.searchParams.set("priceEnd", priceEnd);

                window.location.href = url.href;
            }
        });
    });
}
// Hết Lọc sản phẩm theo giá