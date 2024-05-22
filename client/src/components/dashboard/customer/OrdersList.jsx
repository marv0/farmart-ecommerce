import React, {useState} from 'react'
import { BsThreeDots } from "react-icons/bs";
import order01 from '../../../assets/angusCow.jpg'
const activeOrders = [
    {
        id: 1,
        product:{
            cover_photo: order01,
            product_name: 'Books'
        },
        quantity: 4,
        totalPrice: 500,
        date: '2024-05-05'
    },
    {
        id: 2,
        product:{
            cover_photo: order01,
            product_name: 'Electronics'
        },
        quantity: 2,
        totalPrice: 800,
        date: '2024-05-04'
    },
    {
        id: 3,
        product:{
            cover_photo: order01,
            product_name: 'Clothing'
        },
        quantity: 3,
        totalPrice: 300,
        date: '2024-05-03'
    },
    {
        id: 4,
        product:{
            cover_photo: order01,
            product_name: 'Furniture'
        },
        quantity: 1,
        totalPrice: 1200,
        date: '2024-05-02'
    },
    {
        id: 5,
        product:{
            cover_photo: order01,
            product_name: 'Toys'
        },
        quantity: 5,
        totalPrice: 250,
        date: '2024-05-01'
    },
    {
        id: 6,
        product:{
            cover_photo: order01,
            product_name: 'Kitchenware'
        },
        quantity: 2,
        totalPrice: 700,
        date: '2024-04-30'
    },
    {
        id: 7,
        product:{
            cover_photo: order01,
            product_name: 'Sporting Goods'
        },
        quantity: 3,
        totalPrice: 900,
        date: '2024-04-29'
    },
    {
        id: 8,
        product:{
            cover_photo: order01,
            product_name: 'Beauty Products'
        },
        quantity: 2,
        totalPrice: 400,
        date: '2024-04-28'
    },
    {
        id: 9,
        product:{
            cover_photo: order01,
            product_name: 'Pet Supplies'
        },
        quantity: 1,
        totalPrice: 150,
        date: '2024-04-27'
    },
    {
        id: 10,
        product:{
            cover_photo: order01,
            product_name: 'Home Decor'
        },
        quantity: 3,
        totalPrice: 600,
        date: '2024-04-26'
    }
];
export default function OrdersList() {
    // const [isBoxVisible, setIsBoxVisible] = useState(false);
    const [clickedItemIndex, setClickedItemIndex] = useState(null);

    const toggleBoxVisibility = (index) => {
        // setIsBoxVisible(!isBoxVisible);
        setClickedItemIndex(index === clickedItemIndex ? null : index);
    };

  return (
    <div>
        <div className="overflow-x-auto py-8">
            <table className="min-w-full bg-white font-[sans-serif]">
                <thead className="whitespace-nowrap bg-gray-100 rounded">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                            Products
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                            Quantity
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                            Total Cost
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                            Date Ordered
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                            Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="whitespace-nowrap">
                    {activeOrders?.map((activeOrder, index) => {
                        return(
                            <tr 
                                key={index}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-6 py-3 text-sm">
                                    <div className="flex items-center cursor-pointer">
                                        <img 
                                            src={activeOrder.product.cover_photo}
                                            alt={activeOrder.product.product_name}
                                            className="w-9 h-9 rounded-md shrink-0" 
                                        />
                                        <div className="ml-4">
                                            <p className="text-sm text-black">
                                                {activeOrder.product.product_name}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    {activeOrder.quantity}
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    Ksh. {activeOrder.totalPrice}
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    {activeOrder.date}
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    Pending
                                </td>

                                <td className="px-6 py-3 relative">
                                    <button
                                        className="mr-4"
                                        title="Edit"
                                        onClick={() => toggleBoxVisibility(index)}
                                    >
                                        <BsThreeDots className="w-5 h-5 fill-gray-500" />
                                    </button>
                                    {clickedItemIndex === index && (
                                        <div 
                                            className="absolute z-20 top-full left-0 
                                            bg-white border border-gray-200 p-2 
                                            divide-y divide-gray-100 rounded shadow"
                                        >
                                            {/* Content of the box */}
                                            <ul className="py-1" role="none">
                                                <li>
                                                    <button 
                                                        className="block px-4 py-2 text-sm 
                                                        text-gray-700 hover:bg-gray-100 
                                                        dark:text-gray-300 dark:hover:bg-gray-600 
                                                        dark:hover:text-white" 
                                                        role="menuitem"
                                                    >
                                                        Details
                                                    </button>
                                                </li>
                                                <li>
                                                    <button 
                                                        className="block px-4 py-2 text-sm 
                                                        text-gray-700 hover:bg-gray-100 
                                                        dark:text-gray-300 dark:hover:bg-gray-600 
                                                        dark:hover:text-white" 
                                                        role="menuitem"
                                                    >
                                                        Cancel Order
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* <div className="md:flex mt-4 px-6">
                <p className="text-sm text-gray-400 flex-1">
                    Showing 1 to 5 of 100 entries
                </p>
                <div className="flex items-center max-md:mt-4">
                    <p className="text-sm text-gray-400">
                        Display
                    </p>
                    <select 
                        className="text-sm text-gray-400 border border-gray-400 rounded h-7 
                        mx-4 outline-none"
                    >
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                    <div className="border flex rounded divide-x-2">
                        <button 
                            type="button" 
                            className="px-4 py-2 hover:bg-gray-200 text-sm"
                        >
                            Previous
                        </button>
                        <button 
                            type="button" 
                            className="px-4 py-2 hover:bg-gray-200 text-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div> */}
        </div>
    </div>
    )
}
