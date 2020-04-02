def split(word): 
    return [char for char in word]

def execRule(bot):
    min = 0
    max = 0
    if bots[bot][0] > bots[bot][1]:
        min = bots[bot][1]
        max = bots[bot][0]
    else:
        min = bots[bot][0]
        max = bots[bot][1]
    bots[bot] = []
    if min == 17 and max == 61:
        print('soluzione 1: ', bot);
    if rules[bot][0][0] == 'bot':
        if rules[bot][0][1] in bots:
            bots[rules[bot][0][1]].append(min)
            if len(bots[rules[bot][0][1]]) == 2:
                execRule(rules[bot][0][1])
        else:
            bots[rules[bot][0][1]] = [min]
    else:
        if rules[bot][0][1] in outputs:
            outputs[rules[bot][0][1]].append(min)
        else:
            outputs[rules[bot][0][1]] = [min]
    if rules[bot][1][0] == 'bot':
        if rules[bot][1][1] in bots:
            bots[rules[bot][1][1]].append(max)
            if len(bots[rules[bot][1][1]]) == 2:
                execRule(rules[bot][1][1])
        else:
            bots[rules[bot][1][1]] = [max]
    else:
        if rules[bot][1][1] in outputs:
            outputs[rules[bot][1][1]].append(max)
        else:
            outputs[rules[bot][1][1]] = [max]

file = open('input.txt', 'r')
#file = open('test.txt', 'r')
lines = file.readlines()

bots = {}
outputs = {}

rules = {}
values = []

for line in lines:
    line = line.rstrip("\n").split(' ')
    if line[0] == 'bot':
        rules[line[1]] = [[line[5], line[6]], [line[10], line[11]]]
    elif line[0] == 'value':
        values.append(line)

for line in values:
    if line[5] in bots:
        bots[line[5]].append(int(line[1]))
    else:
        bots[line[5]] = [int(line[1])]
    if len(bots[line[5]]) == 2:
        execRule(line[5])

res = outputs['0'][0] * outputs['1'][0] * outputs['2'][0]

print('soluzione 2: ', res)
