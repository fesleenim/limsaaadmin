import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function Models() {
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [name, setName] = useState('');
    const [brandId, setBrandId] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showAddModelModal, setShowAddModelModal] = useState(false);
    const token = localStorage.getItem('accessToken');

    const getModels = () => {
        axios.get('https://realauto.limsa.uz/api/models').then(res => {
            setModels(res?.data?.data);
        });
    };

    const getBrands = () => {
        axios.get('https://realauto.limsa.uz/api/brands').then(res => {
            setBrands(res?.data?.data);
        });
    };

    useEffect(() => {
        getModels();
        getBrands();
    }, []);

    const handleAddOrEditModel = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("brand_id", brandId);

        axios({
            url: editingItem ? `https://realauto.limsa.uz/api/models/${editingItem.id}` : 'https://realauto.limsa.uz/api/models',
            method: editingItem ? 'PUT' : 'POST',
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            toast.success(editingItem ? "Model tahrirlandi!" : "Model qo'shildi!");
            setShowAddModelModal(false);
            getModels();
            setEditingItem(null);
            setName('');
            setBrandId(null);
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://realauto.limsa.uz/api/models/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Model o‘chirildi");
            getModels();
        } catch (error) {
            toast.error("Xatolik yuz berdi, qayta urinib ko'ring");
        }
    };

    const showEdit = (model) => {
        setEditingItem(model);
        setName(model.name);
        setBrandId(model.brand_id);
        setShowAddModelModal(true);
    };

    return (
        <div className='p-5'>
            <div className="mb-8 flex items-center justify-between">
                <h1 className='text-[#000957] font-medium text-xl'>Models Lists</h1>
                <button
                    onClick={() => setShowAddModelModal(true)}
                    className="flex items-center bg-[#000957] text-white px-5 py-2 rounded-lg"
                >
                    <IoMdAdd className='text-white mr-2' /> Add
                </button>
            </div>
            <hr className='bg-gray-100 h-0.5 mb-8' />
            <table className="w-full border-collapse table-auto bg-white shadow-md rounded-lg">
                <thead className="bg-[#000957] text-white">
                    <tr>
                        <th className="border border-gray-300 p-3 text-left">Raqam</th>
                        <th className="border border-gray-300 p-3 text-left">Nomi</th>
                        <th className="border border-gray-300 p-3 text-left">Brand</th>
                        <th className="border border-gray-300 p-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model, index) => (
                        <tr key={model.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="border border-gray-300 p-3">{index + 1}</td>
                            <td className="border border-gray-300 p-3">{model.name}</td>
                            <td className="border border-gray-300 p-3">{
                                brands.find(brand => brand.id === model.brand_id)?.title || 'Nomaʼlum'
                            }</td>
                            <td className="border border-gray-300 p-3 text-center">
                                <div className='flex items-center justify-evenly'>
                                    <button onClick={() => showEdit(model)} className="text-[#000957] hover:text-[#000957]">
                                        <BorderColorIcon size={24} />
                                    </button>
                                    <button
                                        className="text-[#000957] hover:text-[#000957]"
                                        onClick={() => setSelectedItem(model)}
                                    >
                                        <RiDeleteBin6Line size={24} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddModelModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">{editingItem ? "Modelni tahrirlash" : "Model qo'shish"}</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Model nomi:</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Brand:</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setBrandId(e.target.value)}
                                value={brandId || ''}
                            >
                                <option value="" disabled>Select Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleAddOrEditModel}
                                className="bg-[#000957] text-white px-5 py-2 rounded-lg"
                            >
                                {editingItem ? "Saqlash" : "Qo‘shish"}
                            </button>
                            <button
                                onClick={() => setShowAddModelModal(false)}
                                className="ml-3 bg-gray-300 text-black px-5 py-2 rounded-lg"
                            >
                                Bekor qilish
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {selectedItem && (
                <div className="fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Tasdiqlash</h2>
                        <p className="mb-4">Rostan ham "{selectedItem.name}" modelini o‘chirmoqchimisiz?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    handleDelete(selectedItem.id);
                                    setSelectedItem(null);
                                }}
                                className="bg-red-600 text-white px-5 py-2 rounded-lg"
                            >
                                Ha, o‘chirish
                            </button>
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="ml-3 bg-gray-300 text-black px-5 py-2 rounded-lg"
                            >
                                Bekor qilish
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Models;
