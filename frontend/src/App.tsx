import Form from './components/form'
import Navbar from './components/navbar'
import Information from './components/information'
import ExxtraInformation from './components/extraInformation'
import Footer from './components/footer'

export default function App() {
  return (
    <>
      <Navbar />
      <div className="md:max-w-7xl mx-auto pt-32">
        <div className="md:flex md:space-x-10 items-center">
          <div className='w-full md:max-x-4xl'>
            <Information />
          </div>
          <div className='w-full md:max-w-[500px]'>
            <Form />
          </div>
        </div>
        <div>
          <ExxtraInformation/>
        </div>
      </div>
      <Footer/>
    </>
  )
}
