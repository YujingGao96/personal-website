import allBlogs from '../data/blogs.js';

// Number of blogs to display on the home page
const numBlogsInHomePage = 4;

const pickRandomElements = (list, num) => {
    const shuffled = list.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

export const blogsInHomePage = pickRandomElements(allBlogs, numBlogsInHomePage);

