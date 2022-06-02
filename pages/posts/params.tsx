import * as React from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next'
export interface ParamsPageProps {
    data: any
}

export default function ParamsPage (props: ParamsPageProps) {
    const {data} = props;
    console.log(data);
  return (
    <div>
      Params page
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    context.res.setHeader('Cache-Control', 's-max-age=5, stale-while-revalidate')
    await new Promise((resolve)=> setTimeout(resolve, 1500))
    const data = {
        id: 1,
        name: 'kidq'
    }
    return {
      props: {
          data: data
      }, // will be passed to the page component as props
    }
}