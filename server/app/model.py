from pydantic import BaseModel


class UniversityModel(BaseModel):
    name: str
    tuition: str
    rank: int
    acceptance: str
    website: str
    location: str


class ProfileModel(BaseModel):
    greQ: int  # 130-170
    greV: int  # 130-170
    greA: float  # 1.0-6.0
    toefl: int  # 1-120
    cgpa: float  # 1.0-10.0
    sop: int  # 1-5
    lor: int  # 1-5
    research: int  # in months
    industry: int  # in months
