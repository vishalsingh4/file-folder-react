# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install` - To install dependencies.
### `npm start` - To run application on localhost - default PORT is 3000.
### `npm build` - To create a production ready build folder.
### `npm eject`  - To alter internal configurations like Webpack, Babel, etc. (Caution: This is a one-way process.)

## Dependencies used:
- Core
    1. React and ReactDOM - For building interactive DOM and its manipulation.
    2. UUID - For generating unique identifiers.

- Dev Dependencies
    1. @testing-library/react - For unit test cases.
    2. SASS - CSS preprocessor.

- Git URL - https://github.com/vishalsingh4/file-folder-react

- Git Branch - main

- Steps to boot the application - 
    1. GIT CLONE using https  - https://github.com/vishalsingh4/file-folder-react.git
    2. npm i
    3. npm start


- General Requirements -
1. There should be a "+" button at the end of every folder - (except node_modules).
2. Clicking a file should do nothing if it does not have any files/folder.
3. Double-clicking a file should make it a folder.
4. Clicking a folder should toggle its expansion and change the + sign to - sign on expansion and vice versa.
5. Clicking the "+" button
    should take the file name from the input box, add it to the required folder and reset the input box.
    should, if the input box is empty, display an alert saying, "Please enter a file name in the input box".
