import * as Express from 'express'

const UserRoute = Express.Router()

import createUser from '../controllers/Users/createuser.controller'
import GetAll from '../controllers/Users/GetAll.controller'
import getOne from '../controllers/Users/getOne.controller'
import Auth from '../controllers/Users/auth.controller'

import Login from '../controllers/Users/login.controller'

UserRoute.post('/' , createUser)
UserRoute.post('/login' , Login)
UserRoute.get('/all' , GetAll)
UserRoute.post('/b' , getOne)
UserRoute.post("/auth", Auth)

export default UserRoute