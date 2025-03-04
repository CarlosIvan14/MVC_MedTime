from usuario import Usuario
from cita import Cita

class Medico(Usuario):
    def __init__(self, nombre: str, id: int):
        super().__init__(nombre, id, "Medico")
        self.citas = []
    
    def revisar_citas(self):
        return self.citas
    
    def aceptar_cita(self, cita: Cita):
        if cita in self.citas:
            cita.actualizar_estado("Confirmada")
    
    def actualizar_estado_cita(self, cita: Cita, estado: str):
        if cita in self.citas:
            cita.actualizar_estado(estado)