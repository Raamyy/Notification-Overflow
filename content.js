let titleUpdated = false;
function calculateNotification() {
    let notificationClass = document.getElementsByClassName("js-unread-count");
    let totalNotifications = 0;
    for (notificationElement of notificationClass) {
        totalNotifications += parseInt(notificationElement.innerHTML);
    }
    return totalNotifications;
}

function observeNotification(notificationElement) {
    let mutationObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            writeNotificationOnTitle();
        });
    });
    mutationObserver.observe(notificationElement, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
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
