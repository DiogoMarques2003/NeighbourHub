import React from 'react';

const RatingStars = ({ rating }) => {
    return (
      <div className="flex gap-1 text-xl mb-4">
        {[...Array(5)].map((_, index) => {
            const full = index + 1 <= rating;
            const half = !full && index + 0.5 === rating;

            return (
            <span
                key={index}
                className={
                full
                    ? 'text-yellow-400'
                    : half
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }
            >
                {half ? '⯪' : '★'}
            </span>
            );
            })}
            </div>
            );
            };

export default RatingStars;