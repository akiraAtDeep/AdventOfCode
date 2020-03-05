import hashlib
import re

file = open('input.txt', 'r')
input = file.read()
#input = 'abc'

password1 = ''
password2 = {}
index = 0

while len(password2) < 8:
    m = hashlib.md5()
    m.update((input+str(index)).encode('utf-8'))
    hex_m = m.hexdigest()
    if hex_m[0:5] == '00000':
        if len(password1) < 8:
            password1 += hex_m[5:6]
        if re.search("[0-7]", hex_m[5:6]):
            if int(hex_m[5:6]) not in password2:
                password2[int(hex_m[5:6])] = hex_m[6:7]
    index += 1

tmp = ''
for i in range(0, 8):
    tmp += password2[i]

print('La prima password è: ', password1)
print('La seconda password è: ', tmp)
