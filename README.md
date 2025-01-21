## Proyecto: Creación de APIs de Articulos

El siguiente repositorio contiene una serie de APIs que permiten realizar las operaciones CRUD sobre una entidad de Articulos, los cuales se almacenan en una base de datos MongoDB. 
También se crearon APIs para mostrar ciertas estadísticas sobre los datos cargados y consulta a través de queryparams. 
El proyecto también contiene API para el Alta y la validación sencilla de credenciales de usuarios.
Para el uso de las APIs se utiliza Tokens, que permiten manejar la seguridad de las mismas.

## Configuracion de la solución


1. Modelo de datos en MongoDB

   Hay 2 entidades que se cargan en la base de datos:

   ![image](https://github.com/user-attachments/assets/5c2ce129-09a9-435e-97f4-c8829e27a006)

   ![image](https://github.com/user-attachments/assets/e76c5378-633e-4906-b1b4-76b609822085)



2. Realizar el clonado de este repositorio:
`https://github.com/ArielRojasV/TF_Node_Mongo.git`

## Detalle APIs

createProduct (POST): Alta de articulo en MongoDB.

<img src="https://github.com/user-attachments/assets/9c6b3679-10c8-4ef2-8806-bb63900c2ff3" width="600" height="400">

<br/><br/>

updateProduct (PATCH): Actualizar atributos de articulo. Se usa el código de articulo como identificador único.

<img src="https://github.com/user-attachments/assets/4082db69-325a-4b69-b306-7efa9746fb60" width="600" height="400">

<br/><br/>

deleteProductByCodigo (DELETE): Borro articulo de la base de datos. Se usa el código del articulo como identificador.

<img src="https://github.com/user-attachments/assets/99dd73e1-3b4f-4305-a348-e2ce70020923" width="600" height="400">

<br/><br/>

getProductByCodigo (GET): Busca un producto a partir del código.

<img src="https://github.com/user-attachments/assets/857163e1-e1ee-443f-889b-42705015da04" width="600" height="400">

<br/><br/>

getReporteProductos (GET): Devuelve precio promedio, stock total y cantidad de articulos, agrupados por categoria.

<img src="https://github.com/user-attachments/assets/c6fe81fb-be65-4841-97cb-7b72fd0b7f3d" width="600" height="400">

<br/><br/>

getProductsWithQueryParams (GET): Devuelve los productos que cumplen ciertas condiciones.

<img src="https://github.com/user-attachments/assets/6c5ff7f9-cf4e-4b58-83a7-77dad8cfd3ed" width="600" height="400">

<br/><br/>

getAllProducts (GET): Devuelve todos los productos cargados en la base de datos.



