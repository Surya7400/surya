// Sample user credentials
const validUsername = "user";
const validPassword = "pass";

// Store previous orders and favorites
let previousOrders = JSON.parse(localStorage.getItem("previousOrders")) || [];
let favorites = [];

// Login functionality
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        alert("Login successful!");
        document.getElementById("login-section").style.display = "none";
        document.getElementById("menu-section").style.display = "block";
        document.getElementById("previous-orders-btn").style.display = "block"; // Show previous orders button
        document.getElementById("coupon-section").style.display = "block"; // Show coupon section
    } else {
        alert("Invalid credentials, please try again.");
    }
});

// Logout functionality
function logout() {
    alert("You have logged out."); // Example action
    document.getElementById("login-section").style.display = "block";
    document.getElementById("menu-section").style.display = "none";
    document.getElementById("previous-orders-btn").style.display = "none";
    document.getElementById("coupon-section").style.display = "none";
}

// Event listener for logout button
document.getElementById("logout-button").addEventListener("click", logout);

// Order list and total price
let orderList = [];
let totalPrice = 0;

// Function to add item to order
function addToOrder(name, price, location) {
    orderList.push({ name, price, location });
    totalPrice += price;

    displayOrderSummary();
}

// Function to add item to favorites
function addToFavorites(item) {
    if (!favorites.includes(item)) {
        favorites.push(item);
        alert(`${item} added to favorites!`);
    } else {
        alert(`${item} is already in your favorites.`);
    }
}

// Add the searchMenu function here
function searchMenu() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const itemName = item.querySelector('h4').textContent.toLowerCase();
        item.style.display = itemName.includes(query) ? '' : 'none';
    });
}

// Function to apply coupon
function applyCoupon() {
    if (totalPrice > 200) {
        totalPrice *= 0.9; // Apply 10% discount
        document.getElementById("coupon-message").innerText = "Coupon applied! 10% discount applied.";
        displayOrderSummary();
    } else {
        document.getElementById("coupon-message").innerText = "Order total must be above ₹200 to apply coupon.";
    }
}

// Function to display order summary
function displayOrderSummary() {
    document.getElementById("order-list").innerHTML = orderList.map(item => `<li>${item.name} from ${item.location} - ₹${item.price}</li>`).join("");
    document.getElementById("total-price").innerText = `Total: ₹${totalPrice.toFixed(2)}`; // Format total to 2 decimal places
    document.getElementById("order-summary").style.display = "block";
}

// Checkout functionality
document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.getElementById("payment").value;

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString();
    const day = now.toLocaleString('en-US', { weekday: 'long' });
    const time = now.toLocaleTimeString();

    // Store previous order without name
    previousOrders.push({ 
        items: orderList.map(item => item.name), 
        location: orderList.map(item => item.location), 
        total: totalPrice, 
        date: date,
        day: day,
        time: time
    });
    localStorage.setItem("previousOrders", JSON.stringify(previousOrders));

    alert("Order placed successfully!");

    // Reset order summary
    orderList = [];
    totalPrice = 0;
    document.getElementById("order-list").innerHTML = "";
    document.getElementById("total-price").innerText = "Total: ₹0";

    document.getElementById("checkout-section").style.display = "none";
    document.getElementById("menu-section").style.display = "block";
});

// Show checkout section
function showCheckout() {
    document.getElementById("order-summary").style.display = "none";
    document.getElementById("checkout-section").style.display = "block";
}

// Show previous orders
function showPreviousOrders() {
    const previousOrderList = document.getElementById("previous-order-list");
    previousOrderList.innerHTML = previousOrders.map(order => `<li>${order.items.join(', ')} from ${order.location.join(', ')} - ₹${order.total} on ${order.day}, ${order.date} at ${order.time}</li>`).join("");
    document.getElementById("previous-orders").style.display = "block";
}
// Show Help Modal Functionality
function showHelpModal() {
    document.getElementById("help-modal").style.display = "block";
}

function closeHelpModal() {
    document.getElementById("help-modal").style.display = "none";
}

// Event listener for Help button
document.getElementById("help-button").addEventListener("click", showHelpModal);

// Event listener for modal close button
document.getElementById("close-modal").addEventListener("click", closeHelpModal);

// Close modal when clicking outside of it
window.addEventListener("click", function(event) {
    const modal = document.getElementById("help-modal");
    if (event.target === modal) {
        closeHelpModal();
    }
});
