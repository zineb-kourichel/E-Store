# 📦 E-Store Full Stack Application

## 🧾 Project Description

E-Store is a full-stack e-commerce web application developed as part of a university mini-project.

It simulates an online store where users can:

* Register and login
* Browse products
* Manage a shopping cart
* Place orders
* Leave and view product reviews

The system is built using a layered architecture with:

* Spring Boot (backend)
* React (frontend)
* MySQL (relational database)
* MongoDB (document database)

---

## 👥 Authors

* [https://github.com/zineb-kourichel](https://github.com/zineb-kourichel)
* [https://github.com/Assia-Dahi](https://github.com/Assia-Dahi)

---

## 🚀 Technologies Used

### Backend

* Spring Boot
* Spring Data JPA
* Spring Data MongoDB
* Spring Web (REST API)
* Maven

### Frontend

* React
* Axios
* React Router DOM
* Bootstrap

### Databases

* MySQL
* MongoDB

---

## 🧠 Project Architecture

### Backend Modules

* customer (auth & users)
* catalog (products & categories)
* inventory (stock management)
* shopping (cart system)
* billing (orders)
* review (MongoDB reviews)
* shared (common DTOs/utilities)
* dataloader (test data initialization)

---

### Frontend Structure

* components/
* pages/
* services/
* hooks/
* context/
* routing (React Router)

---

## ⚙️ Setup Instructions

### Backend

```bash
cd estore-backend
mvn spring-boot:run
```

Runs on:

[http://localhost:8080](http://localhost:8080)

---

### Frontend

```bash
cd estore-frontend
npm install
npm start
```

Runs on:

[http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Configuration

### MySQL

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/estore
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
```

### MongoDB

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/estore
```

---

## 📡 API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Products

* GET /api/products
* GET /api/products/{id}

### Cart

* GET /api/cart/{userId}
* POST /api/cart/add
* PUT /api/cart/update
* DELETE /api/cart/remove/{itemId}

### Orders

* POST /api/orders
* GET /api/orders/user/{userId}

### Reviews (MongoDB)

* POST /api/reviews
* GET /api/reviews/product/{productId}

---

## 📥 DataLoader

On startup, the backend automatically inserts:

* Users
* Products
* Categories
* Inventory stock
* Sample reviews

This allows immediate testing without manual setup.

---

## 🧪 Test Accounts

### User

* email: [user@test.com](mailto:user@test.com)
* password: 123456

---

## ⚠️ Notes

* Backend must run before frontend
* MySQL & MongoDB must be running locally
* Stock validation is handled in backend
* APIs tested using Postman

---

## 🏁 Status

✔ Backend completed
✔ React frontend completed
✔ MongoDB reviews integrated
✔ DataLoader implemented
✔ Full system tested
