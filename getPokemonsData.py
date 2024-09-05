from bs4 import BeautifulSoup
import requests

url = "https://www.pokepedia.fr/Liste_des_Pokémon_dans_l%27ordre_du_Pokédex_National#Liste_des_Pokémon"

page = requests.get(url)
soup = BeautifulSoup(page.text, 'html')

print(soup.find_all("table"))