// Youtube videos api
const fetch = require("node-fetch");
const { YOUTUBE_API_KEY } = require("./config");
if (!YOUTUBE_API_KEY) {
  throw new Error("No API key provided");
}
async function getYoutubeResults(query, resultsPerPage, pageToken) {
  console.log("getting youtube data");
  let url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&q=${query}`;
  if (resultsPerPage) {
    url = `${url}&maxResults=${resultsPerPage}`;
  }
  if (pageToken) {
    url = `${url}&pageToken=${pageToken}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  return data;
}

async function main() {
  const videoData = [];

  let totalPages = 5;
  let nextPageToken = undefined;

  for (let i = 0; i < totalPages; i++) {
    const data = await getYoutubeResults("cryptocurrency", 10, nextPageToken);
    videoData.push(...data.items);
    nextPageToken = data.nextPageToken;
  }
  console.log(videoData);
  console.log(`There are ${videoData.length} items in videoData!`);

  let formData = new FormData();

  for( let key in item ) {
      formData.append(key, item[key]);
  }
  formData.append("videoLinks", videos);
  $.ajax({
      url: ("/videos"),
      method: "post",
      data: formData,
      processData: false,
      contentType: false,
      success: (data) => {
          console.log(data)
      },
      error: (err) => {
          console.log(err)
      }

  })
}


module.exports = {
    getYoutubeResults,
    main,
};
