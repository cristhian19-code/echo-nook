import { Route, Routes } from 'react-router-dom'
import {AddPage} from "../../pages/main/AddPage";
import {PostPage} from "../../pages/main/PostPage";
import { MyPostsPage } from '../../pages/main/MyPostsPage';

export const MemoriesRoutes = () => {
    return (
        <div>
            <Routes>
                {/* Solo agregar rutas que no tengan que pasar por logueo */}
                <Route path="/crear" element={<AddPage />} />
                <Route path="/mis-recuerdos" element={<MyPostsPage />} />
                <Route path="/post/:id" element={<PostPage />} />
            </Routes>
        </div>
    )
}