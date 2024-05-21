import {useEffect, useState} from "react";
import getSubject, {Subject} from "./getSubject.ts";

type Assignment = {
    data: {
        subject_id: number,
        subject_type: string,
    }
};

export function useSubjectManager(fetchUrl: string): [currentSubject: Subject | null, switchToNextAssignment: () => void, currentAssignment : Assignment] {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [currentAssignment, setCurrentAssignment] = useState(0);
    const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
    const [nextSubject, setNextSubject] = useState<Subject | null>(null);
    useEffect(() => {
        fetch(fetchUrl, {
            headers: {Authorization: `Bearer ${localStorage.getItem("apiToken")}`}
        })
            .then((response) => response.json())
            .then((data) => {
                const assignmentsList = data.data;
                setAssignments(assignmentsList);
                if (assignmentsList.length > 0) {
                    getSubject(assignmentsList[0].data.subject_id)
                        .then((subject) => {
                            if (subject) setCurrentSubject(subject);
                        })
                }

            })

    }, []);

    useEffect(() => {
        if (!assignments) {
            return;
        }
        if (currentAssignment >= assignments.length - 1) {
            return;
        }
        getSubject(assignments[currentAssignment + 1].data.subject_id)
            .then((subject) => {
                if (subject) setNextSubject(subject);
            })

    }, [currentSubject,currentAssignment]);


    const switchToNextAssignment = () => {
        if (!nextSubject) {
            setCurrentSubject(null);
            return;
        }
        setCurrentSubject(nextSubject);
        setCurrentAssignment(currentAssignment + 1);

    }
    return [currentSubject, switchToNextAssignment, assignments[currentAssignment]];
}