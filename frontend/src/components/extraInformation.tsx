import React from 'react'

export default function ExtraInformation() {
    return (
        <>
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
