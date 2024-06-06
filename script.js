document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/anime')
        .then(response => response.json())
        .then(data => {
            const animeContainer = document.getElementById('anime-container');
            data.forEach(anime => {
                const animeCard = document.createElement('div');
                animeCard.classList.add('anime-card');
                animeCard.innerHTML = `
                    <img src="${anime.image_url}" alt="${anime.title}">
                    <h3>${anime.title}</h3>
                    <p>${anime.synopsis}</p>
                    <button class="watch-button" data-video-url="${anime.video_url}">Watch Now</button>
                ;`
                animeContainer.appendChild(animeCard);
            });

            // Add event listeners to the watch buttons
            const watchButtons = document.querySelectorAll('.watch-button');
            const modal = document.getElementById('video-modal');
            const videoElement = document.getElementById('anime-video');
            const closeButton = document.querySelector('.close-button');

            watchButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const videoUrl = this.getAttribute('data-video-url');
                    videoElement.src = videoUrl;
                    modal.style.display = 'block';
                });
            });

            closeButton.addEventListener('click', function() {
                modal.style.display = 'none';
                videoElement.src = ''; // Stop the video
            });

            window.addEventListener('click', function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                    videoElement.src = ''; // Stop the video
                }
            });
        });
});