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

def get_pokemon_datas(content,contenttext):
    # for i in content:
    poke_number = re.findall(f"data-sort-value=\"\d+\"",content)
    poke_numbers_list = re.findall(f"\d+",str(poke_number))
    poke_name = re.findall(f"href=\"/pokedex/") #TODO
    print(contenttext)


get_pokemon_datas(str(content),content.text)


# for i in content.children:
#     print(i)


    
    

