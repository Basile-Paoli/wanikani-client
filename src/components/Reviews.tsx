import {apiUrl} from "../Context.ts";
import {useSubjectManager} from "../useSubjectManager.ts";
import React, {useEffect, useMemo, useReducer, useRef} from "react";
import {bind as bindKana,unbind as unbindKana} from "wanakana"

type Mistakes = {
    meaning: number,
    reading: number,
}

// type Review = {
//     subject_id: number
//     incorrect_meaning_answers: number
//     incorrect_reading_answers: number
// }


function Reviews() {
    const [currentSubject, switchToNextAssignment, currentAssignment] = useSubjectManager(apiUrl + "/assignments?immediately_available_for_review");
    const readingInputRef = useRef<HTMLInputElement>(null);
    const meaningInputRef = useRef<HTMLInputElement>(null);

    const validReadings = useMemo(() => {
        const readings: string[] = [];
        if (!currentSubject?.readings) return readings;
        currentSubject?.readings.forEach((reading) => {
            readings.push(reading.reading);
        })
        return readings;
    }, [currentSubject]);

    const validMeanings = useMemo(() => {
        const meanings: string[] = []
        currentSubject?.meanings.forEach((meaning) => {
            meanings.push(meaning.meaning.toLowerCase())
        })
        return meanings
    }, [currentSubject]);

    const reducerFunc = (state: Mistakes, action: { type: string }): Mistakes => {
        switch (action.type) {
            case "meaning":
                return {...state, meaning: state.meaning + 1};
            case "reading":
                return {...state, reading: state.reading + 1};
            default:
                return state;
        }

    }

    const [mistakes, dispatch] = useReducer(reducerFunc, {reading: 0, meaning: 0})

    const validateHandler = () => {
        let correct = true;

        if (!validMeanings.includes((meaningInputRef.current as HTMLInputElement).value.toLowerCase())) {
            dispatch({type: "meaning"});
            correct = false;
        }
        if (validReadings.length !== 0 && !validReadings.includes((readingInputRef.current as HTMLInputElement).value.toLowerCase())) {
            dispatch({type: "reading"});
            correct = false;

        }
        if (correct) {
            console.log("correct");
            switchToNextAssignment();
            (meaningInputRef.current as HTMLInputElement).value = ""
            if (readingInputRef.current) {
                (readingInputRef.current).value = ""
            }
            meaningInputRef.current?.focus()

        }

    }
    const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter") {
            validateHandler();
        }
    };
    useEffect(() => {
        if (readingInputRef.current) {
            const {current} = readingInputRef;
            bindKana(current);
            return () => {
                unbindKana(current);
            }
        }
    }, [currentAssignment?.data.subject_type]);

    return (
        <div>
            {currentSubject ?
                <div>
                    {currentSubject.characters ?
                        <h1>{currentSubject.characters}</h1> :
                        <img className="h-8"
                             src={currentSubject.character_images && currentSubject.character_images[7].url}/>}
                    <div>Meaning :</div>
                    <input autoFocus ref={meaningInputRef} onKeyDown={keyPressHandler} type={"text"}/>
                    {currentAssignment.data.subject_type !== "radical" && <>
						<div>Reading :</div>
						<input ref={readingInputRef} onKeyDown={keyPressHandler} type={"text"}/></>}
                    <button onClick={validateHandler}>Valider</button>

                </div> :
                <h1>No reviews</h1>
            }
        </div>
    );
}

export default Reviews;