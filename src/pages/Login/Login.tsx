import style from './Login.module.css';

function Login() {
  return (
    <div className={ style.container }>
      <input
        className={ style.inputLogin }
        type="email"
        data-testid="email-input"
      />
      <input
        className={ style.inputLogin }
        type="password"
        data-testid="password-input"
      />
      <button
        className={ style.btnLogin }
        type="submit"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
