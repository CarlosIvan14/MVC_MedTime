from objects.usuario import Usuario

class Paciente(Usuario):
    def __init__(self, nombre, apellido, edad, telefono, email, id=None):
        super().__init__(nombre, id, "paciente")  # Llamamos al constructor de Usuario
        self.apellido = apellido
        self.edad = edad
        self.telefono = telefono
        self.email = email

    # Getters
    
    def get_name(self):
        return self.nombre
    
    def get_apellido(self):
        return self.apellido
    
    def get_edad(self):
        return self.edad
    
    def get_telefono(self):
        return self.telefono
    
    def get_email(self):
        return self.email
    
    # Setters
    
    def set_name(self, nombre):
        self.nombre = nombre
    
    def set_apellido(self, apellido):
        self.apellido = apellido
        
    def set_edad(self, edad):
        self.edad = edad
        
    def set_telefono(self, telefono):
        self.telefono = telefono
        
    def set_email(self, email):
        self.email = email
        
        
    def to_dict(self):
        datos = super().to_dict()  # Obtiene los datos de Usuario
        datos.update({
            "apellido": self.apellido,
            "edad": self.edad,
            "telefono": self.telefono,
            "email": self.email
        })
        return datos
