 const restaurantList = document.getElementById('restaurant-list');
 const restaurants = document.getElementById('restaurants'); 
 const menu = document.getElementById('menu');
 const restaurantName = document.getElementById('restaurant-name');
 const itemsList = document.getElementById('items');
 const orderButton = document.getElementById('order-btn');
 const orderConfirmation = document.getElementById('order-confirmation');
 const orderSummary = document.getElementById('order-summary');
 const restaurantsData = [
 { name: 'Restaurant A', menu: ['Item 1', 'Item 2', 'Item 3'] },
 { name: 'Restaurant B', menu: ['Item 4', 'Item 5', 'Item 6'] },
 // Add more restaurants and menu items
 ];
 // Display list of restaurants 
function displayRestaurants() {
 restaurantsData.forEach((restaurant, index) => {
 const restaurantItem = document.createElement('li');
 restaurantItem.textContent = restaurant.name; 
restaurantItem.addEventListener('click', () => {
 showMenu(index);
 });
 restaurants.appendChild(restaurantItem);
 });
 }
 // Display menu items for the selected restaurant
 function showMenu(index) {
 restaurantList.style.display = 'none'; 
menu.style.display = 'block';
 const selectedRestaurant = restaurantsData[index]; 
restaurantName.textContent = selectedRestaurant.name;
 itemsList.innerHTML = ''; 
selectedRestaurant.menu.forEach(item => {
 const menuItem = document.createElement('li');
 menuItem.textContent = item; 
itemsList.appendChild(menuItem);
 });
 orderButton.addEventListener('click', () => {
 showOrderConfirmation(selectedRestaurant.name);
 });
 }
  // Display order confirmation
 function showOrderConfirmation(restaurantName) {
 menu.style.display = 'none'; 
orderConfirmation.style.display = 'block';
 orderSummary.textContent = `Your order from ${restaurantName} has been placed!`;
 }
 // Initial setup 
displayRestaurants();