$().ready(() => {
  $.ajax({
    url: `/content`,
    method: `get`,
    success: (data) => {
      $(`#content_list`).attr("hidden", false)
      if (data) {
        let content = "";
        $.each(data, (index) => {
          //remove old li
          $(`#content_${data[index].id}_li`).remove()
          //add new data
          content +=
            `
              <li class="row" id="content_${data[index].id}_li>
                <div class="row">
                  <div class="col-2">
                    <img src="../../../image/uploaded/userIcon_${data[index].profile_id}.png" id="content_owner_icon">
                    <p id="content_owner">${data[index].username}</p>
                  </div>
                  <div class="col-10" id="content_info">
                    <div class="colum">
                      <p class="col-2" id="content_post_date">${data[index].created_at}</p>
                      <p class="col-10" id="content_post_text">
                      ${data[index].written_text}</p >
                    </div>
                  </div>
                </div>
              </li >
            `
        })
        $("#content_list .row ul").append(content);
      }
    },
    error: (error) => {
      console.log(error)
    }
  })
})

//create post
$(`#create_post`).click(() => {
  $(`#content_list`).attr("hidden", true)
  $(`#create_post_section`).attr("hidden", false)
})

//submit create
$(`#article_submit_btn`).click(() => {
  // create new data from to server
  let formData = new FormData;
  let files = JSON.stringify({ article: $(`#article`).val() })
  //send post req to server
  formData.append("msg", files);
  //create req to server
  $.ajax({
    url: "/create/article",
    method: "post",
    data: formData,
    cache: false,
    processData: false,
    contentType: false,
    success: (data) => {
      if (data.post === "true") {
        $(`#article`).val("")
        location.reload()
      }
    },
    error: (err) => {
      console.log(err)
    }
  })
})

//cancel create
$(`#article_cancel_btn`).click(() => {
  $(`#article`).val("")
})
