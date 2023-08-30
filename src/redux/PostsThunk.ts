import { axiosInstance } from './../configs/axios';
import { Post } from "./interfaces"

export const createPostBack = async (
    post: Post
): Promise<any> => {
    const newModel = {
        ...post,
        tags: post.tags.split(',')
    }

    const { data } = await axiosInstance.post('/posts', newModel);

    return data
}