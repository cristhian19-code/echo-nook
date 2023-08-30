import { Alert, AlertDescription, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertIcon, AlertTitle, Button, Flex, Heading } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletePost, getMyPosts, getPosts } from '../../redux/PostsSlice'

import { RootState } from '../../redux/store'

import { Post } from './Post'

import { toggleDialog } from '../../redux/PostsSlice'

interface PostsPros {
    type: string;
    showDelete: boolean | false;
}

export const Posts = (props: PostsPros) => {
    const dispatch = useDispatch();
    const { posts, loading, dialogDelete } = useSelector((state: RootState) => state.posts)
    const { loadingGetData, user } = useSelector((state: RootState) => state.users)

    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)

    useEffect(() => {
        if (loadingGetData) {
            const id = user?._id;
            switch (props.type) {
                case 'all':
                    dispatch(getPosts(id)); break;
                case 'my':
                    dispatch(getMyPosts(id)); break;
                default:
                    break;
            }
        }
    }, [loadingGetData])

    const list = {
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.3,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren",
            },
        },
    }

    const children = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
    }

    const handleClose = () => {
        dispatch(toggleDialog({
            open: false,
            id: null
        }))
    }

    const handleConfirmDelete = async () => {
        setLoadingDelete(true)

        await dispatch(deletePost(dialogDelete.id));

        setLoadingDelete(false)
    }

    console.log(posts);

    return (
        <>
            {!loading &&
                (
                    posts?.length === 0 ?
                        (<Heading mt={5} fontSize={24} textAlign={'center'}>
                            Aun no hay publicaciones 😥
                        </Heading>) :
                        (
                            <Flex as={motion.div} initial="hidden" animate="visible" variants={list} wrap="wrap" gap="20px" px={3} py={6} justify="center">
                                {
                                    posts?.map((post: any) => (
                                        <Post variants={children} post={post} key={post._id} showDelete={props.showDelete} />
                                    ))
                                }
                            </Flex>
                        )

                )
            }

            <AlertDialog
                isOpen={dialogDelete.open}
                onClose={handleClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Eliminar Post
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            ¿Esta seguro de eliminar?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button isLoading={loadingDelete} colorScheme='red' onClick={handleConfirmDelete} ml={3}>
                                Eliminar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
