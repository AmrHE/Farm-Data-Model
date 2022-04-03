## Farm Data Model & how to use the development setup:


### Quicky Setup:
**Open the command line/Terminal and follow the following steps:**
1. Make sure you have the latest **npm** set on your current machine.

2. Clone the repo in a new folder using the following command
 > git clone https://github.com/AmrHE/Farm-Data-Model.git

3.Navigate to the project directory from your new created folder
 > cd Farm-Data-Model/server
 
4. Install **packages** that run the project.
 > npm install

5. In the project root folder, create .env file & include the below variables
 > NOVE_ENV: and set it initially to **developmet**
 > PORT: any port (5000 for example)
 > DATABASE: your MongoDB URL (create from **MongoDB Cloud**)
 > DATABASE_PASSWORD: your DB password
 > JWT_SECRET: a strong JWT secret
 > JWT_EXPIRES_IN: set it initially to **90d**
 > JWT_COOKIE_EXPIRES_IN: set it initially to **7**
 > EMAIL_FROM: enter your email address
 > EMAIL_SERVICE: set it to **SendGrid**
 > SENDGRID_USERNAME: set it to **apikey**
 > SENDGRID_PASSWORD: your **SendGrid** password
 
4. Run the project in development mode using the following command
 > npm run dev
 
6. Test if the project is running correctly
 > * Using postman, MongoDB Compass, MongoDB Cloud, etc...*


**AmrHE.**
