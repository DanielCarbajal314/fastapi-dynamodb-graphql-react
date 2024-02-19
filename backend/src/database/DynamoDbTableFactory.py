from mypy_boto3_dynamodb import DynamoDBClient, DynamoDBServiceResource
from boto3 import Session
from logging import getLogger
from mypy_boto3_dynamodb.type_defs import (
    AttributeDefinitionTypeDef,
    ProvisionedThroughputTypeDef,
    KeySchemaElementTypeDef,
    GlobalSecondaryIndexTypeDef,
)
from mypy_boto3_dynamodb.service_resource import Table
from typing import Sequence
from botocore.exceptions import ClientError


logger = getLogger(__name__)

defaultProvisionedThroughputTypeDef: ProvisionedThroughputTypeDef = {
    "ReadCapacityUnits": 10,
    "WriteCapacityUnits": 10,
}


class DynamoDbTableFactory:
    resource: DynamoDBServiceResource

    def __init__(self, resource: DynamoDBServiceResource):
        self.resource = resource

    def __create_table(
        self,
        table_name: str,
        key_scheme: Sequence[KeySchemaElementTypeDef],
        attribute_definitions: Sequence[AttributeDefinitionTypeDef],
        provisioned_throughput: ProvisionedThroughputTypeDef,
        global_secondary_index: Sequence[GlobalSecondaryIndexTypeDef],
    ):
        try:
            table = (
                self.resource.create_table(
                    TableName=table_name,
                    KeySchema=key_scheme,
                    AttributeDefinitions=attribute_definitions,
                    ProvisionedThroughput=provisioned_throughput,
                    GlobalSecondaryIndexes=global_secondary_index,
                )
                if global_secondary_index
                else self.resource.create_table(
                    TableName=table_name,
                    KeySchema=key_scheme,
                    AttributeDefinitions=attribute_definitions,
                    ProvisionedThroughput=provisioned_throughput,
                )
            )
            table.wait_until_exists()
            return table
        except ClientError as err:
            logger.error(
                "Couldn't create table %s. Here's why: %s: %s",
                table_name,
                err.response["Error"]["Code"],
                err.response["Error"]["Message"],
            )
            raise

    def build(
        self,
        table_name: str,
        key_scheme: Sequence[KeySchemaElementTypeDef],
        attribute_definitions: Sequence[AttributeDefinitionTypeDef],
        provisioned_throughput: ProvisionedThroughputTypeDef = defaultProvisionedThroughputTypeDef,
        global_secondary_index: Sequence[GlobalSecondaryIndexTypeDef] = None,
    ) -> Table:
        try:
            table = self.resource.Table(table_name)
            table.load()
            logger.info(f"Table Loaded {table_name} Loaded successfully")
            return table
        except ClientError as err:
            logger.info(f"Creating table {table_name}")
            return self.__create_table(
                table_name=table_name,
                key_scheme=key_scheme,
                attribute_definitions=attribute_definitions,
                provisioned_throughput=provisioned_throughput,
                global_secondary_index=global_secondary_index,
            )
