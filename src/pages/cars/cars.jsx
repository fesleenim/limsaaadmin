import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast } from 'react-toastify';
import { data } from 'react-router';

function Cars() {
    const [carss, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setyear] = useState('');
    const [images, setImages] = useState();
    const [showAddCarsModal, setShowAddCarsModal] = useState(false); 
    const imgUrl = "https://realauto.limsa.uz/api/uploads/images";


    const token = localStorage.getItem('accessToken'); 

    const getCars = () => {
        setLoading(true);
        axios({
            url: 'https://realauto.limsa.uz/api/cars',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        }).then((res) => {
            setCars(res.data.data);
            setLoading(false);
        }).catch((error) => {
            console.error("Xatolik yuz berdi:", error);
            setLoading(false);
        });
    };

    useEffect(() => {
        getCars();
    }, []);


    // Yangi mashina qo'shish
    const handleAddCars = () => {
        if (!year || !images) {
            toast.error("Iltimos, barcha maydonlarni to'ldiring!");
            return;
        }
    
        const formData = new FormData();
        formData.append("title", year);
        formData.append("images", images); 

        
    
        console.log("FormData tarkibi:");
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]); 
        }
    
        axios.post("https://realauto.limsa.uz/api/cars", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => {
            console.log("Serverdan javob:", res);
            toast.success("mashina qo'shildi!");
            setShowAddCarsModal(false);
            getCars();
        })
        .catch(error => {
            console.error("mashina qo'shishda xatolik:", error.response?.data || error);
            toast.error(error.response?.data?.message || "mashina qo'shilmadi, qayta urining!");
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
                            onClick={() => setShowAddCarsModal(true)} 
                            className="bg-[#000957] text-white px-5 py-2 rounded-lg"
                        >
                            Yangi mashina Qo'shish
                        </button>
                    </div>

                    <table className="w-full border-collapse table-auto bg-white shadow-md rounded-lg">
                        <thead className="bg-[#000957] text-white">
                            <tr>
                                <th className="border border-gray-300 p-3 text-left">Raqam</th>
                                <th className="border border-gray-300 p-3 text-left">Rasmi</th>
                                <th className="border border-gray-300 p-3 text-left">Nomi</th>
                                <th className="border border-gray-300 p-3 text-center">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carss.map((cars, index) => (
                                <tr key={cars.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="border border-gray-300 p-3">{index + 1}</td>
                                    <td className="border border-gray-300 p-3">
                                        <img
                                            src={`${imgUrl}/${cars.image_src}`} 
                                            alt={cars.name_en}
                                            className="w-16  rounded-[50%] h-16 mx-auto"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-3">{cars.year}</td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        <button
                                            className="text-[#000957] hover:text-[#000957] transition-colors"
                                            onClick={() => handleEdit(cars)} 
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

            {showAddCarsModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Yangi Mashina Qo'shish</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" >Mashina nomi</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setyear(e?.target?.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" >Mashina rasmi:</label>
                            <input
                                type="file"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setImages(e?.target?.files[0])}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleAddCars}
                                className="bg-[#000957] text-white px-5 py-2 rounded-lg"
                            >
                                Qo'shish
                            </button>
                            <button
                                onClick={() => setShowAddCarsModal(false)} 
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

export default Cars;
