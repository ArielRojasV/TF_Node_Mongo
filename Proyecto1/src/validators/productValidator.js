import { z } from "zod";

const productSchemaZod = z.object({
  cod_producto: z.number().min(5000, { message: "Debe ingresarse un codigo de producto mayor a 5000" }),
  nombre: z.string({ message: "El nombre debe ser un string" }).trim().min(1, { message: "El nombre es obligatorio" }),
  descripcion: z.string().trim().optional().default("Sin Descripcion"),  
  categoria: z.string().trim().optional().default("Sin Categoria"),  
  precio: z.number().min(1, { message: "El precio debe ser mayor a 1" }),
  stock_disponible: z.number().min(0, { message: "El stock debe ser mayor o igual a 0" }).default(0), 
  unidad_medida: z.string({ message: "La UM es un string" }).trim().min(1, { message: "UM es campo requerido" }), 
  fecha_creacion: z.coerce.date().default(Date.now), 
});

export { productSchemaZod };