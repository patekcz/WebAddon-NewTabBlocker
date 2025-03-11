document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleScript');
    var toggleNewTabsButton = document.getElementById('toggleNewTabs');

    // Získání stavu rozšíření ze storu
    chrome.storage.sync.get(['scriptEnabled', 'blockNewTabs'], function(data) {
        var scriptEnabled = data.scriptEnabled || false;
        var blockNewTabs = data.blockNewTabs || false;

        // Nastavení textu tlačítek podle stavu
        toggleButton.innerText = scriptEnabled ? 'Vypnout blokování oken' : 'Blokovat vyskakovací okna';
        toggleNewTabsButton.innerText = blockNewTabs ? 'Vypnout blokování karet' : 'Blokovat nové karty';
        
        // Nastavení tříd pro aktivní stav
        toggleButton.classList.toggle('enabled', scriptEnabled);
        toggleNewTabsButton.classList.toggle('enabled', blockNewTabs);

        // Po kliknutí na tlačítko pro blokování oken
        toggleButton.addEventListener('click', function() {
            scriptEnabled = !scriptEnabled;
            chrome.storage.sync.set({ scriptEnabled: scriptEnabled }, function() {
                toggleButton.innerText = scriptEnabled ? 'Vypnout blokování oken' : 'Blokovat vyskakovací okna';
                toggleButton.classList.toggle('enabled', scriptEnabled);
            });
            chrome.runtime.sendMessage({ toggleScript: scriptEnabled });
        });

        // Po kliknutí na tlačítko pro blokování nových karet
        toggleNewTabsButton.addEventListener('click', function() {
            blockNewTabs = !blockNewTabs;
            chrome.storage.sync.set({ blockNewTabs: blockNewTabs }, function() {
                toggleNewTabsButton.innerText = blockNewTabs ? 'Vypnout blokování karet' : 'Blokovat nové karty';
                toggleNewTabsButton.classList.toggle('enabled', blockNewTabs);
            });
            chrome.runtime.sendMessage({ toggleNewTabs: blockNewTabs });
        });
    });
});
