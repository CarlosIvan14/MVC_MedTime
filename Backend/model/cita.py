
class Cita:
    ESTADOS = {"Confirmada", "Pendiente", "Cancelada"}
    
    def __init__(self, fecha: str, hora: str, motivo: str, paciente, medico):
        self.fecha = fecha
        self.hora = hora
        self.motivo = motivo
        self.estado = "Pendiente"
        self.paciente = paciente
        self.medico = medico
    
    def actualizar_estado(self, estado: str):
        if estado in self.ESTADOS:
            self.estado = estado
        else:
            raise ValueError("Estado inválido")