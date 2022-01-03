    $.ajax({
        url:"/api/index",
        method:"get",
        success:(data)=>{
          const username = data.username
          console.log(username)
        },
        error:(err)=>{
            console.log(err)
        }
    })
