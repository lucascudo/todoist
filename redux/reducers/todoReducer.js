import TodoModel from '../../components/TodoModel';

const list = [
    new TodoModel('Busque uma tarefa ou pressione ✔ para adicioná-la à lista'),
    new TodoModel('Clique na caixa para concluir uma tarefa'),
    new TodoModel('Pressione por um segundo e arraste para mover uma tarefa'),
];

// Initial State
const initialState = {
    todoList: list,
    todoListOrder: Object.keys(list),
};
// Reducers (Modifies The State And Returns A New State)
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      // SET_LIST
      case 'SET_LIST': {
        return {
          // State
          ...state,
          // Redux Store
          todoList: action.todoList,
        }
      }
      case 'SET_LIST_ORDER': {
        return {
          // State
          ...state,
          // Redux Store
          todoListOrder: action.todoListOrder,
        }
      }
      // Default
      default: {
        return state;
      }
    }
};
// Exports
export default todoReducer;