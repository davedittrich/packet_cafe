import json
import os

# Note: This code is duplicative of that in workers/worker.py
def load_tools(tools_dir='/definitions/workers.d'):
    tools = []
    filenames = os.listdir(tools_dir)
    for file_name in [name for name in filenames if name.endswith('.json')]:
        with open(os.path.join(tools_dir, file_name)) as json_file:
            description = json.load(json_file)
        if 'name' not in description:
            # Inherit worker/tool name from file name if necessary
            description['name'] = os.path.splitext(file_name)[0]
        tools.append(description)
    return {'workers': tools}
