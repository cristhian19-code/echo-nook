import { useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RiThumbUpFill, RiDeleteBinFill } from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardFooter, Text, Heading, Wrap, WrapItem, Flex, Button, Spacer, Box } from '@chakra-ui/react'

import { likePost, toggleDialog } from '../../redux/PostsSlice'
import { RootState } from "../../redux/store";

moment.locale('es-mx')

export const Post = ({ variants, post, showDelete }: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state: RootState) => state.users)

    const goToPost = (id: string) => {
        navigate(`/post/${id}`);
    }

    const handleLikePost = async (id: string) => {
        if (!user) return navigate('/auth/login')

        setLoading(true)
        await dispatch(likePost(id));
        setLoading(false)
    }

    const handleOpen = (open: boolean, id: string) => {
        dispatch(toggleDialog({
            open,
            id
        }));
    }

    const getTimeString = () => {
        const $moment = moment(post.createAt)
        return $moment.format('YYYY-MM-DD HH:mm')
    }

    return (
        <Card as={motion.div} variants={variants} shadow={'xl'} border={'1px'} borderColor={'gray.200'} w={350}>
            <CardBody p={0} >
                <Flex bgImage={post.selectedFile} position="relative" bgPosition="center" bgSize="cover" rounded="md" h="200px" overflow="hidden">
                    <Box bgColor="black" opacity="0.45" position="absolute" width="full" height="full">
                    </Box>
                    <Box position="absolute" top="15px" left="15px" color="white">
                        <Text fontSize="xs">{getTimeString()}</Text>
                    </Box>
                </Flex>
                <Flex px={5} w={'full'} direction={'column'} marginTop={3}>
                    <Wrap mb={3} w={'full'}>
                        {
                            post.tags.map((tag, index) => (
                                <WrapItem key={`tag${index}`}>
                                    <Text fontSize="sm" fontWeight={'semibold'} color="gray.400">#{tag}</Text>
                                </WrapItem>
                            ))
                        }
                    </Wrap>
                    <Box textAlign="start">
                        <Button textAlign="start" onClick={() => goToPost(post._id)} variant="link">{post.title}</Button>
                        <Text className='line-3-clamp' marginTop={3} fontSize={'sm'}>{post.message}</Text>
                    </Box>
                </Flex>
            </CardBody>
            <CardFooter>
                <Flex w={'full'}>
                    <Button isLoading={loading} onClick={() => handleLikePost(post._id)} leftIcon={<RiThumbUpFill />} size={'sm'} colorScheme={"messenger"}>Like {post.likeCount}</Button >
                    <Spacer />
                    {
                        showDelete && (
                            <Button onClick={() => handleOpen(true, post._id)} leftIcon={<RiDeleteBinFill />} size={'sm'} colorScheme={"red"}>Eliminar</Button>
                        )
                    }
                </Flex>
            </CardFooter>
        </Card >
    )
}
