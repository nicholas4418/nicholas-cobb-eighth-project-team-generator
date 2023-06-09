//Allows the engineer class to inherit from Employee
const Employee = require("./Employee");

//Actives inheritance
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }

}

module.exports = Engineer;