import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createLogEntry } from './API.js';

const LogEntryForm = ({location,onClose}) => {

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const { register,handleSubmit } = useForm();

    const onSubmit = async (register) => {
        try {
            setLoading(true);
            register.latitude = location.latitude;
            register.longitude = location.longitude;
            await createLogEntry(register);
            setLoading(false);
            onClose();
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return(
        <form className='entry-form' onSubmit={handleSubmit(onSubmit)}>
            { error ? <h3 className='error'>{error}</h3> : null}
            <label htmlFor="ApiKey">API_KEY</label>
            <input type='password' name='ApiKey' required ref={register}/>
            <label htmlFor="title">Title</label>
            <input type='text' name='title' required ref={register}/>
            <label htmlFor="comments">Comments</label>
            <textarea type='text' name='comments' rows={3} ref={register}/>
            <label htmlFor="description">Description</label>
            <textarea type='text' name='description' rows={3} ref={register}/>
            <label htmlFor="image">Image</label>
            <input name='image' ref={register}/>
            <label htmlFor="visit_Date">Visit date</label>
            <input type='date' name='visit_Date' ref={register}/>
            <button disabled={loading}>{loading ? 'Loading':'Create entry'}</button>
        </form>
    );
};

export default LogEntryForm;