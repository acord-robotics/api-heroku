import requests

r = requests.get('https://learn-by-api.glitch.me/intro')
print(r)
print(r.text)