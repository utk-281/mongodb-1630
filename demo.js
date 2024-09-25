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
// ==> db.createCollection("collection-name") : explicit way
// ==> db.collection-name.insertOne()/insertMany([]) : implicit way

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
// ! { projection } ==> fields to be displayed ==> field-name-1:1, field-name-2:1
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

// CRUD ==> create , read, delete , update

//? 12) updating a single document
// ==> db.collection-name.updateOne({filter}, {$set:{updating value}}, {options})
db.emp.updateOne({ job: "clerk" }, { $set: { sal: 3000, city: "Noida" } }); // in this example, we updated the existing field and added a new field. All this is done using $set operator.

//? 13) updating multiple documents
// ==> db.collection-name.updateMany({filter}, {$set:{updating value}}, {options})
db.emp.updateMany({ job: "clerk" }, { $set: { city: "Noida" } });

//!======================================= query and projection operators

//!=========================================== comparison operators

//? 1) $eq: equal to (compares the value)
//! find the details of emp ward
db.emp.findOne({ eName: { $eq: "ward" } });
//! find the details of employees working as salesman
db.emp.find({ job: { $eq: "salesman" } }); // explicit comparison ($eq)
db.emp.find({ job: "salesman" }); // implicit comparison

//! create a users collection and insert some data
db.users.insertOne({ name: "john", age: 12 }); // this will create a new collection and insert the data, implicit way of creating a collection.

//! display the eName and job of employees working as salesman
db.emp.find({ job: "salesman" }, { eName: 1, job: 1, _id: 0 });
// inside projection parameter, if we want to display the fields pass 1, if we want to hide the fields pass 0
// when we use projection, automatically _id will be displaying

//! whenever we apply different conditions on the same field, the last condition will be applied
db.emp.find({ deptNo: 20, deptNo: 10 }); // in this case deptNo 10 will be applied

//! details of employees working in dept 10 and 20 each
db.emp.find({ deptNo: { $in: [10, 20] } }); // $in operator displays the document which matches any of the values
// implicit OR operator

db.emp.find({ sal: { $lt: 3000 }, sal: { $gt: 1000 } }); // last condition will get executed

db.emp.find({ deptNo: 10, job: "clerk" }); // implicit AND operator

//!=========================================== logical operators================ ==> whenever we have to check more than one condition we go for logical operators

// and , or , nor , not

//! $and ==> { $and/ $or/ $nor : [ {cond-1}, {cond-2}, {cond-3}, ...... ] }
// details of emp working as clerk in department 10.
db.emp.find({ $and: [{ job: "salesman" }, { deptNo: 10 }] });

// find the details of employees which are not earning more than 1500
//! $not ==> { field-name : {$not : { condition }} }
db.emp.find({ sal: { $not: { $gt: 1500 } } });

// fetching on the basis of nested objects fields
db.users.find({ "address.city": "chennai" });

//fetching on the basis of _id (created by mongoDB) ==> pass the _id field inside ObjectId()
db.users.find({ _id: ObjectId("66f2a8bc569da2e43ac73bfb") });

//fetching on the basis of _id (created by user) ==> pass the _id field directly like any other normal fields
db.users.find({ _id: 1 });

// find the details of users who are from banglore and age is greater than 23
db.users.find({ $and: [{ age: { $gt: 23 } }, { "address.city": { $eq: "banglore" } }] });

// display the sal and eName of employees having salary greater than 1500 and less than 2500
db.emp.find({ $and: [{ sal: { $gt: 1500 } }, { sal: { $lt: 2500 } }] });

db.emp.find({ $nor: [{ sal: { $gt: 1500 } }, { sal: { $lt: 2500 } }] });

db.emp.find({ $and: [{ sal: { $gt: 1500 } }, { sal: { $gt: 2500 } }] });

// find the details of employees who were hired during 1980
db.emp.find({
  $and: [
    { hireDate: { $gte: new Date("1-jan-1980") } },
    { hireDate: { $lte: new Date("31-dec-1980") } },
  ],
});

// find the details of employees working as clerk and were hired after 83
db.emp.find({
  $and: [{ job: "clerk" }, { hireDate: { $gt: new Date("31-dec-1983") } }],
});

//! pattern matching ==> for matching pattern we use $regex
// syntax ==> { field-name : { $regex:/pattern/ } }

//? name starts with letter "a"
db.emp.find({ eName: { $regex: /^a/ } });

//? name ends with letter "n"
db.emp.find({ eName: { $regex: /n$/ } });

//? name has letter "l" in it
db.emp.find({ eName: { $regex: /l/ } });

//? letter "n" is present at third position from starting
db.emp.find({ eName: { $regex: /^..n/ } });

//? letter "e" is at second last position
db.emp.find({ eName: { $regex: /e.$/ } });

//? name has exactly 4 letters
db.emp.find({ eName: { $regex: /^....$/ } });

//? display the details of employees working as clerk in department 20 having a in their name
db.emp.find({ $and: [{ eName: { $regex: /a/ } }, { deptNo: 20 }, { job: "clerk" }] });

// fetching documents from array
//? display the details of users who are having "cricket" as a hobby
db.users.find({ hobbies: "cricket" });

//? display the details of users having hobbies as drawing and music
db.users.find({ hobbies: { $all: ["drawing", "music"] } });

//? display the details of users having front end skills as reactJS
db.users.find({ "skills.frontend": "reactJS" });

//? display the details of users having back end skills as either java or nodeJS
db.users.find({ "skills.backend": { $in: ["java", "nodeJS"] } });

//? display the details of users having back end skills as either java and nodeJS
db.users.find({ "skills.backend": { $all: ["java", "nodeJS"] } });

//? display the details of users having back end skills array size of 2
db.users.find({ "skills.backend": { $size: 2 } });
