include .env

setup:
	docker compose build
	npm --prefix ./frontend install ./frontend
	pip3 install ./backend

up:
	docker compose up

down:
	docker compose down -v

aws-cli:
	docker compose exec awscli sh

create-table:
	docker compose exec awscli bash -c "aws dynamodb create-table --endpoint-url http://dynamodb:8000 --table-name $(name) --attribute-definitions AttributeName=ISBN,AttributeType=S --key-schema AttributeName=ISBN,KeyType=HASH --billing-mode PAY_PER_REQUEST"

list-tables:
	docker compose exec awscli bash -c "aws dynamodb list-tables --endpoint-url http://dynamodb:8000"

list-table-items:
	docker compose exec awscli bash -c "aws dynamodb scan --table-name $(name) --endpoint-url http://dynamodb:8000"

delete-local-data:
	rm -r ./docker

format:
	docker compose exec server bash -c "black ./src"
	docker compose exec ui bash -c "npx prettier --write ."

unit-test-dev-watch:
	docker compose exec ui bash -c "npm run unit-test-develop"

unit-test-ci:
	docker compose exec ui bash -c "npm run unit-test-ci"

open-grapiql:
	open http://localhost:8500/graphql