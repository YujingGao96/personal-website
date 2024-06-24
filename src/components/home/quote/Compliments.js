import React from "react";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import SingleQuote from "./SingleQuote";

const Compliments = () => {
    return (
        <div id="compliments">
            <h1 className="text-center gradient-text-4 fw-bold">Compliments</h1>
            <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                pagination={{ clickable: true }}
                className="py-5 px-3"
                style={{
                    "--swiper-pagination-color": "#86d5ff",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "0.3",
                    "--swiper-pagination-bullet-size": "0.7em",
                    "--swiper-pagination-bullet-horizontal-gap": "0.5em"
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    }
                }}
            >
                <SwiperSlide>
                    <SingleQuote
                        text="I am beyond grateful for your dedication to this project to make it right. I would be happy to help if you ever need a letter of recommendation, as I'm sure any employer would be pleased to know what kind of a person he's considering."
                        authorName="Larry Cline"
                        authorTitle="Manager of Midland Farmers Market"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <SingleQuote
                        text="Yujing, I am so incredibly proud of you! Your hard work and determination to succeed inspire everyone around you! I am genuinely excited and eager to see the amazing things you will accomplish in the future. Keep being awesome!"
                        authorName="Rebecca Hagues"
                        authorTitle="ESOL Teacher at Shaw High School"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <SingleQuote
                        text="I want to express my heartfelt gratitude to you for generously offering your time and expertise to support our student, as it will undoubtedly have a significant impact on the professional development of our CS and IT students."
                        authorName="Rania Hodhod"
                        authorTitle="Assistant CS Professor at CSU"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <SingleQuote
                        text="Your work demonstrates a wonderful example of interdisciplinary work that we always aspire for. This speaks volumes about the calibre of our faculty and students. We won't miss an opportunity to brag about this achievement."
                        authorName="Shamim Khan"
                        authorTitle="Professor & Chair of CS Department"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Compliments;
