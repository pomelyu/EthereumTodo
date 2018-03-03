pragma solidity ^0.4.17;

contract TodoFactory {

  event OnTodoAdded(uint todoId);
  event OnTodoDeleted(uint todoId);
  event OnTodoCompleted(uint todoId);

  struct Todo {
    string taskName;
    bool isComplete;
    bool isValid;
  }

  Todo[] todos;


  // Modifier
  modifier isValidTodo(uint _todoId) {
    require(isTodoValid(_todoId));
    _;
  }


  // Public function
  function isTodoValid(uint _todoId) public view returns(bool isValid) {
    return todos[_todoId].isValid;
  }

  function isTodoCompleted(uint _todoId) public view isValidTodo(_todoId) returns(bool isValid) {
    return todos[_todoId].isComplete;
  }

  function getTotalTodos() public view returns(uint numOfTodos) {
    uint count = 0;
    for (uint i = 0; i < todos.length; i++) {
      if (isTodoValid(i)) {
        count++;
      }
    }
    return count;
  }

  function getCompleteTodos() public view returns(uint numOfTodos) {
    uint count = 0;
    for (uint i = 0; i < todos.length; i++) {
      if (isTodoValid(i) && isTodoCompleted(i)) {
        count++;
      }
    }
    return count;
  }

  function addTodo(string _taskName) public {
    Todo memory todo = Todo(_taskName, false, true);
    uint todoId = todos.push(todo) - 1;
    
    OnTodoAdded(todoId);
  }

  function deleteTodo(uint _todoId) public isValidTodo(_todoId) {
    todos[_todoId].isValid = false;

    OnTodoDeleted(_todoId);
  }

  function completeTodo(uint _todoId) public isValidTodo(_todoId) {
    todos[_todoId].isComplete = true;

    OnTodoCompleted(_todoId);
  }
}
