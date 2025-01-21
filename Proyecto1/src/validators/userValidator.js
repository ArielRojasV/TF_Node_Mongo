import { z } from "zod"

const userSchemaZod = z.object({
  usuario: z.string({ message: "El nombre debe ser un String" }).trim().min(1, { message: "Nombre Obligatorio" }),
  email: z.string({ message: "El email debe ser un string" }).trim().email({ message: "El correo electrónico debe ser valido" }),
  password: z.string({ message: "La contraseña debe ser un string" }).trim().min(6, { message: "La contraseña debe tener un largo de 6 caracteres como mínimo." })
})

export { userSchemaZod };