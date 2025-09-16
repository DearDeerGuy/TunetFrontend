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
                {Array.from({ length: stars }, (_, i) => (
                    <Star key={i} className={classes.star_w} fill="#000" strokeWidth={0} />
                ))}
            </div>
            <div className={[classes.stars, classes.rating].join(' ')}>
                {ratingArr.map((val,i)=>val==1?<Star key={i} className={classes.star_g} fill="#000" strokeWidth={0}/>:<StarHalf key={i} fill="yellow" strokeWidth={0}/>)}
            </div>
        </div>
    );
}

export default StarLine