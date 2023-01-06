# Todo Trello App Backend Api

This Project contains Node API for Todo App. This service connects with trello via
exported public trello APIs.

##Github
https://github.com/AnshulSurana/Todo.git

## Author
Anshul Surana - surana.anshul@gmail.com

#Prerequisites
 - Node >= 18
 - NPM >= 8
 - Either, access to *Epilot-Todo* board on trello (*https://trello.com/b/u4THNyg7/epilot-todo*), or use a new configured trello board and add
  appkey, appname and board name in backend/src/appConfig.js.
 - Vacant port 3000
   
## Reference Documentation 
  - Trello - https://developer.atlassian.com/cloud/trello/rest/api-group-actions/
  - Express - https://expressjs.com/en/4x/api.html
  - Node - https://nodejs.org/dist/latest-v18.x/docs/api/
  - and https://developer.mozilla.org/en-US/

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
  OR follow the following steps for creating your new board to work upon
  - Go to https://trello.com/login and login with your email
  - Go to Create -> create Board -> Board title (enter board title name) and make sure to 
    add two lists namely ToDo and Done names should match.
  - Go to https://trello.com/power-ups/admin/new in order to generate App Keys.
  - Fill out the details and click on Create.
  - Click on Generate on New API  key -> Generate API Key ->
  - In Allowed origins type -> 'http://localhost:3000/' -> click on Add
  - Now add *appKey*, *appSecret*, *boardName* from Trello in the backend/src/appConfig.js file.

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


