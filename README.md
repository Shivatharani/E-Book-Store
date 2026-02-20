# E-Book Store 📚

Welcome to the **E-Book Store**, a complete web application designed to browse, discover, and purchase e-books. It features a clean, modern aesthetic with robust authentication and session management.

## 💻 Tech Stack

This project is a traditional monolithic Server-Side Rendered (SSR) full-stack web application. It utilizes the **MEN** stack (MongoDB, Express, Node.js) paired with EJS templating.

*   **Backend Framework:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
*   **Database:** [MongoDB](https://www.mongodb.com/) for unstructured data storage
*   **ODM (Object Data Modeling):** [Mongoose](https://mongoosejs.com/) to interact with MongoDB
*   **Templating Engine:** [EJS (Embedded JavaScript)](https://ejs.co/) to dynamically render frontend HTML
*   **Styling:** Vanilla CSS (`style.css`, `auth.css`) with minimal, responsive, glass-card aesthetics
*   **Session Management:** `express-session` for secure user authentication and cart tracking
*   **Authentication:** `bcrypt` for password hashing

## 🚀 Features

*   **User Authentication:** Secure signup and login flow with encrypted passwords.
*   **Modern UI:** A clean, professional glassmorphism interface.
*   **Dynamic Sidebar:** Seamless navigation across Home, Books, and Authors.
*   **Author Profiles:** Dedicated pages for authors and their books.
*   **Shopping Cart:** Add books to your session-based shopping cart.
*   **Responsive Design:** Fully usable on desktop and mobile devices.

## 🛠️ Installation & Setup

To run this project locally, ensure you have **Node.js** and **MongoDB** installed on your system.

### 1. Clone the Repository
Open your terminal and clone the code:
```bash
git clone https://github.com/Shivatharani/E-Book-Store.git
cd E-Book-Store
```

### 2. Install Dependencies
Install all required Node.js packages:
```bash
npm install
```

### 3. Start MongoDB
Ensure your local MongoDB server is running. By default, the app expects MongoDB to be listening at `mongodb://127.0.0.1:27017/ebook-store`.

### 4. (Optional) Seed the Database
If you want to populate the store with initial mock data (Books, Authors, etc.):
```bash
npm run seed
```

### 5. Start the Server
Launch the application:
```bash
npm start
```

### 6. View in Browser
Open your web browser and navigate to:
```
http://localhost:3001
```

---
*Created with focus on modern aesthetics and robust backend logic.*
