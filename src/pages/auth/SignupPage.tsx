import { Button, Card, CardBody, CardFooter, CardHeader, Flex, FormControl, Heading, Input, Text, Link, useToast, FormErrorMessage } from "@chakra-ui/react"
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../redux/UsersSlice";
import { RootState } from "../../redux/store";


interface Signup {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    confirm_password: string;
}

export const SignupPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const { loading } = useSelector((state: RootState) => state.users)

    const goToLogin = () => {
        navigate('/auth/login')
    }

    const goToHome = () => {
        navigate('/')
    }

    const handleToast = () => {
        toast({
            title: "Ahora eres parte de MemoApp",
            status: "success",
            duration: 3000,
            position: 'bottom-right',
            isClosable: true,
        })
    }

    const formik: any = useFormik({
        initialValues: {
            email: '',
            password: '',
            lastname: '',
            firstname: '',
            confirm_password: ''
        },
        validate: (data: Signup): any => {
            let errors: Signup = {
                email: '',
                password: '',
                lastname: '',
                firstname: '',
                confirm_password: ''
            };

            if (data.email.length === 0) {
                errors.email = "Correo Requerido"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Correo no valido. E.j. example@email.com';
            }

            if (data.password.length === 0) {
                errors.password = "Contraseña requerida"
            }

            if (data.confirm_password !== data.password) {
                errors.confirm_password = "Contraseña no coinciden"
            }

            if (data.lastname.length === 0) {
                errors.lastname = "Apellidos requerido"
            }

            if (data.firstname.length === 0) {
                errors.firstname = "Nombres requerido"
            }

            if (
                errors.password.length === 0 &&
                errors.email.length === 0 &&
                errors.firstname.length === 0 &&
                errors.confirm_password.length === 0 &&
                errors.lastname.length === 0
            ) {
                return null;
            }

            return errors
        },

        onSubmit: async (e) => {
            const newModel = {
                password: e.password,
                email: e.email,
                firstname: e.firstname,
                lastname: e.lastname,
            }

            await dispatch(signupUser(newModel))

            handleToast();
            navigate('/auth/login')
        }
    });


    const getFormErrorMessage = (name: string): string => {
        return formik.errors[name]
    };

    return (
        <Flex w={'full'} h={'100vh'} justify={'center'} align={'center'}>
            <Card bgColor={'white'} boxShadow={'none'} px={5} py={8} w={500}>
                <CardHeader>
                    <Flex direction={'column'} gap={2} align={"center"} justify={"center"}>
                        <Heading textAlign={'center'} size={['lg', 'xl', 'xl', '2xl']}>Registrate en
                        </Heading>
                        <Heading cursor={'pointer'} onClick={() => goToHome()} _hover={{ textDecorationLine: 'underline', textDecorationColor: 'purple.400' }} color={'purple.400'} size={['lg', 'xl', 'xl', '2xl']}>MemoApp</Heading>
                    </Flex>
                </CardHeader>
                <CardBody>

                    <form onSubmit={formik.handleSubmit}>
                        <FormControl onChange={formik.handleChange} isInvalid={Boolean(getFormErrorMessage('firstname'))} mt={3}>
                            <Input name={'firstname'} type={'text'} placeholder="Nombres" />
                            {getFormErrorMessage('firstname') && (
                                <FormErrorMessage>{getFormErrorMessage('firstname')}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl onChange={formik.handleChange} isInvalid={Boolean(getFormErrorMessage('lastname'))} mt={3}>
                            <Input name={'lastname'} type={'text'} placeholder="Apellidos" />
                            {getFormErrorMessage('lastname') && (
                                <FormErrorMessage>{getFormErrorMessage('lastname')}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl onChange={formik.handleChange} isInvalid={Boolean(getFormErrorMessage('email'))} mt={3}>
                            <Input name={'email'} type={'email'} placeholder="Email" />
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

                        <FormControl onChange={formik.handleChange} isInvalid={Boolean(getFormErrorMessage('confirm_password'))} mt={3}>
                            <Input name={'confirm_password'} type={'password'} placeholder="Confirmar Contraseña" />
                            {getFormErrorMessage('confirm_password') && (
                                <FormErrorMessage>{getFormErrorMessage('confirm_password')}</FormErrorMessage>
                            )}
                        </FormControl>
                    </form>
                </CardBody>
                <CardFooter py={0} display={'flex'} justify={'center'} alignItems={'center'}>
                    <Flex direction={"column"} align={"center"}>
                        <Text align={'center'} mb={3}>
                            Ya perteneces a MemoApp?
                            <Link onClick={goToLogin} textDecoration={"underline"} ml={1} color={'purple.500'}>click aqui</Link>
                        </Text>
                        <Button onClick={formik.handleSubmit} isLoading={loading} colorScheme={'purple'}>Registrarme</Button>
                    </Flex>
                </CardFooter>
            </Card>
        </Flex>
    )
}
