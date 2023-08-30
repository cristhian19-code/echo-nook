import {Box, Button, Flex, Heading} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export const ErrorPage = ()=>{
    const navigate = useNavigate();

    const goToHome = ()=> {
        navigate('/');
    }

    return (
        <Flex style={{height: '100vh'}} direction={'column'} align={'center'} justify={'center'}>
            <Heading style={{fontSize: 100}} as={"h1"}>404</Heading>
            <Heading style={{fontSize: 20}} color='blackAlpha.500' as={"h2"}>OPPS! PAGINA NO ENCONTRADA</Heading>
            <Button onClick={goToHome} mt={'5'} colorScheme={'purple'}>Volver pagina principal</Button>
        </Flex>
    )
}