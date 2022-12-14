// Library
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Models
import { UserModel } from '../../database/user/index';

const Router = express.Router();

/*
Route               /auth/signup
Desc                Register new user
Params              none
Access              Public
Method              POST
*/
Router.post("/signup", async (req, res) => {
    try{
        const {email, password, fullName, phoneNumber} = req.body.credentials;
        
        await UserModel.findByEmailAndPhone(req.body.credentials);

        // hash password
        const bcryptSalt = await bcrypt.genSalt(8); // salting
        const hashedPassword = await bcrypt.hash(password, bcryptSalt); // hashing

        // save data to db
        await UserModel.create({
            ...req.body.credentials,
            password: hashedPassword
        });

        // generate JWT auth token
        const token = jwt.sign({user: {fullName, email}}, "ZomatoApp");

        return res.status(200).json({token, status: "success!!"});

    } catch(error){
        return res.status(500).json({ error: error.message });
    }
})

export default Router;