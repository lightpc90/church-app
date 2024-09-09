'use client'


import {useState} from 'react'
import LiveStream from './LiveStream'
import LiveStreamFallback from './LiveStreamFallBack'

const LiveProgram = () => {
    const [fallback, setFallback] = useState<boolean>(false)
  return (
    <div>
      {fallback ? (
        <LiveStreamFallback />
      ) : (
        <LiveStream setFallback={setFallback} />
      )}
    </div>
  );
}

export default LiveProgram