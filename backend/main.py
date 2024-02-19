from src.database.models import UpdateTask, TaskState
from src.database import Database, get_dynamodb_resource


if __name__ == "__main__":
    a = get_dynamodb_resource()
    database = Database(a)
    database.task_repository.update_task(
        UpdateTask(
            id="1e3d2706-c30e-4be8-a6c5-6dc7d736bdde",
            state=TaskState.Done,
            description="Another Task asdasd",
            title="Edited Task asdasd",
        )
    )
    for a in database.task_repository.list_by_project_id(
        "e33ba124-b4a5-424f-b224-d56e3466f498"
    ):
        print(a)
