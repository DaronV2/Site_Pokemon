from bs4 import BeautifulSoup
import requests
import re 
import json

class Pokemon(object):
    def __init__(self, poke_number):
        self.poke_number = poke_number

url = "https://pokemondb.net/pokedex/all"

page = requests.get(url)
soup = BeautifulSoup(page.text, 'html')

content = BeautifulSoup(
    "\n".join(map(str, soup.select("#pokedex"))), "html.parser"
)

def correct_name(name):
    res = ""
    i = 0
    while (name[i] != ' '):
        res += name[i]
        i += 1
    res = res[:-1]
    print(res)
    return res  

def split_content(content):
    split = re.findall(r"<tr.*?>.*?</tr>",content, re.DOTALL)
    return split

def get_pokemon_datas(content):
    # for i in content:
    splited = split_content(content)
    print(splited[1])
    
        

    
    # poke_number = re.findall(r"data-sort-value=\"\d+\"",content)
    # poke_numbers_list = re.findall(f"\d+",str(poke_number))
    # poke_name = re.findall(r"(?<=href=\"/pokedex/)[^/]+(?=\").\w",content) #TODO
    # list_poke_name = []
    # for i in poke_name:
    #     list_poke_name.append(correct_name(i))

get_pokemon_datas(str(content))

data = open('pokemons.json', encoding="utf8") 
 
print("Datatype before deserialization : "
      + str(type(data)))
    
# deserializing the data
data = json.load(data) 
 
print("Datatype after deserialization : "
      + str(type(data)))

for i in data: 
    print(i)

  