import mongoose from "mongoose" 

const productSchema = new mongoose.Schema({
  cod_producto: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
    },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true,
    default: "Sin Descripcion"
  },
  categoria: {
    type: String,
    trim: true,
    default: "Sin Categoria"
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  stock_disponible: {
    type: Number,
    require: true,
    default: 0,
    min: 0,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  }
}, {
  versionKey: false,
  strict: true
});

productSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("El nombre del producto ya existe."));
  } else {
    next(error);
  }
  next()
});

const Product = mongoose.model("Product", productSchema);

export { Product };