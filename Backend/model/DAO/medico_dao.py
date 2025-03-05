import sqlite3
from objects.medico import Medico

class MedicoDAO:
    def __init__(self, db_path="database.db"):
        self.db_path = db_path

    def conectar(self):
        return sqlite3.connect(self.db_path)

    def crear_tabla(self):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS medicos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT,
                    apellido TEXT,
                    especialidad TEXT,
                    telefono TEXT,
                    email TEXT
                )
            ''')
            conn.commit()

    def insertar(self, medico: Medico):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO medicos (nombre, apellido, especialidad, telefono, email) VALUES (?, ?, ?, ?, ?)", 
                           (medico.nombre, medico.apellido, medico.especialidad, medico.telefono, medico.email))
            conn.commit()

    def obtener_todos(self):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM medicos")
            return cursor.fetchall()

    def obtener_por_id(self, medico_id):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM medicos WHERE id = ?", (medico_id,))
            return cursor.fetchone()

    def actualizar(self, medico_id, nuevo_medico: Medico):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE medicos SET nombre = ?, apellido = ?, especialidad = ?, telefono = ?, email = ? WHERE id = ?", 
                           (nuevo_medico.nombre, nuevo_medico.apellido, nuevo_medico.especialidad, nuevo_medico.telefono, nuevo_medico.email, medico_id))
            conn.commit()

    def eliminar(self, medico_id):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM medicos WHERE id = ?", (medico_id,))
            conn.commit()
