from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, user, journey, chat, scenario

app = FastAPI(title="CivIQ API", description="AI-powered civic assistant backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(user.router, prefix="/user", tags=["user"])
app.include_router(journey.router, prefix="/journey", tags=["journey"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(scenario.router, prefix="/scenario", tags=["scenario"])

@app.get("/")
def read_root():
    return {"message": "Welcome to CivIQ API"}
