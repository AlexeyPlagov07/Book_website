// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmFE0VNFjYyWORFz-WVKehLI-ZXSzblMY",
  authDomain: "book-library-d98aa.firebaseapp.com",
  projectId: "book-library-d98aa",
  storageBucket: "book-library-d98aa.firebasestorage.app",
  messagingSenderId: "384262842467",
  appId: "1:384262842467:web:53726b8422e6957484b056",
  measurementId: "G-0LP7D3YB6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(auth);  // Log to confirm if Firebase is properly initialized

  
  // Get elements for login/logout buttons
  const loginButton = document.getElementById('login-btn');
  const logoutButton = document.getElementById('logout-btn');
  
  loginButton.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      console.log('User signed in:', result.user);
      loginButton.style.display = 'none';
      logoutButton.style.display = 'block';
      fetchBooks(); // Fetch books after login
    }).catch((error) => {
      console.error('Login failed:', error.message);
    });
  });
  
  
  // Logout button handler
  logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
      console.log('User signed out');
      loginButton.style.display = 'block';
      logoutButton.style.display = 'none';
    }).catch((error) => {
      console.error('Logout failed:', error.message);
    });
  });
  
  // Fetch books after login
  function fetchBooks() {
    const user = auth.currentUser;
    if (user) {
      user.getIdToken(true).then(idToken => {
        fetch('/data', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        })
        .then(response => response.json())
        .then(data => {
          const booksContainer = document.getElementById('books-container');
          booksContainer.innerHTML = ''; // Clear existing books
  
          if (data.length === 0) {
            const noBooksMessage = document.createElement('p');
            noBooksMessage.textContent = 'No books found in the database.';
            booksContainer.appendChild(noBooksMessage);
            return;
          }
  
          // Display books
          data.forEach(item => {
            const bookSelector = document.createElement('div');
            bookSelector.classList.add('book-selector');
  
            const bookLink = document.createElement('a');
            const encodedBookName = encodeURIComponent(item.name);
            bookLink.href = `/info?name=${encodedBookName}`;
  
            const img = document.createElement('img');
            img.src = item.img_url;
            img.alt = `${item.name} cover`;
  
            const bookName = document.createElement('div');
            bookName.classList.add('book-name');
            bookName.textContent = item.name;
  
            const bookAuthor = document.createElement('div');
            bookAuthor.classList.add('book-author');
            bookAuthor.textContent = item.author;
  
            bookLink.appendChild(img);
            bookLink.appendChild(bookName);
            bookLink.appendChild(bookAuthor);
  
            bookSelector.appendChild(bookLink);
            booksContainer.appendChild(bookSelector);
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }).catch(error => {
        console.error('Error getting ID token:', error);
      });
    }
  }
  
  // Listen for auth state changes (handle sign-in and sign-out)
  auth.onAuthStateChanged(user => {
    if (user) {
      loginButton.style.display = 'none';
      logoutButton.style.display = 'block';
      fetchBooks(); // Fetch books once logged in
    } else {
      loginButton.style.display = 'block';
      logoutButton.style.display = 'none';
    }
  });
  
  // Automatically load books if the user is already logged in when the page loads
  window.onload = function() {
    const user = auth.currentUser;
    if (user) {
      fetchBooks(); // Fetch books if user is signed in
    }
  };
  