import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";

import { Box, Flex, Heading, Img, Text } from "@chakra-ui/react";

import { RootState } from "../../redux/store";
import { getPost } from "../../redux/PostsSlice";

import { MainLayout } from "../../layout/MainLayout"
import { motion } from 'framer-motion';

export const PostPage = () => {
    const dispatch = useDispatch();
    const { post, loading } = useSelector((state: RootState) => state.posts);

    const { id } = useParams();

    const cardContent = {
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                when: "beforeChildren",
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren",
            },
        },
    }

    useEffect(() => {
        dispatch(getPost(id));
    }, [])

    return (
        <MainLayout>
            {
                post && (
                    <Flex direction={'column'}>
                        <Img borderRadius={'lg'} maxW={500} mt={'6'} mx={'auto'} src={post.selectedFile} alt={post.title} />

                        <Box as={motion.div} px={5} maxW={800} mx={'auto'} mt={7} initial="hidden" animate="visible" variants={cardContent}>
                            <Heading color={'blackAlpha.700'} mb={3} size="xl">{post.title}</Heading>
                            <Text>{post.message}</Text>
                        </Box>
                    </Flex>
                )
            }

        </MainLayout>
    )
}
