/*
 * 创建一个服务用于存放用户选择的项目名和项目id,用户名,项目模块
 */

app.register.service("info", function () {
    var userName = {}; //用户名
    var projectName = {}; //项目名称
    var projectId = {}; //选择的项目id
    var modules = {}; //项目下的模块
    var projects = {}; //当前用户下的项目
    var fromPage = null; //设置来的页面

    this.setProjectName = function (name) {
        projectName.name = name
    }
    this.getProjectName = function () {
        return projectName.name
    }

    this.setProjectId = function (id) {
        projectId = id;
    }
    this.getProjectId = function () {
        return projectId
    }

    this.setUserName = function (name) {
        userName.name = name;
    }

    this.getUserName = function () {
        return userName.name;
    }

    this.setModules = function (module) {
        modules = module;
    }

    this.getModules = function () {
        return modules;
    }

    this.setProjects = function (project) {
        projects = project;
    }

    this.getProjects = function () {
        return projects;
    }

    this.setFromPage = function (page) {
        fromPage = page;
    }
    this.getFromPage = function () {
        return fromPage;
    }

})