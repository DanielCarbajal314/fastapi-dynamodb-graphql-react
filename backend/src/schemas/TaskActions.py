from graphene import ObjectType, String, Mutation, List
from ..database import get_database, CreateTask, UpdateTaskState, TaskState, UpdateTask


class TaskType(ObjectType):
    id = String()
    state = String()
    description = String()
    title = String()


class TaskQuery(ObjectType):
    tasks = List(TaskType, project_id=String())

    def resolve_tasks(root, info, project_id):
        database = get_database()
        return database.task_repository.list_by_project_id(project_id)


class CreateTaskAction(Mutation):
    class Arguments:
        description = String()
        title = String()
        project_id = String()

    id = String()
    state = String()
    description = String()
    title = String()

    def mutate(root, info, description: str, title: str, project_id: str):
        database = get_database()
        task = database.task_repository.create(
            CreateTask(description=description, title=title, project_id=project_id)
        )
        return CreateTaskAction(**task.model_dump(exclude={"project_id"}))


class UpdateTaskStateAction(Mutation):
    class Arguments:
        state = String()
        id = String()

    id = String()
    state = String()
    description = String()
    title = String()

    def mutate(root, info, state: str, id: str):
        database = get_database()
        task = database.task_repository.update_task_state(
            UpdateTaskState(id=id, state=TaskState[state])
        )
        return UpdateTaskStateAction(**task.model_dump(exclude={"project_id"}))


class UpdateTaskAction(Mutation):
    class Arguments:
        state = String()
        id = String()
        description = String()
        title = String()

    id = String()
    state = String()
    description = String()
    title = String()

    def mutate(root, info, state: str, id: str, description: str, title: str):
        database = get_database()
        task = database.task_repository.update_task(
            UpdateTask(
                id=id, state=TaskState[state], title=title, description=description
            )
        )
        return UpdateTaskStateAction(**task.model_dump(exclude={"project_id"}))


class TaskMutations(ObjectType):
    create_task = CreateTaskAction.Field()
    update_task_state = UpdateTaskStateAction.Field()
    update_task = UpdateTaskAction.Field()
