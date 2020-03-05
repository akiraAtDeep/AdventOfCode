def split(word): 
    return [char for char in word]

def findABBA(word):
    tmp = split(word)
    i = 0
    ret = 0
    while i < (len(tmp) - 3):
        if tmp[i] != tmp[i+1]:
            if tmp[i] == tmp[i+3]:
                if tmp[i+1] == tmp[i+2]:
                    ret = 1
                    i = len(tmp)
        i += 1
    return ret

def findABA(word):
    tmp = split(word)
    i = 0
    ret = 0
    asd = []
    while i < (len(tmp) - 2):
        if tmp[i] == tmp[i+2] and tmp[i] != tmp[i+1]:
            ret = word[i:i+3]
            asd.append(word[i:i+3])
        i += 1
    if len(asd) > 0:
        ret = asd
    return ret

def findBAB(word,aba):
    bab = aba[1] + aba[0] + aba[1]
    i = 0
    ret = 0
    while i < (len(tmp) - 3):
        if word[i:i+3] == bab:
            ret = 1
            i = len(tmp)
        i += 1
    return ret

file = open('input.txt', 'r')
#file = open('test.txt', 'r')
lines = file.readlines()

count1 = 0
count2 = 0

for line in lines:
    tmp = split(line)
    asd = ''
    hypernets = []
    supernets = []
    for char in tmp:
        if char == '[':
            supernets.append(asd)
            asd = ''
        elif char == ']':
            hypernets.append(asd)
            asd = ''
        else:
            asd += char
    if asd != '':
        supernets.append(asd)

    test = 0
    for hypernet in hypernets:
        test = findABBA(hypernet)
        if test:
            break
    if not test:
        for supernet in supernets:
            test = findABBA(supernet)
            if test:
                count1 += 1
                break
    
    for supernet in supernets:
        abas = findABA(supernet)
        if abas != 0:
            found = 0
            for aba in abas:
                if not found:
                    for hypernet in hypernets:
                        if findBAB(hypernet, aba):
                            count2 += 1
                            found = 1
                            break
            
            
print('prima soluzione: ', count1)
print('seconda soluzione: ', count2)
