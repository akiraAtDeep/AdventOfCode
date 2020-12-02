<<<<<<< HEAD
def plot(display):
    for row in display:
        tmp = ''
        for pixel in row:
            if pixel:
                tmp += '#'
            else:
                tmp += '.'
        print(tmp)
    print('--------')

file = open('input.txt', 'r')
#file = open('test.txt', 'r')
lines = file.readlines()

display = []
for y in range(0,6):
    row = []
    for x  in range(0,50):
        row.append(0)
    display.append(row)

for line in lines:
    line = line.rstrip("\n").split(' ')
    if line[0] == 'rect':
        coord = line[1].split('x')
        for y in range(0,int(coord[1])):
            for x in range(0,int(coord[0])):
                display[y][x] = 1
    else:
        if line[1] == 'row':
            y = int(line[2].split('=')[1])
            tmp = display[y].copy()
            for i in range(0,len(tmp)):
                nextPos = i + int(line[4])
                if nextPos > len(tmp)-1:
                    nextPos = nextPos - len(tmp)
                display[y][nextPos] = tmp[i]
        else:
            x = int(line[2].split('=')[1])
            tmp = []
            for i in range(0,len(display)):
                tmp.append(display[i][x])
            for i in range(0,len(display)):
                prevPos = i - int(line[4])
                if prevPos < 0:
                    prevPos = prevPos + len(tmp)
                display[i][x] = tmp[prevPos]
    #plot(display)


count = 0
for row in display:
    for pixel in row:
        if pixel:
            count += 1

print('prima parte: ', count)
plot(display)
=======
def split(word): 
    return [char for char in word]

def decompres(times, string):
    res = ''
    for a in range(0, times):
        res += string
    return res

#file = open('input.txt', 'r')
file = open('test.txt', 'r')
lines = file.readlines()

length = 0

for line in lines:
    res = ''
    tmp = split(line.rstrip("\n"))
    i=0
    while i < len(tmp):
        if tmp[i] != '(':
            res += tmp[i]
            i += 1
        else:
            nchar = ''
            times = ''
            n = 1
            while tmp[i+n] != 'x':
                nchar += tmp[i+n]
                n += 1
            n += 1
            nchar = int(nchar)
            while tmp[i+n] != ')':
                times += tmp[i+n]
                n += 1
            n += 1
            times = int(times)

            res += decompres(times, line[i+n : i+n+nchar])
            i = i + n + nchar
            
    print(res)
    length += len(res)

print(length)
>>>>>>> 15125849172c72a4bf9978cdb61f4bb1e48d6a76
