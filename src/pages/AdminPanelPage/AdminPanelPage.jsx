import React, { useEffect, useState } from 'react'
import classes from './AdminPanelPage.module.css'
import { useNavigate } from 'react-router';
import useFetching from '../../hooks/useFetching';
import { deleteMovie, getMovieList } from '../../API/film';
import Loader from '../../components/UI/Loader/Loader';
import { activateImageULR, testSleep } from '../../Utils/utils';
import { useSelector } from 'react-redux';
import { addFail, deleteFail, getFileById, updateFail } from '../../API/fails';
import FilmItem from '../../components/UI/FilmItem/FilmItem';

function AdminPanelPage() {
    const initialFail = {film:{link:null,id:null},serial:[]}
    const initialSelect = {season_number:0,episode_number:0}
    const navigate = useNavigate();
    const user = useSelector(state => state.User)
    const [search, setSearch] = useState('');
    const [failFilm, setFailFilm] = useState(initialFail);
    const [selectFilm, setSelectFilm]=useState(null);
    const [filmList, setFilmList] = useState([]);
    const [selected, setSelected] = useState(initialSelect)
    const [serialItem,setSerialItem] = useState({link:null,id:null});
    const [fetchingMovie,loaderMovie,errorMovie] = useFetching(async()=>{
        const res = await getMovieList({per_page:5,page:1,search:search});
        setFilmList(res.data)
    },true)
    const [fetchingMovieDelete,loaderMovieDelete,errorMovieDelete] = useFetching(async()=>{
        await deleteMovie(selectFilm.id,user.token)
        fetchingMovie();
    },false)
    const [fetchingFailFilm,loaderFailFilm,errorFailFilm] = useFetching(async () => {
        const res = await getFileById(selectFilm.id,user.token);
        if(selectFilm.type=='film'){
            setFailFilm(val=>({...val,film:{...val.film,link:res.link,id:res.id}}))
        }else{
            setFailFilm(val=>({...val,serial:res}))
            setSelected(initialSelect);
        }
    },false)
    const [fetchingPushFile,loaderPushFile,errorPushFile] = useFetching(async ({file,id}) => {
        if(selectFilm.type=='film'){
            if(id){
                await updateFail({file,id},user.token);
            }else{
                await addFail(selectFilm.id,{file},user.token);
            }
        }else{
            const serialPack = getSerialPack(selected.season_number,selected.episode_number,file);
            if(serialPack.season_number>0&&serialPack.episode_number>0){
                if(id){
                    await updateFail({...serialPack,id:id},user.token);
                }else{
                    await addFail(selectFilm.id,serialPack,user.token);
                }
            }
        }
        fetchingFailFilm();
    },false)
    const [fetchingDeleteFile,loaderDeleteFile,errorDeleteFile] = useFetching(async ({id}) => {
        if(id){
            await deleteFail(id,user.token)
            fetchingFailFilm();
        }
    },false)

    function getSerialPack(season_number,episode_number,file=null){
        const serial = failFilm.serial;
        season_number=Number.parseInt(season_number);
        episode_number=Number.parseInt(episode_number);
        if (season_number === -1) {
            if (serial.length > 0) {
                const lastSeason = Math.max(...serial.map(s => s.season_number));
                season_number = lastSeason + 1;
            } else {
                season_number = 1;
            }
        }
        if (episode_number === -1) {
            const episodesInSeason = serial.filter(s => s.season_number === season_number);
            if (episodesInSeason.length > 0) {
                const lastEpisode = Math.max(...episodesInSeason.map(e => e.episode_number));
                episode_number = lastEpisode + 1;
            } else {
                episode_number = 1;
            }
        }
        const found = serial.find(
            s => s.season_number === season_number && s.episode_number === episode_number
        );
        return {
            season_number,
            episode_number,
            link: found ? found.link : '',
            file
        };
    }
    function handleVideo(event,id) {
        const file = event.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("video/")) {
            alert("Можно загружать только видеофайлы!");
            event.target.value = "";
            return;
        }
        const maxSize = 5 * 1024 * 1024 * 1024;
        if (file.size > maxSize) {
            alert("Файл слишком большой! Максимум 5 ГБ.");
            event.target.value = "";
            return;
        }
        fetchingPushFile({file,id})
    }
    function searchMovie() {
        setSelectFilm(null);
        fetchingMovie();
    }

    useEffect(()=>{
        fetchingMovie();
    },[])
    useEffect(()=>{
        if(selectFilm!=null){
            fetchingFailFilm();
        }
    },[selectFilm])
    useEffect(()=>{
        let filmItem = failFilm.serial.find(val=>(val.season_number==selected.season_number&&val.episode_number==selected.episode_number));
        setSerialItem({link:filmItem?.link,id:filmItem?.id})
    },[selected])

    return (
        <div className={classes.adminPanel}>
            <form className={classes.adminPanel_form} onSubmit={(e)=>e.preventDefault()}>
                <div className={classes.adminPanel_action}>
                    <h1 className={classes.adminPanel_actionTitle}>Admin Panel</h1>
                    <button className={classes.adminPanel_actionButton} onClick={()=>navigate('/addMovie')}>Створити</button>
                    <button className={classes.adminPanel_actionButton} disabled={!selectFilm} onClick={()=>navigate(`/changeMovie/${selectFilm.id}`)}>Змінити</button>
                    <button className={classes.adminPanel_actionButton} disabled={!selectFilm||loaderMovieDelete} onClick={fetchingMovieDelete}>Видалити</button>
                </div>
                <div className={classes.adminPanel_body}>
                    <div className={classes.adminPanel_search}>
                        <input className={classes.adminPanel_searchInput} type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
                        <button className={classes.adminPanel_searchButton} onClick={searchMovie}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30">
                                <path fill="#000" d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/>
                            </svg>
                        </button>
                    </div>
                    <div className={classes.adminPanel_films}>
                        {loaderMovie?
                            <div className={classes.adminPanel_filmsLoader}><Loader/></div>:(
                            filmList.length>0?filmList.map(val=><FilmItem key={val.id} info={{poster:activateImageULR(val.poster),title:val.title}} newClassName={[selectFilm!=null&&selectFilm.id===val.id?classes.filmItemActive:'']} onClickFunction={()=>{setSelectFilm(sel=>sel?.id===val.id?null:val)}} />)
                            :<div className={classes.adminPanel_filmsMessage}>Фільми не знайдено</div>
                        )}
                    </div>
                    <div className={classes.adminPanel_controller}>
                        {selectFilm!==null&&(loaderFailFilm?<div className={classes.adminController_loader}><Loader/></div>:(selectFilm.type=='film'? <div className={classes.adminController}>
                            <div className={classes.adminController_body}>
                                <div className={classes.adminController_info}>{failFilm.film?.link?`Файл: ${failFilm.film.link}`:'Файл не завантажений'}</div>
                                {loaderPushFile&&<div className={classes.adminController_loader}><Loader/></div>}
                                <div className={classes.adminController_action}>
                                    {failFilm.film?.link?<>
                                        <label className={[classes.adminController_button,loaderPushFile || loaderDeleteFile ? classes.disabled : ''].join(' ')} htmlFor="updateFilm">Оновити файл<input style={{display:'none'}} type="file" accept="video/*" id='updateFilm' disabled={(loaderPushFile||loaderDeleteFile)} onChange={(e)=>handleVideo(e,failFilm.film?.id)}/></label>
                                        <button className={[classes.adminController_button,loaderPushFile || loaderDeleteFile ? classes.disabled : ''].join(' ')} disabled={(loaderPushFile||loaderDeleteFile)} onClick={()=>fetchingDeleteFile({id:failFilm.film?.id})}>Видалити файл</button>
                                    </>
                                    :<label className={[classes.adminController_button,loaderPushFile || loaderDeleteFile ? classes.disabled : ''].join(' ')} htmlFor="addFilm">Додати файл<input style={{display:'none'}} type="file" accept="video/*" id='addFilm' disabled={(loaderPushFile||loaderDeleteFile)} onChange={(e)=>handleVideo(e,failFilm.film?.id)}/></label>}
                                </div>
                            </div>
                        </div>:<div className={classes.adminController}>
                            <div className={classes.adminController_head}>
                                <select className={classes.adminController_select} id="seasonNumber" value={selected.season_number?selected.season_number:0} onChange={e=>{e.target.value==-1?setSelected(val=>({...val,season_number:e.target.value,episode_number:-1})):setSelected(val=>({...val,season_number:e.target.value,episode_number:0}))}}>
                                    <option value={0} disabled>Вибери сезон</option>
                                    {(() => {
                                        const seasons = failFilm.serial.map(val => val.season_number);
                                        const maxSeason = seasons.length > 0 ? Math.max(...seasons) : 0;
                                        const range = Array.from({ length: maxSeason }, (_, i) => i + 1);
                                        return range.map(val => (
                                        <option value={val} key={val}>
                                            {val}
                                        </option>
                                        ));
                                    })()}
                                    <option value={-1}>Новый сезон</option>
                                </select>
                                <select className={classes.adminController_select} id="episodeNumber" disabled={!selected.season_number} value={selected.episode_number?selected.episode_number:0} onChange={e=>setSelected(val=>({...val,episode_number:e.target.value}))}>
                                    <option value={0} disabled>Вибери серію</option>
                                    {(() => {
                                        const episodes = failFilm.serial
                                            .filter(val => val.season_number == selected.season_number)
                                            .map(val => val.episode_number);
                                        const maxEpisode = episodes.length > 0 ? Math.max(...episodes) : 0;
                                        const range = Array.from({ length: maxEpisode }, (_, i) => i + 1);
                                        return range.map(val => (
                                            <option value={val} key={val}>
                                            {val}
                                            </option>
                                        ));
                                    })()}
                                    <option value={-1}>Нова серія</option>
                                </select>
                            </div>
                            {(selected.season_number!=0&&selected.episode_number!=0)&&<div className={classes.adminController_body}>
                                    <div className={classes.adminController_info}>{serialItem.link?`Файл: ${serialItem.link}`:'Файл не завантажений'}</div>
                                    {loaderPushFile&&<div className={classes.adminController_loader}><Loader/></div>}
                                    <div className={classes.adminController_action}>
                                        {serialItem.link?<>
                                            <label className={[classes.adminController_button,loaderPushFile || loaderDeleteFile ? classes.disabled : ''].join(' ')} htmlFor="updateSerial">Оновити файл<input style={{display:'none'}} type="file" accept="video/*" id='updateSerial' disabled={(loaderPushFile||loaderDeleteFile)} onChange={(e)=>handleVideo(e,serialItem.id)}/></label>
                                            <button className={[classes.adminController_button,loaderPushFile || loaderDeleteFile ? classes.disabled : ''].join(' ')} disabled={(loaderPushFile||loaderDeleteFile)} onClick={()=>fetchingDeleteFile({id:serialItem.id})}>Видалити файл</button>
                                        </>
                                        :<label className={[classes.adminController_button,loaderPushFile || loaderDeleteFile ? classes.disabled : ''].join(' ')} htmlFor="addSerial">Додати файл<input style={{display:'none'}} type="file" accept="video/*" id='addSerial' disabled={(loaderPushFile||loaderDeleteFile)} onChange={(e)=>handleVideo(e,serialItem.id)}/></label>}
                                    </div>
                                </div>
                            }
                        </div>
                        ))}
                        {selectFilm!==null&&<div className={classes.adminPanel_filmInfo}>
                            <div className={classes.adminPanel_filmInfoText}>Назва: {selectFilm.title}</div>
                            <div className={classes.adminPanel_filmInfoText}>Опис: {selectFilm.description}</div>
                            <div className={classes.adminPanel_filmInfoText}>Дата виходу: {new Date(selectFilm.release_date).toLocaleDateString()}</div>
                            <div className={classes.adminPanel_filmInfoText}>Тип: {selectFilm.type}</div>
                            <div className={classes.adminPanel_filmInfoText}>Актори: {selectFilm.actors}</div>
                            <div className={classes.adminPanel_filmInfoText}>Продюсер: {selectFilm.producer}</div>
                            <div className={classes.adminPanel_filmInfoText}>Краина: {selectFilm.country}</div>
                            <div className={classes.adminPanel_filmInfoText}>Категорії: {selectFilm.categories.map(val=>val.name).join(', ')}</div>
                        </div>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AdminPanelPage