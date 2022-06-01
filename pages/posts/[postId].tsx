import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPathsContext } from 'next';
import * as React from 'react';

export interface PostPageProps {
    post: any
}

export default function PageDetailPost(props: PostPageProps) {

    const { post } = props;
    if (! post) return null;
    return (
        <div>
            <h1>Post detail page</h1>

            <p>{post.title}</p>
            <p>{post.author}</p>
            <p>{post.description}</p>
        </div>
    ) 
}
export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
    console.log('\n Get static paths....')
    const response = await fetch('http://js-post-api.herokuapp.com/api/posts?_page=1');

    const data = await response.json();
    return {
        paths: data.data.map((post: any) => ({params: {postId: post?.id}})),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async (
    context: GetStaticPropsContext
) => {
    console.log('\n Get static props', context.params?.postId)
    const postId = context.params?.postId

    if (! postId) return {notFound: true}

    const response = await fetch(`http://js-post-api.herokuapp.com/api/posts/${postId}`)
    const data = await response.json()
 
    return {
        props: {
            post: data
        }
    }
}