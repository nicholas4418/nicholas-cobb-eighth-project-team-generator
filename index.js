const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
const Engineer = require("./lib/engineer");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const output = path.join(OUTPUT_DIR, "The Team.html");

//Array to hold user inputs
const empArray = [];

function managerQuestions() {
    inquirer.prompt ([
    
        {
          type: "input",
          name: "managerName",
          message: "Please enter the manager's name: "
        },
    
        {
          type: "input",
          name: "managerID",
          message: "Please enter the manager's employee ID number: "
        },
    
        {
          type: "input",
          name: "managerEmail",
          message: "Please enter the manager's email address: "
        },
    
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "Please enter the manager's office number: "
        }

         ]).then(answers => {
    const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
    teamArray.push(manager);
    createTeam();
  })
}

function engineerQuestions() {
    inquirer.prompt([
      
      {
        type: "input",
        name: "engineerName",
        message: "Please enter the engineer's name: "
      },

      {
        type: "input",
        name: "engineerID",
        message: "Please enter the engineer's employee ID number: " 
      },

      {
        type: "input",
        name: "engineerEmail",
        message: "Please enter the engineer's email address: "
      },

      {
        type: "input",
        name: "engineerGitHub",
        message: "Please enter the engineer's GitHub username: "
      }

    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamArray.push(engineer);
      createTeam();
    });

  }

  function internQuestions() {
    inquirer.prompt([
      
      {
        type: "input",
        name: "internName",
        message: "Please enter the intern's name: "
      },

      {
        type: "input",
        name: "internId",
        message: "Please enter the intern's employee ID Number: " 
      },

      {
        type: "input",
        name: "internEmail",
        message: "Please enter the intern's email address: "
      },

      {
        type: "input",
        name: "internSchool",
        message: "Please enter the intern's school: "
      }

    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamArray.push(intern);
      createTeam();
    });

  }

  function generateHTML () {
    console.log("Team Successfully Created!")

    fs.writeFileSync(output, generateTeam(empArray), "UTF-8")

}

function init () {

  function teamBuilder() {
    inquirer.prompt([{
      type: "list",
      name: "addEmpPrompt",
      message: "Please select employee type to add: ",
      choices: ["Manager", "Engineer", "Intern", "No more team members are needed."]
    }]).then(function (userInput) {
      switch(userInput.addEmployeePrompt) {
        case "Manager":
          managerQuestions();
          break;
        case "Engineer":
          engineerQuestions();
          break;
        case "Intern":
          internQuestions();
          break;

        default:
          generateHTML();
      }
    })
  }

teamBuilder();

}

init();
