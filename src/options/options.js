//browser.storage.sync.clear();
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

// dynamic0 ->  Scan Static & Dynamic webpages every 1sec(requires extra permissions)
// off0 -> Do not scan anything
// static0 -> Scan Static webpages once when loaded(requires extra permissions)
function saveOptions(e)
{
    e.preventDefault();
    browser.storage.sync.set({
        "scanrate": document.querySelector("input[name=\"scanrate\"]:checked").id
    });
}

function restoreOptions()
{
    let getting = browser.storage.sync.get("scanrate");
    getting.then(setCurrentChoice, onError);
    function setCurrentChoice(result)
    {
        if (result.scanrate === undefined) document.querySelector("input[id=\"off0\"]").checked = true;
        else document.querySelector("input[id=\"" + result.scanrate + "\"]").checked = true;
    }
    function onError(error)
    {
        //console.log(`izs sync error: ${error}`);
    }
}


