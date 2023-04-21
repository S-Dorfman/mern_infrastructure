import { useState } from "react";
import { signUp } from "../utilities/users-service";

function SignUpForm({setUser}) {
    //initialize state with form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    })

    //check password and confirm match
    const disable = formData.password !== formData.confirm;
    
    const handleSubmit = async (e) => { 
        // Prevent form from being submitted to the server - prevent refresh and lose data
        e.preventDefault();

        try {
            console.log(formData);
                //save user data to send to backend - to create new user
            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
              }

              //returns a token with the user info
              const user = await signUp(userData);  
              setUser(user);

            } catch (error) {
            setFormData({...formData, error: "Sign Up Failed - Try Again"})
        }
        };

    const handleChange = (evt) => {
        // ...formData(spread operater to keep all form values available otherwise only current one will be)
        // evt.target.name = form name, evt.target.value = form value
        setFormData({...formData, [evt.target.name]: evt.target.value, error: ''})
    };

    return (
     <div>
        <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
            
            <label>Email</label>
            <input type="text" name="email" value={formData.email} onChange={handleChange} required/>
            
            <label>password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
            
            <label>Confirm</label>
            <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required/> 
            
            <button type="submit" disabled={disable}>SIGN UP</button>
        </form>
        </div>

    <p className="error-message">{formData.error}</p>
    </div>

  )
}

export default SignUpForm;