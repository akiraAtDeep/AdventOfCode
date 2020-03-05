def split(word): 
    return [char for char in word]

file = open('input.txt', 'r')
#file = open('test.txt', 'r')
lines = file.readlines()


dic = {}

for i in range(0, len(lines[0])):
    dic[i] = {}

for line in lines:
    strSplit = split(line)
    i = 0
    for char in strSplit:
        if char not in dic[i]:
            dic[i][char] = 1
        else:
            dic[i][char] += 1
        i += 1

message1 = ''
message2 = ''

for pos in dic:
    n1 = 0
    mostCommon = ''
    n2= len(lines)
    leastCommon = ''
    for char in dic[pos]:
        if dic[pos][char] > n1:
            n1 = dic[pos][char]
            mostCommon = char
        elif dic[pos][char] < n2:
            n2 = dic[pos][char]
            leastCommon = char
    message1 += mostCommon
    message2 += leastCommon

print('prima soluzione: ', message1)
print('seconda soluzione: ', message2)
