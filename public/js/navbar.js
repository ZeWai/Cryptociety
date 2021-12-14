const ip = "http://localhost:3000/";

//logo button handling 
$(`#logo_btn`).attr("href", `#`)

//search bar handling 
$("#search_bar").keyup(() => {
    alert(`search bar keyup`);
});

//index button handling 
$(`#index_btn`).attr("href", `${ip}index`)

//profile button handling 
$(`#profile_btn`).attr("href", `${ip}profile`)

//setting button handling 
$(`#setting_btn`).attr("href", `${ip}setting`)
