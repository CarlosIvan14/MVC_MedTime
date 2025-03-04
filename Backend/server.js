  const express = require('express');
  const cors = require('cors');
  const app = express();
  const authRoutes = require('./routes/authRoutes');
  const appointmentRoutes = require('./routes/appointmentRoutes');

  app.use(cors());
  app.use(express.json());

  // Rutas
  app.use('/api/auth', authRoutes);
  app.use('/api/appointments', appointmentRoutes);

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
