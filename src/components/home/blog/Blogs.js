import React from "react";

import 'swiper/css';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css/pagination';
import BlogCard from "./BlogCard";
import {blogsInHomePage} from "../../../resolvers/blogPicker";
import {extractBeforeLastDash} from "../../../util/StringUtil";


const blogCards = blogsInHomePage.map(pageId =>
    <SwiperSlide key={pageId}><BlogCard title={extractBeforeLastDash(pageId)} link={pageId}/></SwiperSlide>
)

const Blogs = () => {

    return (
        <div id="blogs">
            <h1 className="text-center gradient-text-5 fw-bold">Blogs</h1>
            <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                pagination={{clickable: true}}
                className="py-5 px-3"
                style={{
                    "--swiper-pagination-color": "#c595ea",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "1",
                    "--swiper-pagination-bullet-size": "12px",
                    "--swiper-pagination-bullet-horizontal-gap": "6px"
                }}
                breakpoints={{
                    // when window width is >= 640px
                    640: {
                        width: 640,
                        slidesPerView: 1,
                    },
                    // when window width is >= 768px
                    768: {
                        width: 768,
                        slidesPerView: 2,
                    },
                }}
            >
                {blogCards}

            </Swiper>
        </div>

    );
};

export default Blogs;