from dimensions.decomposicao import config as decomposicao_config
from make_documentation import make as make_documentation
from utils import read_file, create_file, get_timestamp
from engine import Engine

engine = Engine(dimension=decomposicao_config)

code = read_file(path_file='./md/codigo.md')
# documentation = read_file(path_file='./md/llm.md')

general_context = read_file(path_file='./md/prompt/general_context.md')
documentation = make_documentation(general_context=general_context)

timestamp = get_timestamp()
filename = f"arquivo_{timestamp}.md"
path = f"./md/docs/{filename}"

create_file(content=documentation, path=path)

engine.inputs(code=code, documentation=documentation)

engine.set_evidence(evidence_key='4')
engine.set_clue(clue_key='4.1')

engine.output()

print("\n-----------------------------------------------------------\n")

engine.set_clue(clue_key='4.2')
engine.output()
