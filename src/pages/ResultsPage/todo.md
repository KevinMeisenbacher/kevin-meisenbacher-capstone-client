🚀 Bonus improvement (performance)

Right now every Song component fetches artists, genres, subgenres, users, likes, hates individually.

If you render 50 songs, that’s hundreds of requests.

A better architecture:

ResultsPage fetches:

artists

genres

subgenres

likes

hates

Then passes them as props to Song.

Massive performance improvement.