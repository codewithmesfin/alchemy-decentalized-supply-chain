

export default function Information() {
    return (
        <>
            <div className="md:flex md:space-x-10 items-center">
                <div className='p-5 md:p-0 w-full md:w-1/2' data-aos="fade-down"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000">
                    <h1 className='text-2xl md:text-6xl font-bold py-10'
                    >Decentralised supply chain tracking </h1>
                    <p className='text-gray-500 py-2'
                    >
                        This is a decentralized application (dApp) built on top of the Ethereum blockchain. The dApp is designed to help users track the status of items in a supply chain. The project was bootstrapped with Create React App and uses the ethers.js library to interact with the Ethereum network
                    </p>
                   
                </div>
                <div className='w-full md:w-1/2'
                    data-aos="zoom-in"
                    data-aos-easing="ease-out-cubic"
                >
                    <img src="/img1.avif" alt=""
                        className="rounded object-cover h-full w-full max-h-[350px] md:max-w-1/2"
                    />
                </div>
            </div>
        </>

    )
}
