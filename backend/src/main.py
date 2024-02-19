from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from logging import getLogger
from starlette_graphene3 import GraphQLApp, make_graphiql_handler
from .schemas import AppSchema

logger = getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_route("/graphql", GraphQLApp(schema=AppSchema, on_get=make_graphiql_handler()))
