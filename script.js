// Select navbar buttons by their IDs
const homeBtn = document.getElementById("homeBtn");
const aboutBtn = document.getElementById("aboutBtn");
const servicesBtn = document.getElementById("servicesBtn");
const contactBtn = document.getElementById("contactBtn");

// Select all book covers
const bookCovers = document.querySelectorAll('.book-cover');

// Add click event listeners to each navbar button
homeBtn.addEventListener("click", function() {
    alert("You clicked on Home!");
});

aboutBtn.addEventListener("click", function() {
    alert("You clicked on About!");
});

servicesBtn.addEventListener("click", function() {
    alert("You clicked on Services!");
});

contactBtn.addEventListener("click", function() {
    alert("You clicked on Contact!");
});

// Add click event listeners to each book cover
bookCovers.forEach(function(bookCover, index) {
    bookCover.addEventListener("click", function() {
        alert("You clicked on Book " + (index + 1) + "!");
    });
});
