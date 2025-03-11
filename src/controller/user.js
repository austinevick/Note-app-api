import { generateAccessToken } from "../middleware/ProtectRoute.js";
import UserModel from "../model/User.js";
import bcrypt from 'bcrypt';


export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                status: 400,
                message: 'user already exist'
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new UserModel({
                email: email,
                password: hashedPassword
            });
            const userData = await user.save();
            const data = await UserModel.findOne(userData).select('-password');
            const token = generateAccessToken(data);
            return res.status(200).json({
                status: 200,
                message: 'user created successfully',
                data: data,
                token: token
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({
                status: 400,
                message: 'User doesn\'t exist or account has been deleted'
            });
        } else {
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (!passwordMatch) {
                return res.status(401).json({
                    status: 401,
                    message: 'Invalid username or password'
                });
            }
        }
        const data = await UserModel.findById(existingUser._id).select('-password');
        const token = generateAccessToken(data);
        return res.status(200).json({
            status: 200,
            message: 'User account found',
            data: data,
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
