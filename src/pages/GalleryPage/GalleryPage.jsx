import React, { useEffect, useState } from 'react'
import classes from './GalleryPage.module.css'
import useFetching from '../../hooks/useFetching';
import { getCategory } from '../../API/category';
import { activateImageULR, types } from '../../Utils/utils';
import { getMovieList } from '../../API/film';
import Loader from '../../components/UI/Loader/Loader';
import FilmItem from '../../components/UI/FilmItem/FilmItem';
import Pagination from '../../components/UI/Pagination/Pagination';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import { getFavoriteList } from '../../API/favorite';
import { useSelector } from 'react-redux';

function GalleryPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector(state => state.User);
    const [search,setSearch] = useState({search:'',type:'',categories:''});
    const [pagination, setPagination] = useState({maxPage:1,page:1})
    const [categoryList,setCategoryList] = useState([]);
    const [filmList,setFilmList] = useState([]);
    const [fetchingCategory,loaderCategory,errorCategory] = useFetching(async()=>{
        const res = await getCategory();
        setCategoryList(res);
    },true)
    const [fetchingFilm,loaderFilm,errorFilm] = useFetching(async(page)=>{
        // const width = window.innerWidth;
        // console.log(width);
        let res={};
        if(location.pathname=='/favorite'){
            res = await getFavoriteList({per_page:60,page:page,search:search.search,type:search.type,categories:search.categories},user.token)
        }else{
            res = await getMovieList({per_page:60,page:page,search:search.search,type:search.type,categories:search.categories})
        }
        setPagination({maxPage:res.last_page,page:res.current_page});
        setFilmList(res.data);
    },true)

    useEffect(()=>{
        fetchingFilm();
    },[search.categories,search.type])
    useEffect(()=>{
        fetchingCategory()
    },[])

    return (
        <div className={classes.galleryPage}>
            <div className={classes.gallery}>
                <form className={classes.gallery_form} onSubmit={(e)=>e.preventDefault()}>
                    <div className={classes.formGroup}>
                        <select className={classes.formGroup_select} value={search.type} onChange={e=>{setSearch(s=>({...s,type:e.target.value}))}}>
                            <option value="">Фільми та серіали</option>
                            {types.map((val)=><option key={val.id} value={val.type}>{val.name}</option>)}
                        </select>
                        <div className={classes.formGroup_search}>
                            <input className={classes.formGroup_searchInput} type="text" value={search.search} onChange={(e)=>setSearch(s=>({...s,search:e.target.value}))} />
                            <button className={classes.formGroup_searchButton} onClick={()=>{fetchingFilm()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30">
                                    <path fill="#000" d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    {categoryList.length>0&&<div className={classes.form_category}>
                        <div className={classes.category_board}>
                            {categoryList.map(val=><div className={[classes.category_item,val.slug==search.categories?classes.category_itemAction:''].join(' ')} key={val.id} onClick={()=>setSearch(s=>({...s,categories:s.categories==val.slug?'':val.slug}))}>{val.name}</div>)}
                        </div>
                        <select className={classes.category_select} value={search.categories} onChange={(e)=>setSearch(val=>({...val,categories:e.target.value}))}>
                            <option value={''}>Все жанры</option>
                            {categoryList.map(val=><option key={val.id} value={val.slug}>{val.name}</option>)}
                        </select>
                    </div>}
                </form>
                <div className={classes.gallery_body}>
                    {loaderFilm?<div className={classes.gallery_bodyLoader}><Loader/></div>
                    :(filmList.length>0?filmList.map(val=><FilmItem key={val.id} info={{poster:activateImageULR(val.poster),title:val.title}} onClickFunction={()=>navigate(`/view/${val.id}`)}/>)
                    :<div className={classes.gallery_bodyNoFilm}>Фільми не знайдено</div>
                    )}
                </div>
                <div className={classes.gallery_pagination}>
                    {pagination.maxPage>1&&<Pagination maxPage={pagination.maxPage} page={pagination.page} setPage={(e)=>fetchingFilm(e)}/>}
                </div>
            </div>
        </div>
    )
}

export default GalleryPage