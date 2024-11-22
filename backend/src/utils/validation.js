const validator=require("validator");

const validationSignup=(req)=>{

    const {firstName,lastName,emailId,password,age,gender}=req.body;

    if (!firstName || !lastName || !emailId || !password || !age || !gender) {
        throw new Error("All fields are mandatory");
    } else if (!emailId.includes("@") || !emailId.includes(".")) {
        throw new Error("Email is not valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
     
}

module.exports={validationSignup};