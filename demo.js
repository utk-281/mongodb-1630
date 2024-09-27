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

db.emp.find({ havingInsurance: false });

// { filter part }

//! findOne/find({filter}, {projection})
//! updateOne/Many({filter}, {updating value}, {options})
//? filter part is used to filter out the required documents
//? in updating part we update the documents
//? inside options we have upsert.

//! for updating documents we mainly use the following operators ==>
// $set ==> it is used to update the existing fields and we can also create new fields
// $unset ==> it is used to remove the fields
// $inc ==> it is used to increase or decrease the value of a field
// $max ==> it sets the maximum value of a field
// $min ==> it sets the minimum value of a field

// update the totalHoursWorked of employee with empNo 7521 to 40hrs (updating the existing field)
db.emp.updateOne({ empNo: 7521 }, { $set: { totalHoursWorked: 42 } }, { upsert: true });
db.emp.updateOne({ empNo: 7521 }, { $set: { totalHoursWorked: 40 } });
db.emp.updateOne({ empNo: 7521 }, { $set: { totalHoursWorked: "" } });

// add bonus field to all the employees
db.emp.updateMany({}, { $set: { bonus: 1000 } });

db.emp.updateOne({ empNo: 752146545 }, { $set: { totalHoursWorked: 40 } }, { upsert: true });

// add "bonus" field to the employees who are working as salesman (adding a new field)
db.emp.updateMany({ job: "salesman" }, { $set: { bonus: 1200 } });

db.emp.updateOne({ eName: "utk" }, { $set: { skills: ["nodejs"] } }, { upsert: false });
// { eName: "utk" }, { $set: { skills: ["nodejs"] } this is the provided value .  IF condition did not match, then it will look for upsert

//! whenever we want to update all the present documents then we leave the filter part empty.

// ! ==> if upsert is false : then it will do nothing
// ! ==> if upsert is true : then it will create a new document with the provided value

/* //! {  _id:ObjectId("66ed5f4d11a0c08dd9c73bf9"),
 !         eName:"utk", 
 !         skills:["nodejs"]
 !       } */
//! this is an example of upsert document

// $unset => used to remove a field

// remove the field totalHoursWorked from the employee named "ward"
// syntax ==> {filter}, {$unset: {field-to-be-removed: ""}}
db.emp.updateOne({ eName: "ward" }, { $unset: { totalHoursWorked: "" } });

// we can also remove multiple fields at a time
db.emp.updateOne({ eName: "ward" }, { $unset: { havingInsurance: "", city: "" } });

db.emp.updateOne({ eName: "ward" }, { $unset: { bonus: "" } });

//! $inc ==> syntax ==> ({filter}, {$inc: {field-to-be-updated: +/-value}})
// if we provide positive value then it will increase the value
// if we provide negative value then it will decrease the value

// increase the bonus of employee having mgr as 7698 by 500
db.emp.updateOne({ mgr: 7698 }, { $inc: { bonus: 500 } }); // bonus will be increased by 500, total bonus will be 1000 + 500 = 1700

//! if the field is not present in the document then it will create a new field with the provided value
db.emp.updateOne({ eName: "ward" }, { $inc: { incentive: 10 } });

//! $max and $min ==>
// syntax ==> ({filter}, {$max/$min: {field-to-be-updated: value}})
//? in case of max ==> if the value provided is lesser than the stored value than it will not be updated.
//? in case of min ==> if the value  provided is larger than the stored value than it will not be updated.

// set the maximum bonus of employee named "ward" to 1200
db.emp.updateOne({ eName: "ward" }, { $max: { bonus: 1200 } });

// set the minimum bonus of employee named "ward" to 1000
db.emp.updateOne({ eName: "ward" }, { $min: { bonus: 1500 } });

//! $rename ==> it is used to rename a field
// syntax ==> ({filter}, {$rename: {"oldFieldName": "newFieldName"}})

// rename the field eName to emp_name of all the employees
db.emp.updateMany({}, { $rename: { eName: "emp_name" } });

//! cursor ==> it is a pointer which points to a collection of documents
//! cursor will retrieve the data in batches

//! cursor is a pointer which is returned upon the execution of find(), which points to a collection of documents.

//! 1) cursor.count() ==> it will count the number of documents
db.emp.find().count(); // db.emp.find() ==> it will return a cursor
// count() ==> it is deprecated, instead of count(), we use countDocuments()

// syntax to use countDocuments ==> db.collection-name.countDocuments({})
db.emp.countDocuments();

//! 2) cursor.forEach() ==> this will iterate over the documents
db.emp.find().forEach((doc) => {
  console.log(doc.emp_name, doc.job);
});

//! data modelling ==>  1)  how data is stored  2) what is the relation between the data

// data modelling is the process of defining how data is stored and what is the relation between the data

//! relation between the data
//? mainly 2 types ==>  embed and reference

// embed relation ___________ ==> it is called a single structure or de-normalized model.
//! it can only store data upto 16MB
db.users.insertOne({
  name: "san",
  age: 24,
  address: {
    city: "chennai",
    state: "TN",
  },
  contactDetails: {
    email: "abc@gamil.com",
    phoneNo: 123456789,
  },
});
