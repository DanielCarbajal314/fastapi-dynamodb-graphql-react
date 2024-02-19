from src.database.models import Task, CreateTask
from src.database import Database, get_dynamodb_resource


if __name__ == "__main__":
    a = get_dynamodb_resource()
    database = Database(a)
    database.task_repository.create(CreateTask(
        description="First Task Ever",
        title="Primer Task",
        project_id="e33ba124-b4a5-424f-b224-d56e3466f498"
    ))
    for a in database.task_repository.list_by_project_id('e33ba124-b4a5-424f-b224-d56e3466f498'):
        print(a)
