"use client"

import { Alternative } from "@/.velite"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

const settings = {
  dots: true,
  // lazyLoadType: "ondemand",
  infinite: false,
  // speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  className: "not-prose",
  // responsive: [],
}

const DetailImage = ({ post }: { post: Alternative }) => {
  const images = [post.image, ...(post.images || [])]

  return (
    <div className="not-prose flex w-full">
      <div className="min-h-[368px] w-full pb-10">
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
