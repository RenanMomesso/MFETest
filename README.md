Micro Front End Project
Overview
This project consists of three micro front end applications:

Host Application (MFETest): Integrates the micro front ends.
CreateTodo Parcel: A micro front end for creating new todo items.
ListTodo Parcel: A micro front end for listing todo items.
Getting Started
Host Application (MFETest)
Open the MFETest folder.
Run the following commands:
sh
Copiar código
npm install
npm start
The host application will run on port 9000.
CreateTodo Parcel
Open the createtodo folder.
Run the following commands:
sh
Copiar código
npm install
npm run start --port 8500
ListTodo Parcel
Open the list_todo folder.
Run the following commands:
sh
Copiar código
npm install
npm run start --port 8600
Usage
Go to http://localhost:9000.
You will see all todo lists. You can filter them by "All", "Completed", and "Active".
Click on "Create new todo" to navigate to the createtodo page.
Add a new todo and press "Add" to submit the todo.
