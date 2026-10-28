"""Generate a versioned learner entry from the guide-question source. Media stays shared."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]
folder=root/'guide-question'
html=(folder/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+(folder/'style.css').read_text()+'</style>').replace('<script src="app.js"></script>','<script>'+(folder/'app.js').read_text()+'</script>')
(folder/'guide-question-20261028-v01.html').write_text(html)
print('Generated guide-question/guide-question-20261028-v01.html')
