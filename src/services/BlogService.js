const BLOG_API_BASE_URL = "https://a27345r7f9.execute-api.us-east-1.amazonaws.com/Prod/blog";

export default class BlogService {
    static async getPage(pageId) {
        const response = await fetch(`${BLOG_API_BASE_URL}/${encodeURIComponent(pageId)}`);

        if (!response.ok) {
            throw new Error(`Blog request failed with status ${response.status}`);
        }

        return response.json();
    }
}
