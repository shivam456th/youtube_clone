import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'; // Added moment.js import
import { data, useParams } from 'react-router-dom'
const PlayVideo = () => {
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const res = await fetch(videoDetails_url);
    const data = await res.json();
    setApiData(data.items[0]);
  };

  const fetchOtherData = async () => {
    if (!apiData) return;
    const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    const res = await fetch(channel_url);
    const data = await res.json();
    setChannelData(data.items[0]);

    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    const commentRes = await fetch(comment_url);
    const commentData = await commentRes.json();
    setCommentData(commentData.items);
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>

      <div className="play-video-info">
        <p>{apiData?value_converter(apiData.statistics.viewCount): "16K"} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
        <div>
          <span>
            <img src={like} alt="like" /> {apiData?value_converter(apiData.statistics.likeCount): 155}
          </span>
          <span>
            <img src={dislike} alt="dislike" /> 2
          </span>
          <span>
            <img src={share} alt="share" /> Share
          </span>
          <span>
            <img src={save} alt="save" /> Save
          </span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="publisher" />
        <div>
          <p>{apiData?apiData.snippet.channelTitle:""}</p>
          <span>{channelData?value_converter(channelData.statistics.subscriberCount):"1M"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>Channel that makes learning Easy!</p>
        <p>{apiData?apiData.snippet.description.slice(0, 250): "Description Here"}</p>
      </div>

      <hr />

      <h4>{apiData?value_converter(apiData.statistics.commentCount):102} comments</h4 >

      {commentData.map((item, index)=>{
        return <div key={index} className="comment">
        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user profile" />
        <div>
          <h3>
            {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
          </h3>
          <p>
            A global computer network providing a variety of information and
            communication facilities, consisting of interconnected networks using
            standardized communication protocols.
          </p>
          <div className="comment-action">
            <img src={like} alt="like" />
            <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
            <img src={dislike} alt="dislike" />
          </div>
        </div>
      </div>
      })}

      <div className="comment">
        <img src={user_profile} alt="user profile" />
        <div>
          <h3>
            Jack Nicholson <span>1 day ago</span>
          </h3>
          <p>
            A global computer network providing a variety of information and
            communication facilities, consisting of interconnected networks using
            standardized communication protocols.
          </p>
          <div className="comment-action">
            <img src={like} alt="like" />
            <span>244</span>
            <img src={dislike} alt="dislike" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayVideo
