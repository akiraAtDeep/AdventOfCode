import re

def split(word): 
    return [char for char in word]

def findCompressData(line):
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
            ret = decompres(times, line[i+n : i+n+nchar])
            res += ret
            i = i + n + nchar
    return res

def decompres(times, string):
    res = ''
    for a in range(0, times):
        res += string
    return res

file = open('input.txt', 'r')
#file = open('test2.txt', 'r')
lines = file.readlines()

for line in lines:
    length = 0
    res = line
    goOn = re.search("\([0-9]{1,3}x[0-9]{1,3}\)", res)
    while goOn:
        if res[0:1] == '(':
            res = findCompressData(res)
        else:
            i=1
            while i<len(res):
                if res[i:i+1] == '(':
                    length += len(res[0:i-1])
                    res = findCompressData(res[i:len(res)])
                    i=len(res)
                else:
                    i += 1
        goOn = re.search("\(*x*\)", res)
    length += len(res)
    print(length)

