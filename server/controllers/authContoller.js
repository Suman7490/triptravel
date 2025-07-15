import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            photo: req.body.photo
        })
        await newUser.save()
        res.status(200).json({ success: true, message: 'Successfully created' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create. Try again' })
        // 50:12 left
    }
}

export const login = async (req, res) => {
    try {

    } catch (error) {

    }
}