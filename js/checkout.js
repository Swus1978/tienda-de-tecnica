// Function to calculate the total price of the cart items
function calculateTotal() {
    return shoppingCart.reduce((total, item) => total + (item?.price || 0), 0);
}

// Function to create table row HTML for a cart item
function returnTableInHTML(cartItem) {
    if (!cartItem || !cartItem.name || !cartItem.price || !cartItem.code) {
        return ''; // Return an empty string if the cart item is invalid or missing required properties
    }

    return `
    <tr>
        <td>${cartItem.name}</td>
        <td>$ ${cartItem.price}</td>
        <td><button class="btn btn-danger btn-sm delete" data-code="${cartItem.code}">Delete</button></td>
    </tr>`;
}

// Function to render the cart table
function renderCart() {
    const tbody = document.getElementById('cartTable');
    tbody.innerHTML = '';

    shoppingCart.forEach((cartItem) => {
        tbody.innerHTML += returnTableInHTML(cartItem);
    });

    const total = calculateTotal();
    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: $ ${total.toFixed(2)}`;
}

// Function to handle the click event on the delete button
function handleDeleteCard(e) {
    const code = e.target.dataset.code;
    Swal.fire({
        icon: 'success',
        title: 'Item deleted successfully',
        text: 'Item removed from cart successfully',
        showConfirmButton: false, // Hide the 'OK' button
        timer: 3000, // Automatically close the popup after 3 seconds (adjust as needed)
        timerProgressBar: true // Show a progress bar indicating the remaining time
    });

    // Find the index of the item with the matching code in the shoppingCart array
    const itemIndex = shoppingCart.findIndex((item) => item.code === code);

    if (itemIndex !== -1) {
        // Remove the item from the shoppingCart array
        shoppingCart.splice(itemIndex, 1);

        // Save the updated cart items to localStorage
        saveCartItems();

        // Re-render the cart
        renderCart();

        // Show a success message using Toastr
        toastr.success('Item removed', 'The item has been successfully removed from the cart.');
    }
}

// Retrieve the cart items from local storage or initialize an empty array
const shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];

// Render the initial cart
renderCart();

// Add event listener to the delete button
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        handleDeleteCard(e);
    }
});

// Function to handle the click event on the purchase button
function handlePurchase() {
    Swal.fire({
        icon: 'success',
        title: 'Purchase Successful',
        text: 'Thank you for your purchase!',
        showConfirmButton: false, // Hide the 'OK' button
        timer: 3000, // Automatically close the popup after 3 seconds (adjust as needed)
        timerProgressBar: true // Show a progress bar indicating the remaining time
    }).then(() => {
        localStorage.removeItem('cart');
        shoppingCart.length = 0;
        renderCart();
    });
}

// Add event listener to the purchase button
const purchaseButton = document.getElementById('purchaseButton');
purchaseButton.addEventListener('click', handlePurchase);

