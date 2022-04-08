import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'asd',
    email: 'asd@test.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'zxc',
    email: 'zxc@test.com',
    password: bcrypt.hashSync('zxc', 10),
  },
  {
    name: 'qwe',
    email: 'qwe@test.com',
    password: bcrypt.hashSync('qwe', 10),
  },
]

export default users