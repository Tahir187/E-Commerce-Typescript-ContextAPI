import { sliderImgs } from "../utils/images";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderSlider = () => {
  let settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="slider flex mx-auto px-6">
      <div className="container mx-auto">
        <div className="overflow-x-hidden overflow-y-hidden">
          <Slider {...settings}>
            {sliderImgs.map((img, index) => (
              <div key={index} className="max-h-[300px] ">
                <img src={img} alt="" className="w-full h-full object-cover mt-2" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default HeaderSlider;
