import {Navigate, Route, Routes} from 'react-router-dom'
import {SigninPage} from "../../pages/auth/SigninPage";
import {SignupPage} from "../../pages/auth/SignupPage";


export const AuthRoutes = () => {
    return (
        <div>
            <Routes>
                {/* Solo agregar rutas que no tengan que pasar por logueo */}
                <Route path="login" element={<SigninPage />} />
                <Route path="registrar" element={<SignupPage />} />
            </Routes>
        </div>
    )
}