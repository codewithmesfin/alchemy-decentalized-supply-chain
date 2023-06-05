import { useState, useEffect } from "react";
import InputField from "./InputField";
import Button from "./button";
import { ethers } from "ethers";
import SupplyChain from "SupplyChain.json";
//deployed to Contract Address
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = SupplyChain.abi

type Item = {
    id: number;
    name: string;
    status: number;
};

function Form() {

    const [items, setItems] = useState<Item[]>([]);
    const [name, setName] = useState("");

    async function orderItem() {
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            const provider = new ethers.providers.JsonRpcProvider();
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const tx = await contract.orderItem(name);
            await tx.wait();
            loadItems();
            setName("");
        } catch (error) {
            console.error(error);
        }
    }

    async function cancelItem(id: number) {
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            const provider = new ethers.providers.JsonRpcProvider();
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const tx = await contract.cancelItem(id);
            await tx.wait();
            loadItems();
        } catch (error) {
            console.error(error);
        }
    }

    async function loadItems() {
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            const provider = new ethers.providers.JsonRpcProvider();
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const count = await contract.getItemCount();
            const items = [];
            for (let i = 0; i < count; i++) {
                const item = await contract.getItem(i);
                items.push(item);
            }
            setItems(items);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (window.ethereum) {
            loadItems();
        }
    }, []);


    function getStatusText(status: number): string {
        switch (status) {
            case 0:
                return "Ordered";
            case 1:
                return "Shipped";
            case 2:
                return "Delivered";
            case 3:
                return "Cancelled";
            default:
                return "";
        }
    }

    return (
        <>
            <div className="shadow border border-gray-100 rounded">
                <div className="p-5">
                    <div className="flex justify-between items-center space-x-3">
                        <InputField
                            value={name}
                            onchange={(e: string) => setName(e)}
                            placeholder="Type your item here ..."
                        />
                        <Button title="Order" onClick={orderItem}
                            disabled={name === ""}
                        />
                    </div>
                    <div className={`max-h-[430px] overflow-scroll my-4 list-decimal ${items.length > 0 ? 'border' : ''} rounded`}>
                        {items.length < 1 ? <p className="text-center py-10  text-4xl md:text-6xl text-gray-400">No Items</p>
                            : items.map((item, i) => (
                                <div key={i} className={`px-5 flex md:space-x-5 items-center justify-between py-2 ${i < items.length - 1 ? 'border-b' : ''}`}>
                                    <p>
                                        <span> {item.name}</span>
                                    </p>
                                    {item.status === 0 ? (
                                        <span className="text-red-600 font-semibold cursor-pointer"
                                            onClick={() => cancelItem(item.id)}> Cancel</span>
                                    ) :
                                        <span className="text-sm font-bold">{getStatusText(item.status)} </span>
                                    }
                                </div>
                            ))}
                    </div>
                </div>

            </div>
        </>
    );
}

export default Form;
