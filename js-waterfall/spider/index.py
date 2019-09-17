import requests
from bs4 import BeautifulSoup
import json

list = []

def spiderInfo(item):
  title = item.find('span').text
  rank = item.find('em').text
  rate = item.find(property="v:average").text
  img = item.find('img')['src']
  obj = {'rank': rank, 'title': title, 'rate': rate, 'img': img}
  print(obj)
  list.append(obj)

def cycle(start):
  url = 'https://movie.douban.com/top250?start=' + str(start)
  response = requests.get(url)
  bs = BeautifulSoup(response.text, 'html.parser')
  arr = bs.find_all('div', class_='item')
  for item in arr:
    spiderInfo(item)

for i in range(0, 10):
  cycle(i*25)
  with open('./js-waterfall/spider/movie.json', 'a+', encoding='utf-8') as f:
    # for data in list:
    dict = { 'movie': list }
    # print(dict, 'dict')
    f.write(json.dump(dict, ensure_ascii=False) + '\n')

