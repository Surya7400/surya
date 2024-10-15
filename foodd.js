let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

const authTitle = document.getElementById('form-title');
const authBtn = document.getElementById('auth-btn');
const authError = document.getElementById('auth-error');
const toggleLink = document.getElementById('toggle-link');
const confirmPasswordInput = document.getElementById('auth-confirm-password');

// Toggle between Login and Register
let isLogin = true;

toggleLink.addEventListener('click', function () {
    if (isLogin) {
        authTitle.textContent = 'Register';
        authBtn.textContent = 'Register';
        confirmPasswordInput.classList.remove('hidden');
        toggleLink.innerHTML = 'Already have an account? <a href="#">Login here</a>';
        isLogin = false;
    } else {
        authTitle.textContent = 'Login';
        authBtn.textContent = 'Login';
        confirmPasswordInput.classList.add('hidden');
        toggleLink.innerHTML = 'New user? <a href="#">Register here</a>';
        isLogin = true;
    }
});

// Authenticate user
authBtn.addEventListener('click', function () {
    const username = document.getElementById('auth-username').value;
    const password = document.getElementById('auth-password').value;
    const confirmPassword = confirmPasswordInput.value;

    if (isLogin) {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            currentUser = user;
            document.getElementById('user-username').textContent = username;
            document.getElementById('auth-form').classList.add('hidden');
            document.getElementById('user-dashboard').classList.remove('hidden');
            document.getElementById('logout-btn').classList.remove('hidden');
            displayOrderHistory();
        } else {
            authError.textContent = 'Invalid username or password.';
            authError.classList.remove('hidden');
        }
    } else {
        if (password === confirmPassword) {
            const existingUser = users.find(user => user.username === username);
            if (!existingUser) {
                const newUser = { username, password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registration successful! You can now log in.');
                toggleLink.click(); // Switch to login form
            } else {
                authError.textContent = 'Username already exists.';
                authError.classList.remove('hidden');
            }
        } else {
            authError.textContent = 'Passwords do not match.';
            authError.classList.remove('hidden');
        }
    }
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function () {
    currentUser = null;
    document.getElementById('user-dashboard').classList.add('hidden');
    document.getElementById('auth-form').classList.remove('hidden');
});

// Show food items
function showFoodItems(hotel) {
    document.getElementById('user-dashboard').classList.add('hidden');
    const foodMenu = document.getElementById('food-menu');
    foodMenu.classList.remove('hidden');
    document.getElementById('menu-title').textContent = `Menu for ${hotel.charAt(0).toUpperCase() + hotel.slice(1)}`;

    const menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = ''; // Clear previous items

    // Dummy food items for demonstration
    for (let i = 1; i <= 6; i++) {
        const foodItem = document.createElement('div');
        foodItem.classList.add('food-item');
        foodItem.innerHTML = `
            <img src="food${i}.jpg" alt="Food ${i}" />
            <h4>Food ${i}</h4>
            <button onclick="addToCart('Food ${i}')">Add to Cart</button>
        `;
        menuItems.appendChild(foodItem);
    }
}

// Add item to cart
function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item} added to cart!`);
}

// View Cart
function viewCart() {
    document.getElementById('food-menu').classList.add('hidden');
    const cartPage = document.getElementById('cart-page');
    cartPage.classList.remove('hidden');
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        cartItems.appendChild(listItem);
    });
}

// Display Order History
function displayOrderHistory() {
    const orderHistoryContainer = document.getElementById('order-history');
    orderHistoryContainer.innerHTML = ''; // Clear previous orders

    if (orderHistory.length === 0) {
        orderHistoryContainer.innerHTML = '<p>No order history found.</p>';
        return;
    }

    orderHistory.forEach((order, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Order ${index + 1}: ${order}`;
        orderHistoryContainer.appendChild(listItem);
    });
}

// Checkout functionality
function checkout() {
    alert('Checkout successful!');
    orderHistory.push(...cart);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory)); // Save to localStorage

    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayOrderHistory();
    document.getElementById('cart-page').classList.add('hidden');
    document.getElementById('user-dashboard').classList.remove('hidden');
}

// Navigation Back to Menu or Hotels
function goBackToMenu() {
    document.getElementById('cart-page').classList.add('hidden');
    document.getElementById('food-menu').classList.remove('hidden');
}

function goBackToHotels() {
    document.getElementById('food-menu').classList.add('hidden');
    document.getElementById('user-dashboard').classList.remove('hidden');
}
