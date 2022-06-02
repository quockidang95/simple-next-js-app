import React, { useEffect, useState } from 'react';
import Header from '@/components/common/header';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const [postList, setPostList] = useState([]);
  const router = useRouter();
  const page = router.query?._page;

  console.log('About query', page);

  useEffect(() => {
    if (!page) return;
    (async () => {
      const response = await fetch(`http://js-post-api.herokuapp.com/api/posts?_page=${page}`);
      const data = await response.json();

      setPostList(data.data);
    })();
  }, [page]);

  function handleNextClick() {
    router.push(
      {
        pathname: '/about',
        query: {
          _page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
    );
  }
  return (
    <div>
      <h1>About Page</h1>
      <Header />
      Post List Page
      <ul>
        {postList.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={handleNextClick}>Next Page</button>
    </div>
  );
}
