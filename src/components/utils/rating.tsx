"use client"; 
import React from 'react';
import { Rating as RatingComponent } from 'react-simple-star-rating';

import { Skeleton } from '../ui/skeleton';

const Rating = (
    {rating, count = 0, className, readOnly = true, size = 15, setRating}: 
    {
        rating: number, 
        count?: number, 
        className?: string, 
        readOnly?: boolean, 
        size?: number, 
        setRating?: React.Dispatch<number>
    }
  ) => {
    const [mounted, setMounted] = React.useState(false); 
    React.useEffect(() => {setMounted(true)}, []); 
    if (!mounted) return <div className={"flex w-full"}><Skeleton className="h-[20px] w-[150px] rounded-full"/></div>; 
  return (
    <div className={`flex items-center gap-1 ${className}`}>
          <RatingComponent
            allowFraction={true}
            initialValue={rating}
            readonly={readOnly}
            size={size}
            SVGstyle={{display: "inline"}}
            onClick={(rate: number) => setRating ? setRating(rate): {}}
          />
        <span className={'flex items-center text-xs mt-2'}>
          <span>({rating}) </span>
          {
            (count && count !== 0) ? (
              <span>&nbsp; - &nbsp;{count || 0}</span> 
            ): <span />
          }
        </span>
    </div>
  );
};

export default Rating;