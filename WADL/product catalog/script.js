const products = [
    { image: "src\images\headphones.png", name: "Wireless Headphones", price: "₹7,999", description: "Noise-cancelling over-ear headphones." },
    { image: "smartwatch.jpg", name: "Smartwatch", price: "₹12,999", description: "Fitness tracking smartwatch." },
    { image: "gaming-mouse.jpg", name: "Gaming Mouse", price: "₹2,499", description: "Ergonomic gaming mouse." },
    { image: "laptop-stand.jpg", name: "Laptop Stand", price: "₹1,999", description: "Adjustable aluminum stand." },
    { image: "keyboard.jpg", name: "Mechanical Keyboard", price: "₹5,499", description: "RGB backlit mechanical keyboard." },
    { image: "monitor.jpg", name: "4K Monitor", price: "₹25,999", description: "Ultra HD 4K monitor with HDR." },
    { image: "speaker.jpg", name: "Bluetooth Speaker", price: "₹3,299", description: "Portable wireless speaker with deep bass." },
    { image: "tablet.jpg", name: "Android Tablet", price: "₹15,999", description: "10-inch display with long battery life." },
    { image: "router.jpg", name: "Wi-Fi Router", price: "₹4,499", description: "Dual-band gigabit router for fast internet." },
    { image: "powerbank.jpg", name: "Power Bank", price: "₹1,899", description: "10000mAh fast charging power bank." },
    { image: "mousepad.jpg", name: "Gaming Mouse Pad", price: "₹999", description: "Extended size mouse pad with RGB lighting." }
];

const rowsPerPage = 10;
let currentPage = 1;

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = products.slice(start, end);

    paginatedItems.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
        `;
        productList.appendChild(row);
    });

    document.getElementById("page-number").innerText = currentPage;
    document.getElementById("prev").disabled = currentPage === 1;
    document.getElementById("next").disabled = end >= products.length;
}

document.getElementById("prev").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
});

document.getElementById("next").addEventListener("click", () => {
    if (currentPage * rowsPerPage < products.length) {
        currentPage++;
        displayProducts();
    }
});

displayProducts();
