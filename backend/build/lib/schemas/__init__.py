from .ProjectActions import ProjectQuery, ProjectMutations
from .TaskActions import TaskQuery, TaskMutations

from graphene import Schema


class GlobalQuery(TaskQuery, ProjectQuery):
    pass


class GlobalMutation(ProjectMutations, TaskMutations):
    pass


AppSchema = Schema(query=GlobalQuery, mutation=GlobalMutation)
