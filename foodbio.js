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

// Food items array with names, prices, ratings, and image paths for each hotel
const hotelMenus = {
    "hotel1": [
        { name: 'Pizza', price: 10, rating: 4.7, imgSrc: 'https://img.freepik.com/free-photo/delicious-pizza-studio_23-2151846554.jpg' },
        { name: 'Burger', price: 3, rating: 4.5, imgSrc: 'https://img.freepik.com/free-photo/big-sandwich-hamburger-burger-with-beef-red-onion-tomato-fried-bacon_2829-5398.jpg' }
    ],
    "hotel2": [
        { name: 'Pasta', price: 4, rating: 4.3, imgSrc: 'https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg' },
        { name: 'Salad', price: 6, rating: 4.6, imgSrc: 'https://img.freepik.com/free-photo/top-view-tasty-salad-with-vegetables_23-2148515491.jpg' }
    ],
    "hotel3": [
        { name: 'Fries', price: 6, rating: 4.2, imgSrc: 'https://img.freepik.com/free-photo/crispy-french-fries-with-ketchup-mayonnaise_1150-26588.jpg' },
        { name: 'Coffee', price: 1, rating: 4.0, imgSrc: 'https://img.freepik.com/free-photo/soda-can-isolated-white_1150-12750.jpg' }
    ],
    // Add more hotels and their respective menus here
    "hotel4": [
        { name: 'Tacos', price: 5, rating: 4.8, imgSrc: 'https://img.freepik.com/free-photo/mexican-tacos-with-chicken-bell-peppers-black-beans-fresh-vegetables_2829-20049.jpg' },
        { name: 'Sushi', price: 8, rating: 4.9, imgSrc: 'https://img.freepik.com/free-photo/maki-sushi-isolated-white_2829-7304.jpg' }
    ],
    "hotel5": [
        { name: 'Steak', price: 15, rating: 4.6, imgSrc: 'https://img.freepik.com/free-photo/juicy-steak-medium-rare-beef-with-spices-grilled-vegetables_2829-18665.jpg' },
        { name: 'Brownie', price: 4, rating: 4.3, imgSrc: 'https://ichef.bbci.co.uk/food/ic/food_16x9_320/recipes/chocolate_brownie_64092_16x9.jpg' }
    ],
    "hotel6": [
        { name: 'Ice Cream', price: 3, rating: 4.4, imgSrc: 'https://img.freepik.com/free-photo/coold-sweet-ice-cream-with-chocolate_144627-7297.jpg' },
        { name: 'CupCake', price: 5, rating: 4.5, imgSrc: 'https://ichef.bbci.co.uk/food/ic/food_16x9_320/recipes/pudsey_bear_cupcakes_91262_16x9.jpg' }
        ],
};

// Show food items for a specific hotel
function showFoodItems(hotel) {
    document.getElementById('user-dashboard').classList.add('hidden');
    const foodMenu = document.getElementById('food-menu');
    foodMenu.classList.remove('hidden');
    document.getElementById('menu-title').textContent = `Menu for ${hotel.charAt(0).toUpperCase() + hotel.slice(1)}`;

    const menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = ''; // Clear previous items

    // Loop through the hotelMenus for the selected hotel
    const items = hotelMenus[hotel] || [];
    items.forEach((item) => {
        const foodItem = document.createElement('div');
        foodItem.classList.add('food-item');
        foodItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}" />
            <h4>${item.name} - $${item.price} (Rating: ${item.rating})</h4>
            <button onclick="addToCart('${item.name}')">Add to Cart</button>
        `;
        menuItems.appendChild(foodItem);
    });
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
