import React from "react";
import "./Gig.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

const Gig = () => {
  const { id } = useParams();

  // Fetch gig
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  const userId = data?.userId ?? "";

  // Fetch user
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  // Loading
  if (isLoading || isLoadingUser) {
    return <div className="gig">Loading...</div>;
  }

  // Error
  if (error || errorUser || !data || !dataUser) {
    return <div className="gig">Something went wrong</div>;
  }

  const rating = Math.round(data.totalStars / data.starNumber);

  return (
    <div className="gig">
      <div className="container">

        {/* LEFT SIDE */}
        <div className="left">

          <span className="breadCrumbs">
            CodeHunt ➤ Graphics & Design ➤ Gig ➤
          </span>

          <h1>{data.title}</h1>

          {/* USER INFO */}
          <div className="user">

            <img
              className="pp"
              src={dataUser.img || "/img/pp1.jpg"}
              alt=""
            />

            <span>{dataUser.username}</span>

            {!isNaN(rating) && (
              <div className="stars">

                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <img src="/img/star.png" alt="" key={i} />
                  ))}

                <span>{rating}</span>

              </div>
            )}

          </div>

          {/* IMAGE SLIDER */}
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            className="slider"
          >
            {data.images.map((img) => (
              <SwiperSlide key={img}>
                <img src={img} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ABOUT */}
          <h2>About This Gig</h2>
          <p>{data.desc}</p>

          {/* SELLER INFO */}
          <div className="seller">

            <h1>About The Seller</h1>

            <div className="user">

              <img
                src={dataUser.img || "/img/girl.png"}
                alt=""
              />

              <div className="info">

                <span>{dataUser.username}</span>

                {!isNaN(rating) && (
                  <div className="star">

                    {Array(rating)
                      .fill()
                      .map((_, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}

                    <span>{rating}</span>

                  </div>
                )}

                <button>Contact Me</button>

              </div>

            </div>

            <div className="box">

              <div className="items">

                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser.country}</span>
                </div>

                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>

                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>

                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>

                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>

              </div>

              <hr />

              <p>{dataUser.desc}</p>

            </div>

          </div>

          {/* REVIEWS */}
          <Reviews gigId={id} />

        </div>

        {/* RIGHT SIDE */}
        <div className="right">

          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>$ {data.price}</h2>
          </div>

          <p>{data.shortDesc}</p>

          <div className="details">

            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{data.deliveryTime} Days Delivery</span>
            </div>

            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>

          </div>

          <div className="features">

            {data.features.map((feature) => (
              <div className="item" key={feature}>
                <img src="/img/greencheck.png" alt="" />
                <span>{feature}</span>
              </div>
            ))}

          </div>

          <Link to={`/pay/${id}`}>
            <button>Continue</button>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Gig;
