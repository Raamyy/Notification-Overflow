let titleUpdated = false;
function calculateNotification() {
    let notificationClass = document.getElementsByClassName("js-unread-count");
    let totalNotifications = 0;
    for (notificationElement of notificationClass)
        if (notificationElement.style.display != "none")
            totalNotifications += parseInt(notificationElement.innerHTML);
    return totalNotifications;
}

function observeNotification(notificationElement) {
    let mutationObserver = new MutationObserver(function (mutations) {
        for (mutation of mutations) {
            if ((mutation.type == "attributes" && mutation.attributeName == "style" && mutation.target.style.display == "none") || mutation.type == "characterData") {
                console.log("RELOADD!", mutation, notificationElement)
                writeNotificationOnTitle();
                break;
            }
        }
    });
    mutationObserver.observe(notificationElement, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true,
        attributeFilter: ['style'],
    });
}

function attachMutationObservers() {
    let notificationClass = document.getElementsByClassName("js-unread-count");
    for (notificationElement of notificationClass) {
        observeNotification(notificationElement);
    }
}
function writeNotificationOnTitle() {
    let numberOfNotification = calculateNotification();
    let strappedTitle = () => {
        let currentTitle = document.getElementsByTagName("title")[0].innerHTML;
        if (!titleUpdated)
            return currentTitle;
        else
            return currentTitle.slice(currentTitle.indexOf(")") + 2, currentTitle.length - 1)
    }

    if (numberOfNotification == 0) {
        document.getElementsByTagName("title")[0].innerHTML = strappedTitle();
        titleUpdated = false;
    }
    else {
        document.getElementsByTagName("title")[0].innerHTML = `(${numberOfNotification}) ${strappedTitle()}`
        titleUpdated = true;
    }

}

attachMutationObservers();
writeNotificationOnTitle();
