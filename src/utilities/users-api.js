//* The users-service.js module will definitely need to make AJAX requests to the Express server.

//*SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)

//* handleSubmit <--> [signUp]-users-service <--> [signUp]-users-api <-Internet-> server.js (Express)


//? SignUp POST function
export async function signUp(userData) {
    const BASE_URL = '/api/users';

    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // makes the JS object to a string to be send over the internet
        body: JSON.stringify(userData) 
    });

    if (res.ok) {
        // JWT Token
        return res.json(); 
    } else {
        throw new Error('Invalid Sign Up!')
    }
}

//? Login Function