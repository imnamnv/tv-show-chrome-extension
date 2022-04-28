console.log("Hello Content Script");
const aTags = document.getElementsByTagName("a");

const text = [];

for (const tag of aTags) {
  text.push(tag.textContent);
  //   if (tag.textContent.includes("i")) {
  //     tag.style = "color: red";
  //   }
}

chrome.storage.local.set({
  text,
});

chrome.runtime.sendMessage(null, text);

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log("message", message);
  console.log("sender", sender);
});
