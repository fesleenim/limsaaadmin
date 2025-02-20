import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast } from 'react-toastify';

function Location() {
    const [location, setLocation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [images, setImages] = useState();
    const [showAddLocationModal, setShowAddLocationModal] = useState(false); // Yangi Lokatsiya qo'shish uchun modal
    const imgUrl = "https://realauto.limsa.uz/api/uploads/images";


    // Tokenni localStorage'dan olish
    const token = localStorage.getItem('accessToken'); // localStorage'dan tokenni olish

    // Lokatsiyalarni olish
    const getLocation = () => {
        setLoading(true);
        axios({
            url: 'https://realauto.limsa.uz/api/locations',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Tokenni headerga qo'shish
            }
        }).then((res) => {
            setLocation(res.data.data);
            setLoading(false);
        }).catch((error) => {
            console.error("Xatolik yuz berdi:", error);
            setLoading(false);
        });
    };

    useEffect(() => {
        getLocation();
    }, []);


    // Yangi Lokatsiya qo'shish
    const handleAddLocation = () => {
        if (!name || !text || !images) {
            toast.error("Iltimos, barcha maydonlarni to'ldiring!");
            return;
        }
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("text", text);
        formData.append("images", images); // Backend qabul qiladigan nomni tekshiring
    
        console.log("FormData tarkibi:");
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]); // FormData tarkibini ko‘rish
        }
    
        axios.post("https://realauto.limsa.uz/api/locations", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => {
            console.log("Serverdan javob:", res);
            toast.success("Lokatsiya qo'shildi!");
            setShowAddLocationModal(false);
            getLocation();
        })
        .catch(error => {
            console.error("Lokatsiya qo'shishda xatolik:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Lokatsiya qo'shilmadi, qayta urining!");
        });
    };
    
    
    
    


    return (
        <div>
            {loading ? (
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#000957]"></div>
                    <span className="ml-3 text-xl text-gray-700">Yuklanmoqda...</span>
                </div>
            ) : (
                <div className='w-full'>
                    <div className="mb-4">
                        <button
                            onClick={() => setShowAddLocationModal(true)} // Yangi Lokatsiya qo'shish uchun modalni ochish
                            className="bg-[#000957] text-white px-5 py-2 rounded-lg"
                        >
                            Yangi Lokatsiya Qo'shish
                        </button>
                    </div>

                    <table className="w-full border-collapse table-auto bg-white shadow-md rounded-lg">
                        <thead className="bg-[#000957] text-white">
                            <tr>
                                <th className="border border-gray-300 p-3 text-left">Raqam</th>
                                <th className="border border-gray-300 p-3 text-left">Rasmi</th>
                                <th className="border border-gray-300 p-3 text-left">Nomi </th>
                                <th className="border border-gray-300 p-3 text-left">Title</th>
                                <th className="border border-gray-300 p-3 text-center">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {location.map((location, index) => (
                                <tr key={location.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="border border-gray-300 p-3">{index + 1}</td>
                                    <td className="border border-gray-300 p-3">
                                        <img
                                            src={`${imgUrl}/${location.image_src}`} 
                                            alt={location.name_en}
                                            className="w-16  rounded-[50%] h-16 mx-auto"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-3">{location.name}</td>
                                    <td className="border border-gray-300 p-3">{location.text}</td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <button
                                            className="text-[#000957] hover:text-[#000957] transition-colors"
                                            onClick={() => handleEdit(location)} // Qalamchani bosganda modalni ochish
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

            {/* Modal: Yangi Lokatsiya qo'shish */}
            {showAddLocationModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opaLokatsiya-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Yangi Lokatsiya Qo'shish</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" >Lokatsiya nomi :</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setName(e?.target?.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" >Lokatsiya text:</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setText(e?.target?.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" >Lokatsiya rasmi:</label>
                            <input
                                type="file"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setImages(e?.target?.files[0])}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleAddLocation}
                                className="bg-[#000957] text-white px-5 py-2 rounded-lg"
                            >
                                Qo'shish
                            </button>
                            <button
                                onClick={() => setShowAddLocationModal(false)} // Modalni yopish
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

export default Location;
