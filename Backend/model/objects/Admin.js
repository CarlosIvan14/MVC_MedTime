class Admin {
    constructor(id, name, specialty = null, email = null) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = 'Admin';
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

module.exports = Doctor;