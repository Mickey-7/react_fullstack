package com.example.Spring.Boot.JPA.Rest.CRUD.API.controller;

import com.example.Spring.Boot.JPA.Rest.CRUD.API.domain.Tutorial;
import com.example.Spring.Boot.JPA.Rest.CRUD.API.repository.TutorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TutorialController {
    private TutorialRepository tutorialRepository;
    @Autowired
    public TutorialController(TutorialRepository tutorialRepository){
        this.tutorialRepository = tutorialRepository;
    }

    @PostMapping("/tutorials")
    //note that we use ResponseEntity (with data type - Tutorial) on the output
    public ResponseEntity<Tutorial> createTutorial(@RequestBody Tutorial tutorial){
        //need to create tutorialSave variable with Tutorial data type then set to repository to save()
        Tutorial tutorialSave = tutorialRepository.save(new Tutorial(tutorial.getTitle(), tutorial.getDescription(),false));
        //note that when we return, we use new ResponseEntity(variable w/data type - Tutorial, HttpStatus.STATUS)
        System.out.println(tutorial);
        return new ResponseEntity<>(tutorialSave, HttpStatus.CREATED);
    }

    @GetMapping("/tutorials")
    public ResponseEntity<List<Tutorial>> getAllTutorials(@RequestParam(required = false) String title){
        //we need to set (required = false) on the input parameter after @RequestParam
        //as its default value is true so it will require the title

        //need to create blank ArrayList of Tutorial
        List<Tutorial> tutorials = new ArrayList<>();

        //then add all then repository content with findAll()
        //to the created blank tutorials ArrayList if no title found
        if (title==null){
            tutorials.addAll(tutorialRepository.findAll());
        }else {
            //otherwise, set it to repository with findByTitleContaining() method
            tutorials.addAll(tutorialRepository.findByTitleContaining(title));
        }

        //handle if no tutorials found
        if (tutorials.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        System.out.println(tutorials);
        return new ResponseEntity<>(tutorials, HttpStatus.OK);
    }

    @GetMapping("/tutorials/{id}")
    public ResponseEntity<Tutorial> getTutorialById(@PathVariable Long id){
        //since .findById() has optional return we will use Optional<Tutorial>
        Optional<Tutorial> tutorial = tutorialRepository.findById(id);
        System.out.println(id);
        //since we use optional , we need to check if its present .isPresent()
        if (tutorial.isPresent()){
            //since we use .isPresent(), we need to use get method .get()
            return new ResponseEntity<>(tutorial.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/tutorials/{id}")
    public ResponseEntity<Tutorial> updateTutorial(@PathVariable Long id, @RequestBody Tutorial tutorial){
        Optional<Tutorial> tutorialUpdate = tutorialRepository.findById(id);
        if (tutorialUpdate.isPresent()){
            //then create new Tutorial then set it with tutorialUpdate by using tutorialUpdate.get()
            Tutorial tutorialUpdated = tutorialUpdate.get();
            tutorialUpdated.setTitle(tutorial.getTitle());
            tutorialUpdated.setDescription(tutorial.getDescription());
            tutorialUpdated.setPublished(tutorial.getPublished());
            return new ResponseEntity<>(tutorialRepository.save(tutorialUpdated), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/tutorials/{id}")
    public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable Long id){
        tutorialRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/tutorials")
    public ResponseEntity<HttpStatus> deleteAllTutorials(){
        tutorialRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/tutorials/published")
    public ResponseEntity<List<Tutorial>> findByPublished(){
        List<Tutorial> publishedTutorial = tutorialRepository.findByPublished(true);

        if (publishedTutorial.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else {
            return new ResponseEntity<>(publishedTutorial,HttpStatus.OK);
        }

    }
}
