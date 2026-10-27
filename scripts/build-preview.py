"""Generate the portable preview from the hosted activity, without a second implementation."""
from pathlib import Path
import base64
root=Path(__file__).resolve().parents[1]
activity=root/'activity'
def uri(path,mime):return 'data:'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode()
scene=uri(activity/'assets/warehouse.svg','image/svg+xml')
logo=uri(root/'assets/brand/ukwa-logo.png','image/png')
css=(activity/'style.css').read_text().replace('assets/warehouse.svg',scene)
js=(activity/'app.js').read_text().replace('assets/warehouse.svg',scene)
html=(activity/'index.html').read_text().replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>').replace('assets/warehouse.svg',scene).replace('../assets/brand/ukwa-logo.png',logo).replace('<script src="app.js"></script>','<script>'+js+'</script>')
(root/'preview.html').write_text(html)
# Regenerate the compatibility URL as well as the version-specific release.
(activity/'embed-20261027.html').write_text(html)
(activity/'embed-20261027-v7.html').write_text(html)
(activity/'embed-20261027-v8.html').write_text(html)
print('Generated preview.html from activity source')
