import { useFormik } from 'formik';
import { RiSave2Line } from 'react-icons/ri'

import { Card, CardBody, FormControl, Input, Textarea, CardFooter, Divider, Text, Heading, Button, FormErrorMessage, FormHelperText, Image } from '@chakra-ui/react'
import FileBase from 'react-file-base64';

import { MainLayout } from '../../layout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';

import { createPost } from '../../redux/PostsSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';


interface FormInter {
    title: string;
    message: string;
    tags: string;
    selectedFile: string;
}

export const AddPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state: RootState) => state.users);

    const formik = useFormik<FormInter>({
        initialValues: {
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        },
        validate: (data) => {
            let errors: any = {};

            if (data.title.length === 0) {
                errors.title = 'Titulo requerido'
            }

            if (data.message.length === 0) {
                errors.message = 'Mensaje requerido'
            }

            if (data.tags.length === 0) {
                errors.tags = 'Tags requerido'
            }

            if (data.selectedFile.length === 0) {
                errors.selectedFile = 'Archivo requerido'
            }

            return errors;
        },
        onSubmit: async (values) => {
            await dispatch(createPost({
                ...values,
                creator: user._id,
            }));
            navigate('/mis-recuerdos');
        }
    })

    const getErrorMessage = (name) => {
        return <FormHelperText color={'red'}>{formik.errors[name]}</FormHelperText>
    }

    const getUrl = () => {
        return formik.values.selectedFile
    }

    return (
        <MainLayout>
            <Card mx={'auto'} marginTop={5} maxW={500} shadow="lg" border={'1px'} borderColor={'gray.200'}>
                <CardBody>
                    <Heading as={'h1'} size={'xl'} color={'gray.600'} textAlign={'center'} mb={8}>Crear Recuerdo</Heading>

                    <FormControl mt={3}>
                        <Input onChange={formik.handleChange} value={formik.values.title} name='title' placeholder='Titulo' type='text' />
                        {getErrorMessage('title')}
                    </FormControl>

                    <FormControl mt={3}>
                        <Textarea onChange={formik.handleChange} value={formik.values.message} name='message' placeholder='Contenido' rows={4} resize={'none'} />
                        {getErrorMessage('message')}
                    </FormControl>

                    <FormControl my={3}>
                        <Input onChange={formik.handleChange} value={formik.values.tags} name='tags' placeholder='Tags (separado por comas)' type='text' />
                        {getErrorMessage('tags')}
                    </FormControl>
                    <FileBase name="selectedFile" type="file" multiple={false} onDone={({ base64 }: any) => formik.handleChange({ target: { value: base64, name: 'selectedFile' } })} />

                    {
                        formik.values.selectedFile && (<Image rounded={3} mt={4} src={formik.values.selectedFile} alt='Dan Abramov' />)
                    }
                </CardBody>
                <Divider />
                <CardFooter display={'flex'} justify={'center'}>
                    <Button onClick={() => formik.handleSubmit()} leftIcon={<RiSave2Line size={23} />} colorScheme={'purple'}>Guardar</Button>
                </CardFooter>
            </Card>
        </MainLayout>
    )
}
