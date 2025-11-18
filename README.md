🏡 WanderLust – Airbnb Clone (Major Project)

WanderLust is a full-stack Airbnb-style web application built using Node.js, Express, MongoDB, Mongoose, Passport.js, and EJS.
It allows users to create listings, browse listings, add reviews, authenticate securely, and manage their accounts.

✨ Features
1. User Authentication

Detail:
Secure login, logout, and registration system. Certain pages are protected and accessible only to authenticated users.

Implementation:

Passport.js (Local Strategy)

Session-based authentication

Flash messages for feedback

User model using passport-local-mongoose

APIs Used:

User.register()

passport.authenticate()

req.login()

req.logout()

2. Listings (CRUD Functionality)

Detail:
Users can create, view, edit, and delete listings.

Implementation:

Routes located in routes/listing.js

EJS views (new, edit, show, index)

Joi validation for safe data submission

Express middleware to verify ownership before editing or deleting

Database:

MongoDB with Mongoose model Listing

3. Reviews System

Detail:
Users can write reviews for listings and delete their own reviews.

Implementation:

Nested routes under /listings/:id/reviews

Review model with references to Listing & User

Review validation using Joi

Show reviews on listing page using Mongoose populate()

4. Flash Messages

Detail:
UI notifications for success/error during login, editing, creating, or deleting resources.

Uses:

connect-flash

express-session

5. Error Handling

Detail:
Centralized error management with a custom error class.

Includes:

ExpressError class

Global error middleware rendering error.ejs

6. Input Validation

Detail:
Prevent malformed or incomplete requests using Joi schemas.

Location:

schema.js

🧰 Tech Stack

Backend: Node.js, Express.js

Frontend: EJS, EJS-Mate (layouts)

Database: MongoDB, Mongoose

Authentication: Passport.js

Validation: Joi

Utilities: connect-flash, method-override, express-session

🚀 Getting Started
Prerequisites

Node.js (v14+ recommended)

npm

MongoDB (Local or Atlas)

1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

2. Install Packages
npm install

3. Create .env File

Add the following:

SECRET=your_session_secret
MONGO_URL=mongodb://127.0.0.1:27017/wanderlust


(Replace this with your Atlas URI if using MongoDB Atlas.)

4. Start MongoDB (Local Only)
mongod

5. Start the Application
node app.js


or:

npx nodemon app.js

6. Visit the App
http://localhost:8080

📄 Key Routes Overview
Listings
Method	Route	Description
GET	/listings	All listings
GET	/listings/new	New listing form
POST	/listings	Create listing
GET	/listings/:id	View listing
GET	/listings/:id/edit	Edit listing
PUT	/listings/:id	Update
DELETE	/listings/:id	Delete
Reviews
Method	Route	Description
POST	/listings/:id/reviews	Add review
DELETE	/listings/:id/reviews/:rid	Delete review
User Authentication
Method	Route	Description
GET	/register	Registration form
POST	/register	Register user
GET	/login	Login form
POST	/login	Login
GET	/logout	Logout
📂 Project Structure
MAJORPROJECT/
├── models/
├── public/
│   ├── css/
│   └── js/
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
├── schema.js
├── app.js
├── .env
├── .gitignore
├── package.json
└── package-lock.json

🔧 Environment Variables
Variable	Purpose
SECRET	Session secret string
MONGO_URL	MongoDB connection string

Optional (if using Cloudinary later):

Variable	Purpose
CLOUDINARY_CLOUD_NAME	Cloudinary cloud name
CLOUDINARY_KEY	API key
CLOUDINARY_SECRET	API secret
🛠 Common Commands

Initialize Git:

git init
git add .
git commit -m "Initial commit"


Push to GitHub:

git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main

🧪 Troubleshooting

MongoDB not connecting → Ensure mongod is running OR Atlas URI is correct

Session issues → Confirm SECRET in .env is set

Login not working → Ensure passport.initialize() and passport.session() are used

Validation errors → Check Joi rules in schema.js

🚀 Future Improvements

Cloudinary image uploads

Mapbox / Google Maps integration

Pagination, filtering, search

Move to React frontend

Deploy on Render/Netlify/Atlas
