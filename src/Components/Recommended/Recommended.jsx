import React, { useEffect } from 'react'
import './Recommended.css'
import thumbnail from '../../assets/thumbnail1.png'
import {API_KEY, value_converter} from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {

    const [apiData, setApiData] = React.useState([])

    const fetchData= async () => {
        const relateVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=25&key=${API_KEY}` // Added maxResults=25 to fetch at least 25 recommended videos
        await fetch(relateVideo_url).then(res=>res.json()).then(data=>setApiData(data.items))
    }

    useEffect(()=>{
        fetchData()
    },[categoryId])

  return (
    <div className='recommended'>
        {apiData.map((item, index)=>{
            return (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div  className="vid-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{value_converter(item.statistics.viewCount)} </p>
            </div>
        </Link>
            )
        })}
    </div>
  )
}

export default Recommended