from objects.usuario import Usuario

class Medico(Usuario):
    def __init__(self, nombre, apellido, especialidad, telefono, email, id=None):
        super().__init__(nombre, id, "medico") 
        self.apellido = apellido
        self.especialidad = especialidad
        self.telefono = telefono
        self.email = email

    #getters
    
    def get_apellido(self):
        return self.apellido
    
    def get_especialidad(self):
        return self.especialidad
    
    def get_telefono(self):
        return self.telefono
    
    def get_email(self):
        return self.email
    
    #setters
    
    def set_apellido(self, apellido):
        self.apellido = apellido
        
    def set_especialidad(self, especialidad):
        self.especialidad = especialidad
        
    def set_telefono(self, telefono):
        self.telefono = telefono
    
    def set_email(self, email):
        self.email = email
        
    
    def to_dict(self):
        datos = super().to_dict()  
        datos.update({
            "apellido": self.apellido,
            "especialidad": self.especialidad,
            "telefono": self.telefono,
            "email": self.email
        })
        return datos