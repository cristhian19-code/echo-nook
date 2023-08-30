import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../redux/store";

import { PrivateRoute } from "./private-routes/PrivateRoute";
import { MemoriesRoutes } from "./private-routes/MemoriesRoutes";
import PublicRoutes from "./public-routes/PublicRoutes";
import { AuthRoutes } from "./public-routes/AuthRoutes";
import { HomePage } from "../pages/main/HomePage";
import { getUserByToken } from '../redux/UsersSlice';
import { Box } from '@chakra-ui/react';


function App() {
    const dispatch = useDispatch();
    const { loadingGetData } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(getUserByToken());
    }, []);


    return (
        loadingGetData && (
            <Box>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <HomePage />
                            }
                        />

                        <Route
                            path="/*"
                            element={
                                <PrivateRoute>
                                    <MemoriesRoutes />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/auth/*"
                            element={
                                <PublicRoutes>
                                    <AuthRoutes />
                                </PublicRoutes>
                            }
                        />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </Box>
        )
    );
}

export default App;