module.exports.signUpErrors = (err) => {
    let errors = {username: '', password:''}

    if(err.message.includes('username'))
        errors.username = "nom trop court";


    if(err.message.includes('password'))
        errors.password = "mot de passe trop court";
    
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('username')){
        errors.username = 'ce nom existe déjà';
    }
    
    return errors
}

module.exports.signInErrors = (err) => {
    let errors = {username:'', password:''}

    if(err.message.includes('username'))
        errors.username = "nom inconnu";

    if(err.message.includes('password'))
        errors.password = "mot de passe incorrecte";    

    return errors
}
