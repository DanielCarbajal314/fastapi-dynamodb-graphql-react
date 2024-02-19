from .repositories.ProjectRepository import ProjectRepository
from .repositories.TaskRepository import TaskRepository
from mypy_boto3_dynamodb import DynamoDBServiceResource
from .DynamoDbTableFactory import DynamoDbTableFactory


class Database:
    project_repository: ProjectRepository

    def __init__(self, dynamo: DynamoDBServiceResource) -> None:
        factory = DynamoDbTableFactory(resource=dynamo)
        self.project_repository = ProjectRepository(table_factory=factory)
        self.task_repository = TaskRepository(table_factory=factory)
