import React from 'react'

export default function ExtraInformation() {
    return (
        <>
        <div>
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
            <div className="md:flex md:space-x-10 items-center p-5 md:p-0 mb-16"
            >
                <div className='w-full md:w-1/2'
                    data-aos="zoom-in"
                    data-aos-easing="ease-out-cubic"
                >
                    <img src="/img3.jpeg" alt=""
                        className="rounded object-cover h-full w-full max-h-[350px] md:max-w-1/2"
                    />
                </div>
                <div className='w-full md:w-1/2' data-aos="zoom-out"
                    data-aos-easing="ease-out-cubic">
                        
                    <p className="text-gray-500  py-2">
                        To ensure the integrity and correctness of the smart contract, the application includes a comprehensive set of tests written using the ethers.js library. These tests verify critical functionalities such as ensuring that only the admin can approve and update the status of an item and that the correct status is reflected after an update. By conducting thorough testing, the application ensures the reliability and robustness of the supply chain tracking system.
                    </p>
                    <p className="text-gray-500  py-2">
                        The project follows a well-structured setup process to facilitate easy development and deployment. By cloning the project from the provided GitHub repository, developers can quickly get started with the source code. The frontend project folder contains all the necessary files for the user interface, while the smart contract project folder holds the Solidity code and its dependencies.
                    </p>
                    <p className="text-gray-500  py-2">
                        To run the frontend, developers need to navigate to the frontend project folder using the command line and install the required dependencies using the npm install command. Furthermore, to establish a connection between the frontend and the smart contract, a symbolic link to the smart contract's ABI file is created. This link ensures that the frontend can access the necessary contract information.
                    </p>
                </div>
            </div>
        </>
    )
}
