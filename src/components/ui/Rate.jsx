import React from 'react';
import StarsRate from './StarsRate';

export default function Rate({item}) {
    
    return (
        <div className='rate-item flex-col md:flex-row flex gap-2 mt-6'>
            <div className="rate-info">
                <div className="rate-name flex items-center gap-2 mb-2">
                    <div className="user-short-name flex items-center justify-center">E.K</div>
                    <div className="user-name sub-title">{item.name}</div>
                </div>
                <StarsRate rate={item.rating} />
                <div className="rate-date mt-2">{item.time}</div>
            </div>
            <div className="rate-comment mt-3 md:mt-0">
                <p className='sub-title'>{item.review}</p>
            </div>
        </div>
    )
}
