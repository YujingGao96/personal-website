import axios from 'axios';

const fetchData = async (page) => {
    const url = 'https://a27345r7f9.execute-api.us-east-1.amazonaws.com/Prod/blog/' + page;
    console.log("making api call to: " + url);
    const response = await axios.get(url);
    return response.data;
}

export default fetchData;