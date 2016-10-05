$("#notificationForm").validator().on("submit", function (event) {
    $('#form-submit').prop('disabled', true);
    if (event.isDefaultPrevented()) {
        formError();
        // submitMSG(false, "Error message");
    } else {
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    var title = $("#title").val();
    var message = $("#message").val();
    //Dev device
    // All devices /topics/r6stats_devices
    var to = "dmLUQB4dn4o:APA91bED4mwFPA52ViiDi2Lz6QAlmC4CNEDDh4ZZlSvFcRoU5rt-kAtpFXTCmY1pDpC1wkoHT6oVjJvclO5xt3ixgk1Yc9vhdVOoEYtvepTbjC0f8RAFmIMSxCESUKE7GCGc3q-hL20K"
    var jsonData = { "notification" : {"body" : message, "title" : title, "icon" : "ic_stat_r6" }, "to" : to};
    $.ajax({
        type: "POST",
        url: "https://fcm.googleapis.com/fcm/send",
        data: JSON.stringify(jsonData),
        contentType: "application/json",
        beforeSend: function (request)
        {
            request.setRequestHeader("Authorization", "");
        },
        success: function(data){
            if(data['success'] == "0"){
                submitMSG(false, "An error has occurred");
            }else if (data['success'] == "1"){
                formSuccess();
            }
            $('#form-submit').prop('disabled', false);
        },
        failure: function(errMsg) {
            submitMSG(false, "An error has occurred");
            $('#form-submit').prop('disabled', false);
        }
    });
}

function formSuccess(){
    $("#notificationForm")[0].reset();
    submitMSG(true, "Notification Sent!")
}

function formError(){
    $("#notificationForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}