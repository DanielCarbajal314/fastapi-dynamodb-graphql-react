from fastapi import FastAPI, Request, logger
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from fastapi.middleware.cors import CORSMiddleware
from logging import getLogger

logger = getLogger(__name__)
app = FastAPI()


@app.get("/healthcheck/")
def healthcheck():
    return "Health - OK"
