import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { Videos, ChannelCard } from '../components'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  console.log(channelDetail, videos)

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then(data => {
        console.log(data);
        setChannelDetail(data?.items[0])
      })

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then(data => setVideos(data?.items))
  }, [id]);

  return (
    <Box minHeight="95vh" sx={{background: "#000"}}>
      <Box>
        <div style={{
          background: `linear-gradient(90deg, rgba(29,109,253,1) 0%, rgba(131,58,180,1) 50%, rgba(252,143,0,1) 100%)`,
          zIndex: 10,
          height: "300px",
        }}/>
        <ChannelCard channelDetail={channelDetail} marginTop="-150px" />
      </Box>
      <Box display='flex' p="2">
        <Box sx={{mr : {sm: "100px"}}}/>
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail