const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const server = express();
const mongoose=require("mongoose");
require("dotenv").config();
const teacherroute=require("./Routes/teacherRouter");
const classroute=require("./Routes/classRouter");
const childroute=require("./Routes/childRouter");
const authroute=require("./Routes/authenticationRoute");
const authMW=require("./MiddleWares/authMW");
const swaggerjsdoc=require("swagger-jsdoc");
const swaggerui=require("swagger-ui-express");

//2- listen to port Number
const port=process.env.PORT||8080;
server.use(morgan("dev"));
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Nursery project api doc",
            version:"0.1",
            description:"this is simple Nursery API application made with Express and documented with Swagger"
        },
        servers:[
            {
                url:"http://localhost:8080",
            },
        ],
    },
    apis:["./route/*.js"],
};
const spacs =swaggerjsdoc(options);

//db connect
mongoose.connect(process.env.db_URL)
.then(()=>{
    console.log("DB connected .... ");
    server.listen(port,()=>{
        console.log("I am listening.........",port);
    });
})
.catch((error)=>{
    console.log("DB connection Problem "+error);
})
//------------------  Build Server---------------------------------------------
server.use("/api-docs",swaggerui.serve,swaggerui.setup(spacs));
server.use((request,response,next)=>{
    console.log("First use function", request.url,request.method);
   
    next();
});

//--------------- settings
const corsOptions = {
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

server.use(cors(corsOptions));


server.use(express.json());

server.use(authroute);
server.use(authMW);

server.use(teacherroute);
server.use(classroute);
server.use(childroute);

// Not Found
server.use((request, response) => {
    response.status(404).json({ message: "Not Found" });
});

// Error 
server.use((error, request, response, next) => {
    response.status(500).json({ message: error+"" });
});




