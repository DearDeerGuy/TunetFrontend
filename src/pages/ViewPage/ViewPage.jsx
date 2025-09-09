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

function ViewPage() {
    const firstRender = useRef(true);
    const {id} = useParams();
    const user = useSelector(state => state.User);
    const [videoUrl, setVideoUrl] = useState(null);
    const [seriesSelection,setSeriesSelection] = useState({season_number:1,episode_number:1,active_season:1})
    const [film,setFilm] = useState({})
    const [fetchingInfo,loaderInfo,errorInfo] = useFetching(async()=>{
        const newFilm = await getMovieById(id);
        newFilm.fails = await getFileById(id,user.token);
        newFilm.poster = activateImageULR(newFilm.poster);
        setFilm(newFilm);
        fetchingStream({type:newFilm.type,fails:newFilm.fails})
    },true);
    const [fetchingStream,loaderStream,errorStream] = useFetching(async({type,fails})=>{
        console.log(1,type,fails)
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

    useEffect(() => {
        fetchingInfo();
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
                            10/10
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
                    {/* <div>
                        <form onSubmit={(e)=>e.preventDefault()}></form>
                        <div></div>
                    </div> */}
                </>}
            </div>
        </div>
    )
}

export default ViewPage