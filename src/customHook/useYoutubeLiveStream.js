'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

export const useYoutubeLiveStream = (channelId)=>{
    const [liveStreamUrl, setLiveStreamUrl] = useState(null)

    useEffect(()=>{
        const fetchLiveStream = async ()=>{

            try{
                
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet,contentDetails&channelId=${channelId}&key=${process.env.NEXT_PUBLIC_API_KEY}`)
            const liveBroadcast = response.data.items[0]
            if(liveBroadcast && liveBroadcast.status == 'active'){
                setLiveStreamUrl(liveBroadcast.contentDetails.broadcastUrl)
            }else{
                setLiveStreamUrl(null)
            }
            }catch(e){
                console.log('Error fetching live stream ',e)
            }
        }
        const intervalId = setInterval(fetchLiveStream, 30000)
        return ()=>clearInterval(intervalId)
    }, [channelId])

    return liveStreamUrl
}