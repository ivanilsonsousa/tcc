import os
from google import genai

API_KEY = os.getenv('GEMINI_API_KEY')

GeminiClient = genai.Client(
  api_key=API_KEY
)

__all__ = ['GeminiClient']