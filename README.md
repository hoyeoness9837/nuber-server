# nuber-server
Server repository for Nuber-server clone coding applicaiton, 

## Installation & User Direction
Clone the application in your directory, open app in VS code. Then, in terminal, type 'yarn' or 'npm i' to install packages/dependencies. Create and .env file in your root and have TWILIO_SID, TWILIO_PHONE, TWILIO_TOKEN, JWT_TOKEN, MAILGUN_API_KEY All ready. type psql and check you have postgreSQL local database. DROP DATABASE nuber; -> CREATE DATABASE nuber; just to make sure. 
Go to http://localhost:4000/playground, and try queries or mutations to create user, do phone or email authentications request rides edit your profile and so on. 

## Resolvers

### Public Resolvers:
- [x] Sign In and Sign Up with Facebook
- [x] Sign In and Sign Up with Email
- [x] Start Phone number verificiation
- [x] Complete phone number verification

---
### Authentications:
- [x] Generate JWT
- [x] Verify JWT
---

### Private Resolvers:
- [x] Get my profile
- [x] Request Email Verification
- [x] Complete Email Verification
- [x] Update my profile
- [x] Toggle Driving Mode
- [x] Report location / orientation 
- [x] Add place
- [x] Edit place
- [x] Delete place
- [x] Get My places
- [x] See Nearby Drivers
- [x] Subscribe to Nearby Drivers
- [x] Request a Ride
- [x] Get Nearby Rides Requests
- [x] Subscribe to Nearby Ride Requests
- [x] Update Ride Status
- [x] Get Ride
- [x] Subscribe to Ride Status
- [x] Create a Chat room
- [x] Get Chat Room Messages
- [x] Send a Chat Message
- [x] Subscribe to Chat Room Messages