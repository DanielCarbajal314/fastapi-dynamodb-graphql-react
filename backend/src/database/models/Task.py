from enum import Enum
from pydantic import BaseModel


class TaskState(str, Enum):
    Backlog = "Backlog"
    Doing = "Doing"
    Review = "Review"
    Done = "Done"


class Task(BaseModel):
    id: str
    state: TaskState = TaskState.Backlog
    description: str
    project_id: str
    timestamp: int
    title: str


class CreateTask(BaseModel):
    description: str
    project_id: str
    title: str


class UpdateTask(BaseModel):
    id: str
    description: str
    title: str
    state: TaskState = TaskState.Backlog


class UpdateTaskState(BaseModel):
    id: str
    state: TaskState = TaskState.Backlog


class DeleteTask(BaseModel):
    id: str
