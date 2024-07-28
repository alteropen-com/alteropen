import Slider from "react-slick"
import { Tweet } from "react-tweet"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}

export default function Twitters({ ids }: { ids: string[] }) {
  if (ids.length === 0) return null

  return (
    <div className="not-prose">
      <Slider {...settings} slidesToShow={ids.length > 2 ? 4 : 2}>
        {ids.map((id) => (
          <div key={id} className="px-2">
            <Tweet id={id} />
          </div>
        ))}
      </Slider>
    </div>
  )
}
