'use client';
import React, { useState } from 'react';

export default function ProductGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    const isYouTubeLink = (url) => /youtube\.com|youtu\.be/.test(url);

    const getYouTubeId = (url) => {
        const match = url.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    };

    return (
        <div className="flex flex-col md:flex-row items-start gap-4 products-gallery">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 flex-wrap md:flex-nowrap thumbnails">
                {images.map((img, index) => {
                    const isVideo = isYouTubeLink(img);
                    const youtubeId = getYouTubeId(img);

                    return (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(img)}
                            className={`border rounded-md p-1 ${selectedImage === img ? 'border-red-500' : 'border-transparent'
                                }`}
                        >
                            {isVideo && youtubeId ? (
                                <span className='relative block'>
                                    <i className="icon-circle-play-regular player-icon"></i>
                                    <img
                                        src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                                        alt={`Video thumbnail ${index + 1}`}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </span>
                            ) : (
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Main Image or Video */}
            <div className="flex-1 main-image w-full">
                {isYouTubeLink(selectedImage) ? (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${getYouTubeId(selectedImage)}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <img
                        src={selectedImage}
                        alt="Selected product"
                    />
                )}
            </div>
        </div>
    );
}
