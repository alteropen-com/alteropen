"use client"

import { Alternative } from "@/.velite"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

const settings = {
  dots: true,
  lazyLoadType: "ondemand",
  infinite: false,
  // speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  className: "not-prose",
  // responsive: [],
}

const DetailImage = ({ post }: { post: Alternative }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (document.readyState === "complete") {
      setShouldRender(true)
    } else {
      // Add event listener to run the code when everything is loaded
      window.addEventListener("load", () => setShouldRender(true))

      // Clean up the event listener
      return () =>
        window.removeEventListener("load", () => setShouldRender(true))
    }
  }, [])

  const images = [post.image, ...(post.images || [])]

  const handleChangeImage = (index: number) => {
    setSelectedImageIndex(index)
  }

  return (
    <div className="not-prose flex w-full">
      <div className="hidden w-12 sm:flex flex-col space-y-2 mr-4">
        {shouldRender ? (
          images.map((img, index) => {
            const { url, alt } = img
            return (
              <div key={index}>
                <img
                  loading="lazy"
                  src={url}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                  alt={`${alt} ${post.title}`}
                  onMouseEnter={() => handleChangeImage(index)}
                  onClick={() => handleChangeImage(index)}
                />
              </div>
            )
          })
        ) : (
          <div className="w-12">
            <Loader className="animate-spin" size={14} />
          </div>
        )}
      </div>
      <div className="hidden sm:flex flex-1 flex-col sm:min-h-[60vh] max w-full">
        <div className="min-h-[368px] w-full overflow-hidden">
          <img
            loading="lazy"
            src={images[selectedImageIndex].url}
            className="w-full rounded-lg mb-2 object-contain"
            alt={`${images[selectedImageIndex].alt} ${post.title}`}
          />
        </div>
        <p className="text-center text-sm animate-fadeInText">
          {images[selectedImageIndex].alt}
        </p>
      </div>
      <div className="min-h-[368px] sm:hidden w-full pb-10">
        <Slider {...settings}>
          {images.map((img, index) => {
            const { url, alt } = img
            return (
              <div key={index} className="w-full mt-1">
                <img
                  loading="lazy"
                  src={url}
                  className="w-full rounded-lg object-contain max-h-[86vh] sm:max-h-none"
                  alt={`${alt} ${post.title}`}
                />
                <p className="text-center text-sm">{post.image.alt}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default DetailImage
