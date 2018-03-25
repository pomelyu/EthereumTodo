// reference from https://ethereum.stackexchange.com/questions/15353/how-to-listen-for-contract-events-in-javascript-tests
const _ = require("lodash");

module.exports = {
  assertEvent: function (contract, filter) {
    return new Promise((resolve, reject) => {
      const event = contract[filter.event]();
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
  getEvents: function (tx, filter) {
    const logs = tx.logs;
    const events = _.filter(logs, filter);
    return events;
  }
}