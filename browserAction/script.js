const ENABLE = "enable";
const DISABLE = "disable";

document.addEventListener('DOMContentLoaded', async function() {
    let enabled = await browser.storage.local.get("is_enabled");
    console.log(enabled);
    if ( !enabled || Object.keys(enabled).length === 0) {
        enabled = {is_enabled: ENABLE};
    }
    
    var button = document.getElementById('enableButton');
    button.innerText = enabled.is_enabled;
    let message = enabled.is_enabled === ENABLE ? DISABLE : ENABLE;
    browser.runtime.sendMessage(message);
    // onClick's logic below:
    button.addEventListener('click', enablePBG);
});

async function enablePBG(e) {
    let command = e.target.innerText
    if (command === "enable") {
        e.target.innerText = DISABLE;
        browser.runtime.sendMessage(ENABLE);
        await browser.storage.local.set({is_enabled: DISABLE})
    } else {
        e.target.innerText = ENABLE;
        browser.runtime.sendMessage(DISABLE);
        await browser.storage.local.set({is_enabled: ENABLE})
    }
}
