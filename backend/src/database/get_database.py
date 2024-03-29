from boto3 import Session
from ..config import AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, DYNAMODB_URL
from mypy_boto3_dynamodb import DynamoDBClient
from .Database import Database
from fastapi import Depends

session = Session(
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION,
)


def get_database() -> Database:
    resource = session.resource("dynamodb", endpoint_url=DYNAMODB_URL)
    return Database(resource)
