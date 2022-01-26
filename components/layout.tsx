import Header from "./header"
import Footer from "./footer"
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [counter, setCounter] = useState(0);
  const handleIncrementCounter = () => setCounter(counter + 1);
  
  return (
    <>
      <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
      <Header/>
        <main>{children}</main>
      <Footer />
    </>
  )
}