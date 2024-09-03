from dimensions.decomposicao import config as decomposicao_config
from core import read_file, save_md_file, make_documentation, Engine

engine = Engine(dimension=decomposicao_config)

code = read_file(path='./../md/codigo.md')
# documentation = read_file(path='./md/llm.md')

general_context = read_file(path='./../md/prompt/general_context.md')
documentation = make_documentation(general_context=general_context)

save_md_file(content=documentation, path="./../md/docs/")

engine.inputs(code=code, documentation=documentation)

engine.set_evidence(evidence_key='4')
engine.set_clue(clue_key='4.1')

engine.output()

print("\n-----------------------------------------------------------\n")

# engine.set_clue(clue_key='4.2')
# engine.output()
