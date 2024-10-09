import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft, FaCoffee, FaUser, FaShoppingCart, FaTable, FaList } from "react-icons/fa";

function DetailCoffees() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const { _id } = useParams();
    
    useEffect(() => {
        const apiUrl = `http://localhost:4000/coffees/${_id}`;
        
        fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching coffee details:", error);
                setLoading(false);
            });
    }, [_id]);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen p-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-gray-800 rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105">
                {imageLoading && (
                    <div className="flex items-center justify-center h-64 bg-gray-700">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}
                <img
                    className={`w-full h-64 object-cover object-center ${imageLoading ? 'invisible' : 'visible'}`}
                    src={data.Coffee_Img || "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"}
                    alt="Coffee Image"
                    onLoad={handleImageLoad}
                />
                <div className="p-6">
                    <h2 className="font-bold text-3xl mb-4 text-blue-400">Coffee Details</h2>
                    <div className="space-y-3">
                        <DetailItem icon={<FaUser className="text-blue-400" />} label="Customer ID" value={data.Customer_id} />
                        <DetailItem icon={<FaUser className="text-blue-400" />} label="Customer Name" value={data.Customer_Name} />
                        <DetailItem icon={<FaCoffee className="text-blue-400" />} label="Order Item" value={data.Order_item} />
                        <DetailItem icon={<FaShoppingCart className="text-blue-400" />} label="No. of Items" value={data.No_Of_Item} />
                        <DetailItem icon={<FaTable className="text-blue-400" />} label="Table No" value={data.Table_No} />
                        <DetailItem icon={<FaList className="text-blue-400" />} label="Category" value={data.Category} />
                    </div>
                </div>
                <div className="px-6 pb-6">
                    <button
                        onClick={() => window.history.back()}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        <FaArrowLeft className="mr-2" /> Back
                    </button>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ icon, label, value }) {
    return (
        <div className="flex items-center space-x-3">
            {icon}
            <span className="text-gray-400">{label}:</span>
            <span className="font-semibold">{value || "N/A"}</span>
        </div>
    );
}

export default DetailCoffees;