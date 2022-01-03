// Youtube videos api
const fetch = require("node-fetch");
const { YOUTUBE_API_KEY } = require("./config");
if (!YOUTUBE_API_KEY) {
    throw new Error("No API key provided");
}
async function getYoutubeResults(query, resultsPerPage) {
    console.log("getting youtube data");
    let url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&q=${query}`;
    if(resultsPerPage) {
        url = `${url}&maxResults=${resultsPerPage}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    return data;
}

async function main() {
    const data = await getYoutubeResults("cryptocurrency", 10);
    
}

main("cryptocurrency", 10);