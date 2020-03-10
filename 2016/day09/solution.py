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
