const TodoFactory = artifacts.require('TodoFactory');
const utils = require("./utils.js");

const Todo1 = {
  taskName: 'Task1',
};

const Todo2 = {
  taskName: 'Task2',
};

contract('TodoFactory', function(accounts) {
  let contract;
  let todoId1;
  let todoId2;

  before(async () => {
    contract = await TodoFactory.deployed();
  });

  it('Should contract deployed properly', async () => {
    assert.isDefined(contract);
  });

  it('Should add new todo properly', async () => {
    const tx1 = await contract.addTodo(Todo1.taskName);
    const events1 = utils.getEvents(tx1, { event: 'OnTodoAdded', logIndex: 0 });
    todoId1 = events1[0].args.todoId;

    const tx2 = await contract.addTodo(Todo2.taskName);
    const events2 = utils.getEvents(tx2, { event: 'OnTodoAdded', logIndex: 0 });
    todoId2 = events2[0].args.todoId;

    const numOfTodos = await contract.getTotalTodos();

    assert.notEqual(todoId1, todoId2);
    assert.equal(numOfTodos.toNumber(), 2);
  });

  it('Should complete todo properly', async () => {
    await contract.completeTodo(todoId1);

    const numOfCompletedTodos = await contract.getCompleteTodos();

    await utils.assertEvent(contract, { event: 'OnTodoCompleted', args: { todoId: todoId1 } });
    assert.equal(numOfCompletedTodos.toNumber(), 1);
  });

  it.skip('Should not complete invalid task', async () => {

  });

  it('Should delete todo properly', async () => {
    await contract.deleteTodo(todoId1);

    const numOfTodos = await contract.getTotalTodos();

    await utils.assertEvent(contract, { event: 'OnTodoDeleted', args: { todoId: todoId1 } });
    assert.equal(numOfTodos.toNumber(), 1);
  });

  it.skip('Should not delete invalid todo', async () => {

  });

  it.skip('Should not delete todo twice', async () => {

  });
});
