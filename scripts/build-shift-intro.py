from pathlib import Path
root=Path(__file__).resolve().parents[1]
intro=root/'shift-intro'
html=(intro/'index.html').read_text().replace('<link rel="stylesheet" href="style.css?v=shift-intro-v01">','<style>'+(intro/'style.css').read_text()+'</style>').replace('<script src="app.js?v=shift-intro-v01"></script>','<script>'+(intro/'app.js').read_text()+'</script>')
(intro/'intro-20261028-v01.html').write_text(html)
print('Generated the versioned intro from its source.')
