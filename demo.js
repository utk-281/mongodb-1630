//! ARRAYS
// let, const ,var = []

let arr = ["a", "b", "c", true, 12.2, undefined, null, ["string", true]];
// console.log(arr[7][1]);

let arrOfObjects = [
  {
    name: "John",
  },
  { age: 12, class: "7" },
  { email: "email" },
];
// console.log(arrOfObjects[1].class);

//! objects
let obj = {
  name: "John",
  age: 12,
  class: "7",
  email: "email",
  age: 23,
  0: "zero",
  skills: {
    frontend: ["html", "css", "js"],
    backend: ["js", "java", "python"],
  },
};
// console.log(obj.skills.backend[1]);

// https://www.mongodb.com/try/download/community ==> mongodb compass
// https://www.mongodb.com/try/download/shell ==> shell

// https://github.com/utk-281/mongodb-1630

// open excalidraw.com

//! mongoDB ==> mongodb is a no-sql database which stores data in documents (JSON/BSON format). it has dynamic schema, it is flexible, open source, cross-platform.

//! mongodb compass ==> it is a user interface through which we can perform CRUD operations visually.

//! mongodb shell ==> it is a user interface through which we can perform CRUD operations in the terminal.

//! commands for mongosh

//? 1) use database-name
//    ==> this will create a new database
//    ==>  this will be used to switch between existing databases

//? 2) show dbs/ show databases
//    ==> to display all the databases
