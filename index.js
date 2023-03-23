const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const generateTeam = require("./src/template.js");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "dist");
const output = path.join(OUTPUT_DIR, "TheTeam.html");

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
          name: "managerId",
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
    empArray.push(manager);
    teamBuilder();
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
        name: "engineerId",
        message: "Please enter the engineer's employee ID number: " 
      },

      {
        type: "input",
        name: "engineerEmail",
        message: "Please enter the engineer's email address: "
      },

      {
        type: "input",
        name: "engineerGithub",
        message: "Please enter the engineer's GitHub username: "
      }

    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      empArray.push(engineer);
      teamBuilder();
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
      empArray.push(intern);
      teamBuilder();
    });

  }

  function generateHTML () {
    console.log("Team Successfully Created!");

    fs.writeFileSync(output, generateTeam(empArray), "UTF-8");

}

function init () {

teamBuilder();

}

function teamBuilder() {
  inquirer.prompt([{
    type: "list",
    name: "addEmpPrompt",
    message: "Please select employee type to add: ",
    choices: ["Manager", 
              "Engineer", 
              "Intern", 
              "No more team members are needed."]
  }]).then(function (userInput) {
    switch(userInput.addEmpPrompt) {
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

init();
