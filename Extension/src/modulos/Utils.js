/*global chrome*/
export function getTabs(callback) {
    chrome.tabs.query({},
    (tabs) => {
        callback(tabs);
    });
}