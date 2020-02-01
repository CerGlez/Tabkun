/*var Q = require('q');
var util = require('util');
module.exports = function(chrome) {
    var recentTabs = null;
    return{
    getActiveTabs: function() {
        return util.pcall(chrome.tabs.query.bind(chrome.tabs), {active: true});
      },
      saveRecentTabs: function() {
        return Q.when(recentTabs).then(function(tabs) {
          if (!tabs) return;
          chrome.storage.local.set({lastTabs: JSON.stringify(tabs)});
        });
    }
    }
}*/