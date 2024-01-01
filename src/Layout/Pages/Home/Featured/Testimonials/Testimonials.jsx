import SectionTitle from "../../../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import '@smastrom/react-rating/style.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
const Testimonials = () => {
    const [reviews , setReviews] = useState([]) ;
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
        .then(res => res.json())
        .then(data => setReviews(data))
    }, [])

    return (
        <div className="my-23">
            <SectionTitle
            heading='Testimonials'
            subHeading='What Our Client Says'
            ></SectionTitle>

<Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      
      {
        reviews.map(review => <SwiperSlide
        key={review._id}
        >
            <div className="m-24">
                <Rating
      style={{ maxWidth: 180 }}
      value={review.rating}
      readOnly
    />
                <p>{review.details}</p>
                <h3 className="text-2xl text-orange-400"> {review.name}</h3>

            </div>
        </SwiperSlide>)
      }

      </Swiper>
            
        </div>
    );
};

export default Testimonials;