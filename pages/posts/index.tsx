import { GetStaticPropsContext, GetStaticProps } from 'next'
import * as React from 'react'
import Link from 'next/link'

export interface PostListPageProps {
    posts: any[] // TODO: define post type
}

export default function PostListPage({posts}: PostListPageProps) {
    return <div>
        Post List Page
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <Link href={`/posts/${post.id}`}>
                        <a>{post.title}</a>
                    </Link>
                </li>
            ))}
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