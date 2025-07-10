'use client';
import React, { useState } from 'react';

export default function ProductGallery({ images, main }) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    const isYouTubeLink = (url) => /youtube\.com|youtu\.be/.test(url);
    const isVideoFile = (url) => url.endsWith('.mp4') || url.includes('.mp4');

    const getYouTubeId = (url) => {
        const match = url.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    };

    const renderThumbnail = (img, index) => {
        const isYouTube = isYouTubeLink(img);
        const isVideo = isVideoFile(img);
        const youtubeId = getYouTubeId(img);

        return (
            <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`border rounded-md p-1 ${selectedImage === img ? 'border-red-500' : 'border-transparent'
                    }`}
            >
                <span className='relative block'>
                    {(isYouTube || isVideo) && (
                        <i className="icon-circle-play-regular player-icon absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl"></i>
                    )}
                    <img
                        src={
                            isYouTube && youtubeId
                                ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
                                : isVideo
                                    ? main // fallback thumbnail or a generated preview
                                    : img
                        }
                        alt={`Thumbnail ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                    />
                </span>
            </button>
        );
    };

    const renderMainContent = () => {
        if (isYouTubeLink(selectedImage)) {
            const id = getYouTubeId(selectedImage);
            return (
                <iframe
                    className="w-full h-[400px] md:h-[500px]"
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            );
        } else if (isVideoFile(selectedImage)) {
            return (
                <video
                    controls
                    className="w-full h-[400px] md:h-[500px] rounded"
                >
                    <source src={selectedImage} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        } else {
            return (
                <img
                    src={selectedImage}
                    alt="Selected product"
                    className="w-full h-auto max-h-[500px] object-contain rounded"
                />
            );
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-start gap-4 products-gallery">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 flex-wrap md:flex-nowrap thumbnails">
                {images.map((img, index) => renderThumbnail(img, index))}
            </div>

            {/* Main Display */}
            <div className="flex-1 main-image w-full">
                {renderMainContent()}
            </div>
        </div>
    );
}
