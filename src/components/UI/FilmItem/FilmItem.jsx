import React, { useEffect, useRef, useState } from 'react'
import classes from './FilmItem.module.css'

function FilmItem({info:{poster,title},newClassName,onClickFunction}) {
    const titleRef = useRef(null);
    const [scroll, setScroll] = useState({interval:null,scroll:0})
    const startScroll = () => {
        if (scroll.interval) return;
        let interval = setInterval(() => {
            setScroll(val => ({ ...val, value: val.value + 1 }));
        }, 50);
        setScroll(val => ({ ...val, interval }));
    };
    const stopScroll = () => {
        if (scroll.interval) {
            clearInterval(scroll.interval);
        }
        setScroll({ interval: null, value: 0 });
        if (titleRef.current) {
            titleRef.current.scrollLeft = 0;
        }
    };
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.scrollLeft = scroll.value;
        }
    }, [scroll.value]);

    return (
        <div className={[classes.filmItem,...newClassName].join(' ')} onMouseEnter={startScroll} onMouseLeave={stopScroll} onClick={onClickFunction}>
            <img className={classes.filmItem_img} src={poster} alt="" />
            <div className={classes.filmItem_title} ref={titleRef}>{title}</div>
        </div>
    )
}

export default FilmItem