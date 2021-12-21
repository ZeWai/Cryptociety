//get conutries from API.
$().ready(() => {
    const selectDrop = $("#new_country");
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
})
//logout button handling
$(`#logout_btn`).attr("href", `http://localhost:3000/`)


