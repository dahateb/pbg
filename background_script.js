// Put all the javascript code here, that you want to execute in background.
console.log('Starting Extensio PBG')

const ENABLED = "enabled"
const DISABLED = "disabled"
const REFERER_BASE_TWITTER = "https://t.co/"

let enabled = ENABLED

function rewriteHeader(e) {
    //console.log(e)
    const rand_path = Math.random().toString(16).substr(2, 8);
    let referer = REFERER_BASE_TWITTER + rand_path;
    let containsReferer = false;
    e.requestHeaders.forEach(function(header){
        if( enabled === ENABLED && header.name.toLowerCase() === "referer" ) {
            header.value = referer
            containsReferer = true;
        }
        //console.log(header.name + ": " + header.value);
    });
    if(enabled === ENABLED && !containsReferer) {
        e.requestHeaders.push(
            {
                name: "Referer",
                value: referer
            }
        )
    }
    return {requestHeaders: e.requestHeaders};
   
}

browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteHeader,
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]
);
  
browser.runtime.onMessage.addListener(function(message){
    console.log(message);
    if (message == "enable") {
        enabled = ENABLED
    } else {
        enabled = DISABLED
    }
})