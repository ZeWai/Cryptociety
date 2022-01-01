$(`#profile_Follow_btn`).click(() => {
    let url = document.location.href
    // create new data from to server
    let formData = new FormData;
    // append data to data form (key:value) object to json
    let msg = JSON.stringify({
        action: "follow",
        target: url.slice(31)
    })
    formData.append("action", msg);
    $.ajax({
        url: "/profile/:id",
        method: "put",
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
            $(".alert_success").removeClass("hidden")
            $(".alert_success").addClass("show")
            $(".alert").removeClass("show")
            $(".alert").addClass("hidden")
            //auto close 3s
            setTimeout(() => {
                $(".alert_success").removeClass("show")
                $(".alert_success").addClass("hidden")
            }, 3000);
        },
        error: (err) => {
            console.log(err)
        }
    })
})
$(`#profile_Unfollow_btn`).click(() => {
    let url = document.location.href
    // create new data from to server
    let formData = new FormData;
    // append data to data form (key:value) object to json
    let msg = JSON.stringify({
        action: "unfollow",
        target: url.slice(31)
    })
    formData.append("action", msg);
    $.ajax({
        url: "/profile/:id",
        method: "put",
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
            $(".alert_success").removeClass("hidden")
            $(".alert_success").addClass("show")
            $(".alert").removeClass("show")
            $(".alert").addClass("hidden")
            //auto close 3s
            setTimeout(() => {
                $(".alert_success").removeClass("show")
                $(".alert_success").addClass("hidden")
            }, 3000);
        },
        error: (err) => {
            console.log(err)
        }
    })
})
$(`#profile_Remove_btn`).click(() => {
    let url = document.location.href
    // create new data from to server
    let formData = new FormData;
    // append data to data form (key:value) object to json
    let msg = JSON.stringify({
        action: "remove",
        target: url.slice(31)
    })
    formData.append("action", msg);
    $.ajax({
        url: "/profile/:id",
        method: "put",
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
            $(".alert_success").removeClass("hidden")
            $(".alert_success").addClass("show")
            $(".alert").removeClass("show")
            $(".alert").addClass("hidden")
            //auto close 3s
            setTimeout(() => {
                $(".alert_success").removeClass("show")
                $(".alert_success").addClass("hidden")
            }, 3000);
        },
        error: (err) => {
            console.log(err)
        }
    })
})
$(`#profile_Block_btn`).click(() => {
    let url = document.location.href
    // create new data from to server
    let formData = new FormData;
    // append data to data form (key:value) object to json
    let msg = JSON.stringify({
        action: "block",
        target: url.slice(31)
    })
    formData.append("action", msg);
    $.ajax({
        url: "/profile/:id",
        method: "put",
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
            $(".alert_success").removeClass("hidden")
            $(".alert_success").addClass("show")
            $(".alert").removeClass("show")
            $(".alert").addClass("hidden")
            //auto close 3s
            setTimeout(() => {
                $(".alert_success").removeClass("show")
                $(".alert_success").addClass("hidden")
            }, 3000);
        },
        error: (err) => {
            console.log(err)
        }
    })
})