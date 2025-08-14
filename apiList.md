# devTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /porfile/view
- PATCH /profile/edit
- PATCH /profile/password

Status : ignore, interested, accepted, rejected

## connectionRequestRouter
//* When sending a new request to a person
- POST /send/request/interested/:userId
- POST /send/request/ignored/:userId
//* When reviewing a request sent to a person
- POST /send/review/accepted/:requestId
- POST /send/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests - gets all the request the user has received
- GET /user/feed - gets all the other users on the platform