function addReminder() {
    var notifications = Windows.UI.Notifications;
    var template = Windows.UI.Notifications.ToastTemplateType.toastText02;
    var toastXml = Windows.UI.Notifications.ToastNotificationManager.getTemplateContent(template);
    var toastTextElements = toastXml.getElementsByTagName("text");

    var dp = document.getElementById("datepicker").winControl; 
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;

    toastTextElements[0].appendChild(toastXml.createTextNode(title));
    toastTextElements[1].appendChild(toastXml.createTextNode(description));

    var launchAttribute = toastXml.createAttribute("launch");
    //launchAttribute.value = "{\"myContext\":\"12345\"}";

    var toastNode = toastXml.selectSingleNode("/toast");
    var audio = toastXml.createElement("audio");

    toastNode.appendChild(audio);
    toastNode.attributes.setNamedItem(launchAttribute);

    var toast = new notifications.ToastNotification(toastXml);
    var toastNotifier = notifications.ToastNotificationManager.createToastNotifier();

    var today = new Date();

    if (dp.current < today) {
        var msg = new Windows.UI.Popups.MessageDialog("Must enter a date at some point in the future.",
        "Invalid Date");
        msg.showAsync();
    } else {
        var scheduledToast = new Windows.UI.Notifications.ScheduledToastNotification(toastXml, dp.current);
        toastNotifier.addToSchedule(scheduledToast);
        toastNotifier.show(toast); //remember to enable toasts in the app manifest

        var msg = new Windows.UI.Popups.MessageDialog("For date: " + dp.current,
        "New Reminder Added");
        msg.showAsync();

        scheduled = toastNotifier.getScheduledToastNotifications();

    }
}