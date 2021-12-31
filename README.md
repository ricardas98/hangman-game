# hangman-game

## About
### Game
A simple hangman game that you probably know from your childhood. The player has to guess the letters of a specific word. 
If the players misses 10 times, they lose the game.  

Read more [Hangman Game](https://en.wikipedia.org/wiki/Hangman_(game)) 


---

### Project

#### Backend

The project has a server which is responsible for all the game logic, which calculates when the player has lost, won, it also updates game/session data, based on the client data.
Available words are stored in the server, since the database is not needed for this project. As a result all game sessions are deleted, once the server is turned off or restarted. If there are old (at least 10 minutes old) game
sessions that were not deleted, the server automatically checks and deletes old game sessions every time a new one is created. The server uses commands in JSON format to communicate with the client.

Command object
```json
{
    "id": 0,
    "data": {
        "id": "1640967917454x1402",
        "word": "________",
        "misses": []
    }
}
```

Command types (id)

* 0 - the game session is in progress.
* 1 - the game was lost.
* 2 - the game was won.

#### API

* POST - is used to create a new game session.  
* DELETE - delete game session when the player has quit, restarted, won or lost the game.  
* UPDATE - is used to update the game state during gameplay.
* GET ALL - is used for development purposes only.

#### Front end

The client side is responsible for displaying the data and sending data to the server. There is some functionality implemented which highlights the keys/letters that have already been guessed, missed during the game. 
Some custom illustrations were created to showcase how many misses the player.

---

### Created with

[Node](https://nodejs.org/en/)  
[Express](https://expressjs.com/)  
[React](https://reactjs.org/)  
[Adobe Illustrator](https://www.adobe.com/lt/products/illustrator.html)



![alt text](https://i.gyazo.com/06dfa0631a4d55bb1c57b0331842af0c.png "Game view")
