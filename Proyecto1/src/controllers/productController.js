import { Product } from "../models/productModel.js";
import { productSchemaZod } from "../validators/productValidator.js";


// Consultar todos los productos
const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los productos", error: error.message });
    }
}


//Alta productos
const createProduct = async (req, res) => {
    try {
      // Valido cuerpo de la solicitud
      const validatedData = productSchemaZod.parse(req.body);
  
      // Guardo producto
      const newProduct = new Product(validatedData);
      await newProduct.save();
  
      return res.status(201).json(newProduct);

    } catch (error) {

      if (error.name === "ZodError") {
        // Manejo de errores de validación
        return res.status(400).json({ message: "Datos de entrada inválidos", errors: error.errors });
      } else if (error.message === "MongoServerError" && error.code === 11000) {
        // Error de unicidad del codigo
        return res.status(409).json({ message: "El codigo del producto ya existe" });
      } else {
        return res.status(500).json({ message: "Error al crear el producto", error: error.message });
      }

    }
}


//Consulta de producto por codigo
const getProductByCodigo = async (req, res) => {

  const myquery = {cod_producto: req.params.codigo}   

  try {
    const product = await Product.findOne(myquery)
    
    if (!product) {
      return res.status(404).json({ error: "No se encuentra el producto" })
    }

    res.json(product)

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(500).json({ error: "El formato del codigo es incorrecto" })
    }
    res.status(500).json({ message: "Error interno del servidor", error: error.message })
  }
}


//Actualizo atributos del producto
const updateProduct = async (req, res) => {

  const myquery = {cod_producto: req.params.codigo}

  try { 

    const validatedData = productSchemaZod.partial().parse(req.body)
    const updatedProduct = await Product.updateOne(myquery, validatedData, { new: true }) 

    if (!updatedProduct) {
      return res.status(404).json({ error: "No se encuentra el producto" })
    }

    res.json(updatedProduct)

  } catch (error) {

    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos de entrada inválidos", errors: error.errors });
    } else if (error.name === "CastError") {
      return res.status(500).json({ error: "El formato del codigo es incorrecto" })
    } else {
      return res.status(500).json({ message: "Error al modificar el producto", error: error.message });
    }

  }
 
}


//Borro producto por codigo de producto
const deleteProductByCodigo = async (req, res) => {

  const myquery = {cod_producto: req.params.codigo}

  try {
    const deletedProduct = await Product.deleteOne(myquery)

    if (!deletedProduct) {
      return res.status(404).json({ error: "No se encuentra el producto" })
    }

    res.json({ message: `Producto borrado con éxito` })

  } catch (error) {

    if (error.name === "CastError") {
      return res.status(500).json({ error: "El formato del codigo es incorrecto." })
    } else {
      return res.status(500).json({ message: "Error al borrar el producto", error: error.message });
    }

  }
}


// Obtener estaditicas de los productos
const getReporteProductos = async (req, res) => {
  try{
    const stats = await Product.aggregate([
      {
        $group: {
          _id : "$categoria",
          precio_Promedio: { $avg: "$precio" },
          stockdisponible_Total: { $sum: "$stock_disponible" },
          cantidad_Productos: { $sum: 1 }
        }
      }
    ])

    res.json(stats )

  } catch (error) {
    res.status(500).json({ message: "Error al calcular reportes", error: error.message });
  }
}


// Busqueda con Parametros
const getProductsWithQueryParams = async (req, res) => {
  try {
    const { minPrecio, maxPrecio, minStock, maxStock, order = "asc" } = req.query

    const query = {}

     // Filtro por precio
     if (minPrecio) query.precio = { ...query.precio, $gt: +minPrecio }
     if (maxPrecio) query.precio = { ...query.precio, $lt: +maxPrecio }
   
    // Filtro por stock
    if (minStock) query.stock_disponible = { ...query.stock_disponible, $gt: +minStock }
    if (maxStock) query.stock_disponible = { ...query.stock_disponible, $lt: +maxStock }

    const products = await Product.find(query)
     
    res.json(products)

  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error: error.message })
  }
}


export {getAllProducts, createProduct, getProductByCodigo, updateProduct, deleteProductByCodigo, 
        getReporteProductos, getProductsWithQueryParams }