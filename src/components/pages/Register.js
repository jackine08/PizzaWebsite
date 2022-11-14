import React from 'react'

const Register = () => {

    return (

      <form action="/auth/signin_process" method="post">
            <p><input type="text" name="id" placeholder="id" /></p>
            <p><input type="password" name="password" placeholder="password" /></p>
            <p><input type="text" name="name" placeholder="name" /></p>
            <p><input type="number" name="credit" placeholder="credit" /></p>
            <p><input type="number" name="phone" placeholder="phone" /></p>
            <p><input type="text" name="address" placeholder="address" /></p>
            <p>
                <input type="submit" value="signin" />
            </p>
        </form>
    );
};

export default Register
