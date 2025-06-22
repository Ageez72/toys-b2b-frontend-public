import Cookies from 'js-cookie';
let lang = Cookies.get('lang') ? Cookies.get('lang') : "AR";
import en from "../../locales/en.json";
import ar from "../../locales/ar.json";

// Function to update the cart
export function addToCart(newItem) {
    const requestedQty = parseInt(newItem.qty);
    const availableQty = parseInt(newItem.avlqty);

    // Check if requested quantity is greater than available quantity
    if (requestedQty > availableQty) {
        return {
            success: false,
            message: lang === "EN" ? `Only ${availableQty} item(s) are available in total.` : `متوفر فقط ${availableQty} قطعة من هذا المنتج.`
        };
    }

    // Step 1: Get cart from cookie or initialize as empty array
    let cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];

    // Step 2: Check if item already exists in the cart
    const existingItem = cart.find(obj => obj.item === newItem.item);

    if (existingItem) {
        const currentQty = parseInt(existingItem.qty);
        const totalQty = currentQty + requestedQty;

        // Check again in case combining exceeds available quantity
        if (totalQty > availableQty) {
            return {
                success: false,
                message: lang === "EN" ? `Only ${availableQty} item(s) are available in total. You already have ${currentQty} in the cart.` : `متوفر فقط ${availableQty} قطعة من هذا المنتج. لديك بالفعل ${currentQty} في السلة.`
            };
        }

        // Step 3: Increase quantity
        existingItem.qty = totalQty.toString();
    } else {
        // Step 4: Add new item
        cart.push({
            item: newItem.item,
            qty: newItem.qty.toString(),
            avlqty: newItem.avlqty.toString(),
            name: newItem.name,
            price: newItem.price,
            image: newItem.image
        });
    }

    // Step 5: Save updated cart to cookie (7-day expiry)
    Cookies.set('cart', JSON.stringify(cart), { expires: 7, path: '/' });
    return { success: true, message: "Item added to cart." };
}

// Function to get cart from cookie
export function getCart() {
    return Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
}

// Function to get profile from cookie
export function getProfile() {
    return Cookies.get('cart') ? JSON.parse(Cookies.get('profile')) : [];
}