# Fetch FE Coding Challenge

To run the site: in the project directory, run `npm install` then `npm start`.

To run tests: use `npm test`. If prompted, press `a` to run all tests.

#### A CORS issue
The CORS configuration in the S3 bucket where hiring.json in stored blocked
me from fetching the file within my app. To solve this, I uploaded the file to my
own S3 bucket, and set CORS rules to allow GET requests from any origin.