from fastapi import FastAPI
from pydantic import BaseModel

from model import analyze_resume_job


app = FastAPI(
    title="Interview ML Service",
    description="Resume and Job Description Matching API",
    version="1.0.0"
)


class AnalysisRequest(BaseModel):
    resume: str
    jobDescription: str


@app.get("/")
def home():
    return {
        "message": "Interview ML Service is running"
    }


@app.post("/analyze")
def analyze(request: AnalysisRequest):

    result = analyze_resume_job(
        request.resume,
        request.jobDescription
    )

    return result