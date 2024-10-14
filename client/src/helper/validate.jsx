import toast from 'react-hot-toast'

export async function usernameValidate(values){
    const errors = usernameVerify({}, values);
    return errors;
}
export async function resetPasswordValidation(values){
    const errors = resetPassVerify({},values);
    if(values.password != values.confirmpassword){
        errors.exist = toast.error("Password not matched...!")
        return errors;
    }
}
export async function registervalidation(values){
    const errors = usernameVerify({}, values);
    emailVerify(errors,values);
    fullNameVerify(errors,values);
    return errors;

}
export async function profileValidation(values){
    const errors = onlyUsernameVerify({}, values);
    emailVerify(errors,values);
    fullNameVerify(errors,values);
    return errors;
}

// export async function profileregistervalidation(values){
//     const errors = usernameVerify({}, values);
//     emailVerify(errors,values);
//     fullNameVerify(errors,values);
//     return errors;

// }

function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error("Username Required...!");
    }
    else if(values.username.includes(" ")){
        error.username = toast.error("Invalid Username...!")
    }
    if(!values.password){
        error.password = toast.error("Password Required...!");
    }
    else if(values.password.includes(" ")){
        error.password = toast.error("Wrong Password...!");
    }
    else if(values.password.length <4 ){
        error.password = toast.error("Password must be 4 character long...!");
    }

    return error;
}
function onlyUsernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error("Username Required...!");
    }
    else if(values.username.includes(" ")){
        error.username = toast.error("Invalid Username...!")
    }

    return error;
}

function resetPassVerify(error = {}, values){
    
    if(!values.password){
        error.password = toast.error("Password Required...!");
    }
    else if(values.password.includes(" ")){
        error.password = toast.error("Wrong Password...!");
    }
    else if(values.password.length <4 ){
        error.password = toast.error("Password must be 4 character long...!");
    }

    return error;
}
function emailVerify(error = {},values){
    if(!values.email){
        error.email = toast.error("Email Requierd...!")
    }
    
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid Email...!")
    }
    return error;
}

function fullNameVerify(error = {}, values){
    if(!values.fullName){
        error.fullName = toast.error("Full Name Required...!");
    }
    if(values.fullName.length<4){
        error.fullName = toast.error("Full Name Required...!");
    }

    return error;
}



