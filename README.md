# MedTime - Sistema de Citas Médicas

## Descripción
Sistema de gestión de citas médicas con arquitectura MVC que permite a médicos y pacientes administrar citas de manera eficiente.

## Arquitectura Principal

### Backend (Node.js + Express)
- **Modelos**: Implementación DAO para Citas, Médicos y Pacientes
- **Controladores**: Rutas API para gestión de usuarios y citas
- **Base de datos**: MySQL

### Frontend (React)
- **Vistas**: Login, Dashboard médico, Calendario paciente, Dashboard Nurse
- **Componentes**: Gestión de citas y calendario
- **Estilos**: Tailwind CSS con tema claro/oscuro

## Instalación Rápida


```bash
# Instalar Backend
cd Backend
npm install
npm start

# Instalar Frontend
cd mi-app
npm install
npm start
```


## Características Principales
- ✅ Autenticación por roles (médico/paciente)
- 📅 CRUD completo de citas
- 🗓️ Calendario interactivo
- 📱 Diseño responsive
- 🔄 Estados de cita (Pendiente/Confirmada/Cancelada)

## Stack Tecnológico
| Backend | Frontend |
|---------|----------|
| Node.js | React |
| Express | Tailwind CSS |
| MySQL | React Router |


## Vista LOGIN
![image](https://github.com/user-attachments/assets/2a749599-aea5-4301-960a-1074d4fb1668)

## Vista Paciente
![image](https://github.com/user-attachments/assets/f862bf12-2d2d-4b58-866e-506da097e9e8)

## Vista ver Apointment
![image](https://github.com/user-attachments/assets/063e9fbc-60c6-4767-af17-3991f9cecb2a)

## Vista Agendar Appointment
![image](https://github.com/user-attachments/assets/ef69056f-4cbe-48c7-b300-c90cd465a3ec)

## Vista Doctor
![image](https://github.com/user-attachments/assets/32db1dfc-85e8-4b37-931f-38678c30ecb7)

## Vista Nurse
![image](https://github.com/user-attachments/assets/0a1e9a86-8148-4527-988d-865b1e773ce6)

## Vista Registrar Vitals
![image](https://github.com/user-attachments/assets/fa24e441-9a16-4db2-a296-b0818cbf3b25)

## Equipo de Desarrollo

### Angela Aguilar
- 🔧 Desarrollo del Backend y Modelo de datos
- 📊 Implementación de patrón DAO
- 🧪 Pruebas y Testing
- 📝 Documentación técnica
- 🔄 Integración Frontend-Backend

### Carlos Armenta
- 💻 Desarrollo del Frontend en React
- 🎨 Implementación de UI/UX con Tailwind CSS
- 🔄 Integración Frontend-Backend
- ⚙️ Configuración de base de datos MySQL
- 🔍 Testing de interfaz de usuario
