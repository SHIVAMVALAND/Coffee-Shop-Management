import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaTable, FaListAlt, FaCoffee, FaPlus, FaCheck } from "react-icons/fa";

function AddCoffees() {
    const [data, setData] = useState({
        Customer_id: "",
        Customer_Name: "",
        Table_No: "",
        Category: "",
        Coffee_Img: "",
        Order_item: "",
        No_Of_Item: "",
        status: "Pending", 
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = "http://localhost:4000/coffees/add";
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Failed to add coffee');
            }
            const result = await response.json();
            console.log("Coffee added:", result);
            navigate("/coffees");
        } catch (error) {
            console.error("Error adding coffee:", error);
            alert("Error adding coffee: " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-2xl space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-amber-500 mb-6">Add Data</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(data).map((key) => (
                        <div key={key} className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-300">
                                {key.replace(/_/g, ' ')}
                            </label>
                            <div className="relative">
                                {key === "Customer_id" && <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                                {key === "Customer_Name" && <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                                {key === "Table_No" && <FaTable className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                                {key === "Category" && <FaListAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                                {key === "Coffee_Img" && <FaCoffee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                                {key === "Order_item" && <FaCoffee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                                {key === "No_Of_Item" && <FaPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                                {key === "status" && <FaCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                                
                                {key === 'status' ? (
                                    <select
                                        name={key}
                                        value={data[key]}
                                        onChange={handleChange}
                                        className="pl-10 w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="In Progress">In Progress</option>
                                    </select>
                                ) : (
                                    <input
                                        type={key === 'No_Of_Item' ? 'number' : 'text'}
                                        name={key}
                                        value={data[key]}
                                        onChange={handleChange}
                                        className="pl-10 w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                                        placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-full transition duration-300"
                    >
                        <FaPlus className="mr-2" /> {/* Add icon */}
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCoffees;