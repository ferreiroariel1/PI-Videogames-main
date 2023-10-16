import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGenres, postNewGame } from '../../redux/actions/actionCreators';
import { useNavigate } from 'react-router-dom';
import style from './CreateGame.module.css';

const CreateGame = () => {

    /* ------------ESTADOS Y USEEFFECT----------------- */
    const [ form, setForm ] = useState({
        name: '',
        background_image: '',
        description:'',
        platforms: [],
        released: '',
        rating: 0,
        genres: []
    });

    const [errors, setErrors] = useState({
        name: '',
        background_image: '',
        description:'',
        platforms: '',
        released: '',
        rating: '',
        genres: ''
    })

    let platforms = ["PS4", "PS5", "PC", "SEGA", "NINTENDO 64", "NINTENDO SWITCH", "ATARI", "XBOX ONE", "XBOX X", "GAME BOY ADVANCED"];
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector((state) => state.genres);

  

    useEffect(() => {
        if (!genres.length) {
            dispatch(getAllGenres());
        }
    },[dispatch, genres]);
    



    /* -----------------HANDLERS---------------- */
    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value });
        
        if(!errors.length){
           return setErrors({[property]:''}); 
        }
        
        
    };

//VALIDACION
    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.name.trim() === '' || form.name > 10) {
            return setErrors({...errors, name: 'por favor completar este campo'});    
        } else if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif)/g.test(form.background_image)) {
            return setErrors({ ...errors,  background_image:'Por favor ponga una URL válida para una imagen' });
        } else if (form.description.trim() === '') {
            return setErrors({ ...errors,  description:'Por favor ingresa una descripción' });
        } else if (form.released === '') {
            return setErrors({ ...errors,  released: 'Por favor ingresa una fecha de lanzamiento' });
        } else if (form.rating === 0 ) {
            return setErrors({ ...errors,  rating:'Por favor pon una calificación' });
        } else if (form.rating > 5 ) {
            return setErrors({ ...errors,   rating:'Please put a rating bethween 1 and 5' });
        } else if(form.platforms.length === 0 || form.platforms.length > 5 ){
            return setErrors({ ...errors, platforms:'Por favor coloque las plataformas, limite entre 1 y 5.'});
        } else if(form.genres.length === 0 || form.genres.length > 4 ){
            return setErrors({ ...errors,  genres:'Por favor ponga un género, limite entre 1 y 5'});
        } else {
            dispatch(postNewGame(form));
            navigate('/home');

        }
    };
    
    const handleReset = (event) => {
    event.preventDefault();
    setForm({
        name: '',
        background_image: '',
        description: '',
        platforms: [],
        released: '',
        rating: 0,
        genres: []
    });

    // Desmarcar las casillas de verificación de plataformas
    const platformCheckboxes = document.querySelectorAll('input[name="platforms"]');
    platformCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    // Desmarcar las casillas de verificación de géneros
    const genreCheckboxes = document.querySelectorAll('input[name="genres"]');
    genreCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });
};

    
const handleClickG = (event) => {
    if (event.target.checked) {
        setForm({ ...form, genres: [...form.genres, event.target.value] });
    } else {
        setForm({ ...form, genres: form.genres.filter((gen) => gen.name !== event.target.value)});
    }   
};


    
    const handleClickP = (event) => {
        if (event.target.checked) {
            setForm({ ...form, platforms: [...form.platforms, event.target.value] });
        } 
         else{
            setForm({ ...form, platforms: form.platforms.filter((platform) => platform !== event.target.value) });
        }   
    };
    

  return (
    
    <form onSubmit={(event) => handleSubmit(event)} onReset={(event) => handleReset(event)} className={style.form}>
        <fieldset className={style.fieldset}>
            <legend className={style.legend}>new Game</legend>

            <div className={style.container}>
              <input placeholder='name' type="text" id='name' value={form.name} name='name' onChange={(event) => handleChange(event)} className={style.inputtext}/>
              <label htmlFor="name" className={style.labeltext}>Name: </label>
              <p className={style.error}>{errors.name}</p>
            </div>

            <div className={style.container}>
              <input placeholder='image' type="text" id='image' value={form.background_image} name='background_image' onChange={(event) => handleChange(event)} className={style.inputtext}/>
              <label htmlFor="image" className={style.labeltext}>Image: </label>
              <p className={style.error}>{ errors.background_image}</p>
            </div>

            <div className={style.textareaContainer}>
               <label  htmlFor="description" className={style.label}>Description: </label>
               <textarea placeholder='description...' id="description" cols="30" rows="10" value={form.description} name='description' onChange={(event) => handleChange(event)} className={style.textarea}/>
               <p className={style.error}>{errors.description}</p>
            </div>

            <div>
                <label htmlFor="platforms" className={style.labelCb}>Platforms: </label>
                {
                    platforms?.sort().map((platform) => {
                        return(
                            <div id="platforms" className={style.checkBox}>
                                <input type="checkbox" value={platform} name='platforms' onClick={(event) => handleClickP(event)} className={style.input}/>
                                <label htmlFor="platform" className={style.labelsPyG}>{platform}</label>
                            </div>
                        );
                    })
                }
                <p className={style.error}>{errors.platforms}</p>
            </div>

            <div>
                <label htmlFor="released" className={style.label}>Released: </label>
                  <input type="date" id="released" value={form.released} name='released' onChange={(event) => handleChange(event)} className={style.input}/>
                   <p className={style.error}>{ errors.released}</p>
            </div>

            <div>
               <label htmlFor="rating" className={style.labelCb}>Rating: </label>
                 <input type="number" id="rating" value={form.rating} name='rating' onChange={(event) => handleChange(event)} min='0' step='0.5' className={style.input}/>
                 <p className={style.error}>{errors.rating}</p>
            </div>

            <div>
            <label htmlFor="genres" className={style.labelCb}>Genres: </label>
                {   genres.sort((a,b) => (a.name > b.name ? 1 : -1)).length ?
                    genres.map((genre) => {
                        return(
                            <div className={style.checkBox} >
                                <label htmlFor={genre.name} key={genre.id} className={style.labelsPyG}>{genre.name}</label>
                                <input type="checkbox" id={genre.name} value={genre.name} onClick={(event) => handleClickG(event)}  className={style.input}/>
                                
                            </div>
                        );
                    }) : <div className={style.hypnotic}></div>
                }
                <p className={style.error}>{errors.genres}</p>
            </div>
            <input disabled={!form.name || !form.background_image || !form.description || !form.released || !form.rating || !form.platforms || !form.genres || errors.name || errors.background_image || errors.description|| errors.released || errors.rating || errors.platforms || errors.genres } type="submit" value="Create Game" className={style.buttons} />
        <input type="reset" value="Reset Form" className={style.buttons} />
            
        </fieldset>
        
    </form>
  );
};

export default CreateGame;