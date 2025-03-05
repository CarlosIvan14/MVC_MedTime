class Patient {
    constructor(id, name, email, password = null) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = 'paciente';
    }

    static fromDAO(daoResult) {
        return new Patient(
            daoResult.id,
            daoResult.name,
            daoResult.email
        );
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role
        };
    }
}

module.exports = Patient;