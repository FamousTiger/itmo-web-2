function FormManager() {
    this.taskList = [];

    this.DOM = {
        week: null,
        settings: null
    };

    this.settings = {
        tasks: 2,
        days: 5
    };

    this.load();
    this.getData();
    this.generateDOM();
    this.isInputDisabled();
}

FormManager.prototype.load = function() {
    this.taskList = JSON.parse(localStorage.getItem('task-list')) || this.taskList;
    this.settings = JSON.parse(localStorage.getItem('settings')) || this.settings;
};

FormManager.prototype.save = function() {
    localStorage.setItem('task-list', JSON.stringify(this.taskList));
    localStorage.setItem('settings', JSON.stringify(this.settings));
};

FormManager.prototype.getData = function() {
    let handler = event => {
        event.preventDefault();

        this.settings.tasks = parseInt(this.DOM.settings.querySelector('select[name="tasks-number"]').value);
        this.settings.days = parseInt(this.DOM.settings.querySelector('select[name="days-number"]').value);
        this.taskList = new Array(this.settings.days).fill(0).map(_ => []);

        this.save();
        this.generateDOM();
    }

    this.DOM.week = document.querySelector(".task-list");
    this.DOM.settings = document.querySelector("#settings");
    this.DOM.settings.addEventListener("submit", handler);
};

FormManager.prototype.generateDOM = function() {
    this.DOM.week.innerHTML = "";
    this.DOM.settings.querySelector('select[name="tasks-number"]').value = this.settings.tasks;
    this.DOM.settings.querySelector('select[name="days-number"]').value = this.settings.days;

    this.taskList.forEach((taskData, index) => {
        let template = document.getElementById("day-template");
        let clone = template.content.cloneNode(true);
        this.DOM.week.appendChild(clone);

        let day = this.DOM.week.querySelectorAll(".day")[index];
        day.querySelector(".day-name").textContent = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"][index];
        let form = this.DOM.week.querySelectorAll("form")[index];
        form.setAttribute("data-day", index);

        taskData.forEach((actionItem, index) => {
            day.querySelector(".day-tasks").appendChild(this.createActionNode(index, actionItem));
        });

        day.querySelector("form").addEventListener("submit", this.add.bind(this));
        this.DOM.week.appendChild(day);
    });
};

FormManager.prototype.isInputDisabled = function() {
    this.taskList.forEach((weekItem, index) => {
        if (weekItem.length === this.settings.tasks)
        {
            this.DOM.week.querySelectorAll('.day')[index].querySelector('input').disabled = true;
        }
    });
};

FormManager.prototype.createActionNode = function(index, content) {
    let dayTasks = document.querySelector(".day-tasks");
    let template = document.getElementById("task-template");
    let clone = template.content.cloneNode(true);
    dayTasks.appendChild(clone);

    let action = dayTasks.querySelector('.task-data');
    action.querySelector('.task-data__index').appendChild(document.createTextNode(++index));
    action.querySelector('.task-data__content').appendChild(document.createTextNode(content));

    return action;
}

FormManager.prototype.add = function(event) {
    event.preventDefault();

    let day = parseInt(event.target.dataset.day);
    let taskData = event.target.querySelector("input").value;

    if (taskData.replace(/ /g, '') === '') { return; }

    this.taskList[day].push(taskData);
    this.DOM.week.querySelectorAll('.day')[day].appendChild(
        this.createActionNode(this.taskList[day].length - 1, taskData));

    this.isInputDisabled();
    this.save();

    event.target.querySelector('input').value = "";
    event.target.querySelector('input').blur();
};

window.addEventListener("load", () => {
    const manager = new FormManager();
})