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
module.exports={
    index,
    signup
}