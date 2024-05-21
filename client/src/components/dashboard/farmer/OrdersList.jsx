import React, {useState} from 'react'
import { BsThreeDots } from "react-icons/bs";
// import order01 from '../../../assets/angusCow.jpg'
import OrderDetailsModal from './OrderDetailsModal';
import CancelOrderModal from './CancelOrderModal';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

function formatDate(dateString) {
    return format(new Date(dateString), 'MMMM dd, yyyy HH:mm:ss');
}
export default function OrdersList({userOrders, loading}) {
    const [clickedItemIndex, setClickedItemIndex] = useState(null);
    const [orderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false)
    const [cancelOrderModalOpen, setCancelOrderModalOpen] = useState(false)
    const [orderData, setOrderData] = useState(null)
    const [orderToCancel, setOrderToCancel] = useState(null)
    const user = JSON.parse(localStorage.getItem('user'))
    // const user = {id: 1, user_type:'farmer'}
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

    const cancelOrderConfirmed = async(order_id) => {
        console.log('Order to be cancelled is:', order_id)
        try {
            const response = await fetch(`http://127.0.0.1:5555/cancel_order/${order_id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            const responseData = await response.json();
            if(response.status === 200){
                toast.success(responseData.message)
            }else{
                toast.error(responseData.error)
            }
        } catch (error) {
            toast.error('An error occured. Please try again later')
        }
    }

    const acceptOrder = async(order_id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5555/accept_order/${order_id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            const responseData = await response.json();
            if(response.status === 200){
                toast.success(responseData.message)
            }else{
                toast.error(responseData.error)
            }
        } catch (error) {
            toast.error('An error occured. Please try again later')
        }
    }
  return (
    <div>
        <div className="overflow-x-auto py-8">
            <table className="min-w-full bg-white font-[sans-serif]">
                <thead className="whitespace-nowrap bg-gray-100 rounded">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                            Animal
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
                            Order Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-black">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="whitespace-nowrap">
                    {userOrders?.map((userOrder, index) => {
                        return(
                            <tr 
                                key={index}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-6 py-3 text-sm">
                                    <div className="flex items-center cursor-pointer">
                                        <img 
                                            src={userOrder.cover_photo}
                                            alt={userOrder.product_name}
                                            className="w-9 h-9 rounded-md shrink-0" 
                                        />
                                        <div className="ml-4">
                                            <p className="text-sm text-black">
                                                {userOrder.animal_type}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    {userOrder.quantity}
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    Ksh. {userOrder.totalPrice}
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    {formatDate(userOrder.created_at)}
                                </td>
                                <td className="px-6 py-3 text-sm">
                                    {userOrder.status}
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
                                                        onClick={() => orderDetails(userOrder)}
                                                        className="block px-4 py-2 text-sm 
                                                        text-gray-700 hover:bg-gray-100 
                                                        dark:text-gray-300 dark:hover:bg-gray-600 
                                                        dark:hover:text-white" 
                                                        role="menuitem"
                                                    >
                                                        Details
                                                    </button>
                                                </li>
                                                {user && user === 'farmer' && userOrder.status === 'pending' && (
                                                <li>
                                                    <button 
                                                        onClick={() => acceptOrder(userOrder.id)}
                                                        className="block px-4 py-2 text-sm 
                                                        text-gray-700 hover:bg-gray-100 
                                                        dark:text-gray-300 dark:hover:bg-gray-600 
                                                        dark:hover:text-white" 
                                                        role="menuitem"
                                                    >
                                                        Accept Order
                                                    </button>
                                                </li>
                                                )}
                                                {user && user === 'farmer' && userOrder.status === 'pending' && (
                                                <li>
                                                    <button 
                                                        onClick={() => cancelOrder(userOrder)}
                                                        className="block px-4 py-2 text-sm 
                                                        text-gray-700 hover:bg-gray-100 
                                                        dark:text-gray-300 dark:hover:bg-gray-600 
                                                        dark:hover:text-white" 
                                                        role="menuitem"
                                                    >
                                                        Cancel Order
                                                    </button>
                                                </li>
                                                )}
                                                {user && user === 'farmer' && userOrder.status === 'active' && (
                                                <li>
                                                    <button 
                                                        onClick={() => cancelOrder(userOrder)}
                                                        className="block px-4 py-2 text-sm 
                                                        text-gray-700 hover:bg-gray-100 
                                                        dark:text-gray-300 dark:hover:bg-gray-600 
                                                        dark:hover:text-white" 
                                                        role="menuitem"
                                                    >
                                                        Complete Order
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
            {orderData && (
                <OrderDetailsModal 
                    orderData={orderData}
                    orderDetailsModalOpen={orderDetailsModalOpen}
                    setOrderDetailsModalOpen={setOrderDetailsModalOpen}
                />
            )}
            <CancelOrderModal 
                cancelOrderModalOpen={cancelOrderModalOpen}
                orderToCancel={orderToCancel}
                setCancelOrderModalOpen={setCancelOrderModalOpen}
                cancelOrderConfirmed={cancelOrderConfirmed}
            />
        </div>
    </div>
    )
}
