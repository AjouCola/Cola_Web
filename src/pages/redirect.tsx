import { useEffect } from 'react';

import { useRouter } from 'next/router';

const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    (async function () {
      router.push('/');
    })();
  }, []);
  return <div>Redirect...</div>;
};
export default Redirect;
