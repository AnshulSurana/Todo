# Epilot Todo - Trello Backend Api

This Project contains Node API for Epilot Todo App. This service connects with trello via
exported public trello APIs.

##Github

## Author
Anshul Surana - surana.anshul@gmail.com

#Prerequisites
 - Node >= 18
 - NPM >= 8
 - Either, access to Epilot-Todo board on trello, or a new configured trello board with
  appkey, appname and board name.

## Building and Running
    npm install
    npm start

## Unit Tests
    npm run test

The Test report is present in __tests__ test-report.html file which can be viewed in browser.

# Flow Description

- This is Node js Backend so prerequisites must be respected.
- Upon cloning the project from Github, please run the build and run commands in sequence.
- For Login to Trello Account and access the Board
  Either, the requesting Party must have access to the board - (you can send the email id to me for giving access)
  OR, need to configure in /src/appConfig.js
  - appKey 
  - appSecret
  - boardName of your own Trello Board in /src/appConfig.js.
- 
on Successful login :star_struck: :+1:, 
the app is re-routed to application home page.
where Cards from Todo list and Done List are being fetched.

On Npm Start the express server is launched at port 3000.
to check health use 

* *GET /health* endpoint

for fetching only BE api requests and login use

* *GET /* endpoint

#Endpoints

* *GET getCardsInTodoList*

* *GET getCardsInDoneList*

For Updating the card to move to Done list from TODO list

* *PUT markTaskAsDone*

For Creating new task

* *POST createNewTask*

For Deleting Tasks from Done List

* *DELETE deleteCard*


