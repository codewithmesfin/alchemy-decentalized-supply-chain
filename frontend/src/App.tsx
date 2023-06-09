import Form from './components/form'
import Navbar from './components/navbar'
import Information from './components/information'
import ExxtraInformation from './components/extraInformation'
import Footer from './components/footer'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <>
      <Navbar />
      <div className="md:max-w-7xl mx-auto pt-32">
        {/* <div className="md:flex md:space-x-10 items-center">
          <div  className='w-full md:max-x-4xl'>
            <Information />
          </div>
          <div className='w-full md:max-w-[500px]'>
            <Form />
          </div>
        </div> */}
        <div>
        <Information />
        </div>
        <div>
        <Form />
        </div>
        <div>
          <ExxtraInformation/>
        </div>
      </div>
      <Footer/>
    </>
  )
}
