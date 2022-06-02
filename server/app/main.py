from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import UniversityModel, ProfileModel
from database import fetch_all_unis, fetch_uni_by_name
from utils import get_uni_rating, predict_admission, recommend_universities


app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ROUTES
@app.get("/")
def get_root():
    return {"Hello": "World"}


@app.get("/api/unis", response_model=List[UniversityModel])
async def get_universities():
    response = await fetch_all_unis()
    return response


@app.get("/api/unis/{name}", response_model=UniversityModel)
async def get_university_by_name(name: str):
    response = await fetch_uni_by_name(name)
    if response:
        return response
    raise HTTPException(status_code=404, detail="University not found")


@app.post("/api/predict_admission/{uni_rank}")
async def admission_chance_prediction(uni_rank: int, profile: ProfileModel):
    gre = profile.greQ + profile.greV
    rating = get_uni_rating(uni_rank)
    research = 0 if profile.research == 0 else 1
    return predict_admission(
        gre, profile.toefl, rating, profile.sop, profile.lor, profile.cgpa, research
    )


@app.post("/api/recommend_universities")
async def universities_recommendation(profile: ProfileModel):
    cgpaNorm = round(profile.cgpa / 10, 2)
    return recommend_universities(
        profile.research,
        profile.industry,
        profile.toefl,
        profile.greV,
        profile.greQ,
        profile.greA,
        cgpaNorm,
    )
