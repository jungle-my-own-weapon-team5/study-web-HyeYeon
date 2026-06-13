from app.database import Base, engine
from back.app import models

Base.metadata.create_all(bind=engine)