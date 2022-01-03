let url = document.location.href
$(`#profile_follow_btn`).click(() => {
    // create new data from to server
    let formData = new FormData;
    // append data to data form (key:value) object to json
    let msg = JSON.stringify({
        action: "subscriber",
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
            $(`#profile_follow_btn`).attr("hidden", true)
            $(`#profile_remove_btn`).attr("hidden", true)
            $(`#profile_unfollow_btn`).attr("hidden", false)
            $(`#profile_block_btn`).attr("hidden", false)
        },
        error: (err) => {
            console.log(err)
        }
    })
})
$(`#profile_unfollow_btn`).click(() => {
    // create new data from to server
    let formData = new FormData;
    // append data to data form (key:value) object to json
    let msg = JSON.stringify({
        action: "follower",
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
            $(`#profile_unfollow_btn`).attr("hidden", true)
            $(`#profile_remove_btn`).attr("hidden", true)
            $(`#profile_follow_btn`).attr("hidden", false)
            $(`#profile_block_btn`).attr("hidden", false)
        },
        error: (err) => {
            console.log(err)
        }
    })
})
$(`#profile_remove_btn`).click(() => {
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
            $(`#profile_remove_btn`).attr("hidden", true)
        },
        error: (err) => {
            console.log(err)
        }
    })
})
$(`#profile_block_btn`).click(() => {
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
            $(`#profile_block_btn`).attr("hidden", true)
            $(`#profile_unfollow_btn`).attr("hidden", true)
            $(`#profile_remove_btn`).attr("hidden", true)
            $(`#profile_follow_btn`).attr("hidden", false)
        },
        error: (err) => {
            console.log(err)
        }
    })
})