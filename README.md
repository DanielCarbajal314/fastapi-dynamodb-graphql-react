# Fastapi with Graphene Graphql, Vite-React-Typecript, DynamoDb

This project is a full-stack web application fully containerized that allows user to emulates a Kanban board using the next techstack

- __Backend__: Using [Fastapi](https://fastapi.tiangolo.com/) basic setup we build a Graphql server app with [Graphene](https://graphene-python.org/). The server persists data over [DynamoDb running locally in a container](https://hub.docker.com/r/amazon/dynamodb-local).

- __Frontend__: SPA wiht [React](https://react.dev/) and [Typescript](https://www.typescriptlang.org/) using with [Vite](https://vitejs.dev/). The graphql interface is handle with [Apollo Client](https://www.apollographql.com/docs/react/). The css is handle by [Tailwind](https://tailwindcss.com/). Unit test is implemented with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

The whole developer enviroment runs on the next containers:

-  server - Runs the graphql backend in watch mode
-  ui - Runs vite developer enviroment in watch mode
-  dynamodb - Runs DynamoDb locally
-  awscli - Runs a container to use aws-cli to run commands agains dynamodb

### Make commands

By using a Make file most common developer operations are stored to expose a easy to use contact surface - _most of the operations are executed inside containers_ - with the following commands:

-  __setup__ - Builds the docker images and install local depenencies to have intellisence on Vscode

- __up__ - Starts all the container

- __down__ - Turns off and remove containers

- __aws-cli__ - Shells into the aws-cli container to execute aws commands

- __create-table__ - Creates a table on DynamoDb

- __list-tables__ - Lists all tables created on DynamoDb

- __list-table-items__ - Lists all items for a table with queried name

- __delete-local-data__ - Deletes local volume where DynamoDb Container stores data

- __format__ - Runs Black on Backeend Python code and Runs Prettier on Frontend Typescript code

- __unit-test-dev-watch__ - Runs Frontend Unit Test and starts a watch state over code

- __unit-test-ci__ - Runs Frontend Unit Test ones

- __open-grapiql__ - Opens Graphene Graphql Client app
