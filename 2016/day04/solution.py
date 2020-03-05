import re

def split(word): 
    return [char for char in word]

file1 = open('input.txt', 'r')
lines = file1.readlines()

sumIds = 0
realRooms = {}

for line in lines:
    line = line.split('-')
    tmp = ''
    asd = line[len(line)-1].split('[')
    id = int(asd[0])
    asd = asd[1].split(']')
    asd = asd[0]
    
    fullString = ''
    for i in range(0, len(line)-1):
        tmp += line[i]
        tmp += ' '
        fullString += line[i]
    fullString = split(fullString)
    fullString.sort()
    dictionary = {}
    lastChar = fullString[0]
    count = 0
    for char in fullString:
        if lastChar != char:
            dictionary[lastChar] = count
            lastChar = char
            count = 1
        else:
            count += 1
    dictionary[lastChar] = count
    newHash = []
    while len(newHash) < 5:
        maxValue = 0
        maxElement = ''
        for element in dictionary:
            if int(dictionary[element]) > maxValue:
                maxValue = int(dictionary[element])
                maxElement = element
        newHash.append(maxElement)
        dictionary.pop(maxElement)
    if ''.join(newHash) == asd:
        sumIds += id
        realRooms[tmp]=id

print ('the answare is:', sumIds)

for room in realRooms:
    tmp = room
    room = split(room)
    decrypt = ''
    for letter in room:
        if letter != ' ':
            shift = int(realRooms[tmp])%26
            val = ord(letter)
            if val + shift > 122:
                shift = shift - 26
            decrypt += chr(val + shift)
        else:
            decrypt += ' '
    if re.search("northpole", decrypt):
        print('the sector ID is: ', realRooms[tmp])
        break
