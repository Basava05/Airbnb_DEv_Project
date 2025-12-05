<h1>🏡WanderLust – Airbnb Clone (Full Stack Web Project)</h1>

WanderLust is a full-stack Airbnb-style web application built using Node.js, Express, MongoDB, Mongoose, Passport.js, and EJS.
It allows users to browse listings, create/manage listings, post reviews, authenticate securely, and manage their accounts.

<h2>✨ Features</h2> <h3>🧑‍💻 1. User Authentication</h3>

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

<h3>🏠 2. Listings (CRUD)</h3>

Detail:
Users can create, view, edit, and delete listings.

Implementation:

Routes → /routes/listing.js

Views → /views/listings/ (new, edit, index, show)

Joi validation for safety

Middleware to verify listing owner before edit/delete

Database:

Mongoose model: Listing

<h3>⭐ 3. Reviews System</h3>

Detail:
Users can add and delete reviews for listings.

Implementation:

Nested routes: /listings/:id/reviews

Review model references Listing and User

Joi validation for review content

Populate reviews on listing details page

<h3>🔔 4. Flash Messages</h3>

Detail:
Success/error messages for login, CRUD operations, and validation errors.

Uses:

connect-flash

express-session

<h3>⚠️ 5. Error Handling</h3>

Detail:
Centralized error handler using a custom class.

Includes:

ExpressError class

Error middleware rendering error.ejs

<h3>🛡️ 6. Input Validation</h3>

Prevent invalid listing/review data
Implemented using Joi schemas
Located in: schema.js

<h2>🧰 Tech Stack</h2>

Backend: Node.js, Express.js
Frontend: EJS, EJS-Mate (layouts)
Database: MongoDB, Mongoose
Authentication: Passport.js
Validation: Joi
Utilities: connect-flash, method-override, express-session

<h2>🚀 Getting Started</h2> <h3>🔧 Prerequisites</h3>

Node.js (v14+ recommended)
npm
MongoDB (local or Atlas)

<h3>📥 1. Clone the Repository</h3>

git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

cd YOUR_REPO_NAME

<h3>📦 2. Install Packages</h3>

npm install

<h3>🔐 3. Create .env File</h3>

SECRET=your_session_secret
MONGO_URL=mongodb://127.0.0.1:27017/wanderlust

(Use your Atlas URI if using MongoDB Atlas.)

<h3>🟢 4. Start MongoDB (Local Only)</h3>

mongod

<h3>▶️ 5. Start the Application</h3>

node app.js
or
npx nodemon app.js

<h3>🌍 6. Open in Browser</h3>

http://localhost:8080

<h2>📄 Key Routes Overview</h2> <h3>📌 Listings Routes</h3>

Method | Route | Description
GET | /listings | All listings
GET | /listings/new | New listing form
POST | /listings | Create listing
GET | /listings/:id | View listing
GET | /listings/:id/edit | Edit listing
PUT | /listings/:id | Update listing
DELETE | /listings/:id | Delete listing

<h3>✍️ Reviews Routes</h3>

Method | Route | Description
POST | /listings/:id/reviews | Add review
DELETE | /listings/:id/reviews/:rid | Delete review

<h3>👤 User Authentication Routes</h3>

Method | Route | Description
GET | /register | Registration form
POST | /register | Register user
GET | /login | Login form
POST | /login | Login user
GET | /logout | Logout

<h2>📂 Project Structure<br></h2>

MAJORPROJECT/<br>
├── models/ <br>
├── public/ <br>
│ ├── css/ <br>
│ └── js/ <br>
├── routes/ <br>
│ ├── listing.js <br>
│ ├── review.js <br>
│ └── user.js <br>
├── utils/ <br>
│ ├── ExpressError.js <br>
│ └── wrapAsync.js <br>
├── views/ <br>
│ ├── layouts/ <br>
│ ├── listings/ <br>
│ ├── users/ <br>
│ └── includes/ <br>
├── schema.js <br>
├── app.js <br>
├── .env <br>
├── .gitignore <br>
├── package.json <br>
└── package-lock.json <br>

<h2>🔧 Environment Variables</h2>

Variable | Purpose
SECRET | Session secret
MONGO_URL | MongoDB connection string

Optional (if using Cloudinary):

CLOUDINARY_CLOUD_NAME | Cloud name
CLOUDINARY_KEY | API key
CLOUDINARY_SECRET | API secret

<h2>🛠 Common Commands<br></h2>

Initialize Git<br>
git init<br>
git add .<br>
git commit -m "Initial commit"<br>

Push to GitHub<br>
git branch -M main<br>
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
 <br>
git push -u origin main<br>

<h2>🧪 Troubleshooting</h2>

MongoDB not connecting → ensure mongod is running or URI is correct
Session issues → check .env SECRET
Passport not working → verify passport.initialize() & passport.session()
Validation errors → check Joi schemas in schema.js

<h2>🚀 Future Improvements</h2>

Add Cloudinary image uploads
Add Mapbox / Google Maps
Add pagination and filtering
Convert frontend to React
Deploy to Render / Netlify / Railway
