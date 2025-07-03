import React from 'react';
import '../src/components/blog/BlogPage.css';
import '../src/components/error/ErrorPage.css';
import '../src/components/home/blog/BlogCard.css';
import '../src/components/home/bottomframe/BottomFrame.css';
import '../src/components/home/home/Home.css';
import '../src/components/home/navbar/NavBar.css';
import '../src/components/home/quote/SingleQuote.css';
import '../src/components/home/timeline/TimeLineItem.css';
import 'react-vertical-timeline-component/style.min.css';
import 'react-notion-x/src/styles.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
