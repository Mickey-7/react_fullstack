import React, { useState, useEffect } from 'react'
import TutorialService from '../service/TutorialService';
import { Link } from 'react-router-dom';

const TutorialList = () => {
    //So we will have following state:
    // searchTitle
    // tutorials
    // currentTutorial and currentIndex
    const [searchTitle, setSearchTitle] = useState("");
    const [tutorials, setTutorials] = useState([]);
    //for the current selected tutorail to be dited
    const [currentTutorial, setCurrentTutorial] = useState(null)
    //for the position based on the tutorials DOM rendered list
    const [currentIndex, setCurrentIndex] = useState(-1)

    // It allows us to run a function based on whether something changed.
    //and retrive values from the list
    //snippet : useE
    useEffect(() => {
        retriveTutorials();
    },[])

    // create refresh method
    const refreshList = () => {
        console.log("refresh"); 
        retriveTutorials();
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    }

    //get search value and set it to searchTitle state
    // snippet : nfn
    const handleSearchChange = (event) => {
        // snippet : dob
        //storing the type search value
        const searchTitle = event.target.value
        //invoking searchTitle state
        setSearchTitle(searchTitle);
        console.log(searchTitle);
    }
    //invoking the service
    const findByTitle = () => {
        console.log(searchTitle);
        TutorialService.findByTitle(searchTitle)
        .then( response => {
            //setting the tutorial list from searchTitle  
            setTutorials(response.data)
            console.log(response.data);
        })
        .catch(e=>{
            console.log(e);
        })
    }

    //create retrive tutorial list method
    //snippert : nfn
    const retriveTutorials = () => {
        //invoking the service
        TutorialService.getAll()
        .then(response => {
            //setting the tutorials list from all
            console.log(response);
            console.log(response.data);
            setTutorials(response.data)
        })
        .catch(e=>{
            console.log(e);
        })
    }
    
    // invoking service to remove all
    //snippet : nfn
    const removeAllTutorials = () => {
        console.log("remove all");
        TutorialService.removeAll()
        .then(response => {
            console.log(response.data);
            //invoke refresh method 
            refreshList();
        })
        .catch(e=>{
            console.log(e);
        })
    }

    //method to get the active selected tutorial for editing
    const setActiveTutorial = (tutorial) => {
        console.log(tutorial);
        setCurrentTutorial(tutorial);
        console.log(tutorial.id);
        setCurrentIndex(tutorial.id);
    }
    
    return (
        <div>
            <h3>Tutorial List</h3>

            {/* for search Title */}
            <input
                value={searchTitle}
                onChange={handleSearchChange}
                placeholder="Search by Title"
                type="text"
            />
            <button onClick={findByTitle}>
                Search
            </button>

            {/* for displatying tutorials */}
            <ul>
                {
                    // when we click deleteAll, we will have a rendering isuue of 
                    // Uncaught TypeError:                                     TutorialList.js:113 
                    // tutorials.map is not a function :  at TutorialList (TutorialList.js:113)
                    // so we need to add add tutorials && on the code below
                tutorials && tutorials.map((tutorial) => (
                    <li onClick={() => setActiveTutorial(tutorial)} key={tutorial.id}>
                        {tutorial.title}
                    </li>                  
                ))     
                }
            </ul>

            {/* for remove all */}
            <button onClick={removeAllTutorials}>
                Remove All
            </button>


            {/* for active selected tutorial rendering */}
            {
                currentTutorial ? (
                    <div>
                        <h3><b>Selected Tutorial</b></h3>
                        <label><strong>Title : </strong></label>
                        <p>{currentTutorial.title}</p>
                        <label><strong>Description : </strong></label>
                        <p>{currentTutorial.description}</p>
                        <label><strong>Status : </strong></label>
                        <p>{currentTutorial.published? "Published" : "Pending"}</p>

                        <Link
                            to={"/editTutorials/"+currentTutorial.id}
                        >
                            Edit
                        </Link>
                    </div>

                ):(
                    <div>

                    <br></br>
                    <p>Please click on a Tutorial </p>

                    </div>
                )       
            }     
        </div>
    )
}

export default TutorialList
