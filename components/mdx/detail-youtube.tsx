"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import YouTube from "react-youtube"

const DetailYoutube = ({
  videoId,
  startTime,
}: {
  videoId?: String
  startTime?: Number
}) => {
  const [, startTransition] = useTransition()
  const [showVideo, setShowVideo] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  const videoContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to the video container when the video starts playing
  useEffect(() => {
    if (showVideo && hasLoaded && videoContainerRef.current) {
      videoContainerRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [showVideo, hasLoaded])

  if (!videoId) {
    return null
  }

  return (
    <div
      ref={videoContainerRef}
      className={`${
        !showVideo || !hasLoaded ? "max-w-[500px]" : "max-w-full"
      } p-2 m-auto`}
    >
      <div className="overflow-hidden pb-[56.25%] relative w-full">
        {(!showVideo || !hasLoaded) && (
          <button
            className="absolute inset-0 w-full h-full bg-transparent border-0 cursor-pointer block m-0 p-0 no-underline"
            onClick={() => {
              startTransition(() => {
                setShowVideo(true)
              })
            }}
          >
            <div className="not-prose absolute inset-0 w-full h-full">
              <img
                loading="lazy"
                alt={`youtube ${videoId}`}
                src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                className="w-full"
              />
              <img
                alt="Play Video"
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_play_button_icon_%282013%E2%80%932017%29.svg"
                className="h-[42px] left-[calc(50%-30px)] absolute top-[calc(50%-21px)] transition-all duration-300 ease-in-out w-[60px]"
              />
            </div>
          </button>
        )}
        {showVideo && (
          <Player
            videoId={videoId}
            setHasLoaded={setHasLoaded}
            startTime={startTime}
          />
        )}
      </div>
    </div>
  )
}

export default DetailYoutube

const Player = ({
  setHasLoaded,
  videoId,
  startTime,
}: {
  setHasLoaded: any
  videoId: any
  startTime: Number | undefined
}) => {
  const opts = {
    playerVars: {
      autoplay: 1,
      start: startTime || 0,
      rel: 0,
    },
  }
  // Once the YouTube package (react-youtube) has loaded
  // tell the thumbnail it is no longer needed.
  // Play the video.
  const _onReady = (event: any) => {
    setHasLoaded(true)
    event.target.playVideo()
  }

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onReady={_onReady}
      className={"absolute inset-0 w-full h-full"}
      iframeClassName={"absolute inset-0 w-full h-full"}
    />
  )
}
