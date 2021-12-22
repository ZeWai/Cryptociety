//get conutries from API.
$().ready(() => {
  //fetch api
  $.ajax({
    url: "https://restcountries.com/v2/all",
    method: "get",
    success: (data) => {
      let output = "";
      $.each(data, (index) => {
        output += `<option value="${data[index].name}">`;
      })
      $("#country-list").append(output);
    },
    error: (err) => {
      console.log(err)
    }
  })

  //change new icon button handling
  //check icon exists
  const iconSrc = $("#icon_img").attr('src') != "";
  const wrapper = ".wrapper";
  const defaultBtn = "#default_btn";
  const fileName = "userIcon.png";
  const img = "#icon_img";
  const cancelBtn = "#icon_cancel_btn";
  if (iconSrc) {
    // exists
    $(wrapper).addClass("active");
    //show name
    $(".file_name").html(fileName);
    //hidden attr
    $(".icon").attr("hidden", true);
    $(".text").attr("hidden", true);
  }
  $(`#custom_btn`).click(() => {
    $(defaultBtn).click();
    $(defaultBtn).change(() => {
      const reader = new FileReader()
      let formData = new FormData;
      let files = $(defaultBtn)[0].files[0];
      if (files) {
        //show icon
        reader.onload = async (event) => {
          //send post req to server
          formData.append("files", files);
          $.ajax({
            url: "/profile",
            method: "post",
            data: formData,
            cache: false,
            processData: false,
            contentType: false
          })
          //reader image
          $(img).attr('src', event.target.result)
          //add hover effect to icon
          $(wrapper).addClass("active");
        }
        reader.readAsDataURL(files)
      };
    });
  });
  //remove icon
  $(cancelBtn).click(() => {
    $(img).attr('src', "")
    $(".icon").attr("hidden", false);
    $(".text").attr("hidden", false);
    $(wrapper).removeClass("active");
    //send delete req to server
    formData.append("files", files);
    $.ajax({
      url: "/profile",
      method: "delete",
      data: formData,
      cache: false,
      processData: false,
      contentType: false
    });
  });

  //subscriber list button handling
  $(`#subscriber_list_btn`).click(() => {
    alert("subscriber_list")
  })

  //follower list button handling
  $(`#follower_list_btn`).click(() => {
    alert("follower_list")
  })

  //username edit button handling
  $(`#edit_username_btn`).click(() => {
    alert("edit_username")
  })

  //password edit button handling
  $(`#edit_passoword_btn`).click(() => {
    alert("edit_passoword")
  })

  //gender edit button handling
  $(`#edit_gender_btn`).click(() => {
    alert("edit_gender")
  })

  //birthday edit button handling
  $(`#edit_birthday_btn`).click(() => {
    alert("edit_birthday")
  })

  //country edit button handling
  $(`#edit_country_btn`).click(() => {
    alert("edit_country")
  })

  //album button handling
  $(`#album_btn`).click(() => {
    alert("album")
  })

  //logout button handling
  $(`#logout_btn`).attr("href", `http://localhost:3000/`)

  //slogan input handling
  $(`#slogan_input`).click(() => {
    alert("slogan")
  })

  //redirect subscriber profile handling
  $(`#subscriber_btn`).attr("href", `https://www.google.com/`)

  //redirect follower profile handling
  $(`#follower_btn`).attr("href", `https://www.google.com/`)

  //unfollow button handling
  $(`#unfollow_btn`).click(() => {
    alert("unfollow")
  })
  //follow button handling
  $(`#follow_btn`).click(() => {
    alert("follow")
  })
  //remove button handling
  $(`#remove_btn`).click(() => {
    alert("remove")
  })
})






//{{!--
//  <script>
//      const fileName = ".file_name"
//      const defaultBtn = "#default_btn"
//      const img = "#icom_img"
//      function defaultBtnActive() {
//          $(defaultBtn).click()
//      };
//      $(defaultBtn).change(() => {
//          const reader = new FileReader()
//          let files = document.getElementById('default_btn').files;
//          if (files) {
//              reader.onload = async (event) => {
//                  $(img).attr('src', event.target.result)
//              }
//              reader.readAsDataURL(files[0])
//          }
//          if (files) {
//              let valueStore = files[0].name;
//              $(fileName).html(valueStore);
//          }
//      });
//  </script> --}}