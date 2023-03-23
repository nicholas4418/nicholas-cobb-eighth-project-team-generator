//Allows the Intern class to inherit from Employee
const Employee = require("./Employee");

//Actives inheritance
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }

}

module.exports = Intern;