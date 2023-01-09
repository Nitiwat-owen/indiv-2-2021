from curses import doupdate
import json
from tokenize import Double

ls = []
count = 1
with open("binding_affinity_example_output.txt", 'r') as f :
    lines = f.readlines()
    for line in lines :
        dic = dict()
        data = line.strip().split("\t")
        # print(data)
        dic["ID"] = count
        count+=1
        dic["compoundID"] = data[0]
        dic["SMILES"] = data[1]
        dic['proteinID'] = data[2]
        dic['bindingAffinity'] = float(data[3])
        ls.append(dic)

with open("sortMock.json", 'w') as f :
    f.write(json.dumps(ls))    
        