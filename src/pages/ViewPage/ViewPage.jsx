import React, { useEffect, useRef, useState } from 'react'
import classes from './ViewPage.module.css'
import { useParams } from 'react-router'
import useFetching from '../../hooks/useFetching';
import Loader from '../../components/UI/Loader/Loader';
import { useSelector } from 'react-redux';
import { getMovieById } from '../../API/film';
import { getFileById, getVideoStream } from '../../API/fails';
import { activateImageULR } from '../../Utils/utils';
import videoDefault from '../../assets/videoError.jpg'
import defaultAvatar from './../../assets/avatar.jpg'
import StarLine from '../../components/UI/StarLine/StarLine';
import { addReview, deleteReview, getReviewsList, getReviewUser, updateReview } from '../../API/reviews';
import Pagination from '../../components/UI/Pagination/Pagination';

function ViewPage() {
    const firstRender = useRef(true);
    const {id} = useParams();
    const user = useSelector(state => state.User);
    const [videoUrl, setVideoUrl] = useState(null);
    const [myReviews,setMyReviews] = useState({id:null,comment:'',mark:0,disabled:false})
    const [seriesSelection,setSeriesSelection] = useState({season_number:1,episode_number:1,active_season:1})
    const [pagination, setPagination] = useState({maxPage:1,page:1})
    const [ReviewsList,setReviewsList] = useState([]);
    const [errorReviews,setErrorReviews] = useState('');
    const [film,setFilm] = useState({})
    const [fetchingInfo,loaderInfo,errorInfo] = useFetching(async()=>{
        const newFilm = await getMovieById(id);
        newFilm.fails = await getFileById(id,user.token);
        newFilm.poster = activateImageULR(newFilm.poster);
        setFilm(newFilm);
        fetchingStream({type:newFilm.type,fails:newFilm.fails})
    },true);
    const [fetchingUserReviews,loaderUserReviews,errorUserReviews] = useFetching(async()=>{
        const res = await getReviewUser({film_id:id,user_id:user.id});
        setMyReviews({id:res?.id,comment:res?.comment||'',mark:res?.mark||0,disabled:!!res})
    },true)
    const [fetchingReviewsList,loaderReviewsList,errorReviewsList] = useFetching(async(page)=>{
        const res = await getReviewsList({film_id:id,perPage:10,page:page})
        setPagination({maxPage:res.last_page,page:res.current_page});
        setReviewsList(res.data);
    },true)
    const [fetchingStream,loaderStream,errorStream] = useFetching(async({type,fails})=>{
        if(type=='serial'){
            let fail=fails.find(val=>(val.season_number==seriesSelection.season_number&&val.episode_number==seriesSelection.episode_number))
            if(fail){
                const res = await getVideoStream(fail.link,user.token);
                setVideoUrl(res);
            }else{
                setVideoUrl(null);
            }
        }else{
            if (Array.isArray(fails)) {
                setVideoUrl(null);
            }else{
                const res = await getVideoStream(fails.link,user.token);
                setVideoUrl(res);
            }
        }
    },false);
    const [fetchingAddReviews,loaderAddReviews,errorAddReviews] = useFetching(async()=>{
        if(myReviews.id!=null&&myReviews!=undefined){
            const res = await updateReview(myReviews.id,{mark:myReviews.mark,comment:myReviews.comment},user.token);
            setMyReviews({id:res.id,comment:res.comment,mark:res.mark,disabled:true});
        }else{
            const res = await addReview({film_id:id,mark:myReviews.mark,comment:myReviews.comment},user.token);
            setMyReviews({id:res.id,comment:res.comment,mark:res.mark,disabled:true});
        }
        fetchingReviewsList();
    },false)
    const [fetchingDeleteReviews,loaderDeleteReviews,errorDeleteReviews] = useFetching(async()=>{
        await deleteReview(myReviews.id,user.token);
        setMyReviews({id:null,comment:'',mark:0,disabled:false});
        fetchingReviewsList();
    },false)

    const createSerialMenu = () => {
        const fileList = film.fails;
        if(seriesSelection.season_number==null){
            let maxSeason = fileList.map(val=>val.season_number).sort((a, b) => a - b).at(-1)||1;
            let arr=[];
            for (let i = 1; i <= maxSeason; i++) {arr.push(i);}
            return <>
                {arr.map(val=><div key={val} className={classes.view_serialMenuItem} onClick={()=>setSeriesSelection(s=>({...s,season_number:val}))}>Сезон {val}</div> )}
            </>
        }else{
            let maxEpisode = fileList.filter(val=>val.season_number==seriesSelection.season_number).map(val=>val.episode_number).sort((a, b) => a - b).at(-1)||1;
            let arr=[];
            for (let i = 1; i <= maxEpisode; i++) {arr.push(i);}
            return <>
                <div className={classes.view_serialMenuItem} onClick={()=>setSeriesSelection(s=>({...s,season_number:null}))}>Назад</div>
                {arr.map(val=><div key={val} className={[classes.view_serialMenuItem,(seriesSelection.episode_number==val&&seriesSelection.season_number==seriesSelection.active_season)?classes.view_serialMenuItemActive:''].join(' ')} onClick={()=>setSeriesSelection(s=>({...s,episode_number:val,active_season:seriesSelection.season_number}))}>Епизод {val}</div> )}
            </>
        }
    }
    const addInUpdateReviews = () =>{
        if(myReviews.comment === undefined || myReviews.comment === null || myReviews.comment.trim() === ''){
            setErrorReviews("Поле коментаря обов'язкове для заповнення");
            return;
        }
        if(myReviews.mark<=0||myReviews.mark>10){
            setErrorFields("Поле оцінки обов'язкове для заповнення");
            return;
        }
        fetchingAddReviews();
    }

    useEffect(() => {
        fetchingInfo();
        fetchingReviewsList();
        fetchingUserReviews();
    }, []);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return; 
        }
        fetchingStream({type:film.type,fails:film.fails})
    }, [seriesSelection.episode_number,seriesSelection.active_season]);

    return (
        <div className={classes.viewPage}>
            <div className={classes.view}>
                {loaderInfo?<div className={classes.viewLoader}><Loader/></div>
                :<>
                    <div className={classes.view_head}>
                        <div className={classes.view_info}>
                            <div className={classes.view_imageBlock}>
                                <img className={classes.view_image} src={film.poster} alt="" />
                            </div>
                            <div className={classes.info}>
                                <div className={classes.info_title}>{film.title}</div>
                                <div className={classes.info_details}>
                                    <div className={classes.info_text}>Рік:</div>
                                    <div className={classes.info_text}>{film.release_date}</div>
                                    <div className={classes.info_text}>Жанр:</div>
                                    <div className={classes.info_text}>{film.categories.map(val=>val.name).join(',')}</div>
                                    <div className={classes.info_text}>Країна:</div>
                                    <div className={classes.info_text}>{film.country}</div>
                                    <div className={classes.info_text}>Режисер:</div>
                                    <div className={classes.info_text}>{film.producer}</div>
                                    <div className={classes.info_text}>Актори:</div>
                                    <div className={classes.info_text}>{film.actors}</div>
                                </div>
                            </div>
                            <div className={classes.view_headActive}>
                                <button className={classes.view_headButton}>Додати до обраного</button>
                            </div>
                        </div>
                        <div className={classes.view_grade}>
                            <StarLine value={film.rating}/>
                        </div>
                    </div>
                    <div className={classes.view_body}>
                        <div className={classes.view_description}>{film.description}</div>
                        <div className={classes.view_videoLine}>
                            <div className={classes.view_videoBlock}>
                                {film.type=='serial'&&<div className={classes.view_serialMenu}>{createSerialMenu()}</div>}
                                {videoUrl ? (
                                    <video
                                        className={classes.view_video}
                                        src={videoUrl}
                                        width={250}
                                        height={150}
                                        controls
                                        poster={film.poster}
                                    />
                                    ) : (
                                    <img
                                        className={classes.view_video}
                                        src={videoDefault}
                                        width={250}
                                        height={150}
                                        alt="Видео недоступно"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={classes.reviews}><div className={classes.reviews_block}>
                        <form className={classes.reviewForm} onSubmit={(e)=>e.preventDefault()}>
                            <div className={classes.reviewForm_imgBlock}>
                                <img className={classes.reviewForm_img} src={user.avatar||defaultAvatar} alt="" />
                            </div>
                            <div className={classes.reviewForm_info}>
                                <div className={classes.reviewForm_head}>
                                    <div className={classes.reviewForm_name}>{user.name}</div>
                                    <select className={classes.reviewForm_select} value={myReviews.mark} disabled={myReviews.disabled||loaderUserReviews} onChange={(e)=>setMyReviews(val=>({...val,mark:e.target.value}))}>
                                        <option value={0} disabled>Вибери оцінку</option>
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <option key={i+1} value={i+1}>{i+1}</option>
                                        ))}
                                    </select>
                                </div>
                                <textarea className={classes.reviewForm_body} disabled={myReviews.disabled||loaderUserReviews} rows={3} value={myReviews.comment} onChange={(e)=>setMyReviews(val=>({...val,comment:e.target.value}))}></textarea>
                                <div className={classes.reviewForm_active}>
                                    {myReviews.disabled?<>
                                    <button className={classes.reviewForm_button} onClick={()=>setMyReviews(val=>({...val,disabled:false}))}>Змінити</button>
                                    <button className={classes.reviewForm_button} onClick={()=>fetchingDeleteReviews()}>Видалити</button>
                                    </>:<button className={classes.reviewForm_button} onClick={()=>addInUpdateReviews()}>Зберегти</button>}
                                </div>
                                {errorReviews&&<div className={classes.reviewForm_error}>{errorReviews}</div>}
                            </div>
                        </form>
                        {loaderReviewsList?<div className={classes.reviews_Loader}><Loader/></div>:<div className={classes.reviews_body}>
                            <div className={classes.reviews_board}>
                                {ReviewsList.map(val=> <div className={classes.reviewItem} key={val.id}>
                                    <div className={classes.reviewItem_imgBlock}><img className={classes.reviewItem_img} src={defaultAvatar} alt=""/></div>
                                    <div className={classes.reviewItem_info}>
                                        <div className={classes.reviewItem_head}>
                                            <div className={classes.reviewItem_name}>name</div>
                                            <div className={classes.reviewItem_star}><StarLine value={val.mark}/></div>
                                        </div>
                                        <div className={classes.reviewItem_body}>
                                            {val.comment}
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                            <div className={classes.reviews_pagination}>
                                {pagination.maxPage>1&&<Pagination maxPage={pagination.maxPage} page={pagination.page} setPage={(e)=>fetchingReviewsList(e)}/>}
                            </div>
                        </div>}
                    </div></div>
                </>}
            </div>
        </div>
    )
}

export default ViewPage