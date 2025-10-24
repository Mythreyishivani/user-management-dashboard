                                User Management Dashboard

A full-stack User Management Dashboard that allows you to add, edit, view, and delete user information through a clean and responsive interface. The project is divided into two main directories:

backend – Node.js + Express.js REST API
frontend – React.js web application

Features

1.Responsive and intuitive user interface
2.Add new users with detailed information (name, email, phone, company, address, job title, department, geo-coordinates)
3.Edit existing user details
4.View user information in a structured layout
5.Delete users when needed
6.Dynamic table with action icons (View, Edit, Delete)
7.Fully integrated backend API for seamless operations

Tech Stack

* Frontend:

React.js – UI development
Bootstrap 5 – Responsive styling
Axios – API requests
React Icons – Action buttons

* Backend:
Node.js + Express.js – REST API server
Sequelize ORM – Database management
PostgreSQL – Relational database
dotenv – Environment variable management

Setup Instructions
1. Clone the repository
git clone https://github.com/<your-username>/user-management-dashboard.git
cd user-management-dashboard

2. Backend Setup
cd backend
npm install


Create a .env file in the backend folder with the following variables:

PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=user_management
DB_DIALECT=postgres


Start the backend server:

node app.js

3. Frontend Setup
cd ../frontend
npm install
npm start


The frontend will run at http://localhost:3000

Make sure both backend and frontend are running simultaneously.


How It Works

The React frontend communicates with the Node.js backend via REST APIs.
The backend handles all CRUD operations for user data.
User information is stored in a PostgreSQL database, including details such as name, email, phone, company, address, job title, department, and geo-coordinates.
The dashboard updates dynamically, reflecting changes instantly in the UI.


Screenshots

![Dashboard View](frontend/screenshots/dashboard.png)
![Create User Page](frontend/screenshots/create-user.png)



Mythreyi Shivani M
GitHub: https://github.com/Mythreyishivani
Email: mythreyi1703@gmail.com