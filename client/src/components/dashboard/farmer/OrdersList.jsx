import React, {useState} from 'react'
import { BsThreeDots } from "react-icons/bs";
import order01 from '../../../assets/angusCow.jpg'
import OrderDetailsModal from './OrderDetailsModal';
import CancelOrderModal from './CancelOrderModal';
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
    const [clickedItemIndex, setClickedItemIndex] = useState(null);
    const [orderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false)
    const [cancelOrderModalOpen, setCancelOrderModalOpen] = useState(false)
    const [orderData, setOrderData] = useState(null)
    const [orderToCancel, setOrderToCancel] = useState(null)
    const user = {id: 1, user_type:'farmer'}
    // const user = null

    const toggleBoxVisibility = (index) => {
        // setIsBoxVisible(!isBoxVisible);
        setClickedItemIndex(index === clickedItemIndex ? null : index);
    };

    const orderDetails = (order) => {
        setOrderData(order)
        console.log('Animal Clicked')
        setOrderDetailsModalOpen(true)
    }

    const cancelOrder = (order) => {
        setOrderToCancel(order)
        setCancelOrderModalOpen(true)
    }

  return (
    <div>
        <div className="overflow-x-auto py-8">
            <table className="min-w-full bg-white font-[sans-serif]">
                <thead className="whitespace-nowrap bg-gray-100 rounded">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                            Animals
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
                            Delivery Location
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
                                    {'Nairobi, Kariobangi'}
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
                                                        onClick={() => orderDetails(activeOrder)}
                                                        className="block px-4 py-2 text-sm 
                                                        text-gray-700 hover:bg-gray-100 
                                                        dark:text-gray-300 dark:hover:bg-gray-600 
                                                        dark:hover:text-white" 
                                                        role="menuitem"
                                                    >
                                                        Details
                                                    </button>
                                                </li>
                                                {user && user.user_type === 'farmer' && (
                                                <li>
                                                    <button 
                                                        onClick={() => cancelOrder(activeOrder)}
                                                        className="block px-4 py-2 text-sm 
                                                        text-gray-700 hover:bg-gray-100 
                                                        dark:text-gray-300 dark:hover:bg-gray-600 
                                                        dark:hover:text-white" 
                                                        role="menuitem"
                                                    >
                                                        Cancel Ordery
                                                    </button>
                                                </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <OrderDetailsModal 
                orderData={orderData}
                orderDetailsModalOpen={orderDetailsModalOpen}
                setOrderDetailsModalOpen={setOrderDetailsModalOpen}
            />
            <CancelOrderModal 
                cancelOrderModalOpen={cancelOrderModalOpen}
                orderToCancel={orderToCancel}
                setCancelOrderModalOpen={setCancelOrderModalOpen}
            />
        </div>
    </div>
    )
}
