# devTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

Status : ignored, interested, accepted, rejected

## connectionRequestRouter
//* When sending a new request to a person
- POST /send/request/:status/:userId
Status allowed here would be ["ignored","interested"]

//* When reviewing a request sent to a person
- POST /send/review/:status/:requestId
Status allowed here would be ["accepted","rejected"]

## userRouter
- GET /user/connections
- GET /user/requests - gets all the request the user has received
- GET /user/feed - gets all the other users on the platform