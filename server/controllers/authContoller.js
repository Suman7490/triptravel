import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        })
        await newUser.save()
        res.status(200).json({ success: true, message: 'Successfully created' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create. Try again' })

    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ success: false, message: 'User not found' });

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword)
            return res.status(401).json({ success: false, message: 'Incorrect credentials' });

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role, // 👈 Store role in token
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15d' }
        );

        res.cookie('accessToken', token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false, // use true only in production over HTTPS
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        }).status(200).json({
            success: true,
            message: 'Login successful',
            data: { ...user._doc },
            role: user.role,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to login' });
    }
};
