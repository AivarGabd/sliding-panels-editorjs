
import React, { useState } from "react";


export default function Test3() {
    const [state, setState] = useState({
        list: [
            { value: true },
            { value: false }
        ]
    })

    const handleMyChange = (targetComponentIndex, stateNew) => {

        let newState = state.list.map((i, index) =>
            index === targetComponentIndex ? { ...i, value: stateNew } : i
        );

       

        setState(() => ({
            list: newState
        }));
    };


    return (
        <div>

            {state.list.map((el, index) => (
                <div key={index} onMyChange={() => handleMyChange(index)} contentEditable={el.value}>
                    test - {index}
                </div>
            ))}

            <button onClick={() => handleMyChange(1, true)}>
                true
            </button>
            <button onClick={() => handleMyChange(1, false)}>
                false
            </button>
        </div>
    )
}