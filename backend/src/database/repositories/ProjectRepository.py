from typing import List
from mypy_boto3_dynamodb.service_resource import Table
from ..DynamoDbTableFactory import DynamoDbTableFactory
from ..models import Project, Page, default_page
from uuid import uuid4


class ProjectRepository:
    __table: Table

    def __init__(self, table_factory: DynamoDbTableFactory) -> None:
        self.__table = table_factory.build(
            table_name="projects",
            key_scheme=[{"AttributeName": "id", "KeyType": "HASH"}],
            attribute_definitions=[{"AttributeName": "id", "AttributeType": "S"}],
        )

    def create(self, project_name: str) -> Project:
        uuid = str(uuid4())
        item = {"id": uuid, "name": project_name}
        self.__table.put_item(Item=item)
        return Project.model_validate(item)

    def list(self, page: Page = default_page) -> List[Project]:
        page = (
            self.__table.scan(Limit=page.size)
            if not page.last_key
            else self.__table.scan(
                Limit=page.size, ExclusiveStartKey={"id": page.last_key}
            )
        )
        return [Project.model_validate(item) for item in page["Items"]]
