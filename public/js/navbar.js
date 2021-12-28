const ip = "http://localhost:3000/";

//logo button handling 
$(`#logo_btn`).attr("href", `#`)

//search bar handling 
$("#search_bar").keyup(() => {
    alert(`search bar keyup`);
});

//market button handling 
$(`#market_btn`).attr("href", `${ip}market`)

//index button handling 
$(`#index_btn`).attr("href", `${ip}index`)

//setting button handling 
$(`#setting_btn`).attr("href", `${ip}setting`)

//logout button handling 
$(`#logout_btn`).attr("href", `${ip}`)