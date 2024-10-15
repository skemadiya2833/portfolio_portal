import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { Lora } from "next/font/google"
import { Provider } from "react-redux";
import store from "@/redux/store";
import 'react-toastify/dist/ReactToastify.css';

const playfairDisplay = Lora({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={playfairDisplay.className}>
        <NextUIProvider style={{ height: "100%" }}>
          <Component {...pageProps} />
        </NextUIProvider>
      </main>
    </Provider>
  )
}