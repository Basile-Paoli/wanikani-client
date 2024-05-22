import {apiUrl} from "../Context.ts";
import {useSubjectManager} from "../useSubjectManager.ts";


function Lessons() {
    const [currentSubject, switchToNextAssignment] = useSubjectManager(`${apiUrl}/assignments?immediately_available_for_lessons`);

    return (
        <div>
            {currentSubject ?
                <>{currentSubject.characters ? <h1>{currentSubject.characters}</h1> :
                    <img className="h-8"
                         src={currentSubject.character_images && currentSubject.character_images[7].url}/>}
                    <button onClick={switchToNextAssignment}>Next
                    </button>
                </> :
                <h1>No reviews</h1>
            }
        </div>
    );
}

export default Lessons;