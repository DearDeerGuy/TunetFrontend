import React, { useEffect, useRef, useState } from 'react'
import classes from './AddChangeMovie.module.css'
import { Link, useNavigate, useParams } from 'react-router';
import useFetching from '../../hooks/useFetching';
import { getCategory } from '../../API/category';
import { addMovie, getMovieById, updateMovie } from '../../API/film';
import Loader from '../../components/UI/Loader/Loader';
import { useSelector } from 'react-redux';
import { activateImageULR, types } from '../../Utils/utils';

function AddChangeMovie() {
    const navigate = useNavigate();
    const user = useSelector(state => state.User);
    const {id} = useParams();
    const fileInputRef = useRef()
    const [categories, setCategories] = useState([])
    const [errorFields, setErrorFields] = useState({
        poster:'',
        title:'',
        description:'',
        release_date:'',
        type:'',
        actors:'',
        producer:'',
        country:'',
        category:'',
    });
    const [movie,setMovie] = useState({
        poster:'',
        posterFile:null,
        title:'',
        description:'',
        release_date:'',
        type:'',
        actors:'',
        producer:'',
        country:'',
        category:[],
    });
    const [fetchingCategory,loaderCategory,errorCategory] = useFetching( async() => {
        const res = await getCategory();
        setCategories(res);
    }, true)
    const [fetchingFilm,loaderFilm,errorFilm] = useFetching(async()=>{
        const res = await getMovieById(id);
        setMovie({
            poster:activateImageULR(res.poster),
            posterFile:null,
            title:res.title,
            description:res.description,
            release_date:res.release_date,
            type:res.type,
            actors:res.actors,
            producer:res.producer,
            country:res.country,
            category:res.categories.map(val => val.id),
        })
    },id!=undefined);
    const [fetchingLoad,loaderLoad,errorLoad] = useFetching(async()=>{
        if(id!=null&&id!=undefined){
            await updateMovie(id,movie,user.token)
        }else{
            await addMovie(movie,user.token);
        }
        navigate('/adminPanel');
    },false);
    
    const isValid = () => {
        let errorFront=0;
        if (movie.poster === '' && posterFile === null) { errorFront++; setErrorFields(v => ({ ...v, poster: "Ви повинні завантажити постер" })); }
        if (!movie.title || movie.title.trim() === '') { errorFront++; setErrorFields(v => ({ ...v, title: "Ви повинні ввести назву" })); }
        if (!movie.description || movie.description.trim() === '') { errorFront++; setErrorFields(v => ({ ...v, description: "Ви повинні ввести опис" })); }
        if (!movie.release_date || movie.release_date.trim() === '') { errorFront++; setErrorFields(v => ({ ...v, release_date: "Ви повинні вибрати дату релізу" })); }
        if (!movie.type || movie.type.trim() === '') { errorFront++; setErrorFields(v => ({ ...v, type: "Ви повинні вибрати тип" })); }
        if (!movie.actors || movie.actors.trim() === '') { errorFront++; setErrorFields(v => ({ ...v, actors: "Ви повинні вказати акторів" })); }
        if (!movie.producer || movie.producer.trim() === '') { errorFront++; setErrorFields(v => ({ ...v, producer: "Ви повинні вказати режисера" })); }
        if (!movie.country || movie.country.trim() === '') { errorFront++; setErrorFields(v => ({ ...v, country: "Ви повинні вказати країну" })); }
        if (!movie.category || movie.category.length === 0) { errorFront++; setErrorFields(v => ({ ...v, category: "Ви повинні вибрати хоча б одну категорію" })); }
        if(errorFront==0){
            fetchingLoad();
        }         
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            alert("Дозволені тільки JPG, JPEG та PNG");
            return;
        }
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
            alert("Максимальний розмір файлу — 2MB");
            return;
        }
        const imageUrl = URL.createObjectURL(file);
        setMovie((val) => ({ ...val, poster: imageUrl,posterFile: file}));
    };

    useEffect(()=>{
        fetchingCategory();
    },[])
    useEffect(()=>{
        if(id!=undefined){
            fetchingFilm();
        }
    },[id])

    useEffect(()=>{
        setErrorFields({
            title: errorLoad?.title?.[0] || '',
            description: errorLoad?.description?.[0] || '',
            release_date: errorLoad?.release_date?.[0] || '',
            type: errorLoad?.type?.[0] || '',
            actors: errorLoad?.actors?.[0] || '',
            producer: errorLoad?.producer?.[0] || '',
            country: errorLoad?.country?.[0] || '',
            poster: errorLoad?.poster?.[0] || '',
            category: errorLoad?.category?.[0] || ''
        });
    },[errorLoad])

    return (
        <div className={classes.AddChangeMovie}>
            <form className={classes.AddChangeMovie_form} onSubmit={(e)=>e.preventDefault()}>
                <h1 className={classes.AddChangeMovie_title}>{id!=undefined?'Змінити':'Створити'}</h1>
                {loaderFilm&&<div className={classes.AddChangeMovie_loader}><Loader/></div>}
                <div className={classes.formGroupImg} onClick={()=>{fileInputRef.current.click()}}>
                    <div className={classes.formGroup_blockImg}>
                        {movie.poster?
                            <img className={classes.formGroup_img} src={movie.poster} alt="avatar"/>
                            :<div className={classes.formGroup_imgSVG}>
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <g data-name="Layer 37" id="Layer_37">
                                        <path fill="#000" d="M24,27H2a1,1,0,0,1-1-1V2A1,1,0,0,1,2,1H24a1,1,0,0,1,1,1V26A1,1,0,0,1,24,27ZM3,25H23V3H3Z"/>
                                        <path fill="#000" d="M30,31H8a1,1,0,0,1,0-2H29V7H28a1,1,0,0,1,0-2h2a1,1,0,0,1,1,1V30A1,1,0,0,1,30,31Z"/>
                                        <path fill="#000" d="M2,21.86a1,1,0,0,1-.7-.29,1,1,0,0,1,0-1.41L5.35,16a2.67,2.67,0,0,1,3.48-.29l3.59,2.6a.68.68,0,0,0,.88-.08L17,14.51a2.75,2.75,0,0,1,3.82,0l3.88,3.93a1,1,0,0,1-1.42,1.4l-3.88-3.93a.69.69,0,0,0-1,0l-3.71,3.75a2.68,2.68,0,0,1-3.48.3l-3.59-2.6a.67.67,0,0,0-.88.07L2.71,21.56A1,1,0,0,1,2,21.86Z"/>
                                        <path fill="#000" d="M13.85,12.86a4,4,0,1,1,4-4A4,4,0,0,1,13.85,12.86Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,13.85,6.86Z"/>
                                    </g>
                                </svg>
                            </div>
                        }
                    </div>
                    <input className={classes.formGroup_inputFile} type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange}/>
                    {errorFields.poster && <p className={classes.formGroup_error}>{errorFields.poster}</p>}
                </div>
                <div className={classes.formGroup}>
                    <label className={classes.formGroup_label} htmlFor="title" >Введи назву:</label>
                    <input className={classes.formGroup_input} type="text" id='title' value={movie.title} onChange={e=>{setMovie(movie=>({...movie,title:e.target.value}));setErrorFields(val=>({...val,title:''}))}}/>
                    {errorFields.title && <p className={classes.formGroup_error}>{errorFields.title}</p>}
                </div>
                <div className={classes.formGroup}>
                    <label className={classes.formGroup_label} htmlFor="description" >Введи опис:</label>
                    <textarea className={classes.formGroup_textarea} rows={3} type="text" id='description' value={movie.description} onChange={e=>{setMovie(movie=>({...movie,description:e.target.value}));setErrorFields(val=>({...val,description:''}))}}/>
                    {errorFields.description && <p className={classes.formGroup_error}>{errorFields.description}</p>}
                </div>
                <div className={classes.formGroup}>
                    <label className={classes.formGroup_label} htmlFor="releaseDate" >Введи дату виходу:</label>
                    <input className={classes.formGroup_input} type="date" id='releaseDate' value={movie.release_date} onChange={e=>{setMovie(movie=>({...movie,release_date:e.target.value}));setErrorFields(val=>({...val,release_date:''}))}}/>
                    {errorFields.release_date && <p className={classes.formGroup_error}>{errorFields.release_date}</p>}
                </div>
                {(id==undefined)&&<div className={classes.formGroup}>
                    <label className={classes.formGroup_label} htmlFor="type" >Вибери тип:</label>
                    <select className={classes.formGroup_select} id="type" value={movie.type} onChange={e=>{setMovie(movie=>({...movie,type:e.target.value}));setErrorFields(val=>({...val,type:''}))}}>
                        <option value="" disabled>Вибери тип</option>
                        {types.map((val)=><option className={classes.formGroup_option} key={val.id} value={val.type}>{val.name}</option>)}
                    </select>
                    {errorFields.type && <p className={classes.formGroup_error}>{errorFields.type}</p>}
                </div>}
                <div className={classes.formGroup}>
                    <label className={classes.formGroup_label} htmlFor="actors" >Введи акторів:</label>
                    <input className={classes.formGroup_input} type="text" id='actors' value={movie.actors} onChange={e=>{setMovie(movie=>({...movie,actors:e.target.value}));setErrorFields(val=>({...val,actors:''}))}}/>
                    {errorFields.actors && <p className={classes.formGroup_error}>{errorFields.actors}</p>}
                </div>
                <div className={classes.formGroup}>
                    <label className={classes.formGroup_label} htmlFor="producer" >Введи продюсера:</label>
                    <input className={classes.formGroup_input} type="text" id='producer' value={movie.producer} onChange={e=>{setMovie(movie=>({...movie,producer:e.target.value}));setErrorFields(val=>({...val,producer:''}))}}/>
                    {errorFields.producer && <p className={classes.formGroup_error}>{errorFields.producer}</p>}
                </div>
                <div className={classes.formGroup}>
                    <label className={classes.formGroup_label} htmlFor="country" >Введи країну:</label>
                    <input className={classes.formGroup_input} type="text" id='country' value={movie.country} onChange={e=>{setMovie(movie=>({...movie,country:e.target.value}));setErrorFields(val=>({...val,country:''}))}}/>
                    {errorFields.country && <p className={classes.formGroup_error}>{errorFields.country}</p>}
                </div>
                <div className={classes.formGroup}>
                    <label className={classes.formGroup_label} htmlFor="category" >Вибери категорії:</label>
                    <select className={classes.formGroup_select} id="category" value={''} disabled={loaderCategory} onChange={e=>{setMovie(movie=>({...movie,category:[...new Set([...movie.category, +e.target.value])]}));setErrorFields(val=>({...val,category:''}))}}>
                        <option value="" disabled>Вибери категорії</option>
                        {categories.map((val)=><option className={classes.formGroup_option} key={val.id} value={val.id}>{val.name}</option>)}
                    </select>
                    {!!movie.category.length&&<div className={classes.categoryBoard}>
                        {movie.category.map(val=><div key={val} className={classes.categoryBoard_item}>
                                <div className={classes.categoryBoard_title}>{categories.find(cat=>cat.id==val)?.name}</div>
                                <button className={classes.categoryBoard_button} onClick={()=>setMovie(movie=>({...movie,category:movie.category.filter(fil=>fil!=val)}))}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 753.23 753.23">
                                        <path fill="#000" d="M635.538,94.154h-141.23V47.077C494.308,21.067,473.24,0,447.23,0H306c-26.01,0-47.077,21.067-47.077,47.077v47.077
                                            h-141.23c-26.01,0-47.077,21.067-47.077,47.077v47.077c0,25.986,21.067,47.053,47.03,47.077h517.917
                                            c25.986-0.024,47.054-21.091,47.054-47.077V141.23C682.615,115.221,661.548,94.154,635.538,94.154z
                                            M447.23,94.154H306V70.615c0-12.993,10.545-23.539,23.538-23.539h94.154c12.993,0,23.538,10.545,23.538,23.539V94.154z
                                            M117.692,659.077c0,51.996,42.157,94.153,94.154,94.153h329.539c51.996,0,94.153-42.157,94.153-94.153V282.461H117.692V659.077z
                                            M470.77,353.077c0-12.993,10.545-23.539,23.538-23.539s23.538,10.545,23.538,23.539v282.461
                                            c0,12.993-10.545,23.539-23.538,23.539s-23.538-10.546-23.538-23.539V353.077z
                                            M353.077,353.077c0-12.993,10.545-23.539,23.538-23.539s23.538,10.545,23.538,23.539v282.461
                                            c0,12.993-10.545,23.539-23.538,23.539s-23.539-10.546-23.539-23.539V353.077z
                                            M235.384,353.077c0-12.993,10.545-23.539,23.539-23.539s23.539,10.545,23.539,23.539v282.461
                                            c0,12.993-10.545,23.539-23.539,23.539s-23.539-10.546-23.539-23.539V353.077z"/>
                                    </svg>
                                </button>
                            </div>)}
                    </div>
                    }
                    {errorFields.type && <p className={classes.formGroup_error}>{errorFields.type}</p>}
                </div>
                {loaderLoad&& <div className={classes.AddChangeMovie_loader}><Loader/></div>}
                <div className={classes.formGroupActive}>
                    <button className={classes.formGroupActive_button} onClick={isValid}>{id!=undefined?'Змінити':'Створити'}</button>
                    <Link className={classes.formGroupActive_button} to='/adminPanel'>Назад</Link>
                </div>
            </form>
        </div>
    )
}

export default AddChangeMovie