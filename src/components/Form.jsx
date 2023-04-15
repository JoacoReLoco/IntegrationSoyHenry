import { useState } from "react"
import { validar_email, validar_password } from "./validation"
function Form(props){
    const [userData, setUserData] = useState({email:'',password:''})
    const [errors, setErrors] = useState({email:'',password:''})
    const [validInput, setValidInput] = useState(false)
    const [showErrors, setShowErrors] = useState(false)


    function handleChange(e){
        const {name, value} = e.target
        switch(name){
            case "email":
                setUserData({...userData, email:value})
                if (validar_email(value)){
                    setErrors({
                        ...errors,
                        email: ''
                    })
                }
                else{
                    setErrors({
                        ...errors,
                        email: 'Debe ser un email'
                    })

                }
                break
            case "password":
                setUserData({...userData, password:value})
                if (validar_password(value)){
                    setErrors({
                        ...errors,
                        password:''
                    })
                }else{
                    setErrors({
                        ...errors,
                        password:'la contraseña tiene que tener al menos un número. \n la contraseña tiene que tener una longitud entre 6 y 10 caracteres.'
                    })
                }
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        let form_is_valid = true

        if (form_is_valid && userData.email === '') {
            form_is_valid = false;
            setErrors({
                ...errors,
                email: 'Email required'
            })
        } 
        if (form_is_valid && userData.password === ''){
            form_is_valid = false;
            setErrors({
                ...errors,
                password: 'password required'
            })
        }
        if (form_is_valid){
              Object.values(errors).forEach( (value) => {
                  if (value.length > 0) {
                      form_is_valid = false
                  }
              })
          }
        if (form_is_valid) {
            setValidInput(true)
            props.login(userData)
        }
        else setShowErrors(true)
    }
    return(
        <form className="card w-50 mx-auto mt-5" onSubmit={handleSubmit}>
            <div className="m-3">
                <label htmlFor="email" className="form-label">email</label>
                <input type="text" className="form-control" value={userData.email} name="email" onChange={handleChange}></input>
                {showErrors && errors.email ?<div className="alert alert-danger">{errors.email}</div> : null}
            </div>
            <div className="m-3">
                <label htmlFor="password" className="form-label">password</label>
                <input type="password" className="form-control" value={userData.password} name="password" onChange={handleChange}></input>
                {showErrors && errors.password ?<div className="alert alert-danger">{errors.password}</div> : null}
            </div>
            <div className="m-3">
                <button type="subbmit" className="btn btn-primary">subbmit</button>
                {!validInput ? null : <div className="alert alert-success">Formulario enviado con exito</div>}
            </div>
        </form>
    )
}

export default Form