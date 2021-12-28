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
    $("#icon_img").attr('hidden', false)
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
            url: "/setting",
            method: "post",
            data: formData,
            cache: false,
            processData: false,
            contentType: false
          })
          //reader image
          $(img).attr('src', event.target.result)
          $("#icon_img").attr('hidden', false)
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
    $("#icon_img").attr('hidden', true)
    $(wrapper).removeClass("active");
    //send delete req to server
    $.ajax({
      url: '/setting',
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
    $(`#create_group`).attr(`hidden`, true)
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
    $(`#create_group`).attr(`hidden`, true)
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
    $(`#create_group`).attr(`hidden`, true)
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
    $(`#create_group`).attr(`hidden`, true)
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
    $(`#create_group`).attr(`hidden`, true)
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
    $(`#create_group`).attr(`hidden`, true)
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
    $(`#create_group`).attr(`hidden`, true)
    //show
    $(`#edit_password_verify`).attr(`hidden`, false)
    $(`#edit_country`).attr(`hidden`, false)
    $(`#edit_submit`).attr(`hidden`, false)
  })

  //album button handling
  //fetch photo
  $.ajax({
    url: "/api/setting",
    method: "get",
    success: (data) => {
      let photo = data.photo;
      if (photo.length == 0) {
        $(`#album_list`).attr(`hidden`, true)
      } else {
        $(`#album_list`).attr(`hidden`, false)
        let photos = "";
        $.each(photo, (index) => {
          photos +=
            `        
                <li class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 col-xxl-3 photo_list" id="${photo[index]}_li">
                    <p class="text-center"><i class="fas fa-image"></i>${photo[index]}</p>
                    <img src="../../../image/photo/${photo[index]}" alt="${photo[index]} id="${photo[index]}">
                    <a class="btn submit col-6 download" href="#" id="album_download_btn_${photo[index]}">Download</a>
                    <a class="btn cancel col-6 remove" href="#" id="album_delete_btn_${photo[index]}" >Delete</a>
                </li>
              `;
        })
        $("#album_list .row").append(photos);
        //handle download button
        $(`#album_ul .download`).click((event) => {
          let image = $(event.currentTarget).attr("id").slice(19);
          $(event.currentTarget).attr("href", `http://localhost:3000/download/album/${image}`);
        });
        //handle delete button
        $(`#album_ul .remove`).click((event) => {
          //get image id
          let image = $(event.currentTarget).attr("id").slice(17);
          // create new data from to server
          let formData = new FormData;
          // append data to data form (key:value)
          let files = image;
          formData.append("image", files);
          //send req to server (req.body.[key]) get value)
          $.ajax({
            url: "/delete/album",
            method: "delete",
            data: formData,
            cache: false,
            processData: false,
            contentType: false
          })
          // remove parent element of the delete button
          $(event.currentTarget).parents("li.photo_list").remove();
        });
      };
    },
    error: (err) => {
      console.log(err)
    }
  })
  //event handle
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
    $(`#create_group`).attr(`hidden`, true)
    //show
    $(`#album_list`).attr(`hidden`, false)
  })
  //event handle
  $(`#group_btn`).click(() => {
    $(`#edit_title h2`).html(`Create Group`)
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
    $(`#album_list`).attr(`hidden`, true)
    //show
    $(`#create_group`).attr(`hidden`, false)
  })

  //slogan input handling
  $(`#slogan_input`).change(() => {
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

  //Submit handling
  let input = ["#password_verify", "#new_username", "#new_password", "#confirm_new_password", "#new_gender", "#new_birthday", "#new_country"]
  //info edit submit button
  $("#edit_submit_btn").click(() => {
    // create new data from to server
    let formData = new FormData;
    // append data to data form (key:value) object to json
    let files = JSON.stringify({
      password_verify: $(`${input[0]}`).val(),
      new_username: $(`${input[1]}`).val(),
      new_password: $(`${input[2]}`).val(),
      confirm_new_password: $(`${input[3]}`).val(),
      new_gender: $(`${input[4]}`).val(),
      new_birthday: $(`${input[5]}`).val(),
      new_country: $(`${input[6]}`).val()
    })
    formData.append("input", files);
    $.ajax({
      url: "/setting",
      method: "put",
      data: formData,
      processData: false,
      contentType: false,
      success: (data) => {
        //verify password
        if (data.verify === "fail") {
          alert("Incorret password! Please try again!")
        } else {
          alert("Editing success!")
          //clear all the input value
          for (let i = 0; i < input.length; i++) {
            $(`${input[i]}`).val("")
          }
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  })
  //info edit cancel button
  $("#edit_cancel_btn").click(() => {
    for (let i = 0; i < input.length; i++) {
      $(`${input[i]}`).val("")
    }
  })
})
