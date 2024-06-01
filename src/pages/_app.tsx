import "../../styles/globals.css"
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import store from "../redux/store";
import  Navbar  from "../components/navbar";
import Image from "next/image";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="app">
        <Navbar />
        <Image
          src="https://i.postimg.cc/MpK1RxzH/cartoon-planet-earth-Zeloa99-600-removebg-preview.png"
          width={140}
          height={140}
          alt="planet"
          className="planet"
        />
        <Component {...pageProps}  className="component"/>
      </div>
    </Provider>
  );
}

export default MyApp;

