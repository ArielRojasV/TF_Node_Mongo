import express from "express"
import { productRouter } from "./src/routes/productRouter.js"
import { userRouter } from "./src/routes/userRouter.js"
import { connectDB } from "./src/config/mongo.js"
process.loadEnvFile()

const PORT = process.env.PORT
const URI_DB_MONGO  = process.env.URI_DB_MONGO

const app = express()

app.use(express.json())

// /api/products
app.use("/api/products", productRouter)

// Api Usuarios
app.use("/api/users", userRouter)

//Por defecto
app.use("*", (req, res) => {
  res.status(404).json({ error: "Recurso No Encontrado" })
})

//Listen
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)  
    connectDB(URI_DB_MONGO)
  })