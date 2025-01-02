/* eslint-disable no-useless-escape */
const checkValidData = (email, password, username) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const usernameRegex = /^[a-zA-Z]+(?:[-' ][a-zA-Z]+)* [a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/.test(username);
    return {emailRegex, passwordRegex, usernameRegex}
}

export default checkValidData