from pathlib import Path
import base64,hashlib,json,math,re,subprocess,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]
svg=ET.parse(root/'activity/assets/warehouse.svg').getroot()
assert svg.attrib['viewBox']=='0 0 1440 900'
source=(root/'activity/app.js').read_text()
points=[tuple(map(float,p)) for p in re.findall(r'x:([\d.]+),y:([\d.]+)',source)]
points += [tuple(map(float,p)) for p in re.findall(r'"x": ([\d.]+), "y": ([\d.]+)',source)]
assert len(points)==6
# Physical feature anchors in SVG coordinate space, independent of displayed percentages.
anchors=[(362,285),(706,717),(936,612),(1112,482),(550,576),(420,790)]
for (x,y),(ax,ay) in zip(points,anchors):assert math.hypot(x*14.4-ax,y*9-ay)<10
for width in [320,375,768,1024,1440]:
 p=[(x*width/100,y*width/160) for x,y in points]
 assert all(math.dist(a,b)>=44 for i,a in enumerate(p) for b in p[i+1:]),f'target overlap at {width}px'
logo=(root/'assets/brand/ukwa-logo.png').read_bytes()
assert hashlib.sha1(b'blob '+str(len(logo)).encode()+b'\0'+logo).hexdigest()=='d9195453483e2b41c08b96077068560ccdca0571'
embed=(root/'embed-test.html').read_bytes()
assert hashlib.sha1(b'blob '+str(len(embed)).encode()+b'\0'+embed).hexdigest()=='0e1d58d41ea3b2c88f1e1240f54555994aef3d13'
for portable in ['activity/embed-20261027.html','activity/embed-20261027-v7.html','activity/embed-20261027-v8.html','activity/embed-20261028-v9.html','activity/embed-20261028-v10.html','activity/embed-20261028-v11.html']:
 assert (root/portable).read_bytes()==(root/'preview.html').read_bytes()
before=(root/'preview.html').read_bytes();subprocess.run(['python3',str(root/'scripts/build-preview.py')],check=True);assert before==(root/'preview.html').read_bytes()
html=(root/'activity/index.html').read_text();preview=(root/'preview.html').read_text()
for text in ['Look closer.','Act safer.','What could','Nucleus','FIELD PRACTICE']:assert text not in html
assert 'glass' not in html and 'magnify.onclick' not in source
assert 'touch-action:pan-y pinch-zoom' in (root/'activity/style.css').read_text()
assert 'scrollIntoView' not in source
assert 'embed-20261028-v11' in html
assert '<dialog ' in html
hub=(root/'index.html').read_text()
assert 'embed-20261028-v11.html' in hub and 'height:max(42rem,round(up,calc(62.5cqw + 6rem),1px))' in hub
assert 'height="850"' not in hub
assert base64.b64encode(logo).decode() in preview
print('PASS SVG, six feature/marker alignments, non-overlapping 44px targets at 320–1440px, exact logo/embed bytes, reproducible preview and embed boundaries')
