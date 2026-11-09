from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from skills import extract_skills


# Load the pretrained NLP model
model = SentenceTransformer("all-MiniLM-L6-v2")


def analyze_resume_job(resume, job_description):

    # Convert resume and job description into embeddings
    resume_embedding = model.encode([resume])
    job_embedding = model.encode([job_description])

    # Calculate semantic similarity
    similarity = cosine_similarity(
        resume_embedding,
        job_embedding
    )[0][0]

    # Convert similarity to percentage
    match_score = round(float(similarity) * 100, 2)

    # Extract skills
    resume_skills = set(extract_skills(resume))
    job_skills = set(extract_skills(job_description))

    # Skills present in both
    matched_skills = sorted(
        list(resume_skills.intersection(job_skills))
    )

    # Skills required by JD but missing from resume
    missing_skills = sorted(
        list(job_skills - resume_skills)
    )

    # Match category
    if match_score >= 80:
        match_level = "Strong Match"
    elif match_score >= 60:
        match_level = "Moderate Match"
    else:
        match_level = "Needs Improvement"

    return {
        "matchScore": match_score,
        "matchLevel": match_level,
        "matchedSkills": matched_skills,
        "missingSkills": missing_skills
    }