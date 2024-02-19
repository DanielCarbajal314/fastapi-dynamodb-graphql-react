from enum import Enum
from pydantic import BaseModel

class TaskState(str, Enum):
    Backlog = "BACKLOG"
    Doing = "DOING"
    Review = "REVIEW"
    Done = "DONE"


class Task(BaseModel):
    id: str
    state: TaskState = TaskState.Backlog
    description: str
    project_id: str
    title: str

class CreateTask(BaseModel):
    description: str
    project_id: str
    title: str