import React from 'react'
import classes from './Pagination.module.css'

function Pagination({maxPage, page, maxItem=5, setPage}) {
    let pagesList=getPages(page,maxItem,maxPage);

    function getPages(current, window, total) {
        let pages = new Set([1, total]);
        let side = Math.floor((window - 2) / 2);
        let start = current - side;
        let end = current + side;
        if (start < 2) {end += (2 - start);start = 2;}
        if (end > total - 1) {start -= (end - (total - 1));end = total - 1;}
        if (start < 2) start = 2;
        if (end > total - 1) end = total - 1;
        for (let i = start; i <= end; i++) {pages.add(i);}
        return [...pages].sort((a, b) => a - b);
    }

    return(
        <div className={classes.pagination}>
            <button onClick={()=>{if(page>1){setPage(page-1)}}} className={classes.pagination_button}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" fill="#000000"/>
                </svg>
            </button>
            {
                pagesList.map((val)=><button onClick={()=>setPage(val)} className={[classes.pagination_button,page==val?classes.pagination_buttonActive:''].join(" ")} key={val}>{val}</button>)
            }
            <button onClick={()=>{if(page<maxPage){setPage(page+1)}}} className={classes.pagination_button}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#000000"/>
                </svg>
            </button>
        </div>
    )
}

export default Pagination