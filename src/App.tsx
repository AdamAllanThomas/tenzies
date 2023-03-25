import React, { useMemo, useCallback } from "react";
import Die from "./die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

interface DieProps {
  value: number;
  isHeld: boolean;
  id: string;
}

export default function App() {
  function allNewDice() {
    let dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return dice;
  }
  const [dice, setDice] = React.useState<DieProps[]>(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const checkGameOver = () => {
      if (dice.every((die) => die.value === dice[0].value && die.isHeld)) {
        setTenzies(true);
        console.log("You win!");
      } else {
        setTenzies(false);
      }
    };
    checkGameOver();
  }, [dice]);

  const holdDice = useCallback((id: string) => {
    setDice((prevDice) =>
      prevDice.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        } else {
          return die;
        }
      })
    );
  }, []);

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        if (die.isHeld) {
          return die;
        } else {
          return {
            ...die,
            value: Math.floor(Math.random() * 6) + 1,
          };
        }
      })
    );
  }

  const dieLookup = useMemo(
    () =>
      dice.reduce(
        (lookup, die) => ({
          ...lookup,
          [die.id]: (
            <Die
              key={die.id}
              held={die.isHeld}
              value={die.value}
              holdDice={holdDice}
              id={die.id}
            />
          ),
        }),
        {} as Record<string, React.ReactNode>
      ),
    [dice, holdDice]
  );

  const heldDice = useMemo(() => dice.filter((die) => die.isHeld), [dice]);
  const notHeldDice = useMemo(() => dice.filter((die) => !die.isHeld), [dice]);

  return (
    <main className="gamecontainer">
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice">
        {heldDice.map((die) => dieLookup[die.id])}
        {notHeldDice.map((die) => dieLookup[die.id])}
      </div>
      <button onClick={rollDice}>Roll</button>
      {tenzies && <Confetti />}
    </main>
  );
}
