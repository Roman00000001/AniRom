from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/anime')
def get_anime():
    url = 'https://api.jikan.moe/v4/top/anime'
    response = requests.get(url)
    data = response.json()
    animes = []
    for item in data['data'][:10]:  # Limiting to top 10 for simplicity
        animes.append({
            'title': item['title'],
            'image_url': item['images']['jpg']['image_url'],
            'synopsis': item['synopsis'],
            'video_url': 'https://www.example.com/path/to/anime/video.mp4'  # Placeholder URL
        })
    return jsonify(animes)

if __name__ == '__main__':
    app.run(debug=True)