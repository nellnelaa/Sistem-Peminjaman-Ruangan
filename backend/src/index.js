const express = require("express");
require("dotenv").config();
require("express-async-errors");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const router = require("./routes");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");

const app = express();
const port = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

app.use(fileUpload());

app.get("/", (req, res) => {
  res.send(`Welcome to Sipresmaru!`);
});

app.use("/", router);

app.use("*", notFoundURLHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




// repositories - services - controller - middlewares - routes

// 1. index yang berhubungan dengan data pindahin ke repositories
// contohnya pas cari id di data student, nyimpen ke data student
// bikin export.studentUpdate

//2. pergi ke service, bikin export.studentUpdate (function yang baru di bikin di repository)
// cari id yang mau di edit, kirimkan data yang dibutuhkan juga (id,data)

// 3. pergi ke controller, bikin logika update, panggil function updateStudent

// 4. pergi ke middlewares, bikin validasi, pindahin semua validasi dari index
// tambahin next paling bawah

//5. pergi ke routes, bikin route dengan method put.
// masukan validateUpdateStudent, dan updateStudent(yang controllers, karena langkahnya abis route ke controllers)

///////////////////////////////////////////////////

// routes - middlewares - controller - services - repositories

// pertama dari index, bakal ngebaca route
// masuk ke index di route, ngebaca router student, dan masuk ke sub route yaitu students.js
//bakal ke middleware untuk validasi, jika validasi lancarakan next, kemabli ke router
// setelah kemabli ke router dan next akan membaca function untuk mengelola data
// bakal di arahin ke controller, dan jika function berjalan lancar akan mengembalikan succesresponse yang ada di utils
