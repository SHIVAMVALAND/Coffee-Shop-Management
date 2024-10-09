import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { FaEye, FaEdit, FaTrash, FaCheck, FaCoffee, FaPlus } from "react-icons/fa"; // Import FaPlus
import { Link } from "react-router-dom";

const GetAllCoffee = () => {
    const [coffees, setCoffees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    useEffect(() => {
        const fetchCoffees = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:4000/coffees");
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                const updatedCoffees = data.map(coffee => ({
                    ...coffee,
                    status: coffee.status || "Pending",
                }));
                setCoffees(updatedCoffees);
            } catch (err) {
                setError("Error fetching coffee data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchCoffees();
    }, []);

    const handleDeleteConfirmation = (id) => {
        setOrderToDelete(id);
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        if (orderToDelete) {
            try {
                const response = await fetch(`http://localhost:4000/coffees/${orderToDelete}`, { method: 'DELETE' });
                if (!response.ok) throw new Error("Error deleting coffee item");
                setCoffees(coffees.filter((coffee) => coffee._id !== orderToDelete));
            } catch (err) {
                alert("Error deleting Coffee: " + err.message);
            } finally {
                setIsModalOpen(false);
                setOrderToDelete(null);
            }
        }
    };

    const handleStatusChange = async (_id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:4000/coffees/${_id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) throw new Error("Error updating coffee status");
            const updatedCoffee = await response.json();
            setCoffees(coffees.map(coffee =>
                coffee._id === _id ? { ...coffee, status: updatedCoffee.status } : coffee
            ));
        } catch (err) {
            alert("Error updating Coffee status: " + err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar />
            <div className="container mx-auto p-8" style={{ marginTop: "40px" }}>
                <h2 className="text-3xl font-bold text-amber-500 mb-8">Coffee Dashbord</h2>
                <div className="overflow-x-auto bg-gray-800 shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
                                <th className="py-5 px-10 text-left">Customer ID</th>
                                <th className="py-5 px-10 text-left">Customer Name</th>
                                <th className="py-5 px-10 text-left">Order Item</th>
                                <th className="py-5 px-10 text-center">Number of Items</th>
                                <th className="py-5 px-10 text-center">Table Number</th>
                                <th className="py-5 px-10 text-center">Category</th>
                                <th className="py-5 px-10 text-center">Status</th>
                                <th className="py-5 px-10 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 text-sm font-light">
                            {coffees.map((coffee) => (
                                <tr key={coffee._id} className="border-b border-gray-600 hover:bg-gray-700">
                                    <td className="py-5 px-10 text-left whitespace-nowrap">{coffee.Customer_id}</td>
                                    <td className="py-5 px-10 text-left">{coffee.Customer_Name}</td>
                                    <td className="py-5 px-10 text-left">{coffee.Order_item}</td>
                                    <td className="py-5 px-10 text-center">{coffee.No_Of_Item}</td>
                                    <td className="py-5 px-10 text-center">{coffee.Table_No}</td>
                                    <td className="py-5 px-10 text-center">{coffee.Category}</td>
                                    <td className="py-5 px-10 text-center">
                                        <div className="flex justify-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(coffee.status)}`}>
                                                {coffee.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-10 text-center">
                                        <div className="flex justify-center space-x-4">
                                            <Link to={`/coffees/${coffee._id}`} className="text-blue-500 hover:text-blue-700">
                                                <FaEye size={20} />
                                            </Link>
                                            <Link to={`/Coffees/update/${coffee._id}`} className="text-yellow-500 hover:text-yellow-700">
                                                <FaEdit size={20} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteConfirmation(coffee._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(coffee._id, "Completed")}
                                                className="text-green-500 hover:text-green-700"
                                                aria-label="Mark as completed"
                                            >
                                                <FaCheck size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(coffee._id, "In Progress")}
                                                className="text-yellow-500 hover:text-yellow-700"
                                                aria-label="Mark as in progress"
                                            >
                                                <FaCoffee size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Confirmation Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-800 p-6 rounded-lg shadow-xl"
                        >
                            <h2 className="text-xl font-semibold text-white mb-4">Confirm Deletion</h2>
                            <p className="text-gray-300 mb-6">Are you sure you want to delete this order?</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                <div className="flex justify-start mt-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/Coffees/add" className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
                            <FaPlus className="mr-2" /> {/* Add icon */}
                            Add Data
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case "Completed": return "bg-green-200 text-green-800";
        case "In Progress": return "bg-yellow-200 text-yellow-800";
        default: return "bg-red-200 text-red-800"; // "Pending" will fall here
    }
};

export default GetAllCoffee;
