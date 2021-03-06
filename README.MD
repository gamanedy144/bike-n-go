#Bike N Go Web Application

#This project implements a Bike Rental service through a Web Application

Created react app by using `npx create-react-app`.
Create HomeScreen and ProductScreen.

Install `react-router-dom`, `react-router-bootstrap`, `react-bootstrap` and `bootstrap`.

Set up server in backend folder with NodeJS.
Set up proxy for backend communication in package.json in frontend folder to "proxy" : "http://localhost:5000" and solve issues by running `npm audit fix --force`

Create components for Product and Rating
Use Card, Row and Col elements from react-bootstrap for better styles

Create Product details screen
Use Helmet to modify title of pages according to items, installed with `npm i react-helmet-async`
Changed pictures with higher quality ones so these would scale better

Create LoadingBox and MessageBox components and use troughout the application
Create utils.js to manange error messages

Create React Context and Store provider
Implement add to cart functionality

Complete add to cart functionality
Check if the stock is sufficient for the order

Create Cart screen to show the booked products

Create Signin Screen

Connect to the MongoDB local database

Create Product and User model
Create seed route for sampling products

Create and seed sample users

Create signing api

Complete signin screen

Created and fixed functionality for CartScreen
Updated NavBar to hold all the necessary links
Create Stores screen
Create PlaceOrder screen
Justify the navbar items properly according to the design

Created Order Screen + bug fixing

Create OrderHistory Screen

Create user profile screen

Create Products search screen

Update Typo and add responsive width for navigation iframe

How to run - clone repository locally
Open terminal into backend folder and run `npm start`
Open terminat into frontent folder and run `npm start`
Open another browser tab and go to http://localhost:5000/api/seed to load the application
Enjoy!
