Installation process

1 - download the zip file from the github and extract

2 - now change directory goto client folder
  - cd client  
  - npm install  // install node modules
  - create the .env file in client folder manually and paste it below variable 
  - REACT_APP_URL=YOUR-URL
  - npm start  // run the react-app

3 - now change directory goto server folder
  - cd server  
  - npm install  // install node modules
  - create the .env file in server folder manually and paste it below variable 
  - MONGO_URI=YOUR-MONGODB-URL
  - JWT_SECRET=YOU-JWT-SECRET-KEY
  - STRIPE_SECRET_KEY=YOUR-STRIPE_SECRET_KEY
  - STRIPE_WEBHOOK_SECRET = YOUR-STRIPE_WEBHOOK_SECRET
  - npm start  // run the server

4 - Now your project can be run on the browser
    
