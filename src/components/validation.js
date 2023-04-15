

function validar_email(mail){
    var emailPattern = /\S+@\S+\.\S+/; // Expresion Regular para validar Emails.
    return emailPattern.test(mail)
}

function validar_password(pw){
    var passwordPattern = /^(?=.*\d).{6,10}$/
    return passwordPattern.test(pw)
}

export {validar_email, validar_password}