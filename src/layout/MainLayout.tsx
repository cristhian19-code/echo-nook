import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Heading, IconButton, Spacer } from "@chakra-ui/react"

import { RootState } from "../redux/store";

import { logout, refresh } from "../redux/UsersSlice";
import { getPost } from "../redux/PostsSlice";

import { RiMenuLine } from "react-icons/ri"

export const MainLayout = ({ children }: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { user } = useSelector((state: RootState) => state.users)


    const goTo = (to: string) => {
        navigate(to)
    }

    const toggle = () => {
        setOpen(!open)
    }

    const handleLagout = async () => {
        await dispatch(logout());
        dispatch(refresh(false))

        navigate('/')

        await dispatch(getPost(''));
        dispatch(refresh(true))
    }

    // console.log(user)
    return (
        <>
            <Flex position={'absolute'} w={'full'} top={0} zIndex={10000} pr={4} pt={4} display={['flex', 'flex', 'none', 'none']} justify={'flex-end'}>
                <IconButton onClick={toggle} colorScheme={'purple'} aria-label='Menu' icon={<RiMenuLine />} />
            </Flex>

            <Flex left={[!open ? '-100%' : '0', !open ? '-100%' : '0', 0, 0]} transition={'all'} transitionDuration={'0.5s'} top={0} w={'full'} h={['100vh', '100vh', 'auto', 'auto']} zIndex={[10, 10, 0, 0]} position={['absolute', 'absolute', 'relative', 'relative']} direction={['column', 'column', 'row', 'row']} px={15} py={4} bg="whiteAlpha.900" color={'purple.500'} align={'center'} justify={['center', 'center', '', '']}>
                <Heading as="h5" size={'lg'} mb={['50px', '50px', '0', '0']}>
                    <Link to="/">MemoApp</Link>
                </Heading>

                <Spacer display={['none', 'none', 'flex', 'flex']} />

                <Flex direction={['column', 'column', 'row', 'row']} gap="15px" align={'center'}>
                    {
                        user && (
                            <>
                                <Link to="/mis-recuerdos">Mis Recuerdos</Link>
                                <Link to="/crear">Crear</Link>
                            </>
                        )
                    }
                    {
                        !user ? (
                            <>
                                <Button onClick={() => goTo('/auth/login')} colorScheme={'green'}>Iniciar Sesion</Button>
                                <Button onClick={() => goTo('/auth/registrar')} colorScheme={'telegram'}>Registrate</Button>
                            </>
                        ) : (
                            <Button onClick={handleLagout} colorScheme={'red'}>Cerrar Sesion</Button>
                        )
                    }
                </Flex>
            </Flex>
            {
                children
            }
        </>
    )
}
