import React from 'react'

interface DieProps {
    value: number;
    held: boolean;
    id: string;
    holdDice: (id: string) => void;
  }


export default function Die(props: DieProps) {
    return (
        <div onClick={() => props.holdDice(props.id)} className={props.held ? "dielock" : "die"}>
            <h2>{props.value}</h2>
        </div>
    )
}