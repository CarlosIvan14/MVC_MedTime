class Usuario:
    def __init__(self, nombre: str, id: int = None, rol: str = "usuario"):
        self.nombre = nombre
        self.id = id
        self.rol = rol

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "rol": self.rol
        }





