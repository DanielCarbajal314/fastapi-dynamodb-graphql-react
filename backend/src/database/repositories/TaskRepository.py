from typing import List
from mypy_boto3_dynamodb.service_resource import Table
from ..DynamoDbTableFactory import DynamoDbTableFactory
from ..models import TaskState, Task, CreateTask
from boto3.dynamodb.conditions import Key
from uuid import uuid4


class TaskRepository:
    __table: Table

    def __init__(self, table_factory: DynamoDbTableFactory) -> None:
        self.__table = table_factory.build(
            table_name="tasks",
            key_scheme=[{"AttributeName": "id", "KeyType": "HASH"}],
            attribute_definitions=[
                {"AttributeName": "id", "AttributeType": "S"},
                {"AttributeName": "project_id", "AttributeType": "S"}
            ],
            global_secondary_index=[
            {
                'IndexName': 'project_id_index',
                'KeySchema': [
                    {
                        'AttributeName': 'project_id',
                        'KeyType': 'HASH'
                    }
                ],
                'Projection': {
                    'ProjectionType': 'ALL'
                },
                'ProvisionedThroughput': {
                    'ReadCapacityUnits': 5,
                    'WriteCapacityUnits': 5
                }
            }
        ]
        )

    def create(self, createTask: CreateTask) -> Task:
        uuid = str(uuid4())
        item = {
            "id": uuid, 
            "title": createTask.title,
            "description": createTask.description,
            "project_id": createTask.project_id,
            "state": TaskState.Backlog
        }
        self.__table.put_item(Item=item)
        return Task.model_validate(item)

    def list_by_project_id(self, project_id: str) -> List[Task]:
        page = self.__table.query(
            IndexName='project_id_index',
            KeyConditionExpression=Key('project_id').eq(project_id)
        )
        return [Task.model_validate(item) for item in page["Items"]]
