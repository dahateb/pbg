// Put all the javascript code here, that you want to execute in background.
console.log('Starting Extensio PBG')

const ENABLED = "enabled"
const DISABLED = "disabled"
const REFERER_BASE_TWITTER = "https://t.co/"

let enabled = DISABLED;

function rewriteHeader(e) {
    //console.log(e)
    if ( enabled === ENABLED ) {
        const rand_path = Math.random().toString(16).substr(2, 8);
        let referer = REFERER_BASE_TWITTER + rand_path;
        let refererHeader = e.requestHeaders.find(elem => elem.name.toLowerCase() === "referer");
        //console.log(refererHeader)
        // Update Referer
        if( refererHeader ) {
            refererHeader.value = referer
        } else {
            e.requestHeaders.push(
                {
                    name: "Referer",
                    value: referer
                }
            )
        }
        // Unset all Cookies
        let cookieHeader = e.requestHeaders.find(elem => elem.name.toLowerCase() === "cookie");        
        if( cookieHeader ) {
            cookieHeader.value = ""
        } 
        
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