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
    $.ajax({
      url: '/profile',
      method: 'DELETE',
      success: function (result) {
        console.log(`${result} already deleted!`)
      }
    });
  });

  //subscriber list button handling
  $(`#subscriber_list_btn`).click(() => {
    $(`#edit_title h2`).html(`Subscribers`)
    //hidden
    $(`#follower_list`).attr(`hidden`, true)
    $(`#edit_password_verify`).attr(`hidden`, true)
    $(`#edit_username`).attr(`hidden`, true)
    $(`#edit_password`).attr(`hidden`, true)
    $(`#edit_gender`).attr(`hidden`, true)
    $(`#edit_submit`).attr(`hidden`, true)
    $(`#edit_birthday`).attr(`hidden`, true)
    $(`#edit_country`).attr(`hidden`, true)
    $(`#album_list`).attr(`hidden`, true)
    //show
    $(`#subscriber_list`).attr(`hidden`, false)
  })

  //follower list button handling
  $(`#follower_list_btn`).click(() => {
    $(`#edit_title h2`).html(`Followers`)
    //hidden
    $(`#subscriber_list`).attr(`hidden`, true)
    $(`#edit_password_verify`).attr(`hidden`, true)
    $(`#edit_username`).attr(`hidden`, true)
    $(`#edit_password`).attr(`hidden`, true)
    $(`#edit_gender`).attr(`hidden`, true)
    $(`#edit_submit`).attr(`hidden`, true)
    $(`#edit_birthday`).attr(`hidden`, true)
    $(`#edit_country`).attr(`hidden`, true)
    $(`#album_list`).attr(`hidden`, true)
    //show
    $(`#follower_list`).attr(`hidden`, false)
  })

  //username edit button handling
  $(`#edit_username_btn`).click(() => {
    $(`#edit_title h2`).html(`Usernmae`)
    //hidden
    $(`#subscriber_list`).attr(`hidden`, true)
    $(`#follower_list`).attr(`hidden`, true)
    $(`#edit_password`).attr(`hidden`, true)
    $(`#edit_gender`).attr(`hidden`, true)
    $(`#edit_birthday`).attr(`hidden`, true)
    $(`#edit_country`).attr(`hidden`, true)
    $(`#album_list`).attr(`hidden`, true)
    //show
    $(`#edit_password_verify`).attr(`hidden`, false)
    $(`#edit_username`).attr(`hidden`, false)
    $(`#edit_submit`).attr(`hidden`, false)
  })

  //password edit button handling
  $(`#edit_passoword_btn`).click(() => {
    $(`#edit_title h2`).html(`Password`)
    //hidden
    $(`#subscriber_list`).attr(`hidden`, true)
    $(`#follower_list`).attr(`hidden`, true)
    $(`#edit_username`).attr(`hidden`, true)
    $(`#edit_gender`).attr(`hidden`, true)
    $(`#edit_birthday`).attr(`hidden`, true)
    $(`#edit_country`).attr(`hidden`, true)
    $(`#album_list`).attr(`hidden`, true)
    //show
    $(`#edit_password_verify`).attr(`hidden`, false)
    $(`#edit_password`).attr(`hidden`, false)
    $(`#edit_submit`).attr(`hidden`, false)
  })

  //gender edit button handling
  $(`#edit_gender_btn`).click(() => {
    $(`#edit_title h2`).html(`Gender`)
    //hidden
    $(`#subscriber_list`).attr(`hidden`, true)
    $(`#follower_list`).attr(`hidden`, true)
    $(`#edit_username`).attr(`hidden`, true)
    $(`#edit_password`).attr(`hidden`, true)
    $(`#edit_birthday`).attr(`hidden`, true)
    $(`#edit_country`).attr(`hidden`, true)
    $(`#album_list`).attr(`hidden`, true)
    //show
    $(`#edit_password_verify`).attr(`hidden`, false)
    $(`#edit_gender`).attr(`hidden`, false)
    $(`#edit_submit`).attr(`hidden`, false)
  })

  //birthday edit button handling
  $(`#edit_birthday_btn`).click(() => {
    $(`#edit_title h2`).html(`Birthday`)
    //hidden
    $(`#subscriber_list`).attr(`hidden`, true)
    $(`#follower_list`).attr(`hidden`, true)
    $(`#edit_username`).attr(`hidden`, true)
    $(`#edit_password`).attr(`hidden`, true)
    $(`#edit_gender`).attr(`hidden`, true)
    $(`#edit_country`).attr(`hidden`, true)
    $(`#album_list`).attr(`hidden`, true)
    //show
    $(`#edit_password_verify`).attr(`hidden`, false)
    $(`#edit_birthday`).attr(`hidden`, false)
    $(`#edit_submit`).attr(`hidden`, false)
  })

  //country edit button handling
  $(`#edit_country_btn`).click(() => {
    $(`#edit_title h2`).html(`Country`)
    //hidden
    $(`#subscriber_list`).attr(`hidden`, true)
    $(`#follower_list`).attr(`hidden`, true)
    $(`#edit_username`).attr(`hidden`, true)
    $(`#edit_password`).attr(`hidden`, true)
    $(`#edit_gender`).attr(`hidden`, true)
    $(`#edit_birthday`).attr(`hidden`, true)
    $(`#album_list`).attr(`hidden`, true)
    //show
    $(`#edit_password_verify`).attr(`hidden`, false)
    $(`#edit_country`).attr(`hidden`, false)
    $(`#edit_submit`).attr(`hidden`, false)
  })

  //album button handling
  $(`#album_btn`).click(() => {
    $(`#edit_title h2`).html(`Album`)
    //hidden
    $(`#subscriber_list`).attr(`hidden`, true)
    $(`#follower_list`).attr(`hidden`, true)
    $(`#edit_username`).attr(`hidden`, true)
    $(`#edit_password`).attr(`hidden`, true)
    $(`#edit_gender`).attr(`hidden`, true)
    $(`#edit_birthday`).attr(`hidden`, true)
    $(`#edit_password_verify`).attr(`hidden`, true)
    $(`#edit_country`).attr(`hidden`, true)
    $(`#edit_submit`).attr(`hidden`, true)
  })
  //show
  $.ajax({
    url: "/api/profile",
    method: "get",
    success: (data) => {
      let photo = data.photo;
      if (photo.length == 0) {
        $(`#album_list`).attr(`hidden`, true)
      } else {
        $(`#album_list`).attr(`hidden`, false)
      }
    },
    error: (err) => {
      console.log(err)
    }
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
