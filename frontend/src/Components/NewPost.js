import React from 'react'
import { useForm } from 'react-hook-form'
import "../css/newpost.css"

const NewPost = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {

    }

    return (
        <div className='new-post-container'>
            <form className='new-post-form' onSubmit={handleSubmit(onSubmit)}>

                <div className='new-post-input-wrapper'>
                    <span className='new-post-input-label'>
                        Title
                    </span>
                    <input
                        {...register("Roasted Salmon", {
                            required: true,
                            maxLength: 30,
                        })}
                        className='new-post-input'
                        type="text"
                        id="title"
                        placeholder="Title"
                    />
                </div>

                <div className='new-post-input-wrapper'>
                    <span className='new-post-input-label'>
                        Description
                    </span>
                    <input
                        {...register("description", {
                            required: true,
                            maxLength: 30,
                        })}
                        className='new-post-input'
                        type="text"
                        id="description"
                        placeholder="A sweet salmon with a hint of lemon"
                    />
                </div>

                <div className='new-post-input-wrapper'>
                    <span className='new-post-input-label'>
                        Recipe Image
                    </span>
                    <input
                        {...register("image", {
                            required: true,
                        })}
                        className=''
                        type="file"
                        id="image"
                        placeholder="image"
                    />
                </div>

                <div className='new-post-input-wrapper'>
                    <span className='new-post-input-label'>
                        Ingredients
                    </span>
                    <div className='new-post-input-ingredients'>
                        <div className='new-post-ingredients-delete'>X</div>
                        <div className='new-post-ingredients-amount'>1</div>
                        <div className='new-post-ingredients-name'>avocado</div>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default NewPost