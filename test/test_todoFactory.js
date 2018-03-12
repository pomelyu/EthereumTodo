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

    const result = await contract.getTodoList();
    const numOfTodos = result[0].length;
    assert.notEqual(todoId1, todoId2);
    assert.equal(numOfTodos, 2);
  });

  it('Should complete todo properly', async () => {
    await contract.completeTodo(todoId1);

    const result = await contract.getTodoList();
    const numOfCompletedTodos = result[1].filter(isComplete => isComplete).length;

    await utils.assertEvent(contract, { event: 'OnTodoCompleted', args: { todoId: todoId1 } });
    assert.equal(numOfCompletedTodos, 1);
  });

  it('Should not complete invalid task', async () => {
    // Method1: Only work for Chai > 4.0
    // const invalidComplete = async () => {
    //   await contract.completeTodo(9527)
    // };
    // assert.throw(invalidComplete, Error);

    // Method2: Assert with async, await
    // assert.throws(invalidComplete, Error);
    // let thrownInvalidComplete = false;
    // try {
    //   await contract.completeTodo(9527)
    // } catch (e) {
    //   thrownInvalidComplete = true;
    // }
    // assert.isTrue(thrownInvalidComplete);

    // Method3:
    contract.completeTodo(9527, (err) => {
      assert.isDefined(err);
    })
  });

  it('Should delete todo properly', async () => {
    await contract.deleteTodo(todoId1);

    const result = await contract.getTodoList();
    const numOfTodos = result[0].length;

    await utils.assertEvent(contract, { event: 'OnTodoDeleted', args: { todoId: todoId1 } });
    assert.equal(numOfTodos, 1);
  });

  it('Should not delete invalid todo', () => {
    contract.deleteTodo(9527, (err) => {
      assert.isDefined(err);
    });
  });

  it('Should not delete todo twice', async () => {
    contract.deleteTodo(todoId1, (err) => {
      assert.isDefined(err);
    })
  });
});
