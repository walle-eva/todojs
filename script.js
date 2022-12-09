class todoList {
	constructor() {
		this.input = document.getElementById('task');
		this.taskArray = [];
		this.index = 0;
		this.taskList = document.getElementById('task-list');
		this.button = document.getElementById('add');
		this.buttonDelete = document.getElementById('delete');
		this.buttonDelete.addEventListener('click', this.deleteGroup.bind(this));
	}
			
	createListener(){
		this.button.addEventListener('click', () => {
			this.taskArray.push({index: this.index++, text: this.input.value});
			this.renderTask.bind(this, this.taskArray)();
		});
	}
	
	renderTask(arr) {
		this.clearListTask();
		
		arr.forEach(item => {
			const li = document.createElement('li');
			li.id = item.index;
			li.classList.add('task');
			const span = document.createElement('span');
			span.classList.add('text');
			span.innerHTML = item.text;
			
			li.append(span);
			li.append(this.createButton('edit'));
			li.append(this.createButton('delete'));
			li.prepend(this.createCheckbox());
			li.addEventListener('mousedown', this.moveTask.bind(this));
			
			this.taskList.append(li);
		})
		
		this.clearValue();
	}
			
	clearListTask() {
		while (this.taskList.firstChild) {
			this.taskList.removeChild(this.taskList.lastChild);
		}
	}
	
	clearValue() {
		this.input.value = '';
		this.input.focus();
	}
	
	createButton(buttonText){
		const button = document.createElement('button');
		button.classList.add('button');
		button.innerHTML = buttonText;
		// убрать привязку к тексту
		buttonText == 'delete' ? 
		button.addEventListener('click', this.deleteTask.bind(this)):
		button.addEventListener('click', this.editTask.bind(this));
		return button;
	}
	
	createCheckbox() {
		const input = document.createElement('input');
		input.type = 'checkbox'
		return input;
	}
			
	deleteTask() {
		let indexTaskDelete = event.target.closest('li').id;
		this.taskArray.splice(indexTaskDelete, 1);
		this.correctionIndexTask.bind(this)();
		this.renderTask.bind(this, this.taskArray)();
	}
	
	checkTask() {
		//планирую сделать подсветку выделенных тасок
	}
	
	moveTask() {
		// планирую сделать перетаскивание
		console.log('move task');
	}
	
	editTask() {
		let indexTaskEdit = event.target.closest('li').id;
		let task = event.target.closest('li').querySelector('span');
		let taskOld = this.taskArray[indexTaskEdit].text;
		task.innerHTML = '';
		let li = event.target.closest('li');
		let input = document.createElement('input');
		input.value = taskOld;
		input.classList.add('input', '_edit');
		li.insertBefore(input,task);
		input.focus();
		input.addEventListener('blur', this.saveChange.bind(this, task, indexTaskEdit));
	}
			
	saveChange(task, index) {
		let taskNew = event.target.value;
		task.innerHTML = taskNew;
		this.taskArray[index].text = taskNew;
		event.target.remove();
	}
	
	doneTask() {
	}
			
	deleteGroup() {
		let checkbox = document.querySelectorAll('input[type=checkbox]');
		let checked = [];
		[].forEach.bind(checkbox, item => {
			if (item.checked) {
				checked.push(+item.closest('li').id);
			}
		})();
		this.taskArray = this.taskArray.filter(item => !checked.includes(item.index));
		this.correctionIndexTask.bind(this)();
		this.renderTask.bind(this, this.taskArray)();
	}
	
	correctionIndexTask() {
		this.taskArray.map((item, index) => item.index = index);
	}
}
		
let todo = new todoList();
todo.createListener();