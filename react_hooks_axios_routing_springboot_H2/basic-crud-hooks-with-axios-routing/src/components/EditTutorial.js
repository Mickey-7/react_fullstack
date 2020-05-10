import React, { useState, useEffect } from 'react'
import TutorialService from '../service/TutorialService';
import { useParams } from 'react-router-dom';


const EditTutorial = (props) => {
    //blank currentTutorial for the selected item
    const initialState =  {
        id:null,
        title:"",
        description:"",
        published:false,
    }
    const [currentTutorial, setCurrentTutorial] = useState(initialState);
    const [message, setMessage] = useState("")

    //getTutorialById method to invoke service to get tutorial by id
    const getTutorial = (id) => {
        console.log(id);
        TutorialService.get(id)
        .then(response => {
            console.log(response);
            ///set the selected tutorial to the selected tutorial
            setCurrentTutorial(response.data)
            console.log(response.data);
        })
        .catch(e=>{
            console.log(e);
        })
    }


    //useParams() to getTutorialById
    let {id} = useParams();
   

    //useEffect to get the selected item as props from TutorialList
    useEffect(()=>{
        console.log(id);
        getTutorial(id)
    },[id])
    
   //setting the currentTutorial to be published and invoking update service
   const updatePublished = (status) => {
       console.log(status);
       var data = {
        id: currentTutorial.id,
        title : currentTutorial.title,
        description : currentTutorial.description,
        published : status
       }
       console.log(data);

        //invoking update service to published
       TutorialService.update(currentTutorial.id,data)
        .then(response => {
            console.log(response.data);
            //set current Tutorial published status
            setCurrentTutorial({...currentTutorial,published:status})
        })
        .catch(e=>{
            console.log(e);
        })
   }

   //method for delete
   const deleteTuts = (id) => { 
        //invoking service
        TutorialService.remove(id)
            .then(response => {
                console.log(response.data);
                //clear inputs after delete
                setCurrentTutorial(initialState)
            })
            .catch(e=>{
                console.log(e);
            })
   }
   
    //to handle changes on input and set the value to currentTutorial
    const handleInputChange = (event) => {
        //no need to put value after target as we will not able to make edit on it..
        //console will only output undefined on onChange event!!!!!!!!
        //this took many fucking hours!!!!!!!
        const {name,value} = event.target;
        setCurrentTutorial({...currentTutorial,[name]:value})
        console.log(value);
    }

    //methos for update
    const update = (id,data) => {
        //invoke service
        TutorialService.update(id,data)
        .then(response=>{
            console.log(data);
            console.log(response.data);
            //set message after update
            setMessage("The tutorial was updated successfully")
            console.log(message);
        
        }) 
        .catch(e=>{
            console.log(e);
        })
    }

    return (
        <div>
            <h3>Edit Tutorial</h3>
                <div>
                    <label><strong>Title : </strong></label><br></br>
                    <input
                        name="title"
                        value={currentTutorial.title}
                        onChange={handleInputChange}
                        type="text"
                    /><br></br>
                    <label><strong>Description : </strong></label><br></br>
                    <input
                        name="description"
                        value={currentTutorial.description}
                        onChange={handleInputChange}
                        type="text"
                    /><br></br>
                    <label><strong>Status : </strong></label>
                    {
                        currentTutorial.published? "Published":"Pending"
                    }

                    <br></br>
                    {/* making the tutorial Unpublished/Published */}
                    {
                        currentTutorial.published?(
                            <button onClick={() => updatePublished(false)}> 
                                Unpublished
                            </button>
                        ):(
                            <button onClick={() => updatePublished(true)}>
                                Published
                            </button>
                        )
                    }

                    <br></br>
                    {/* for delete item */}
                    <button onClick={()=>deleteTuts(currentTutorial.id)}>
                        Delete
                    </button>
                    <br></br>

                    {/* for overall update */}
                    <button onClick={()=>update(currentTutorial.id,currentTutorial)}>
                        Update 
                    </button>
                    <p>{message}</p>
                </div>                        
        </div>
    )
}

export default EditTutorial
