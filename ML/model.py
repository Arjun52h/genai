
import re
import math
from collections import Counter

from skills import extract_skills


STOP_WORDS = {
    "the", "a", "an", "and", "or", "is", "are", "was",
    "were", "to", "of", "in", "on", "for", "with", "by",
    "as", "at", "from", "this", "that", "it", "be", "will",
    "have", "has", "had", "we", "you", "your", "our"
}


def tokenize(text):
    words = re.findall(
        r"[a-z0-9]+(?:[+#.][a-z0-9+#.]*)*",
        str(text).lower()
    )

    words = [
        word for word in words
        if word not in STOP_WORDS
    ]

    # Include single words and consecutive two-word phrases.
    bigrams = [
        words[i] + " " + words[i + 1]
        for i in range(len(words) - 1)
    ]

    return words + bigrams


def calculate_similarity(text1, text2):

    documents = [
        tokenize(text1),
        tokenize(text2)
    ]

    document_frequency = Counter()

    for document in documents:
        document_frequency.update(set(document))

    total_documents = len(documents)
    vectors = []

    for document in documents:

        counts = Counter(document)
        total_terms = len(document)

        vector = {}

        if total_terms == 0:
            vectors.append(vector)
            continue

        for term, count in counts.items():

            tf = count / total_terms

            idf = math.log(
                (1 + total_documents) /
                (1 + document_frequency[term])
            ) + 1

            vector[term] = tf * idf

        vectors.append(vector)

    vector1, vector2 = vectors

    if not vector1 or not vector2:
        return 0.0

    common_terms = set(vector1) & set(vector2)

    dot_product = sum(
        vector1[term] * vector2[term]
        for term in common_terms
    )

    magnitude1 = math.sqrt(
        sum(value ** 2 for value in vector1.values())
    )

    magnitude2 = math.sqrt(
        sum(value ** 2 for value in vector2.values())
    )

    if magnitude1 == 0 or magnitude2 == 0:
        return 0.0

    return dot_product / (magnitude1 * magnitude2)


def analyze_resume_job(resume, job_description):

    similarity = calculate_similarity(
        resume,
        job_description
    )

    match_score = round(
        max(0.0, min(1.0, similarity)) * 100,
        2
    )

    resume_skills = set(extract_skills(resume))
    job_skills = set(extract_skills(job_description))

    matched_skills = sorted(
        resume_skills.intersection(job_skills)
    )

    missing_skills = sorted(
        job_skills - resume_skills
    )

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
