/*
 _____           _                   _   _             
|  ___|         | |                 | | (_)            
| |____  ___ __ | | __ _ _ __   __ _| |_ _  ___  _ __  
|  __\ \/ / '_ \| |/ _` | '_ \ / _` | __| |/ _ \| '_ \ 
| |___>  <| |_) | | (_| | | | | (_| | |_| | (_) | | | |
\____/_/\_\ .__/|_|\__,_|_| |_|\__,_|\__|_|\___/|_| |_|
          | |                                          
          |_|                                          

There are 81 radio buttons split into 9 groups of 9, each group represents a turn and only a specific player can take their turn.
At the start the first 9 radio buttons are displayed, once it has been checked the next set will be overlayed except the checked one will display on top
`.turn-1:checked~.turn-2` => display
`.turn-2:checked~.turn-3` => display
etc...

Each tile is labelled with their column and row number, and also if they are on one of the 2 diagonals
To check if they have won check to see if the same player has checked all of the same type
`.player-1.c-1:checked~.player-1.c-1:checked~.player-1.c-1:checked .overlay` => player-1 has checked all of column 1 and has won and the overlay is selected
×??
×??
×??

`.player-2.d-2:checked~.player-2.d-2:checked~.player-2.d-2:checked .overlay` => player-2 has checked all of diagonal 2 and has won and the overlay is selected
??•
?•?
•??

If 9 are checked it is at least a tie, with wins overriding it
*/