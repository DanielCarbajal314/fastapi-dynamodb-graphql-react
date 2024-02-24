from graphene import ObjectType, String, List, Mutation, Field
from ..database import get_database


class ProjectType(ObjectType):
    id = String()
    name = String()


class ProjectQuery(ObjectType):
    projects = List(ProjectType)
    project = Field(ProjectType, project_id=String())

    def resolve_projects(root, info):
        database = get_database()
        return database.project_repository.list()

    def resolve_project(root, info, project_id):
        database = get_database()
        return database.project_repository.get_by_id(project_id)


class CreateProject(Mutation):
    class Arguments:
        name = String()

    id = String()
    name = String()

    def mutate(root, info, name):
        database = get_database()
        project = database.project_repository.create(name)
        return CreateProject(**project.model_dump())


class ProjectMutations(ObjectType):
    create_project = CreateProject.Field()
