import { axiosInstance } from './../configs/axios';
import { User } from "./interfaces"

export const createUserBack = async (
    user: User
): Promise<any> => {
    const newModel = {
        ...user,
    }

    const { data } = await axiosInstance.post('/', newModel);

    return data
}