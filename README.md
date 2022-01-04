# hangman-game
## Getting started
You need to have [Node](https://nodejs.org/en/download/) installed.
1. Clone the git repository
```
git clone https://github.com/ricardas98/hangman-game.git
```
2. Open the project with your preferred code editor
3. Navigate to the "server" folder and install node modules
```
cd ./server
npm install
```
4. Launch the server
```
npm start
```
5. Navigate to the "client" folder and install node modules
```
cd ./client
npm install
```
6. Launch the app
```
npm start
```
7. Navigate to http://localhost:3000/

## About the game
A simple hangman game that you probably know from your childhood. The player has to guess the letters of a specific word. 
If the players misses 10 times, they lose the game.  

Read more [Hangman Game](https://en.wikipedia.org/wiki/Hangman_(game)) 


## About the project

### Backend

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

### API

* POST - is used to create a new game session.  
* PUT - is used to update the game state during gameplay.
* DELETE - delete game session when the player has quit, restarted, won or lost the game.  
* GET - is used for development purposes only.

### Frontend

The client side is responsible for displaying the data and sending data to the server. There is some functionality implemented which highlights the keys/letters that have already been guessed, missed during the game. 
Some custom hangman illustrations were created to showcase how many misses the player has made. The design has a breakpoint at 960px to make it a bit more mobile friendly.

### Tests

API functionality were tested using Jest and Supertest libraries. There were 16 tests created in total. Tests check and validate response formats, status codes and response data.  
Test count:
* POST - 3
* PUT - 7
* DELETE - 3
* GET - 2
* NON-EXISTING API URL - 1

To run tests you have to navigate to the "server" folder of the project and type ```npx jest```



## Created with

[Node](https://nodejs.org/en/)  
[Express](https://expressjs.com/)  
[React](https://reactjs.org/)  
[Adobe Illustrator](https://www.adobe.com/lt/products/illustrator.html)



![alt text](https://i.imgur.com/lfzE4uP.png "Game view")
