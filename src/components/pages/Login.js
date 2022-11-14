import React from 'react'

const Login = () => {
    return (

      <form action="/auth/login_process" method="post">
            <p><input type="text" name="id" placeholder="id" /></p>
            <p><input type="password" name="password" placeholder="password" /></p>
            <p>
                <input type="submit" value="login" />
            </p>
      </form>
    );
};

export default Login
