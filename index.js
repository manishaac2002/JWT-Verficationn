import express, { request, response } from "express";
import jwt from "jsonwebtoken"

const app = express()


app.get('/api', (request, response) => {
    response.json({
        message: "Hey I'm there ! Welcome to this API service"
    })
})

app.post('/api/login', (request, response) => {
    const user = {
        id: 1,
        username: "Manisha",
        email: 'manisha@gmail.com'
    }
    
    jwt.sign({user : user}, "secretkey",(error,token) =>{
        response.json({
            token,
        })
    })          
})


app.listen(3000, (request, response) => {
    console.log("server started on port 3000");
})