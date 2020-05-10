import React, { useState } from 'react'
import TutorialService from '../service/TutorialService';

const AddTutorials = () => {
    // First, we define and set initial state: tutorial & submitted.
    //create blank initialState
    const initialState = {
        id : null,
        title : "",
        description : "",
        published : false
    }
    // snippet : useS
    const [tutorial, setTutorial] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);

    //Invoking the name & value property on input fields
    //then setting the value to blank initial state
    //to get input field values
    const handleInputChange = (event) => {
        //snippet : dob
        const {name,value} = event.target;

        setTutorial({...tutorial, [name]: value});
    }

    //We also have a function to get tutorial state and send the POST request to the Web API. 
    //It calls TutorialDataService.create() method.
    //snippet : nfn
    const saveTutorial = () => {
        var data = {title : tutorial.title, description : tutorial.description};

        //invoking service
        TutorialService.create(data)
        .then(response  => {
            //set tutorial from blank to input field values
            setTutorial({
                id : response.data.id,
                title : response.data.title,
                description : response.data.description,
                published : response.data.published
            })
            setSubmitted(true);
            // snippet : cl
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        })
        
    }

    //setting for the new tutorial
    // snippet : nfn
    const newTutorial = () => {
        setTutorial(initialState);
        setSubmitted(false);
    }


    return (
        <div>
            <h3>Add Tutorial</h3>
            {/* For return, we check the submitted state, if it is true, 
            we show Add button for creating new Tutorial again. 
            Otherwise, a Form with Submit button will display. */}
            {
                submitted ? (
                    <div>
                        <h3>Successfully Submitted!</h3>
                        <button onClick={newTutorial}>
                            Add New Tutorial
                        </button>
                    </div>
                ):(
                    <div>
                        <label>Title :</label><br></br>
                        <input 
                            name="title"
                            value={tutorial.title}
                            onChange={handleInputChange}
                            placeholder="Enter Title"
                            type="text"
                        />
                        <br></br>
                        <label>Title :</label><br></br>
                        <input 
                            name="description"
                            value={tutorial.description}
                            onChange={handleInputChange}
                            placeholder="Enter Description"
                            type="text"
                        />
                        <br></br>
                        <button onClick={saveTutorial}>
                            Submit Tutorial
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default AddTutorials
