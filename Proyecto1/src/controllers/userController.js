
import { userSchemaZod } from "../validators/userValidator.js"
import { User } from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


process.loadEnvFile()
const JWT_SECRET = process.env.JWT_SECRET

// Alta de Usuario
const registerUser = async (req, res) => {

  try {
    const { usuario, email, password } = req.body 

    const validatedData = userSchemaZod.parse({ usuario, email, password })

    const hashedPassword = await bcryptjs.hash(validatedData.password, 10)

    const newUser = new User({ usuario: validatedData.usuario, email: validatedData.email, password: hashedPassword })

    await newUser.save()

    res.status(201).json({ message: "Usuario registrado correctamente"})

  } catch (error) {

    console.log(error)
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos de entrada inválidos", errors: error.errors });
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      return res.status(400).json({ message: "Usuario ya existente." })
    }
    res.status(500).json({ error: "Error interno del servidor" })

  }
}


//Login usuario
const loginUser = async (req, res) => {
  try{
    const { email, password } = req.body 
    
    if (!email || !password) {
      return res.status(400).json({ message: "Falta algúun dato, email o contraseña" })
    }

    const validatedData = userSchemaZod.partial().parse({  email, password })

    const user = await User.findOne({ email: validatedData.email })

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" })
    }

    const isValidPassword = await bcryptjs.compare(validatedData.password, user.password)

    if (!isValidPassword) {
      return res.status(400).json({ message: "Contraseña inválida" })
    }
    
    const payload = { id: user._id, usuario: user.usuario, email: user.email }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })   

    res.json({ user , token})

  }catch(error){
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos de entrada inválidos", errors: error.errors });
    }

    res.status(500).json({ message: "Error interno del servidor", error })
  }
}


export { registerUser , loginUser}

 