const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
    const {name, email, password, gender, number} = req.body;
    try {
        bcrypt.hash(password, 5, async(err, hash) => {
            if(err) {
                res.status(500).send("Internal server error || Error in hashing password")
            }
            const user = new UserModel({name, email, password:hash, gender, number});
            await user.save()
            res.status(200).send({"msg":"User registered successfuly"})
        })
    } catch (error) {
            res.status(500).send("Internal server error || Error in registering user")
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) {
                    res.status(500).send({"msg":"Internal server error || Error in comparing password"})
                }
                if(result) {
                const token = jwt.sign({email: user.email, id: user._id, name: user.name},process.env.JWT_SECRET)
                    res.status(200).send({ "msg":"User logged in successfuly", "token":token})
                } else {
                    res.status(401).send("Your password is incorrect")
                }
            });
        } else {
            res.status(404).send("User not found or invalid credentials")
        }

    } catch (error) {
        res.status(500).send("Internal server error || Error in logging in user", error.message)
    }
};


module.exports = {register, login };