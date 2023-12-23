const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2M1ZDE5OWUxZWMxODk3YjI5NGMwMjgxMTBjNjdkYSIsInN1YiI6IjY1ODU5YzQzNDNjZDU0NTVhNTNiZmMyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AJo7kHBzONOl5AlBAcvPXponLt9Y8xuVfwIt8KKAIXQ",
    },
}

fetch("https://api.themoviedb.org/3/authentication", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err))
