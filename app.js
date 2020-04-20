document.getElementById('new-task').addEventListener('keypress', pressEnter);
document.addEventListener('click' , clickHandler);

function clickHandler(){
    let clickTarget = event.target;
    switch(clickTarget.type){
        case 'input':
            break;
        case 'submit':
            if (clickTarget.innerText =='Add'){
                addTodoItems();
            } else if (clickTarget.innerText =='Delete'){
                const itemTarget = clickTarget.previousSibling;
                let item;
                if (!itemTarget.innerText) {
                    item = itemTarget.previousSibling.innerText;
                }else {
                    item = itemTarget.innerText;
                }
                const isDeleteItems = confirm(`Are you sure to delete this item: ${item} ?`)? true: false;
                if (isDeleteItems){
                    let chkLi = clickTarget.closest('li');
                    removeTodoItems(chkLi);
                }
                
            }
            break;
        case 'checkbox':
            const chkType = clickTarget.closest('ul').id;
            const chkLi = clickTarget.closest('li');
            let chkItem = clickTarget.nextSibling;
            if (!chkItem.textContent.trim()){
                chkItem = chkItem.nextSibling.textContent;
            }
            moveTodoItems(chkItem, chkType);
            removeTodoItems(chkLi);
            break;
        default:
            break;
    }
}

function pressEnter(){
    if (event.key=='Enter'){
        addTodoItems();
    }
}
function addTodoItems(){
    let newTask = document.getElementById('new-task');
    const inputMsg = newTask.value;
    if (inputMsg.trim()){
        const todoItem = `
        <li>
            <input type="checkbox">
            <label>${inputMsg}</label>
            <button class="delete">Delete</button>
        </li> 
        `;
        document.getElementById('incomplete-tasks').insertAdjacentHTML('beforeend' , todoItem);
        newTask.value = '';
    } else {
        alert('請輸入代辦事項');
        newTask.focus();
        return false;
    }
}
function removeTodoItems(itemLi){
    itemLi.remove();
}
function moveTodoItems(item, listName){
    const moveList = (listName=='incomplete-tasks')? 'completed-tasks':'incomplete-tasks';
    const check = (listName=='incomplete-tasks')? 'checked':'';
    const todoItem = `
    <li>
        <input type="checkbox" ${check}>
        <label>${item}</label>
        <button class="delete">Delete</button>
    </li> 
    `;
    document.getElementById(moveList).insertAdjacentHTML('beforeend',todoItem);
}