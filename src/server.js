const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const { connectDB } = require('./config/index.js');

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/', viewRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Escuchar en el puerto configurado
app.listen(PORT, err => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log(`Listening on port: ${PORT}`);
  }
});