file= open("input.txt","r")
Lines = file.readlines() 
c0 = []
c1 = []
c2 = []
count = 0
for line in Lines: 
	letters = ""
	tmp = []
	for letter in line:
		if letter == " " and letters != "":
			tmp.append(int(letters))
			letters = ""
		elif letter != " ":
			letters = letters + letter
	tmp.append(int(letters.replace("\n","")))
	
	c0.append(tmp[0])
	c1.append(tmp[1])
	c2.append(tmp[2])
	
for x in range (0, len(c0), 3):
	if (c0[x] + c0[x+1]) > c0[x+2] and (c0[x] + c0[x+2]) > c0[x+1] and (c0[x+1] + c0[x+2]) > c0[x]:
		count += 1
	if (c1[x] + c1[x+1]) > c1[x+2] and (c1[x] + c1[x+2]) > c1[x+1] and (c1[x+1] + c1[x+2]) > c1[x]:
		count += 1
	if (c2[x] + c2[x+1]) > c2[x+2] and (c2[x] + c2[x+2]) > c2[x+1] and (c2[x+1] + c2[x+2]) > c2[x]:
		count += 1
print(count)