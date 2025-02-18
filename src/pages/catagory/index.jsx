import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast } from 'react-toastify';

function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nameUz, setNameUz] = useState('');
    const [nameRu, setNameRu] = useState('');
    const [images, setImages] = useState(null);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false); // Yangi kategoriya qo'shish uchun modal
    const imgUrl = "https://realauto.limsa.uz/api/uploads/images";


    // Tokenni localStorage'dan olish
    const token = localStorage.getItem('accessToken'); // localStorage'dan tokenni olish

    // Kategoriyalarni olish
    const getCategory = () => {
        setLoading(true);
        axios({
            url: 'https://realauto.limsa.uz/api/categories',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Tokenni headerga qo'shish
            }
        }).then((res) => {
            setCategories(res.data.data);
            setLoading(false);
        }).catch((error) => {
            console.error("Xatolik yuz berdi:", error);
            setLoading(false);
        });
    };

    useEffect(() => {
        getCategory();
    }, []);


    // Yangi kategoriya qo'shish
    const handleAddCategory = () => {
        if (!nameUz || !nameRu || !images) {
            toast.error("Iltimos, barcha maydonlarni to'ldiring!");
            return;
        }
    
        const formData = new FormData();
        formData.append("name_en", nameUz);
        formData.append("name_ru", nameRu);
        formData.append("image", images); // Rasmni to‘g‘ri formatda qo‘shish
    
        axios({
            url: 'https://realauto.limsa.uz/api/categories',
            method: 'POST',
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`, // Token qo‘shish
            }
        })
        .then(res => {
            toast.success("Kategoriya qo'shildi!");
            setShowAddCategoryModal(false);
            getCategory(); // Yangilangan kategoriyalarni olish
        })
        .catch(error => {
            console.error("Kategoriya qo'shishda xatolik:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Kategoriya qo'shilmadi, qayta urining!");
        });
    };
    
    
    


    return (
        <div>
            {loading ? (
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#493D9E]"></div>
                    <span className="ml-3 text-xl text-gray-700">Yuklanmoqda...</span>
                </div>
            ) : (
                <div className='w-full'>
                    <div className="mb-4">
                        <button
                            onClick={() => setShowAddCategoryModal(true)} // Yangi kategoriya qo'shish uchun modalni ochish
                            className="bg-[#493D9E] text-white px-5 py-2 rounded-lg"
                        >
                            Yangi Kategoriya Qo'shish
                        </button>
                    </div>

                    <table className="w-full border-collapse table-auto bg-white shadow-md rounded-lg">
                        <thead className="bg-[#B2A5FF] text-white">
                            <tr>
                                <th className="border border-gray-300 p-3 text-left">Raqam</th>
                                <th className="border border-gray-300 p-3 text-left">Rasmi</th>
                                <th className="border border-gray-300 p-3 text-left">Nomi (En)</th>
                                <th className="border border-gray-300 p-3 text-left">Nomi (Ru)</th>
                                <th className="border border-gray-300 p-3 text-center">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="border border-gray-300 p-3">{index + 1}</td>
                                    <td className="border border-gray-300 p-3">
                                        <img
                                            src={`${imgUrl}/${category.image_src}`} 
                                            alt={category.name_en}
                                            className="w-16  rounded-[50%] h-16 mx-auto"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-3">{category.name_en}</td>
                                    <td className="border border-gray-300 p-3">{category.name_ru}</td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <button
                                            className="text-[#B2A5FF] hover:text-[#B2A5FF] transition-colors"
                                            onClick={() => handleEdit(category)} // Qalamchani bosganda modalni ochish
                                        >
                                            <BorderColorIcon size={24} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal: Yangi kategoriya qo'shish */}
            {showAddCategoryModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Yangi Kategoriya Qo'shish</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" >Kategoriya nomi (En):</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setNameUz(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" >Kategoriya nomi (Ru):</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setNameRu(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" >Kategoriya rasmi:</label>
                            <input
                                type="file"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setImages(e.target.files[0])}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleAddCategory}
                                className="bg-[#493D9E] text-white px-5 py-2 rounded-lg"
                            >
                                Qo'shish
                            </button>
                            <button
                                onClick={() => setShowAddCategoryModal(false)} // Modalni yopish
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

export default Category;
