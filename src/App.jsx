import { useState } from "react";
import axios from "axios";
import Downloads from "./assets/download.svg";

function App() {
  const [video, setVideo] = useState([]);
  const [search, setSearch] = useState("");
  const [youtube, setYoutube] = useState([]);
  const [warn, setWarn] = useState(false);

  const fetchApi = async (url) => {
    if (url !== undefined) {
      const request = await axios.get(
        `https://anxious-tick-tiara.cyclic.app/asuna?yt=${url}`
      );
      request.data.results
        ? setVideo(request.data.results)
        : setVideo(request.data.video_details);
    }
  };

  const handleClick = async (youtubeUrl) => {
    await axios
      .get(`https://anxious-tick-tiara.cyclic.app/asuna?yt=${youtubeUrl}`)
      .then((d) => setYoutube(d.data.format));
  };

  const cardVideo = video.map
    ? video.map((video, i) => {
        return (
          <div key={i}>
            {video.bestThumbnail !== undefined ? (
              <div key={i} className="mt-4 border shadow-md p-2 rounded-md">
                <div className="relative">
                  <img
                    src={video.bestThumbnail["url"]}
                    className="w-full h-full mt-2"
                  />
                  <div className="absolute right-2 bottom-2 backdrop-blur bg-indigo-500 py-1 px-6 rounded-md font-semibold text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="flex items-center mt-2 space-x-3">
                  <img
                    src={video.author.bestAvatar["url"]}
                    className="rounded-full object-cover scale-75"
                  />
                  <div>
                    <a
                      href={video.url}
                      target="_blank"
                      className="mt-2 font-semibold"
                    >
                      {video.title}
                    </a>
                    <p target="_blank" className="opacity-60">
                      {video.author.name} | {video.uploadedAt}
                    </p>
                    <p>{video.views.toLocaleString()} views</p>
                  </div>
                </div>
                <div className="flex justify-between my-3">
                  <div className="space-x-3">
                    <a
                      href={video.url}
                      target="_blank"
                      className="py-1 px-6 bg-indigo-500 text-white shadow-md rounded-md"
                    >
                      Tonton
                    </a>
                    <button
                      onClick={() => handleClick(video.url)}
                      value="download"
                      target="_blank"
                      href={youtube.length > 0 ? youtube[0].url : null}
                      className="inline-block py-1 px-6 bg-indigo-500 text-white shadow-md rounded-md"
                    >
                      Download
                    </button>
                  </div>
                  <div>
                    <a
                      className={
                        youtube.length > 0 ? "px-3 inline-block" : "hidden"
                      }
                      href={youtube.length > 0 ? youtube[0].url : null}
                      target="_blank"
                    >
                      <img src={Downloads} width={30} height={30} />
                    </a>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      })
    : null;

  const handleClose = () => {
    setWarn(true);
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-10 px-3">
        <h1 className="text-center text-xl font-semibold">
          YoutubeKun - YoutubeDownloader
        </h1>
        {warn ? null : (
          <div className="relative">
            <h1 className="text-center text-2xl my-2 bg-rose-500 text-white rounded-md shadow-md font-semibold py-2">
              kalo ga muncul jangan di spam!!!
            </h1>
            <div
              onClick={() => handleClose()}
              className="w-10 h-10 absolute -top-5 -right-5 bg-slate-300 cursor-pointer shadow-md rounded-full flex justify-center items-center"
            >
              X
            </div>
          </div>
        )}
        <div className="w-full h-2 bg-indigo-500 rounded-md shadow-md"></div>
        <div className="flex space-x-1 mt-4">
          <input
            type="text"
            placeholder="keyword or paste link"
            className="border shadow-md py-1 px-4 w-full rounded-md"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            onClick={() => fetchApi(search)}
            className="bg-indigo-500 py-1 px-3 rounded-md text-white shadow-md cursor-pointer transition-all duration-300 hover:bg-indigo-600"
          >
            Search
          </div>
        </div>
        {cardVideo}
      </div>
    </div>
  );
}

export default App;
