function load_palette(path, on_load){
    fetch(`./${path}`)
        .then(response => response.json())
        .then(data => on_load(data))
        .catch(error => console.error('Error loading JSON:', error));
}
