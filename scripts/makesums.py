import itertools
import json

nums = [1,2,3,4,5,6,7,8,9]
sizes = [2,3,4,5,6,7,8,9]

obj = {}

for size in sizes:
    obj[size] = {}
    for combo in itertools.combinations(nums,size):
        obj[size].setdefault(sum(combo), []).append("".join([str(x) for x in combo]))

print(obj)

with open("sums.json","w") as f:
    json.dump(obj,f,indent=4)