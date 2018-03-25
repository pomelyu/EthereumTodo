# 在區塊鏈上實作 Todo App

這個 Project 練習如何藉著智慧合約（smart contract），在以太坊（Ethereum）區塊鏈上建立一個 DApp，一旦佈署之後，這個智慧合約就無法再被更新或是竄改，新建立的 Todo 也是如此。以下簡單的將傳統 web app 和 DApp 作類比

| -- | --- | -- | -- |
| -- | --- | -- | -- |
| Web app | front-end | back-end API | Database |
| DApp | front-end | smart contract | Blockchain(Ethereum) |

因此實作時首先利用 truffle 編寫智慧合約的程式碼並佈署在區塊鏈上，接著藉著前端 web3 這個 API 套件和智慧合約溝通。
以下分別就這兩個工具介紹開發的步驟。另外如果使用 VSCode 開發，可以安裝 solidity 的[開發工具](https://github.com/juanfranblanco/vscode-solidity)，方便檢查語法上的問題。

## Truffle - Ethereum Development Framework
[truffle](http://truffleframework.com)是 Ethereum 的開發框架，可以建立測試用的區塊鏈，並將寫好的智慧合約編譯佈署，由於整個以太坊的開發環境變動的相當快，因此務必注意到不同函式庫對不同版本的資源。這裡使用最新的 truffle 版本(v4.1.3)，因為這個版本建立的測試用區塊鏈支援 websocket 的連線，配合 web3 v1.0 之後的版本可以利用 websocket 來監聽事件的觸發，這是比較有效率的作法。

#### 安裝 truffle
```bash
npm install -g truffle@4.1.3
```
#### 建立專案資料並初始化
```bash
mkdir EthereumTodo && cd EthereumTodo
truffle init
# 資料夾結構如下
# build/       合約編譯完才會產生，這裡會生成描述合約的 json 檔，也就是合約的 ABI(Application Binary Interface)
# contracts/   合約的檔案，以 .sol 為結尾
# migrations/  描述如何將合約佈署到區塊鏈
# test/        用來測試合約
# truffle.js   設定 truffle
```
#### 查看版本資訊 
```bash
truffle version
# Truffle v4.1.3 (core: 4.1.3)
# Solidity v0.4.19 (solc-js)
```
請務必先檢查支援的 Solidity 版本。Solidity 是 Ethereum 的開發語言，和 javascript 的語法類似，由於目前這個語言變動很快，所以需要更加注意不同版本間的語法差異。

#### 建立測試用區塊鏈
```bash
# ganache-cli 是 truffle 內附的指令，用來取代原先的 testrpc
# 用 --seed apple banana cherry，指定隨機生成的種子，這樣可以確保每次建立的區塊鏈都是相同的，
# 因此合約的佈署位址也會相同，這在測試環境上非常好用
ganache-cli --seed apple banana cherry

## 執行結果會順便產生測試用的帳號和 key
# Available Accounts
# ==================
# (0) 0x1d489c3f8ed5ee71325a847888b2157c9ac29c05
# ...
# Private Keys
# ==================
# (0) bea70301d065cf7946f25251c73dbfff93d4320715e43bdc0d5087553074cb64
# ...
# Listening on localhost:8545
```

#### 設定 truffle 環境
```javascript
// truffle.js
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
```

## 建立 Todo 合約
#### 設定資料結構
```javascript
// contracts/TodoFactory.sol
// 指定編譯的版本
pragma solidity ^0.4.17;

// 指定合約的名稱，之後佈署或是測試時都是根據這個名稱（不是檔案名稱）
contract TodoFactory {
  struct Todo {
    string taskName;
    bool isCompleted;
    bool isValid;
  }

  Todo[] todos;
}
```
以上簡單的設定在合約中資料儲存的方式，利用 `struct` 包裹每個 todo 應該包含的資料，並利用陣列儲存。Solidty 常用的型別包含`int(uint, uint256), uint8, bool, address(8 bytes), byte` 而 `string` 相當於是 `byte[]`。由於儲存資料在區塊鏈上相當耗費成本（以 POW 機制來說，就是需要有人挖礦），智慧合約的執行上也必須消耗 **gas**，因此會盡可能的利用適當的型別來減少寫入的資料量和運算量，另外在 `struct` 中盡可能的將相同的資料型別排列在一起，也可以節省資料量。

除了 `Array` 之外，Solidity 中常用的還有 `mapping`，它就像 javascript 中的 `Object`，代表 key-value 之間的對應。例如
```javascript
mapping(int => Todo) idMapTodo;
```

#### 加上操作資料的 Function(Method)
```javascript
contract TodoFactory {

  // function:
  function addTodo(string _taskName) public {
    Todo memory todo = Todo(_taskName, false, true);
    uint todoId = todos.push(todo) - 1;

    // 這裡沒有使用 return todoId，因為這個 function 在執行時有寫入資料，
    // 所以需要礦工挖礦，才能完成寫入，這時的 return 只會 return transaction 的 hash 而不會是真正的 todoId
    // 因此如果要知道這個 function 是否被執行完成，只能用觸發 event 的方式，底下會再加以解釋
  }
}
```
在 `addTodo` 中，我們先以輸入的 `_taskName` 初始化一個型態是 `Todo` 的物件，接著加入合約中的 todos 陣列，並以陣列索引當作 id
。

-----
Solidity 中 contract 和 function 的關係，可以類比成 class 和 function 的關係，contract 也是可以被繼承的。function 本身看起來和 javascript 中的非常像，不同的是可以加上一些 **modifier**，例如：
 - `public`: 代表可以被外界調用
 - `private`: 代表此 function 只能被此合約中的其他 function 調用
 - `internal`: 代表可以被使合約和繼承的合約調用
 - `external`: 代表只能被外界調用

或是
 - `view`: 代表此 function 不會對資料作任何的更改
 - `pure`: 代表此 function 不會操作到區塊鏈上的任何資料，所以 pure function 不會消耗任何的 **gas**

另外需要特別注意的是，solidity 中**執行函式的方式**被分成 `Call` 和 `Transaction` 兩種（雖然程式碼都是 function）
 - `Call`: 代表執行函式但是不會對區塊鏈作任何的修改，可以使用「回傳值」，通常會被這樣使用的函式都會包含 `view` 或是 `pure` 這兩個關鍵字，如果對於一個有寫入的函式使用 call 的方式執行，這樣**不會**寫入任何的資料
 - `Transaction`: 和 Call 相反，在執行上會寫入資料，因此需要等待礦工們將資料寫入，所以函式的「回傳值」僅代表 transaction hash
以上可以參考這個[討論串](https://ethereum.stackexchange.com/questions/765/what-is-the-difference-between-a-transaction-and-a-call)

modifier 也可以利用關鍵字 `modifier` 宣告自訂的 **modifier**，類似 python 或是 js ES7 中的 decorator（裝飾字），例如
```javascript
contract TodoFactory {
  // modifier
  modifier isValidTodo(uint _todoId) {
    // require 要求傳入的參數要是 true，否則中止操作，並退還執行時消耗的 gas
    // 以下連結有更詳細的比較和說明
    // https://medium.com/taipei-ethereum-meetup/比較-require-assert-和-revert-及其運作方式-30c24d534ce4
    require(isTodoValid(_todoId));
    _; // 這是語法上必要的
  }

  function deleteTodo(uint _todoId) public isValidTodo(_todoId) {
    todos[_todoId].isValid = false;
  }
}
```
在上述的程式碼中，首先利用自訂的 **modifier** 檢查想要刪除的元素是否有效，有效才會刪除。回到前面新增物件的部分，在其他語言的寫法中把陣列索引當作 id 是很奇怪的作法，因為如果把陣列的元件移除，其他的元素會填補這個空隙，這樣索引就會被更改，例如 [a, b, c] 移除 b 後會變成 [a, c]，但是因為區塊鏈的寫入成本極高，因此當刪除陣列元素時，**不應該**搬移其他的元素，因此直接將這個元素設定成 invalid 是成本較低的作法，當然也可以用 `delete` 刪除，但是會造成空隙。

-----
另外 Solidity 中的 function 可以回傳複數的值，回傳時類似 tuple 以`()`包裹，不過回傳的資料型別只能是原始的資料型別或是陣列，也就是說不能回傳 `struct` 或者是 `string[]`。

#### 加上 event 來紀錄已完成的事件

如同前面提到的，執行 `addTodo`, `deleteTodo`, `completeTodo` 的時候都會以 *Transaction* 的方式執行（不然不會寫入資料），因此為了讓其他人知道執行完畢，並收到執行的結果，必須使用 event 觸發的方式。
```javascript
contract TodoFactory {
  // event
event OnTodoAdded(uint todoId);

  function addTodo(string _taskName) public {
    Todo memory todo = Todo(_taskName, false, true);
    uint todoId = todos.push(todo) - 1;
    
    // trigger event:
    // 這樣才能取得原來的回傳值 todoId
    // 在 v0.4.21 之後，必須寫成 emit OnTodoAdded(todoId)
    OnTodoAdded(todoId);
  }
}
```
`event` 的宣告就像是 function 的 header，呼叫的方式也很像，利用 `event` 可以讓多個 client 監聽智慧合約的變化，而且這些 `event` 一旦被觸發就會被紀錄在區塊鏈裡面，未來可以很輕易的查詢過去發生過的紀錄 

#### 編譯及佈署合約
原則上就是照抄 `migrations/1_initial_migration.js`
```javascript
// migrations/4_deploy_todoFactory.js
const TodoFactory = artifacts.require('TodoFactory');

module.exports = function (deployer) {
  deployer.deploy(TodoFactory);
}
```

接著依序執行
```bash
truffle compile

## 執行結果會 在 `build/` 建立 `TodoFactory.json`

truffle migrate

## 執行結果
# Running migration: 4_deploy_todoFactory.js
#   Deploying TodoFactory...
#   ... 0xfecf0206d68c496cf067e320a4d4b5d294dfe89979552f7b6b8ab38696c51356
#   TodoFactory: 0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c
# Saving successful migration to network...
#   ... 0x6f592087ebfa7d5d77cce3f82c9d1222148c25499c348a59480ccfb3fe5884e1
# Saving artifacts...

# 其中 0x21e4624c5a0b3fda81d0833d412dded2bb3a7a7c 就是合約部署在區塊鏈上的位址
```
#### 測試
由於已經佈署在區塊鏈上的合約無法再被修改，最多只能利用事先設定一些函數來調整參數，因此每一次的合約更新都會導致地址的改變，在實際的應用上相當於每次重新都需要改變利用到的合約，因此佈署前的測試相當重要，另外測試對於 TDD（Test Drive Development） 或是 CI,CD 的流程也是不可或缺的。truffle 已經包含測試用的框架，利用 Mocha 和 Chai 這兩個在 js 中常用的套件（兩者所使用的版本可以從 [ganache-core](https://github.com/trufflesuite/ganache-core/blob/develop/package.json) 查看）

以下先建立一個驗證合約是否正常發佈的簡單測試
```javascript
// test/test_todoFactory.js
const TodoFactory = artifacts.require('TodoFactory');

contract('TodoFactory', function(accounts) {
  before(async () => {
    // 在所有測試前佈署合約
    contract = await TodoFactory.deployed();
  });

  it('Should contract deployed properly', () => {
    // 驗證合約是否已經被佈署
    assert.isDefined(contract);
  });
}
```
對於非同步的情形而言，可以使用 Promise 或者是 callback 的語法，這裡用 Promise 配合 async-await 比較簡潔。不過因為目前 ganache-core 所使用的 chai 版本為 3.5，無法對抓到非同步的錯誤，因此如果需要作這方面的測試可以用以下的寫法
```javascript
contract('TodoFactory', function(accounts) {
  it('Should not complete invalid task', async () => {
    // Method1: Only work for Chai > 4.0
    // const invalidComplete = async () => {
    //   await contract.completeTodo(9527)
    // };
    // assert.throw(invalidComplete, Error);

    // Method2: Assert with async, await
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
}
```

另外在測試的部分 truffle 對於 **Call** 和 **Transaction** 兩種執行方式並沒有區分，都是用一般函式的呼叫方式，差別在後者回傳的是 transaction hash，從 hash 可以取得觸發的 event 的資訊
```javascript
// test/utils.js
function getEvents (tx, filter) {
  const logs = tx.logs;
  const events = _.filter(logs, filter);
  return events;
}

// test/test_todoFactory.js
contract('TodoFactory', function(accounts) {
  it('Should add new todo properly', async () => {
    // addTodo 的呼叫是 Transaction 所以即使 addTodo 中有回傳值，也無法收到
    const tx1 = await contract.addTodo(Todo1.taskName);
    const events1 = utils.getEvents(tx1, { event: 'OnTodoAdded', logIndex: 0 });
    todoId1 = events1[0].args.todoId;
  });
}
```

另外如果要檢查執行時觸發的 event 可以參考 stackoverflow 上的[討論](https://ethereum.stackexchange.com/questions/15353/how-to-listen-for-contract-events-in-javascript-tests)來驗證
```javascript
// test/utils.js
function assertEvent(contract, filter) {
  return new Promise((resolve, reject) => {
    const event = contract[filter.event]();
    // event.watch, event.get, event.stopWatching
    // 在 web3 中也有對應的 function 來監聽區塊鏈上的事件
    event.watch();
    event.get((error, logs) => {
      const log = _.filter(logs, filter);
      if (!_.isEmpty(log)) {
        resolve(log);
      } else {
        reject(new Error("Failed to find filtered event for " + filter.event));
      }
    });
    event.stopWatching();
  });
},

// test/test_todoFactory.js
contract('TodoFactory', function(accounts) {
  it('Should delete todo properly', async () => {
    await contract.deleteTodo(todoId1);

    await utils.assertEvent(contract, { event: 'OnTodoDeleted', args: { todoId: todoId1 } });
  });
}
```
接著只要執行
```bash
truffle test
```
就可以得到測試的結果。完整 DApp 中「後端」的部分後，接下來就是利用前端來和區塊鏈上的資料互動

## Web3
[web3.js](https://github.com/ethereum/web3.js/): 
