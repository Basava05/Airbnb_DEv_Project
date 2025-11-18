#🏡 WanderLust – Airbnb Clone (Major Project)

WanderLust is a full-stack Airbnb-style web application built using Node.js, Express, MongoDB, Mongoose, Passport.js, and EJS.
It allows users to browse listings, create/manage listings, post reviews, authenticate securely, and manage their accounts.

✨ Features
🧑‍💻 1. User Authentication

Detail:
Secure login, registration, and logout. Protected routes ensure only logged-in users can create/edit/delete listings or write reviews.

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

🏠 2. Listings (CRUD)

Detail:
Users can create, view, edit, and delete listings.

Implementation:

Routes → /routes/listing.js

Views → /views/listings/ (new, edit, index, show)

Joi validation for safety

Middleware to verify listing owner before edit/delete

Database:

Mongoose model: Listing

⭐ 3. Reviews System

Detail:
Users can add and delete reviews for listings.

Implementation:

Nested routes: /listings/:id/reviews

Review model references Listing and User

Joi validation for review content

Populate reviews on listing details page

🔔 4. Flash Messages

Detail:
Success/error messages for login, CRUD operations, and validation errors.

Uses:

connect-flash

express-session

⚠️ 5. Error Handling

Detail:
Centralized error handler using a custom class.

Includes:

ExpressError class

Error middleware rendering error.ejs

🛡️ 6. Input Validation

Prevent invalid listing/review data

Implemented using Joi schemas

Located in: schema.js

🧰 Tech Stack

Backend: Node.js, Express.js
Frontend: EJS, EJS-Mate (layouts)
Database: MongoDB, Mongoose
Authentication: Passport.js
Validation: Joi
Utilities: connect-flash, method-override, express-session

🚀 Getting Started
🔧 Prerequisites

Node.js (v14+ recommended)

npm

MongoDB (local or Atlas)

📥 1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

📦 2. Install Packages
npm install

🔐 3. Create .env File
SECRET=your_session_secret
MONGO_URL=mongodb://127.0.0.1:27017/wanderlust


(Use your Atlas URI if using MongoDB Atlas.)

🟢 4. Start MongoDB (Local Only)
mongod

▶️ 5. Start the Application
node app.js


or

npx nodemon app.js

🌍 6. Open in Browser
http://localhost:8080

📄 Key Routes Overview
📌 Listings Routes
Method	Route	Description
GET	/listings	All listings
GET	/listings/new	New listing form
POST	/listings	Create listing
GET	/listings/:id	View listing
GET	/listings/:id/edit	Edit listing
PUT	/listings/:id	Update listing
DELETE	/listings/:id	Delete listing
✍️ Reviews Routes
Method	Route	Description
POST	/listings/:id/reviews	Add review
DELETE	/listings/:id/reviews/:rid	Delete review
👤 User Authentication Routes
Method	Route	Description
GET	/register	Registration form
POST	/register	Register user
GET	/login	Login form
POST	/login	Login user
GET	/logout	Logout
📂 Project Structure<br>
MAJORPROJECT/<br>
├── models/ <br>
├── public/ <br>
│   ├── css/ <br>
│   └── js/ <br>
├── routes/ <br>
│   ├── listing.js <br>
│   ├── review.js <br>
│   └── user.js <br>
├── utils/ <br>
│   ├── ExpressError.js <br>
│   └── wrapAsync.js <br>
├── views/ <br> 
│   ├── layouts/ <br>
│   ├── listings/ <br>
│   ├── users/ <br>
│   └── includes/ <br>
├── schema.js <br>
├── app.js <br>
├── .env <br>
├── .gitignore <br>
├── package.json <br>
└── package-lock.json <br>

🔧 Environment Variables
Variable	Purpose
SECRET	Session secret
MONGO_URL	MongoDB connection string
Optional (if using Cloudinary):
Variable	Purpose
CLOUDINARY_CLOUD_NAME	Cloud name
CLOUDINARY_KEY	API key
CLOUDINARY_SECRET	API secret
🛠 Common Commands
Initialize Git
git init
git add .
git commit -m "Initial commit"

Push to GitHub
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main

🧪 Troubleshooting

MongoDB not connecting → ensure mongod is running or URI is correct

Session issues → check .env SECRET

Passport not working → verify passport.initialize() & passport.session()

Validation errors → check Joi schemas in schema.js

🚀 Future Improvements

Add Cloudinary image uploads

Add Mapbox / Google Maps

Add pagination and filtering

Convert frontend to React

Deploy to Render / Netlify / Railway
