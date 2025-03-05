class Cita:
    ESTADOS = {"Confirmada", "Pendiente", "Cancelada"}
    
    def __init__(self, fecha: str, hora: str, motivo: str, paciente, medico):
        self.fecha = fecha
        self.hora = hora
        self.motivo = motivo
        self.estado = "Pendiente"
        self.paciente = paciente
        self.medico = medico
    
    #getters
    
    def get_fecha(self):
        return self.fecha
    
    def get_hora(self):
        return self.hora
    
    def get_motivo(self):
        return self.motivo
    
    def get_estado(self):
        return self.estado
    
    def get_paciente(self):
        return self.paciente
    
    def get_medico(self):
        return self.medico
    
    #setters
    
    def set_fecha(self, fecha):
        self.fecha = fecha
        
    def set_hora(self, hora):
        self.hora = hora
        
    def set_motivo(self, motivo):
        self.motivo = motivo
        
    def set_estado(self, estado):
        if estado in self.ESTADOS:
            self.estado = estado
        else:
            raise ValueError(f"El estado {estado} no es válido")
        
    def set_paciente(self, paciente):
        self.paciente = paciente
        
    def set_medico(self, medico):
        self.medico = medico
        
        
    def to_dict(self):
        return {
            "fecha": self.fecha,
            "hora": self.hora,
            "motivo": self.motivo,
            "estado": self.estado,
            "paciente": self.paciente,
            "medico": self.medico
        }