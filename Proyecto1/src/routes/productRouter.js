import {Router} from "express"
import { getAllProducts,  createProduct, getProductByCodigo, updateProduct , deleteProductByCodigo 
        , getReporteProductos, getProductsWithQueryParams} from "../controllers/productController.js"
import { authValidator } from "../middlewares/authValidator.js"

const productRouter = Router()

// apis con validacion por Token
productRouter.use( authValidator )

// Estadisticas Productos
productRouter.get("/reportes", getReporteProductos)

// Uso Parametros Consulta
productRouter.get("/search", getProductsWithQueryParams)

// GET /api/products - Obtiene todos los productos
productRouter.get("/", getAllProducts)

// POST /api/products - Crea un nuevo producto
productRouter.post("/", createProduct);

// Consulta por Codigo
productRouter.get("/:codigo", getProductByCodigo)

// Actualizo Stock y Precio
productRouter.patch("/:codigo", updateProduct)

// Borro Producto
productRouter.delete("/:codigo", deleteProductByCodigo)



export {productRouter }
