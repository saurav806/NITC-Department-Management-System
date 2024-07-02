require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const router = require("./router/auth-router");
const facultyRouter = require("./router/faculty-router");
const projectRoute = require("./router/project-router");
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");

const errorMiddleware = require('./middlewares/error-middleware');

// Handling cors policy here

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth",router);

//Defining faculty router
app.use("/api/auth",facultyRouter);

// Defining projects routes here
app.use("/api", projectRoute);


// Defining Admin route
app.use("/api/admin", adminRoute);


app.use(errorMiddleware);

connectDB().then( () => {
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`)
    });
});