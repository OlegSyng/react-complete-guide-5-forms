// import {useState} from 'react';

import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const { 
    value: enteredName,
    isValid: enteredNameIsValid, 
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangedHandler, 
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput, 
  } = useInput(value => value.trim() !== '');

  const { 
    value: enteredEmail,
    isValid: enteredEmailIsValid, 
    hasError: emailInputHasError, 
    valueChangeHandler: emailChangedHandler, 
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput, 
  } = useInput(value => value.trim().includes("@"));

  // const [enteredValue, setEnteredValue] = useState({name: '', email: ''});
  // const [enteredValueTouched, setEnteredValueTouched] = useState({name: false, email: false});
  
  // const enteredNameIsValid = enteredValue.name.trim() !== '';
  // const nameInputIsInvalid = !enteredNameIsValid && enteredValueTouched.name;
  // const enteredEmailIsValid = enteredValue.email.trim().includes("@"); 
  // const emailInputIsInvalid = !enteredEmailIsValid && enteredValueTouched.email

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  };

  // const nameInputChangeHandler = (event) => {
  //   setEnteredValue({name: event.target.value, email: enteredValue.email});
  // };
  // const emailInputChangeHandler = (event) => {
  //   setEnteredValue({name: enteredValue.name, email: event.target.value});
  // };
  // const nameInputBlurHandler = (event) => {
  //   setEnteredValueTouched({name: true, email: enteredValueTouched.email})
  // };
  // const emailInputBlurHandler = (event) => {
  //   setEnteredValueTouched({name: enteredValueTouched.name, email: true})
  // };

  const formSubmittionHandler = (event) => {
    event.preventDefault();

    // setEnteredValueTouched({name: true, email: true})

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    };

    console.log(enteredName, enteredEmail);

    // nameInputRef.current.value = '';  =>  NOT IDEAL, DONT MANIPULATE DOM DIRECTLY
    // setEnteredValue({name: '', email: ''});
    // setEnteredValueTouched({name: false, email: false});
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmittionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameChangedHandler} onBlur={nameBlurHandler} value={enteredName} />
        {nameInputHasError && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input type='email' id='email' onChange={emailChangedHandler} onBlur={emailBlurHandler} value={enteredEmail} />
        {emailInputHasError && <p className="error-text">Input should be valid email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
