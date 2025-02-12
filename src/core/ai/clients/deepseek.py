import os
from openai import OpenAI

API_KEY = os.getenv('DEEPSEEK_API_KEY')

DeepSeekClient = OpenAI(
  api_key=API_KEY,
  base_url="https://api.deepseek.com"
)

__all__ = ['DeepSeekClient']