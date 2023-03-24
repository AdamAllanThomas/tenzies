import React from "react";
import Die from "./die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
    function allNewDice() {
        let dice = [];
        for (let i = 0; i < 10; i++) {
          dice.push({
            value: Math.floor(Math.random() * 6) + 1,
            isHeld: false,
            id: nanoid()
          });
        }
        return dice;
      }
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);


    React.useEffect(() => {
        const checkGameOver = () => {
          if (dice.every(die => die.value === dice[0].value && die.isHeld)) {
            setTenzies(true);
            console.log("You win!");
          } else {
            setTenzies(false);
          }
        };
        checkGameOver();
      }, [dice]);


    function holdDice(id: string) {
        setDice(prevDice => 
          prevDice.map(die => {
            if (die.id === id) {
              return {...die, isHeld: !die.isHeld};
            } else {
              return die;
            }
          })
        );
      }
      

    function rollDice() {
        setDice(prevDice => (
          prevDice.map(die => {
            if (die.isHeld) {
              return die;
            } else {
              return {
                ...die,
                value: Math.floor(Math.random() * 6) + 1
              };
            }
          })
        ));
      }
      
    return (
        <main className="gamecontainer">
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice">
                {dice.map((dieValue, index) => (
                <Die key={dieValue.id} held={dieValue.isHeld} value={dieValue.value} holdDice={holdDice} id={dieValue.id} />
                ))}
            </div>
            <button onClick={rollDice}>Roll</button>
            {tenzies && <Confetti />}
        </main>
    );
}