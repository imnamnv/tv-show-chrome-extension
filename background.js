chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({ shows: [] });

  chrome.contextMenus.create({
    title: "Fetch TV Show",
    id: "contextMenu1",
    contexts: ["page", "selection"], //can set "all"
  });

  chrome.contextMenus.create({
    title: "Read This Text",
    id: "contextMenu2",
    contexts: ["page", "selection"], //can set "all"
  });

  chrome.contextMenus.onClicked.addListener((events) => {
    console.log("events", events);
    if (events.menuItemId === "contextMenu1") {
      fetch(`https://api.tvmaze.com/search/shows?q=${events.selectionText}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          chrome.storage.local.set({
            shows: data,
          });
        });
    } else if (events.menuItemId === "contextMenu2") {
      chrome.tts.speak(events.selectionText);
    }

    // chrome.tabs.create({
    //   active: true,
    //   url: `https://api.tvmaze.com/search/shows?q=${events.selectionText}`,
    // });

    /////search google with string text
    // chrome.search.query({
    //   disposition: "CURRENT_TAB",
    //   text: events.selectionText ? `imdb ${events.selectionText}` : "imdb",
    // });

    /////get chromr tabs
    // chrome.tabs.query(
    //   {
    //     currentWindow: true,
    //   },
    //   (tabs) => {
    //     console.log("tabs", tabs);
    //   }
    // );
  });

  //////SET NESTING OPTION
  //   chrome.contextMenus.create({
  //     title: "Test Context Menu2",
  //     id: "contextMenu2",
  //     parentId: "contextMenu1",
  //     contexts: ["page", "selection"], //can set "all"
  //   });
});

console.log("background running");

chrome.runtime.onMessage.addListener((mgs, sender) => {
  console.log("mgs", mgs);

  //   chrome.tabs.sendMessage(sender.tab.id, "Got your message from background!");
});
