import os
from openai import OpenAI

API_KEY = os.getenv('DEEPSEEK_API_KEY')
DEEPSEEK_BASE_URL = os.getenv('DEEPSEEK_BASE_URL')

DeepSeekClient = OpenAI(
  api_key=API_KEY,
  base_url=DEEPSEEK_BASE_URL
)

__all__ = ['DeepSeekClient']