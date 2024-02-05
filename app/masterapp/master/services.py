import json
def calculate_complexity(response):
    complexity = 0
    parsed_response = []
    for i in response.replace("[","").replace("]","").split("},"):
        try:
            parsed_response.append(json.loads(i.replace("'","\"")+"}"))
        except:
            parsed_response.append(json.loads(i.replace("'","\"")))
    for emergency in parsed_response:
        l_i = int(emergency["l_i"])
        d_i = float(emergency["d_i"])
        id = emergency["id"]
        complexity += l_i * d_i / 100
    return complexity

