import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { axiosCall } from '../utils/axiosCall'
import Popup from './Popup'

const initialMovie = {
    director: '',
    id: '',
    metascore: '',
    stars: [],
    title: ''
}

const UpdateMovie = props => {

const [showPopUp, setShowPopUp] = useState(false)
const [movie, setMovie] = useState(initialMovie)
const { push } = useHistory()
const { id } = useParams()

useEffect(() => {
    axiosCall()
        .get(`/api/movies/${id}`)
        .then(res => {
            console.log(res.data)
            setMovie(res.data)
        })
        .catch(err => console.log('ERROR:', err))
}, [id])

const changeHandler = e => {
    e.persist()

    setMovie({
        ...movie,
        [e.target.name]: e.target.value
    })
}

const handleSubmit = e => {
    e.preventDefault()
    axiosCall()
        .put(`/api/movies/${id}`, movie)
        .then(res => {
            props.setMovieList(res.data)
            push(`/movies/${id}`)
        })
        .catch(err => console.log('ERROR: ', err))
}

const deleteItem = () => {
setShowPopUp(true)
deleteCall()
}

const closePopup = () => {
    setShowPopUp(false)
}

const deleteCall = () => {
    axiosCall()
    .delete('')
    .then(res => {
        //props.setItem()
    })
    .catch(err => console.log(err))
}


    return (

        <div className="movieUpdate">
        <h3>See an error? Fix it!</h3>
        <form className="form" onSubmit={handleSubmit}>
        <h3>Edit Entries</h3>
        <label>Title:</label>
        <input
        type='text'
        name='title'
        id='title'
        value={movie.title}
        onChange={changeHandler}
        />
        <br />
        <label>Director:</label>
        <input
        type='text'
        name='director'
        id='director'
        value={movie.director}
        onChange={changeHandler}
        />
        <br />
        <label>Metascore:</label>
        <input
        type='number'
        name='score'
        id='score'
        value={movie.metascore}
        onChange={changeHandler}
        />
        <br />
        <label>Starring:</label>
        <input
        type='text'
        name='actor'
        id='actor'
        value={movie.stars}
        onChange={changeHandler}
        />
        <br/>
        <button className="update-button" type="submit">Save Changes</button>
        <button className="delete-button">Delete</button>

{ showPopUp &&
        <Popup onYes={deleteItem} onNo={closePopup}/>
}
        </form>
        </div>
    )
}

export default UpdateMovie