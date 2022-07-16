import motor.motor_asyncio
from model import UniversityModel
import os
from dotenv import load_dotenv

load_dotenv()

client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URI"))

db = client.GradHelp
collection = db.universities


async def fetch_all_unis():
    unis = []
    async for document in collection.find():
        unis.append(UniversityModel(**document))
    return unis


async def fetch_uni_by_name(name):
    document = await collection.find_one({"name": name})
    if document:
        return UniversityModel(**document)
    return None
