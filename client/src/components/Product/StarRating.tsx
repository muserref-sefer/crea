import React from 'react';

interface StarRatingProps {
  rating: number;
  className?: string; 
}

const StarRating: React.FC<StarRatingProps> = ({ rating, className = '' }) => {
  const fullStars = Math.floor(rating); 
  const hasHalfStar = rating % 1 !== 0; 
  const emptyStars = 5 - Math.ceil(rating); 

  const stars = [
    ...Array(fullStars).fill('full'), 
    ...(hasHalfStar ? ['half'] : []), 
    ...Array(emptyStars).fill('empty'),
  ];

  return (
    <div className={`flex ${className}`} role='group'>
      {stars.map((star, index) => (
        <svg
          key={index}
          data-testid={
            star === 'full' ? 'full-star' : star === 'half' ? 'half-star' : 'empty-star'
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={star === 'full' ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4 text-yellow-400"
        >
          {star === 'full' && (
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          )}
          {star === 'half' && (
            <>
              <path
                d="M12 17.27L14.59 19.09L14.18 17.67L15.82 16.25L13.41 15.81L12 14L10.59 15.81L8.18 16.25L9.82 17.67L9.41 19.09L12 17.27Z"
                fill="currentColor"
              />
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </>
          )}
          {star === 'empty' && (
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          )}
        </svg>
      ))}
    </div>
  );
};

export default StarRating;