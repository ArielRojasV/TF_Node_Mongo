import { Router } from "express" 
import { registerUser } from "../controllers/userController.js"
import { loginUser } from "../controllers/userController.js"

const userRouter = Router ()


// peticiones /api/users

// Registro Usuarios
userRouter.post("/register" , registerUser)

// Logueo Usuarios
userRouter.post("/login", loginUser)

export { userRouter }

