import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

import SupplyChainABI from 'SupplyChain.json';

// Change the contract address to match your deployed contract address
const contractAddress = '0x0B8693d0eD71BBd841ECE42BC8A36141737A4F4b';

function SupplyChain() {
    const [itemName, setItemName] = useState('');
    const [itemId, setItemId] = useState(0);
    const [itemStatus, setItemStatus] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        const initializeMetaMask = async () => {
            const provider: any = await detectEthereumProvider();

            if (provider) {
                await provider.request({ method: 'eth_requestAccounts' });

                const ethersProvider = new ethers.providers.Web3Provider(provider);
                const signer = ethersProvider.getSigner();

                const supplyChainContract = new ethers.Contract(
                    contractAddress,
                    SupplyChainABI.abi,
                    signer
                );

                // Update the contract instance with the new signer
                setSupplyChainContract(supplyChainContract);
            } else {
                console.error('MetaMask not found');
            }
        };
        initializeMetaMask();
    }, []);

    const [supplyChainContract, setSupplyChainContract] = useState<any>(null);

    const loadAllItems = async () => {
        try {
            const count = await supplyChainContract.getItemCount();
            const items: any = [];

            for (let i = 0; i < count; i++) {
                const item = await supplyChainContract.getItem(i);
                items.push(item);
            }

            setItems(items);
        } catch (error) {
            console.error('Error loading items:', error);
        }
    };

    const orderItem = async () => {
        try {
            const tx = await supplyChainContract.orderItem(itemName);
            await tx.wait();

            console.log('Item ordered successfully!');
        } catch (error) {
            console.error('Error ordering item:', error);
        }
    };

    const cancelItem = async () => {
        try {
            const tx = await supplyChainContract.cancelItem(itemId);
            await tx.wait();

            console.log('Item cancelled successfully!');
        } catch (error) {
            console.error('Error cancelling item:', error);
        }
    };

    const approveItem = async () => {
        try {
            const tx = await supplyChainContract.approveItem(itemId);
            await tx.wait();

            console.log('Item approved successfully!');
        } catch (error) {
            console.error('Error approving item:', error);
        }
    };

    const shipItem = async () => {
        try {
            const tx = await supplyChainContract.shipItem(itemId);
            await tx.wait();

            console.log('Item shipped successfully!');
        } catch (error) {
            console.error('Error shipping item:', error);
        }
    };

    const getItemStatus = async () => {
        try {
            const status = await supplyChainContract.getItemStatus(itemId);
            setItemStatus(status.toString());
        } catch (error) {
            console.error('Error getting item status:', error);
        }
    };

    const getItem = async () => {
        try {
            const item = await supplyChainContract.getItem(itemId);
            console.log('Item:', item);
        } catch (error) {
            console.error('Error getting item:', error);
        }
    };

    const getItemCount = async () => {
        try {
            const count = await supplyChainContract.getItemCount();
            console.log('Item count:', count.toNumber());
        } catch (error) {
            console.error('Error getting item count:', error);
        }
    };

    return (
        <div>
            <h1>Supply Chain</h1>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="border border-gray-300 rounded py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={orderItem}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
                >
                    Order Item
                </button>
            </div>
            <div className="flex items-center mb-4">
                <input
                    type="number"
                    value={itemId}
                    onChange={(e) => setItemId(Number(e.target.value))}
                    className="border border-gray-300 rounded py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={cancelItem}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none"
                >
                    Cancel Item
                </button>
                <button
                    onClick={approveItem}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none ml-2"
                >
                    Approve Item
                </button>
                <button
                    onClick={shipItem}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded focus:outline-none ml-2"
                >
                    Ship Item
                </button>
            </div>
            <div className="flex items-center mb-4">
                <button
                    onClick={getItemStatus}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded focus:outline-none"
                >
                    Get Item Status
                </button>
                <button
                    onClick={getItem}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded focus:outline-none ml-2"
                >
                    Get Item
                </button>
                <button
                    onClick={getItemCount}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded focus:outline-none ml-2"
                >
                    Get Item Count
                </button>
                <button
                    onClick={loadAllItems}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded focus:outline-none ml-2"
                >
                    Load All Items
                </button>
            </div>
            <div>Item Status: {itemStatus}</div>
            <div>
                <h2>All Items</h2>
                <div>

                    {items && items.length > 0 && items.map((item: any, index: number) => (
                        <div key={index}>
                            <div>Item ID: {`${item.id}`}</div>
                            <div>Name: {item.name}</div>
                            <div>Status: {item.status}</div>
                            <div>Ordered By: {item.orderedBy}</div>
                            <div>Approved By: {item.approvedBy}</div>
                            <div>Delivered To: {item.deliveredTo}</div>
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SupplyChain;
