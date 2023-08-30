import { Posts } from "../../components/Posts/Posts"

import { MainLayout } from "../../layout/MainLayout"

export const MyPostsPage = () => {
    return (
        <MainLayout>
            <Posts type="my" showDelete={true} />
        </MainLayout>
    )
}
