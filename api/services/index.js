const questionnaires = require("./questionnaires");
const users = require("./users");
const projects = require("./projects");

module.exports = {
  usersService: users,
  questionnairesService: questionnaires,
  projectsService: projects
};
