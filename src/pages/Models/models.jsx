import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Models() {
    const [models, setModels] = useState([]);
    const [brand, setBrand] = useState([]);
    const [name, setName] = useState('');
    const [brandId, setBrandId] = useState(null);
    const token = localStorage.getItem('accessToken');

    const getModels = () => {
        axios.get('https://realauto.limsa.uz/api/models').then(res => {
            setModels(res?.data?.data);
        });
    };

    const getBrands = () => {
        axios.get('https://realauto.limsa.uz/api/brands').then(res => {
            setBrand(res?.data?.data);
        });
    };

    useEffect(() => {
        getModels();
        getBrands();
    }, []);

    const handleAddCategory = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("brand_id", brandId);

        axios({
            url: "https://realauto.limsa.uz/api/models",
            method: "POST",
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                toast.success("Model qo'shildi!");
                getModels();
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Model Qo'shish</h2>
            <div className="space-y-4">
                <input 
                    type="text" 
                    placeholder='Model nomi' 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    onChange={(e) => setName(e.target.value)} 
                />
                <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    onChange={(e) => setBrandId(e.target.value)}
                >
                    <option value="" disabled selected>Select Brands</option>
                    {brand.map((item) => (
                        <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                </select>
                <button 
                    onClick={handleAddCategory} 
                    className="w-full bg-[#000957] text-white py-3 rounded-lg  transition duration-300 font-semibold shadow-md"
                >
                    Saqlash
                </button>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Mavjud Modellar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {models.map((item) => (
                        <div key={item.id} className="p-5 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <h3 className="text-xl font-medium text-gray-900">{item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Models;
