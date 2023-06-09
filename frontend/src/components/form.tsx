import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

//ln -s ../../smart-contract/artifacts/contracts/SupplyChain.sol/SupplyChain.json node_modules/SupplyChain.json
import SupplyChainABI from "SupplyChain.json";

import InputField from './InputField';
import Button from './button';

// Change the contract address to match your deployed contract address
const contractAddress = "0x0B8693d0eD71BBd841ECE42BC8A36141737A4F4b";

function SupplyChain() {
  const [itemName, setItemName] = useState('');
  const [itemId, setItemId] = useState(0);
  const [itemDetails, setItemDetails] = useState<any>(null);
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeMetaMask = async () => {
      const provider: any = await detectEthereumProvider();
      if (provider) {
        await provider.request({ method: 'eth_requestAccounts' });

        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const supplyChainContract = new ethers.Contract(contractAddress, SupplyChainABI.abi, signer);
        // Update the contract instance with the new signer
        setSupplyChainContract(supplyChainContract);
      } else {
        console.error('MetaMask not found');
      }
    };

    initializeMetaMask();
  }, []);

  const [supplyChainContract, setSupplyChainContract] = useState<any>(null);

  useEffect(() => {
    if (supplyChainContract) {
      loadItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplyChainContract]);

  const loadItems = async () => {
    try {
      setLoading(true);
      const count = await supplyChainContract.getItemCount();
      const itemsArray: any = [];
      for (let i = 0; i < count.toNumber(); i++) {
        const item = await supplyChainContract.getItem(i);
        itemsArray.push(item);
      }
      setItems(itemsArray);
      setLoading(false);
      setItemName("")
    } catch (error) {
      console.error('Error loading items:', error);
      setLoading(false);
    }
  };

  const orderItem = async () => {
    try {
      const tx = await supplyChainContract.orderItem(itemName);
      await tx.wait();
      console.log('Item ordered successfully!');
      loadItems();
    } catch (error) {
      console.error('Error ordering item:', error);
    }
  };

  const cancelItem = async (id: any) => {
    try {
      const tx = await supplyChainContract.cancelItem(id);
      await tx.wait();
      console.log('Item cancelled successfully!');
      loadItems();
    } catch (error) {
      console.error('Error cancelling item:', error);
    }
  };

  const approveItem = async (id: any) => {
    try {
      const tx = await supplyChainContract.approveItem(id);
      await tx.wait();

      console.log('Item approved successfully!');
      loadItems();
    } catch (error) {
      console.error('Error approving item:', error);
    }
  };

  const shipItem = async (id: any) => {
    try {
      const tx = await supplyChainContract.shipItem(id);
      await tx.wait();

      console.log('Item shipped successfully!');
      loadItems();
    } catch (error) {
      console.error('Error shipping item:', error);
    }
  };

  const getItem = async () => {
    try {
      setLoading(true);

      const item = await supplyChainContract.getItem(itemId);
      console.log('Item:', item);
      setItemDetails(item);
      setLoading(false);
    } catch (error) {
      console.error('Error getting item:', error);
      setLoading(false);
    }
  };

  function getStatusText(status: number): string {
    switch (status) {
      case 0:
        return "Ordered";
      case 1:
        return "Approved";
      case 2:
        return "Delivered";
      case 3:
        return "Cancelled";
      default:
        return "";
    }
  }

  function displayPartialAddress(address: string) {
    if (address.length <= 7) {
      return address;
    } else {
      const firstThree = address.substring(0, 3);
      const lastFour = address.substring(address.length - 4);
      return `${firstThree}...${lastFour}`;
    }
  }

  const cols = [
    "ID", "Name", "Status", "Ordered by", "Approved by", "Delivered to"
  ];

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5" data-aos="fade-up" data-aos-offset="300" data-aos-easing="ease-in-sine">
        <div className="m-10 flex justify-between space-x-5">
          <div className="w-full md:w-1/2 flex justify-between items-center space-x-3">
            <InputField
              value={itemName}
              onchange={(e: string) => setItemName(e)}
              placeholder="Type your item here ..."
            />
            <Button
              title="Order"
              onClick={orderItem}
              disabled={itemName === ""}
            />
          </div>
          <div className="w-full md:w-1/2 flex justify-between items-center space-x-3">
            <InputField
              value={itemId}
              type={"number"}
              onchange={(e: any) => setItemId(e)}
              placeholder="Enter item ID ..."
            />
            <Button
              title="Search"
              onClick={getItem}
              disabled={itemId < 0}
            />

            <button className='mx-5 text-blue-600' onClick={loadItems}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>
        </div>
        <div className='m-10'>
          <div className="mb-4">
            {loading ? (
              <div className="text-center text-green-600">Loading...</div>
            ) : itemDetails && (
              <div className="border border-gray-300 p-4 rounded">
                <div>Item ID: {`${itemDetails.id}`}</div>
                <div className='text-sm'>Name: {itemDetails.name}</div>
                <div className='text-sm'>Status: {getStatusText(itemDetails.status)}</div>
                <div className='text-sm'>Ordered By: {itemDetails.orderedBy}</div>
                <div className='text-sm'>Approved By: {itemDetails.approvedBy}</div>
                <div className='text-sm'>Delivered To: {itemDetails.deliveredTo}</div>
              </div>
            )}
          </div>
        </div>
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              {cols.map((col) => (
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                  key={col}
                >
                  {col}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-4 text-center font-medium text-gray-900"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {items.length < 1 ? (
              <tr>
                <td
                  colSpan={cols.length + 1}
                  className="text-center text-xl py-10"
                >
                  No items to display
                </td>
              </tr>
            ) :
              (
                items
                  .sort((a: any, b: any) => b.id - a.id)
                  .map((item: any, index: number) => (
                    <tr className="hover:bg-gray-50" key={index}>
                      <th className="flex gap-3 px-6 py-2 font-normal text-gree-900">
                        {`${item.id}`}
                      </th>
                      <td
                        className="px-6 py-2 cursor-pointer"
                        onClick={() => setItemDetails(item)}
                      >
                        {item.name}
                      </td>
                      <td className="px-6 py-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold ${item.status === 3
                              ? 'text-red-600'
                              : 'text-green-600'
                            }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full  ${item.status === 3
                                ? 'bg-red-600'
                                : 'bg-green-600'
                              }`}
                          />
                          {getStatusText(item.status)}
                        </span>
                      </td>
                      <td className="px-6 py-2">
                        {displayPartialAddress(item.orderedBy)}
                      </td>
                      <td className="px-6 py-2">
                        {displayPartialAddress(item.approvedBy)}
                      </td>
                      <td className="px-6 py-2">
                        {displayPartialAddress(item.deliveredTo)}
                      </td>
                      <td className="px-6 py-2 text-center">
                        <div className="flex justify-end space-x-3 gap-4">
                          {item.status === 0 && (
                            <>

                              <button className='text-red-600' onClick={() => cancelItem(item.id)}>Cancel</button>
                              <button className='text-green-600' onClick={() => approveItem(item.id)}>Approve</button>
                            </>
                          )}
                          {item.status === 1 && (
                            <button className='text-blue-600' onClick={() => shipItem(item.id)}>Ship Item</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
              )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SupplyChain;
