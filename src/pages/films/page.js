// films.tsx

import CartoonList from "../../components/cartoonApp";
import Head from "next/head";

const FilmsPage = () => {
  const metaData = {
    title: "Cartoons"
  };
  
  return (
    <div>
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content="List of cartoon films" />
      </Head>
      <CartoonList />
    </div>
  );
};

export default FilmsPage;
