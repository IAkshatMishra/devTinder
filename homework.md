
 - Initialize the repository (done using "npm init")
 - Order of the routes matter a lot


 - Create a free cluster on mongodb official website (MongoDB Atlas)
 - Install mongoose library
 - Connect your application to database "connection-url"/devTinder 
 - Call the connectDB function and connect to your database before getting the server running
 - Create user schema and user model
 - Create a POST /signup API to add data into the database
 - Push some documents into the collection using API calls in POSTMAN
 - Error Handling using try, catch

 - JSON vs JavaScript Object (difference)
 - Add express.json() middleware to your app
 - Make signup api dynamic to receive data from end user
 - User.findOne() with dulipcate email ids, which object is returned
 - API - Get user by email
 - API - Feed API - GET /feed - get all the users from database
 - API - Get user by ID
 - API - Create a delete user API
 - Difference between PATCH and PUT
 - API - to update a user
 - What are the options in Model.findOneAndUpdate() method, explore more about it
 - API - update the user with email ID

 - Explore schematype options from documentation
 - Add required, unique, lowercase, min, minLength, trim, default
 - Create a custom validate for gender
 - Improve the DB schema - put all appropriate validation on each field in schema
 - Add timestamps to the userSchema 
 - Add API level validation on PATCH request and Sign up POST API
 - Data Sanitization - Add API validation for each field
 - Install validator
 - Explore validator library function and use validator funcs for password, email, photoURL
 - NEVER TRUST req.body

 - Validate data in SignUp API (use helper function)
 - Install bcrypt package(used for encryption)
 - Create passwordHash using bcrypt.hash and save the user in encrypted password
 - Create login API
 - Compare passwords and throw errors if email or password is not valid
 - Commit on github "Created login API"

 - Install cookie-parser
 - just send a dummy cookie to user
 - create /GET profile API and check if you get the cookie back
 - install jsonwebtoken
 - In login API after email and password validation, create a JWT token and send it to user in cookie
 - read the cookie inside your profile API and find the logged in user
 - userAuth middleware
 - Add the userAuth middleware in /profile and in a new POST /sendConnectionRequest API
 - Set the expiry of jwt token and cookies to 7 days
 - Create userSchema method to getJWT()
 - Create userSchema method to comparepassword(passwordInputByUser)

 - Explore Tinder APIs
 - Create a list of APIs you can think of in DevTinder
 - Group multiple routes under respective routers
 - Read documentation for express.Router
 - Create routes folder for managing auth,profile,request routers
 - Create authRouter,profileRouter,requestRouter
 - Import these routers in app.js
 - Create POST /logout API
 - Create PATCH /profile/edit API
 - Create PATCH /profile/password API ==> forgot password API
 - Make sure you validate data in all POST,PATCH APIs
 - Git Commit "logout + edit profile APIs"

- Create Connection Request Schema
- Create Send Connection Request API
- Proper validation of data
- Think about all corner cases
- $or query, $and query in mongodb -> https://www.mongodb.com/docs/manual/reference/operator/query/or/
- schema.pre("save") function
- Read more about indexes in mongodb
- Why do we need indexes in DB, advantages and disadvantages of creating indexes
- Read this article about compound indexes -> https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- ALWAYS THINK ABOUT CORNER CASES 

- Write code with proper validation for POST /send/review/:status/:requestId
- Thought process - POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/populate.html
- Create GET /user/requests/received with all the chcecks
- Create GET /user/connections

- Create GET /feed API
- Explore $nin, $and, $ne and other query operators
- Pagination


- Valid URL check for photoURL is disabled for now.

// mongodb - skip(),limit()

/feed?page=1&limit=10 => 1-10 users => .skip(0) & .limit(10)
/feed?page=2&limit=10 => 11-20 users => .skip(10) & .limit(10)
/feed?page=3&limit=10 => 21-30 users => .skip(20) & .limit(10)

skip = (page-1)*limit

