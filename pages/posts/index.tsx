import { GetStaticPropsContext, GetStaticProps } from 'next'
import * as React from 'react'

export interface PostListPageProps {
    posts: any[]
}

export default function PostListPage({posts}: PostListPageProps) {
    return <div>
        Post List Page
        <ul>
            {posts.map(post => <li key={post.id}>{post.title}</li>)}
        </ul>
    </div>


}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
    context: GetStaticPropsContext
) => {
    // server side
    // run when build time
    const apiUrl = 'http://js-post-api.herokuapp.com/api/posts?_page=1';
    const response = await fetch(apiUrl);
    const data = await response.json();
    return {
        props: {
            posts: data.data
        }
    }
}