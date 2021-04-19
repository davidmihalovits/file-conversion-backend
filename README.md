SERVER FOR TECH TEST

git clone ...

npm install

npm start (if nodemon is globally installed - otherwise check package.json)

/// Summary ///

Please check my frontend repo of this project for the client code.

1. Used AWS S3 bucket for storing and updating the .shapr files (as objects). S3 is easy to use, secure and there is a huge amount of support on the internet due to its popularity.
2. With the help of multer I could facilitate to upload the file chosen by the user.
3. "replace-ext" is an extremely lightweight library for changing file extensions. There was no real file conversion of course, just a mock extension change.
4. CORS was needed for allowing the server (on Heroku) to communicate with the client (on Netlify).
5. Server was deployed on Heroku. It's extremely easy to set it up. I just had to manually enter the environment variables (from .env) in the Heroku project settings. The .env file is not pushed to the repo for security purposes.
