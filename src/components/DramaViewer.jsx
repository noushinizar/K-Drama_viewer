// src/components/DramaViewer.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDramas, fetchDramaWithTrailer } from '../redux/dramaSlice';

const DramaViewer = () => {
    const dispatch = useDispatch();
    const dramas = useSelector((state) => state.dramas.list);
    const selectedDrama = useSelector((state) => state.dramas.selectedDrama);
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [trailerUrl, setTrailerUrl] = useState(null);

    useEffect(() => {
        dispatch(fetchDramas());
    }, [dispatch]);

    const handleDramaSelect = async (dramaId) => {
        await dispatch(fetchDramaWithTrailer(dramaId));
        if (selectedDrama && selectedDrama.trailerUrl) {
            setTrailerUrl(selectedDrama.trailerUrl);
            setIsModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false); 
        setTrailerUrl(null);
    };
    const truncateString =(str,num)=>{
        if(str?.length>num){
          return str.slice(0,num)+ '...'
        }else{
          return str;
        }
      }
    return (
        <div className="w-full min-h-screen mx-auto p-4 bg-gray-900 overflow-x-hidden">
            <h1 className="text-4xl text-white font-bold text-center mb-8">K-Drama Viewer</h1>
            <div className="mt-12 bg-gray-800 text-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {dramas.map((drama) => (
                        <div 
                            key={drama.id} 
                            className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${drama.poster_path}`}
                                alt={drama.name}
                                className="rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{drama.name}</h2>
                                <p className="text-sm text-gray-400 mb-4">{truncateString(drama.overview,200)}</p>
                                <button
                                    onClick={() => handleDramaSelect(drama.id)}
                                    className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-500"
                                >
                                    View Trailer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && trailerUrl && (
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
                    onClick={handleModalClose}
                >
                    <div
                        className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end">
                            <button
                                onClick={handleModalClose}
                                className="text-white text-xl font-bold"
                            >
                                X
                            </button>
                        </div>
                        <div className="relative aspect-w-16 aspect-h-9">
                            <div className="flex justify-center">
                                <iframe
                                    className="w-full h-64 sm:h-96"
                                    src={`https://www.youtube.com/embed/${trailerUrl.split('v=')[1]}`}
                                    title="Trailer"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DramaViewer;
