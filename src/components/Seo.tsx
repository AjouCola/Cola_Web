import Head from 'next/head';
export default function Seo({ title }: { title: string }) {
  return (
    <Head>
      {/* 이부분에 들어가는 요소들은 페이지의 헤드(창) 부분에 들어간다. */}
      <title>{title} | Cola</title>
    </Head>
  );
}
