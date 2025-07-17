
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
