import requests
from bs4 import BeautifulSoup
import pdfkit

# Fetch the webpage
response = requests.get("https://news.ycombinator.com")

# Use BeautifulSoup to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Convert the parsed HTML content into a string
html_content = str(soup)

# Set options for pdfkit
options = {
    'page-size': 'Letter',
    'encoding': "UTF-8",
    'no-images': True,
    'no-external-links': True,
}

# Use pdfkit to convert the HTML string into a PDF file
pdfkit.from_string(html_content, "hacker_news_homepage.pdf", options=options)
