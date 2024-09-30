import os
from openai import OpenAI

API_KEY = os.getenv('OPENAI_API_KEY')

OpenaiClient = OpenAI(
  api_key=API_KEY
)

__all__ = ['OpenaiClient']