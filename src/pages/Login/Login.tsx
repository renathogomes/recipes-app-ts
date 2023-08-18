import { useState } from 'react';
import style from './Login.module.css';

function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const validateEmail = /\S+@\S+\.\S+/;

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((validateEmail.test(inputEmail)) && (inputPass.length > 6)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setInputEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((validateEmail.test(inputEmail)) && (inputPass.length + 1 >= 6)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setInputPass(e.target.value);
  };

  return (
    <div className={ style.container }>
      <h1 className={ style.heading }>Login</h1>
      <input
        className={ style.inputLogin }
        type="email"
        data-testid="email-input"
        onChange={ handleChangeEmail }
      />
      <input
        className={ style.inputLogin }
        type="password"
        data-testid="password-input"
        onChange={ handleChangePassword }
      />
      <button
        className={ style.btnLogin }
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
