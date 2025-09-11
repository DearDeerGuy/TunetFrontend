import { Star, StarHalf } from 'lucide-react';
import classes from './StarLine.module.css'
import React from 'react'

function StarLine({value}) {
    const stars = 5;
    const rating = (value / 10) * stars;
    const ratingArr = [];
    for(let i=1;i<=Math.ceil(rating);i++){
        ratingArr.push((i>rating)?0.5:1)
    }
    
    return (
        <div className={classes.star_rating}>
            <div className={classes.stars}>
                {Array.from({ length: stars }, () => (
                    <Star stroke="#111" strokeWidth={1} />
                ))}
            </div>
            <div className={[classes.stars, classes.rating].join(' ')}>
                {ratingArr.map(val=>val==1?<Star fill="yellow" strokeWidth={0}/>:<StarHalf fill="yellow" strokeWidth={0}/>)}
            </div>
        </div>
    );
}

export default StarLine