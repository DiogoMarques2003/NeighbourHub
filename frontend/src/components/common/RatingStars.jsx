import { Star, StarHalf } from 'lucide-react';
import React from 'react';

const RatingStars = ({ rating }) => {
  return (
    <div className="flex gap-1 text-xl">
      {[...Array(5)].map((_, index) => {
        const full = index + 1 <= rating;
        const half = !full && index + 0.5 === rating;

        return (
          <span key={index} className="relative inline-block w-6 h-6">
            {half ? (
              <>
                <Star fill="#d1d5dc" strokeWidth={0} className="absolute top-0 left-0" />
                <StarHalf fill="#ffd500" strokeWidth={0} className="absolute top-0 left-0" />
              </>
            ) : (
              <Star fill={full ? '#ffd500' : '#d1d5dc'} strokeWidth={0} />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default RatingStars;
