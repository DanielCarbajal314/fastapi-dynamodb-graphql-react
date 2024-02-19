from typing import Optional
from pydantic import BaseModel


class Page(BaseModel):
    last_key: Optional[str]
    size: int


default_page = Page(size=20, last_key=None)
