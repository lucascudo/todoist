module.exports = {
    move: (array, fromIndex, toIndex) => array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]),

    findTodo: (todo, todoList) => todoList.find((item) => item.title.toLowerCase() === todo.title.toLowerCase()),
};