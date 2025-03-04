from usuario import Usuario
from cita import Cita

class Paciente(Usuario):
    def __init__(self, nombre: str, id: int):
        super().__init__(nombre, id, "Paciente")
        self.citas = []
    
    def agendar_cita(self, cita: Cita):
        self.citas.append(cita)
        cita.medico.citas.append(cita)
    
    def ver_citas(self):
        return self.citas