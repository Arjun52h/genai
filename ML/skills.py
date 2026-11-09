SKILL_ALIASES = {
    "node": "node.js",
    "node.js": "node.js",
    "express": "express.js",
    "express.js": "express.js",

    "react": "react",
    "react.js": "react",

    "mongodb": "mongodb",
    "mysql": "mysql",
    "postgresql": "postgresql",
    "postgres": "postgresql",

    "javascript": "javascript",
    "typescript": "typescript",
    "python": "python",
    "java": "java",
    "c++": "c++",

    "rest": "rest api",
    "rest api": "rest api",
    "api": "rest api",

    "aws": "aws",
    "azure": "azure",
    "gcp": "gcp",

    "docker": "docker",
    "kubernetes": "kubernetes",

    "git": "git",
    "github": "github",

    "html": "html",
    "css": "css",
    "tailwind": "tailwind",

    "machine learning": "machine learning",
    "deep learning": "deep learning",
    "tensorflow": "tensorflow",
    "pytorch": "pytorch",
    "scikit-learn": "scikit-learn",

    "nlp": "nlp",
    "hadoop": "hadoop",
    "spark": "spark",

    "pandas": "pandas",
    "numpy": "numpy",
    "power bi": "power bi",
    "excel": "excel",
    "data analysis": "data analysis",

    "linux": "linux"
}


def extract_skills(text):
    text = text.lower()

    found = set()

    for keyword, normalized_skill in SKILL_ALIASES.items():
        if keyword in text:
            found.add(normalized_skill)

    return list(found)

