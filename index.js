import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs' 


const app = express()

app.use(express.json())
// test router only for testing
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



app.post("/passwordRouting",(req,res)=>{
    // Requiring module


const password = req.body.password;
var hashedPassword;

// Encryption of the string password
bcrypt.genSalt(10, function (err, Salt) {

	// The bcrypt is used for encrypting password.
	bcrypt.hash(password, Salt, function (err, hash) {

		if (err) {
			return console.log('Cannot encrypt');
		}

		hashedPassword = hash;
		console.log(hash);

		bcrypt.compare(password, hashedPassword,
			async function (err, isMatch) {

			// Comparing the original password to
			// encrypted password
			if (isMatch) {
				console.log('Encrypted password is: ', password);
				console.log('Decrypted password is: ', hashedPassword);
			}

			if (!isMatch) {
			
				// If password doesn't match the following
				// message will be sent
				console.log(hashedPassword + ' is not encryption of '
				+ password);
			}
		})
	})
})

})


app.listen(3000, (request, response) => {
    console.log("server started on port 3000");
})