import sqlite3
from objects.cita import Cita

class CitaDAO:
    def __init__(self, db_path="database.db"):
        self.db_path = db_path

    def conectar(self):
        return sqlite3.connect(self.db_path)

    def crear_tabla(self):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS citas (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    fecha TEXT,
                    hora TEXT,
                    motivo TEXT,
                    estado TEXT,
                    paciente_id INTEGER,
                    medico_id INTEGER
                )
            ''')
            conn.commit()

    def insertar(self, cita: Cita):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO citas (fecha, hora, motivo, estado, paciente_id, medico_id) VALUES (?, ?, ?, ?, ?, ?)", 
                           (cita.fecha, cita.hora, cita.motivo, cita.estado, cita.paciente, cita.medico))
            conn.commit()
    
    def obtener_todas(self):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM citas")
            return cursor.fetchall()

    def actualizar_estado(self, cita_id, nuevo_estado):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE citas SET estado = ? WHERE id = ?", (nuevo_estado, cita_id))
            conn.commit()

    def eliminar(self, cita_id):
        with self.conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM citas WHERE id = ?", (cita_id,))
            conn.commit()
