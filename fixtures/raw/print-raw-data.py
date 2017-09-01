import json

with open('html-snippet.txt') as f:
    read_data = f.read()
f.closed

print(json.dumps({"code": read_data}))

with open('javascript-snippet.txt') as g:
    read_data = g.read()
g.closed

print(json.dumps({"code": read_data}))

with open('python-snippet.txt') as h:
    read_data = h.read()
h.closed

print(json.dumps({"code": read_data}))

with open('c-snippet.txt') as j:
    read_data = j.read()
j.closed

print(json.dumps({"code": read_data}))
