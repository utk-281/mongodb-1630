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
//    ==> this will be used to switch between existing databases

//? 2) show dbs/ show databases
//    ==> to display all the databases

//? 3) create a collection
// ==> db.createCollection("collection-name")

//! create 2 databases namely movies and ratings and inside movies database create a "list" collection and inside ratings databases create a "reviews" collection

//? 4) to delete a collection
// ==> db.collection-name.drop()

//? 5) to display all the collections
// ==> show collections

//? 6) to insert a document
// ==> db.collection-name.insertOne({k1:v1, k2:v2, ........})
// db.teachers.insertOne({ name: "ashwin", subjects: ["html", "css", "js"] });
// db.teachers.insertOne({ name: "chetna", address: "bengaluru" });

// ObjectId('66ed5f4d11a0c08dd9c73bf9') ==> bson type hexadecimal string
// it is unique for each and every document and it will be created whenever we insert a new document.
// size of _id ==> 12 bytes
// ==> first 4 bytes is a timestamp
// ==> next 5 bytes is a random value
// ==> last 3 bytes is an incrementing counter

//? 7) insert multiple documents
// ==> db.createCollection.insertMany([ {} , {} , {} ,......])
db.students.insertMany([
  { name: "John", age: 12 },
  { name: "Vi", age: 23 },
  { name: "Chetna", age: 34 },
]);

//? 8) to fetch/display single document
// db.collection-name.findOne({filter}, {projection}, {options})
db.students.findOne(); // findOne() will return the first document in the collection

// ! { filter } ==> condition
// ! { projection } ==> fields to be displayed
// ! { options } ==> options like sort, skip, limit

//? 9) to display all the documents
// db.collection-name.find({filter}, {projection}, {options}) ==> will give an array
db.teachers.find();

// ! { filter } ==> condition
// ! { projection } ==> fields to be displayed
// ! { options } ==> options like sort, skip, limit

//? 10) delete a document
// ==> db.collection-name.deleteOne({filter})
db.students.deleteOne({});
// ! { filter } ==> condition

//? 11) to delete all documents
// ==> db.collection-name.deleteMany({filter})
db.students.deleteMany({});
// ! { filter } ==> condition
