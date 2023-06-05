

export default function Information() {
    return (
        <div className='p-5 md:p-0' data-aos="fade-down"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000">
            <h1 className='text-2xl md:text-6xl font-bold py-10'
            >Decentralised supply chain tracking </h1>
            <p className='text-gray-500 py-2'
            >
                This is a decentralized application (dApp) built on top of the Ethereum blockchain. The dApp is designed to help users track the status of items in a supply chain. The project was bootstrapped with Create React App and uses the ethers.js library to interact with the Ethereum network
            </p>
            <p className='text-gray-500 py-2'>
                The decentralised supply chain tracking application is a cutting-edge solution that leverages blockchain technology to bring transparency and efficiency to supply chain management. By utilising a decentralised approach, the application eliminates the need for intermediaries and centralised authorities, enabling seamless tracking and verification of goods throughout the supply chain.
            </p>
            <p className="text-gray-500 py-2">
                At the core of the application is a smart contract written in Solidity, a programming language specifically designed for Ethereum. The smart contract implements a comprehensive supply chain tracking system with various functions. Users can place new orders for items, cancel their orders if needed, and retrieve real-time information about the status of their items in the supply chain.
            </p>
            <p className="text-gray-500 py-2">
                One of the key features of the smart contract is the ability for the admin to approve and update the status of items. This ensures that only authorised personnel can modify the status, enhancing security and preventing unauthorized access. The status of an item can be set to "ordered," "shipped," "delivered," or "cancelled," providing clear visibility into each stage of the supply chain.
            </p>
        </div>
    )
}
