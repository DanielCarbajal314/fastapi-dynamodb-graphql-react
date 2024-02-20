import { useParams } from "react-router-dom";

export function ProjectDetails() {
    const { projectId } = useParams();
    console.log(projectId)
    return <div>
        <h1>hola</h1>
    </div>
}