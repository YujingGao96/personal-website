import React from "react";
import 'swiper/css';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css/pagination';
import SingleQuote from "./SingleQuote";

const Compliments = () => {
    return (
        <div id="compliments">
            <h1 className="text-center gradient-text-4 fw-bold">Compliments</h1>
            <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                pagination={{clickable: true}}
                className="py-5 px-3"
                style={{
                    "--swiper-pagination-color": "#86d5ff",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "0.3",
                    "--swiper-pagination-bullet-size": "0.7em",
                    "--swiper-pagination-bullet-horizontal-gap": "0.5em"
                }}
            >
                <SwiperSlide>
                    <SingleQuote
                        text="I am beyond grateful for your dedication to this project.  It shows a lot of character that you have taken the time and effort to work to make it right, even though you no longer have a personal stake in this since you've already received your grade and graduated.  I would be very happy to help if you ever need a letter of recommendation, as I'm sure any employer would be pleased to know what kind of a person he is considering."
                        authorName="Larry Cline,"
                        authorTitle="Manager of Midland Farmers Market"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <SingleQuote
                        text="Yujing, I am so proud of you! Your hard work and determination to succeed inspire everyone! I look forward to seeing what you will accomplish in the future!"
                        authorName="Rebecca Hagues,"
                        authorTitle="ESOL Teacher of Shaw High School"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Compliments;
