import { Posts } from "../../components/Posts/Posts"

import { MainLayout } from "../../layout/MainLayout"

export const HomePage = () => {
    return (
        <MainLayout>
            <Posts type="all"/>
        </MainLayout>
    )
}
