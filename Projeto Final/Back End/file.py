# -*- coding: utf-8 -*-
#execution: python file.py > outputfile.json
import re

#remove big sequences of blank spaces from the string that separates each field
def RemoveSpaces(string):
	buff = string[0]
	for i in range(0, len(string)):
		if(buff == ' ' and string[i] == ' '):
			return(string[0:i-1])
		buff = string[i]
	return string


#parse file from databank
def ParseFile(filename):
	with open(filename,"r") as fp:
		for line in fp:
			storeName = RemoveSpaces(line[0:61])
			address =RemoveSpaces( line[61:117])
			CEP = RemoveSpaces(line[117:127])
			district = RemoveSpaces(line[127:143])
			description = RemoveSpaces(line[143:len(line) -2])
			print('{ "storeName": "' + storeName + '", "address": "'+address +'", "CEP": "'+ CEP +'", "district": "'+ district + '", "description": "' + description + '" }')	
		
ParseFile("COMERCIO.TXT")