import bcrypt from "bcryptjs"
const users=[
    {
        name:"abdnahid",
        email:"abd@test.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:true
    },
    {
        name:"qwe",
        email:"qwe@test.com",
        password:bcrypt.hashSync("qwezxc",10)
    },
    {
        name:"zxcahid",
        email:"zxc@test.com",
        password:bcrypt.hashSync("zxcqwe",10)
    }
    
]

export default users