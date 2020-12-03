const { id } = require('../../config/mongoose');
const User = require('../../models/users');

function index(req, res) {
    return res.status(200).json({
        success: true
    });
}

async function signup(req, res){
    const{ password, confirm_password : confirmPassword,email,name}= req.body;
    console.log(req.body);

    if (password !== confirmPassword){
        return res.status(500).json({
            error:"Password should match"
        })
    }

    if (!name || !email){
        return res.status(500).json({
            error:"Name and email compulsory"
        })
    }

    const User = await User.findOne ({
        email:email
    })

    try {
        if(!User){
            const createdUser = await User.create({
                name,
                email,
                password
            });
        
            if (createdUser){
                return res.status(201).json({
                    name:createdUser.name,
                    email:createdUser.email,
                    id:createdUser.id,
                    message : "User created successfully"
                })
            }
        
        return res.status(500).json({
            error: "Something went wrong"
        });
        }else{
            return res.status(500).json({
                error : "User already exist!"
            });
        }
        
    }catch(error){
        console.log("signup --> error",error)
        return res.status(500).json({
        error:
        });
    }
}
async function login (req, res){
    const {password, email} = req.body;

    try {
        const User = await User.findOne({email:email});

        if(!User){
            return res.status(500).json({
                error: "Invalid email or password"
            });
        }

        const payloadForjwt = {
            id:User.id,
            name:User.name,
            email:User.email
        }

        const JWT_SECRET = 'secret';

        const jsonData = {
            token : JWT_SECRET.sign(payloadForjwt, JWT_SECRET, {expireIn:'2 days'}),
            message:'signed in successfully',
            success: true
        }
        return res.status(200).json(jsonData);
    }catch(error){
        console.log('login -> error',error);
        return res.status(500).json({
            error:error
        });

    }
}
module.exports={
    index,
    signup,
    login
}