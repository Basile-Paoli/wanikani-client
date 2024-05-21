import {apiUrl} from "../Context.ts";
import {useSubjectManager} from "../useSubjectManager.ts";


// type Review = {
//     subject_id: number
//     incorrect_meaning_answers: number
//     incorrect_reading_answers: number
// }


function Reviews() {
const [currentSubject ,switchToNextAssignment] =  useSubjectManager(apiUrl+"/assignments?immediately_available_for_review")
    console.log("render")
    return (
        <div>
            {currentSubject  ?
                <>{currentSubject.characters ? <h1>{currentSubject.characters}</h1> :
                    <img className="h-8" src={currentSubject.character_images[7].url }/>}
                    <button onClick={switchToNextAssignment}>Next
                    </button>
                </> :
                <h1>No reviews</h1>
            }
        </div>
    );
}

export default Reviews;