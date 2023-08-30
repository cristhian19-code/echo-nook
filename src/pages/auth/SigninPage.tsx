import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    FormControl,
    Heading,
    Input,
    Text,
    Link,
    useToast,
    FormErrorMessage
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";

import { loginUser } from "../../redux/UsersSlice";
import { useFormik } from "formik";

interface Login {
    email: string;
    password: string;
}

export const SigninPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toast = useToast();

    const handleToast = () => {
        toast({
            title: "Bienvenido a MemoApp",
            status: "success",
            duration: 3000,
            position: 'bottom-right',
            isClosable: true,
        })
    }

    const formik: any = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (data: Login): any => {
            let errors: Login = {
                email: '',
                password: '',
            };

            if (data.email.length === 0) {
                errors.email = "Correo Requerido"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Correo no valido. E.j. example@email.com';
            }

            if (data.password.length === 0) {
                errors.password = "Contraseña requerida"
            }

            if (errors.password.length === 0 && errors.email.length === 0) {
                return null;
            }

            return errors
        },

        onSubmit: async (e) => {
            try {
                await dispatch(loginUser(e))
                handleToast()
            } catch (error) {

            }
        }
    });

    const getFormErrorMessage = (name: string): string => {
        return formik.errors[name]
    };

    const goToSignup = () => {
        navigate('/auth/registrar')
    }

    const goToHome = () => {
        navigate('/')
    }


    return (
        <Flex w={'full'} h={'100vh'} justify={'center'} align={'center'}>
            <Card bgColor={'white'} boxShadow={'none'} px={5} py={8} w={500}>
                <CardHeader>
                    <Flex direction={'column'} gap={2} align={"center"} justify={"center"}>
                        <Heading textAlign={'center'} size={['lg', 'xl', 'xl', '2xl']}>Ingrese a
                        </Heading>
                        <Heading cursor={'pointer'} onClick={() => goToHome()} _hover={{ textDecorationLine: 'underline', textDecorationColor: 'purple.400' }} size={['lg', 'xl', 'xl', '2xl']} color={'purple.400'}>MemoApp</Heading>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl onChange={formik.handleChange} isInvalid={Boolean(getFormErrorMessage('email'))} mt={3}>
                            <Input name={'email'} type={'email'} placeholder="Correo" />
                            {getFormErrorMessage('email') && (
                                <FormErrorMessage>{getFormErrorMessage('email')}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl onChange={formik.handleChange} isInvalid={Boolean(getFormErrorMessage('password'))} mt={3}>
                            <Input name={'password'} type={'password'} placeholder="Contraseña" />
                            {getFormErrorMessage('password') && (
                                <FormErrorMessage>{getFormErrorMessage('password')}</FormErrorMessage>
                            )}
                        </FormControl>

                        <Flex mt={3} direction={"column"} align={"center"}>
                            <Text align={'center'} mb={3}>
                                Aun no esta registrado en MemoApp?
                                <Link onClick={goToSignup} textDecoration={"underline"} ml={1} color={'purple.500'}>click aqui</Link></Text>
                            <Button type={'submit'} colorScheme={'purple'}>Ingresar</Button>
                        </Flex>
                    </form>
                </CardBody>
            </Card>
        </Flex>
    )
}
