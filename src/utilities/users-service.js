// * We will use a src/utilities/users-service.js module to organize functions used to sign-up, log in, log out, etc.

//* SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)

//* handleSubmit <--> [signUp]-users-service <--> [signUp]-users-api <-Internet-> server.js (Express)

import * as usersApi from './users-api';

//* Get Token
export function getToken() {
    // getItem returns null if there's no string
    const token = localStorage.getItem('token')
    //if theres no token
    if (!token)  return null
    // Obtain the payload of the token
    const payload = JSON.parse(atob(token.split('.')[1]))
    console.log(payload);

    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if(payload.exp < Date.now() / 1000) {
          // Token has expired - remove it from localStorage
        localStorage.removeItem('token');
        return null
    }
    //token is valid
    return token; 
}

//* Get User
export function getUser() {
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

//* SignUp
export async function signUp(userData) {
    // use the signUp users-api function 
     // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    // console.log('[From SignUP function]', userData);
    const token = await usersApi.signUp(userData);

    //save token to local Storage
    localStorage.setItem('token', token);

    return getUser();
}

//* Log Out
export function logOut() {
    localStorage.removeItem('token');

}

export async function login() {
    
}





