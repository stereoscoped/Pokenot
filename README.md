# Pokenot

CMSC 433 Project 3 Videogame



//tmp sturcture breakdown
assets/
js/
assets.js      //load assets from assets folder with short names to use elsewhere
battle.js      //handle battle logic and transitions
collisions.js  //handle collision logic for player walking
game.js        //prepare and track game states
input.js       //load kb listeners for easier acces in other files
//other files can now just use <keys\["w"]>
main.js        //primary loader for updating and drawing game states
overworld.js   //contains individual collision boxes for town and route maps for player to explore
player.js      //handles player movement, animations, and drawing
pokemon.js     //handles db calls for pokemon and team data





Instructions:

Install xamp and the MySql modules

Place Pokenot project folder in the xamp install directory insdie of the htdocs folder
(ex: C:\xampp\htdocs\Pokenot)

Launch xamp then start the Apache and MySQL modules

Import and Seed Database:

Go to phpadmin http://localhost/phpmyadmin/
import the proj3.sql file
click into the pokemon_battle database on the left bar
then click the Sql tab at the top and paste in the seeding.sql file
Finally click the small go box

Then navigate to the local host in a browser link: http://localhost/Pokenot/

