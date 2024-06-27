const { Book } = require("./model/BookModel");
const { books } = require("./data.js");
const connectToDb = require("./Config/db.js");
const dotenv = require("dotenv").config()

// connect to DB
connectToDb()
let importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("books has been imported");
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

let removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("books has been remove");
  } catch (error) {
    console.log(error);
process.exit(1)
}
};

if (process.argv[2]=="-import"){
importBooks()
}

if (process.argv[2]=="-remove"){
removeBooks()
}



