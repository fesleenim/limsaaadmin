import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nameUz, setNameUz] = useState('');
    const [nameRu, setNameRu] = useState('');
    const [images, setImages] = useState();
    const [selectedItem, setSelectdItem] = useState(null); // O'chirish uchun
    const [editingItem, setEditingItem] = useState(null); // Tahrirlash uchun
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const imgUrl = "https://realauto.limsa.uz/api/uploads/images";

    // Tokenni olish
    const token = localStorage.getItem('accessToken');

    // Kategoriyalarni olish
    const getCategory = () => {
        setLoading(true);
        axios({
            url: 'https://realauto.limsa.uz/api/categories',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
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

    // Yangi yoki mavjud kategoriyani qo'shish/tahrirlash
    const handleAddCategory = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("name_en", nameUz);
        formData.append("name_ru", nameRu);
        formData.append("images", images);

        axios({
            url: editingItem
                ? `https://realauto.limsa.uz/api/categories/${editingItem.id}`
                : 'https://realauto.limsa.uz/api/categories',
            method: editingItem ? 'PUT' : 'POST',
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                toast.success(editingItem ? "Kategoriya tahrirlandi" : "Kategoriya qo'shildi!");
                setShowAddCategoryModal(false);
                getCategory();
                setEditingItem(null);

                // 🔄 Inputlarni tozalash (faqat yangi kategoriya qo'shilganda)
                if (!editingItem) {
                    setNameUz('');
                    setNameRu('');
                    setImages(null);
                }
            })
            .catch(error => {
                console.error("Xatolik:", error.response?.data || error);
                toast.error("Xatolik yuz berdi. Qayta urinib ko‘ring!");
            })
            .finally(() => {
                setLoading(false);
            });
    };


    // Tahrirlash uchun kategoriya
    const showEdit = (category) => {
        setEditingItem(category);
        setShowAddCategoryModal(true);
        setNameUz(category.name_en);
        setNameRu(category.name_ru);
        setImages(null);
    };

    // Modalni yopish
    const closeModal = () => {
        setShowAddCategoryModal(false);
        setEditingItem(null);
    };

    // Kategoriyani o'chirish
    // Kategoriyani o'chirish
    const handleDelete = async (id) => {
        try {
            if (!token) {
                toast.error("Token mavjud emas");
                return;
            }

            // Kategoriya bilan bog'langan mashinalarni tekshirish
            const response = await axios.get(`https://realauto.limsa.uz/api/cars?category_id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.data.length > 0) {
                toast.error("Bu kategoriya bog'langan mashinalarga ega. Avval mashinalarni o‘chirib tashlang.");
                return;
            }

            // O'chirish
            setLoading(true);
            await axios.delete(`https://realauto.limsa.uz/api/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Kategoriya o‘chirildi");
            setSelectdItem(null);
             getCategory();
        } catch (error) {
            console.error("O‘chirishda xatolik:", error.response?.data || error);
            toast.error(`Xatolik: ${error.response?.data?.message || "Noma'lum xatolik yuz berdi"}`);
        } finally {
            setLoading(false);
        }
    };





    return (
        <div className='p-5'>
            {loading ? (
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#000957]"></div>
                    <span className="ml-3 text-xl text-gray-700">Yuklanmoqda...</span>
                </div>
            ) : (
                <div className='w-full'>
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className='text-[#000957] font-medium text-xl'>Category Lists</h1>
                        <button
                            onClick={() => setShowAddCategoryModal(true)}
                            className="flex items-center bg-[#000957] text-white px-5 py-2 rounded-lg"
                        >
                            <IoMdAdd className='text-white mr-2' />
                            Add
                        </button>
                    </div>
                    <hr className='bg-gray-100 h-0.5 mb-8' />
                    <table className="w-full border-collapse table-auto bg-white shadow-md rounded-lg">
                        <thead className="bg-[#000957] text-white">
                            <tr>
                                <th className="border border-gray-300 p-3 text-left">Raqam</th>
                                <th className="border border-gray-300 p-3 text-left">Rasmi</th>
                                <th className="border border-gray-300 p-3 text-left">Nomi (En)</th>
                                <th className="border border-gray-300 p-3 text-left">Nomi (Ru)</th>
                                <th className="border border-gray-300 p-3 text-center">Action</th>
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
                                            className="w-16 rounded-[50%] h-16 mx-auto"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-3">{category.name_en}</td>
                                    <td className="border border-gray-300 p-3">{category.name_ru}</td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <div className='flex items-center justify-evenly'>
                                            <button onClick={() => showEdit(category)} className="text-[#000957] hover:text-[#000957]">
                                                <BorderColorIcon size={24} />
                                            </button>
                                            <button
                                                className="text-[#000957] hover:text-[#000957]"
                                                onClick={() => setSelectdItem(category)}
                                            >
                                                <RiDeleteBin6Line size={24} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Yangi kategoriya qo‘shish va tahrirlash modali */}
            {showAddCategoryModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">{editingItem ? "Kategoriyani tahrirlash" : "Kategoriya qo'shish"}</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Kategoriya nomi (En):</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setNameUz(e.target.value)}
                                value={nameUz}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Kategoriya nomi (Ru):</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setNameRu(e.target.value)}
                                value={nameRu}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Kategoriya rasmi:</label>
                            <input
                                type="file"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setImages(e.target.files[0])}
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                disabled={loading}
                                onClick={handleAddCategory}
                                className="bg-[#000957] text-white px-5 py-2 rounded-lg"
                            >
                                {loading ? "Saqlanmoqda..." : editingItem ? "Saqlash" : "Qo‘shish"}
                            </button>
                            <button
                                onClick={closeModal}
                                className="ml-3 bg-gray-300 text-black px-5 py-2 rounded-lg"
                            >
                                Bekor qilish
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* O‘chirish tasdiqlash modali */}
            {selectedItem && (
                <div className="fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
                        <h2 className="text-xl font-semibold mb-4 text-center text-[#000957]">
                            Rostdan ham o‘chirmoqchimisiz?
                        </h2>
                        <div className="flex justify-between gap-4">
                            <button
                                disabled={loading}
                                onClick={() => handleDelete(selectedItem.id)}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                            >
                                {loading ? "O'chirilmoqda ..." : "Ha , o'chirish"}
                            </button>
                            <button
                                onClick={() => setSelectdItem(null)}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-lg transition"
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
