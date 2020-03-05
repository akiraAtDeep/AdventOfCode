file= open("input.txt","r")
Lines = file.readlines() 
  
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
	
	if (tmp[0] + tmp[1]) > tmp[2] and (tmp[0] + tmp[2]) > tmp[1] and (tmp[1] + tmp[2]) > tmp[0]:
		count += 1
print(count)