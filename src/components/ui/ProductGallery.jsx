'use client';

import React, { useState, useEffect } from 'react';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui';

export default function ProductGallery({ images, main }) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    useEffect(() => {
        Fancybox.bind('[data-fancybox]', {});
    }, [selectedImage]);

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
                className={`border rounded-md p-1 ${selectedImage === img ? 'border-red-500' : 'border-transparent'}`}
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
                                    ? main // fallback preview
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
        const isYouTube = isYouTubeLink(selectedImage);
        const isVideo = isVideoFile(selectedImage);
        const youtubeId = getYouTubeId(selectedImage);

        const fancyHref = isYouTube && youtubeId
            ? `https://www.youtube.com/watch?v=${youtubeId}`
            : selectedImage;

        const fancyDataType = isYouTube ? 'iframe' : 'image';

        let content;

        if (isYouTube && youtubeId) {
            content = (
                <iframe
                    className="w-full h-full aspect-video"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            );
        } else if (isVideo) {
            content = (
                <video
                    controls
                    className="w-full max-h-[500px] w-auto max-w-full rounded object-contain"
                >
                    <source src={selectedImage} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        } else {
            content = (
                <img
                    src={selectedImage}
                    alt="Selected product"
                    className="max-h-[500px] w-auto max-w-full object-contain rounded"
                />
            );
        }

        return (
            <div className="relative group w-full max-w-full overflow-hidden">
                <div className="w-full max-h-[500px] aspect-video flex items-center justify-center">
                    {content}
                </div>

                {/* Expand icon only for image or YouTube */}
                {!isVideo && (
                    <a
                        href={fancyHref}
                        data-fancybox
                        data-type={fancyDataType}
                        className="absolute top-2 right-2 z-10 text-white bg-black/50 p-2 rounded-full hidden group-hover:flex items-center justify-center"
                    >
                        <i className="icon-expand-solid text-xl"></i>
                    </a>
                )}
            </div>
        );
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
