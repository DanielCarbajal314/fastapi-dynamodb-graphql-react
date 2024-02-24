from typing import List
from mypy_boto3_dynamodb.service_resource import Table
from ..DynamoDbTableFactory import DynamoDbTableFactory
from ..models import TaskState, Task, CreateTask, UpdateTaskState, UpdateTask
from boto3.dynamodb.conditions import Key
from uuid import uuid4
from datetime import datetime


class TaskRepository:
    __table: Table

    def __init__(self, table_factory: DynamoDbTableFactory) -> None:
        self.__table = table_factory.build(
            table_name="tasks",
            key_scheme=[{"AttributeName": "id", "KeyType": "HASH"}],
            attribute_definitions=[
                {"AttributeName": "id", "AttributeType": "S"},
                {"AttributeName": "project_id", "AttributeType": "S"},
            ],
            global_secondary_index=[
                {
                    "IndexName": "project_id_index",
                    "KeySchema": [{"AttributeName": "project_id", "KeyType": "HASH"}],
                    "Projection": {"ProjectionType": "ALL"},
                    "ProvisionedThroughput": {
                        "ReadCapacityUnits": 5,
                        "WriteCapacityUnits": 5,
                    },
                }
            ],
        )

    def create(self, createTask: CreateTask) -> Task:
        uuid = str(uuid4())
        timestamp = int(datetime.now().timestamp() * 1000)
        item = {
            "id": uuid,
            "title": createTask.title,
            "description": createTask.description,
            "project_id": createTask.project_id,
            "state": TaskState.Backlog,
            "timestamp": timestamp,
        }
        self.__table.put_item(Item=item)
        return Task.model_validate(item)

    def list_by_project_id(self, project_id: str) -> List[Task]:
        page = self.__table.query(
            IndexName="project_id_index",
            KeyConditionExpression=Key("project_id").eq(project_id),
        )
        return [Task.model_validate(item) for item in page["Items"]]

    def update_task_state(self, updateTaskState: UpdateTaskState) -> Task:
        page = self.__table.update_item(
            Key={"id": updateTaskState.id},
            UpdateExpression="SET #st = :state_value",
            ExpressionAttributeValues={
                ":state_value": updateTaskState.state,
            },
            ExpressionAttributeNames={"#st": "state"},
            ReturnValues="ALL_NEW",
        )
        return Task.model_validate(page["Attributes"])

    def update_task(self, update_task: UpdateTask) -> List[Task]:
        page = self.__table.update_item(
            Key={"id": update_task.id},
            UpdateExpression="SET #st = :state_value, title=:title_value, description=:description_value",
            ExpressionAttributeValues={
                ":state_value": update_task.state,
                ":title_value": update_task.title,
                ":description_value": update_task.description,
            },
            ExpressionAttributeNames={"#st": "state"},
            ReturnValues="ALL_NEW",
        )
        return Task.model_validate(page["Attributes"])

    def delete_task(self, id: str) -> None:
        self.__table.delete_item(Key={"id": id})
