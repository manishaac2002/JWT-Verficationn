import express from "express"
import jwt from "jsonwebtoken"

const app = express()
// test router
app.get('/api', (request, response) => {
    response.json({
        message: "Hey I'm there ! Welcome to this API service"
    })
})
app.post('/api/posts', verifyToken, (request, response) => {
    
    console.log(request.token);

    jwt.verify(request.token, 'secretkey', (error, authData) => {
        
        if (error) {
            console.log(error);
            response.sendStatus(403)
        } else {
            response.json({
                message: "Posts created...!",
                authData,
            })
        }
    })
})

app.post('/api/login', (request, response) => {
    const user = {
        id: 1,
        username: "Manisha",
        email: 'manisha@gmail.com'
    }

    jwt.sign({ user: user }, "secretkey", (error, token) => {
        console.log("Token generated here.... ");
        console.log(token);
        response.json({token})
    })
})

function verifyToken(request, response, next) {
    console.log("Validate the token here.. ");
    console.log(request.headers['authorization']);
    const bearerHeader = request.headers['authorization']
    console.log(typeof bearerHeader);
    if (typeof bearerHeader != "undefined") {
        console.log("------------------------------------------");
        const bearerToken = bearerHeader.split(" ")[1]
        console.log(bearerToken);
        request.token = bearerToken
        next()
    } else {
    
        response.sendStatus(403) //forbidden
    }
}


app.listen(3000, (request, response) => {
    console.log("server started on port 3000");
})