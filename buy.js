// Function to show a specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });
    document.getElementById(sectionId).style.display = 'block'; // Show the selected section
}

// Handle login submission
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Sample credentials for demonstration
    const validEmail = "user@example.com";
    const validPassword = "password";

    if (email === validEmail && password === validPassword) {
        window.location.href = "page1.html"; // Redirect to the main page after successful login
    } else {
        alert("Invalid credentials. Please try again.");
    }
});

// Function to sell a product
function sellProduct(productType) {
    const productName = prompt(`Enter ${productType} name:`);
    const imeiNumber = prompt(`Enter ${productType} IMEI number:`);
    const price = prompt(`Enter price for ${productType}:`);

    if (productName && imeiNumber && price) {
        alert(`${productType} sold successfully!\nName: ${productName}\nIMEI: ${imeiNumber}\nPrice: $${price}`);
    } else {
        alert("Please fill in all details.");
    }
}

function buyProduct(productType) {
    const phoneName = prompt(`Enter ${productType} name:`);
    const price = prompt(`Enter price for ${productType}:`);
    const warranty = prompt(`Enter warranty period for ${productType}:`);

    if (phoneName && price && warranty) {
        alert(`${productType} purchased successfully!\nName: ${phoneName}\nPrice: $${price}\nWarranty: ${warranty}`);
    } else {
        alert("Please fill in all details.");
    }
}

// Current location functionality
document.getElementById('current-location-button').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                document.getElementById('location-message').innerText = 
                    `Current Location: Latitude: ${lat}, Longitude: ${lon}`;
            },
            () => {
                document.getElementById('location-message').innerText = 
                    "Location blocked. Check browser/phone settings.";
            }
        );
    } else {
        document.getElementById('location-message').innerText = 
            "Geolocation is not supported by this browser.";
    }
});

// Handle selection from popular locations
document.getElementById('select-location-button').addEventListener('click', function() {
    const selectedLocation = document.getElementById('popular-locations').value;
    if (selectedLocation) {
        document.getElementById('location-message').innerText = 
            `Selected Location: ${selectedLocation}`;
    } else {
        document.getElementById('location-message').innerText = 
            "Please select a location.";
    }
});

// Event listener for selling products
document.getElementById("sell-button").addEventListener("click", function() {
    const productTypes = [
        "Phone", "Laptop", "Smart Speaker", "Tablet",
        "Gaming Console", "iMac", "Smartwatch", "TV",
        "Earbuds", "DSLR Camera", "AC"
    ];
    
    const productType = prompt("Select a product to sell:\n" + productTypes.join("\n"));
    
    if (productTypes.includes(productType)) {
        sellProduct(productType);
    } else {
        alert("Invalid product type selected.");
    }
});

// Handle product submission
document.getElementById("product-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;
    const category = document.getElementById("category").value;

    // Display the added product (for demo purposes)
    const productList = document.getElementById("product-list");
    const productItem = document.createElement("div");
    productItem.innerHTML = `<h3>${title}</h3>
                             <p>${description}</p>
                             <p>Price: $${price}</p>
                             <p>Quantity: ${quantity}</p>
                             <p>Category: ${category}</p>`;
    productList.appendChild(productItem);

    // Reset the form
    document.getElementById("product-form").reset();
});
