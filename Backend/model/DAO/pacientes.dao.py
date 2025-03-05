import sqlite3
from objects.paciente import Paciente

class PacienteDAO:
    def __init__(self, db_path="database.db"):
        self.db_path = db_path

    def conectar(self):
        return sqlite3.connect(self.db_path)

    def crear_tabla(self):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS pacientes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT,
                    apellido TEXT,
                    edad INTEGER,
                    telefono TEXT,
                    email TEXT
                )
            ''')
            conn.commit()

    def insertar(self, paciente: Paciente):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO pacientes (nombre, apellido, edad, telefono, email) VALUES (?, ?, ?, ?, ?)", 
                           (paciente.nombre, paciente.apellido, paciente.edad, paciente.telefono, paciente.email))
            conn.commit()

    def obtener_todos(self):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM pacientes")
            return cursor.fetchall()

    def obtener_por_id(self, paciente_id):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM pacientes WHERE id = ?", (paciente_id,))
            return cursor.fetchone()

    def actualizar(self, paciente_id, nuevo_paciente: Paciente):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE pacientes SET nombre = ?, apellido = ?, edad = ?, telefono = ?, email = ? WHERE id = ?", 
                           (nuevo_paciente.nombre, nuevo_paciente.apellido, nuevo_paciente.edad, nuevo_paciente.telefono, nuevo_paciente.email, paciente_id))
            conn.commit()

    def eliminar(self, paciente_id):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM pacientes WHERE id = ?", (paciente_id,))
            conn.commit()
