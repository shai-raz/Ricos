import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../css/newpost.css"
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { POST_RECIPE_API_URL } from '../consts'
import axios from 'axios'
import { Buffer } from 'buffer'


const NewPost = () => {
    const jwt = localStorage.getItem('jwt')
    const units = ["kg", "g", "l", "ml", "tsp", "tbsp", "cup", "piece"]

    const [ingredients, setIngredients] = useState([{
        amount: "",
        unit: units[0],
        ingredient: ""
    }])

    const [steps, setSteps] = useState([""])

    const {
        register,
        handleSubmit,
        //watch,
    } = useForm()

    /* handle changed on ingredients list,
        and apply changes to state */
    const handleIngredientsChange = (e, index) => {
        const { name, value } = e.target

        const newIngredients = [...ingredients]
        newIngredients[index][name] = value

        setIngredients(newIngredients)
    }

    /* handle changed on steps list,
        and apply changes to state */
    const handleStepsChange = (e, index) => {
        const value = e.target.value

        const newSteps = [...steps]
        newSteps[index] = value

        setSteps(newSteps)
    }

    /* add a new ingredient to the ingredients list */
    const addIngredient = () => {
        setIngredients([...ingredients,
        {
            amount: "",
            unit: units[0],
            ingredient: ""
        }])
    }

    /* remove an ingredient from the ingredients list */
    const removeIngredient = (index) => {
        if (ingredients.length === 1)
            return

        const newIngredients = [...ingredients]
        newIngredients.splice(index, 1)
        setIngredients(newIngredients)
    }

    const addStep = () => {
        setSteps([...steps, ""])
    }

    const removeStep = (index) => {
        if (steps.length === 1)
            return

        const newSteps = [...steps]
        newSteps.splice(index, 1)
        console.table(newSteps)
        setSteps(newSteps)
    }

    const postRecipe = (data) => {
        axios
            .post(POST_RECIPE_API_URL, data,
                {
                    headers: {
                        "Authorization": "Bearer " + jwt
                    }
                })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err.response.status)
                console.error(err.response.data)
            })
    }

    const onSubmit = (data) => {
        let recipe = data
        recipe["ingredients"] = ingredients
        recipe["steps"] = steps

        let img = data.image[0]
        let image64 = ""

        delete recipe.image

        let reader = new FileReader()
        reader.onload = (e) => {
            let binaryString = e.target.result
            image64 = Buffer.from(binaryString, 'binary').toString('base64')
            recipe["img"] = image64
        }
        reader.readAsBinaryString(img)

        reader.onloadend = () => {
            console.log(recipe)
            postRecipe(recipe)
        }
    }

    return (
        <div className='new-post-container'>
            <form className='new-post-form' onSubmit={handleSubmit(onSubmit)}>

                <div className='new-post-input-wrapper'>
                    <span className='new-post-input-label'>
                        Title
                    </span>
                    <input
                        {...register("title", {
                            required: true,
                            maxLength: 50,
                        })}
                        name="title"
                        className='new-post-input'
                        type="text"
                        id="title"
                        placeholder="Fish and Chips"
                        required
                    />
                </div>

                <div className='new-post-input-wrapper'>
                    <span className='new-post-input-label'>
                        Description
                    </span>
                    <input
                        {...register("description", {
                            maxLength: 100,
                        })}
                        name="description"
                        className='new-post-input'
                        type="text"
                        id="description"
                        placeholder="A sweet salmon with a hint of lemon"
                        required
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
                        name="image"
                        className='new-post-input'
                        type="file"
                        id="image"
                        placeholder="image"
                        required
                    />
                </div>

                <div className='new-post-ingredients-container'>
                    <div className='new-post-input-wrapper'>

                        <span className='new-post-input-label'>
                            Ingredients
                        </span>
                        <div className='new-post-input-ingredients-container'>
                            <div className='new-post-ingredients-header'>
                                Delete
                            </div>
                            <div className='new-post-ingredients-header'>
                                Amount
                            </div>
                            <div className='new-post-ingredients-header'>
                                Unit
                            </div>
                            <div className='new-post-ingredients-header'>
                                Ingredient Name
                            </div>

                            {ingredients.map((ingredient, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <div className='new-post-ingredients-delete'>
                                            <FontAwesomeIcon
                                                icon={faTrashAlt}
                                                onClick={() => removeIngredient(i)} />
                                        </div>
                                        <div className='new-post-ingredients-amount'>
                                            <input
                                                name="amount"
                                                className='new-post-ingredients-amount-input'
                                                type="text"
                                                placeholder="1"
                                                value={ingredient.amount}
                                                onChange={(e) => handleIngredientsChange(e, i)}
                                            />
                                        </div>
                                        <div className='new-post-ingredients-unit'>
                                            <select
                                                name="unit"
                                                onChange={(e) => handleIngredientsChange(e, i)}>
                                                {units.map((unit) => {
                                                    return (
                                                        <option value={unit}>{unit}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className='new-post-ingredients-name'>
                                            <input
                                                name="ingredient"
                                                className='new-post-ingredients-name-input'
                                                type="text"
                                                placeholder="Avocado"
                                                value={ingredient.name}
                                                onChange={(e) => handleIngredientsChange(e, i)}
                                            />
                                        </div>
                                    </React.Fragment>
                                )
                            })}


                        </div>

                    </div>
                    <div className='new-post-ingredients-add' onClick={addIngredient}>
                        <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                    </div>
                </div>

                <div className='new-post-steps-container'>
                    <div className='new-post-input-wrapper'>

                        <span className='new-post-input-label'>
                            Steps
                        </span>
                        <div className='new-post-input-steps-container'>
                            {steps.map((step, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <div className='new-post-steps-index'>
                                            {i + 1}.
                                        </div>
                                        <div className='new-post-steps-content'>
                                            <textarea
                                                className='new-post-steps-content-input' name="content" placeholder="Slice the avocados in half..."
                                                value={step}
                                                onChange={(e) => handleStepsChange(e, i)} />
                                        </div>
                                        {i !== steps.length - 1
                                            && <div className='new-post-steps-delete'
                                                onClick={() => { removeStep(i) }}>
                                                <FontAwesomeIcon icon={faMinusCircle} size="lg" />
                                            </div>}
                                        {i === steps.length - 1 &&
                                            <div className='new-post-steps-add' onClick={addStep}>
                                                <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                                            </div>}
                                    </React.Fragment>
                                )
                            })}
                        </div>

                    </div>
                </div>

                <div className='new-post-submit-container'>
                    <button className='new-post-submit-button' type="submit" name="sumbit">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    )
}

export default NewPost