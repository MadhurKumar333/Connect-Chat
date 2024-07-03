import jwt from 'jsonwebtoken';

//generete token using generateTokenandSetCookie
const generateTokenAndSetCookie = (userId, res) => {
    //creating a tokenn using sign method and sending payload(userid) and our secret
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });
    res.cookie('jwt', token, {
        httpOnly: true,//prevent XSS attacks also called cross-site scripting attacks (user can't access it thi cookie can only be accesed using http only)
        sameSite: 'strict',//to  prevent CSRF attacks cross-site requests forgery attacks
        maxAge: 15 * 24 * 60 * 60 * 1000,//milliseconds
        secure: process.env.NODE_ENV === 'production',//if we are in production mode then it will be true
        });
}
//exporting token
export default generateTokenAndSetCookie;


