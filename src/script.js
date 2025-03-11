// Načítání stavu skriptu z úložiště
chrome.storage.sync.get(['scriptEnabled', 'blockNewTabs'], function(data) {
    var scriptEnabled = data.scriptEnabled || false;
    var blockNewTabs = data.blockNewTabs || false;

    // Nastavení listenerů podle stavu
    if (scriptEnabled) {
        chrome.windows.onCreated.addListener(closeWindow);
    }
    if (blockNewTabs) {
        chrome.tabs.onCreated.addListener(closeNewTab);
    }
});

// Obsluha zpráv z popup skriptu
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.toggleScript !== undefined) {
        var scriptEnabled = message.toggleScript;
        if (scriptEnabled) {
            chrome.windows.onCreated.addListener(closeWindow);
        } else {
            chrome.windows.onCreated.removeListener(closeWindow);
        }
    }
    if (message.toggleNewTabs !== undefined) {
        var blockNewTabs = message.toggleNewTabs;
        if (blockNewTabs) {
            chrome.tabs.onCreated.addListener(closeNewTab);
        } else {
            chrome.tabs.onCreated.removeListener(closeNewTab);
        }
    }
});

// Funkce pro zavírání okna
function closeWindow(window) {
    chrome.windows.remove(window.id);
    console.log("Okno zavřeno");
}

// Funkce pro zavírání nové karty
function closeNewTab(tab) {
    // Nezavírat první kartu v okně
    chrome.tabs.query({windowId: tab.windowId}, function(tabs) {
        if (tabs.length > 1) {
            chrome.tabs.remove(tab.id);
            console.log("Nová karta zavřena");
        }
    });
}
