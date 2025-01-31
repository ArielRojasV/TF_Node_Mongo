import mongoose from "mongoose" 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI_DB_MONGO);
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

export { connectDB };