"""Verify a completed Pages deployment, exact guide HTML and exact deployed media bytes."""
import hashlib,json,os,time,urllib.request
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BUILD='guide-question-20261028-v02'
URL='https://paddyordish.github.io/ukwa-html5-demo/guide-question/guide-question-20261028-v02.html'
BASE='https://paddyordish.github.io/ukwa-html5-demo/'
MEDIA=['guide-question/assets/guide-expressions-v01.png','assets/brand/ukwa-logo.png']+['assets/audio/U01_Q01_'+part+'_Female_UK_v01.mp3' for part in ['Question','Correct','Retry']]
def request(url):
    headers={'Accept':'application/vnd.github+json' if url.startswith('https://api.github.com/') else '*/*','Cache-Control':'no-cache'}
    if url.startswith('https://api.github.com/') and os.environ.get('GITHUB_TOKEN'):headers['Authorization']='Bearer '+os.environ['GITHUB_TOKEN']
    with urllib.request.urlopen(urllib.request.Request(url,headers=headers),timeout=30) as response:
        return response.status,response.geturl(),response.read()
def verify(fetch,repository,sha):
    status,_,body=fetch('https://api.github.com/repos/'+repository+'/actions/runs?per_page=50')
    if status!=200:raise RuntimeError('Deployment status request failed')
    runs=json.loads(body)['workflow_runs']
    run=next((r for r in runs if r['name']=='pages build and deployment' and r['head_branch']=='main' and r['head_sha']==sha and r['status']=='completed' and r['conclusion']=='success'),None)
    if not run:raise RuntimeError('Waiting for successful Pages deployment of '+sha[:7])
    status,final_url,body=fetch(URL)
    if status!=200 or final_url!=URL:raise RuntimeError('Exact guide URL did not return HTTP 200 without redirection')
    from html.parser import HTMLParser
    class Marker(HTMLParser):
        build=None
        def handle_starttag(self,tag,attrs):
            a=dict(attrs)
            if tag=='meta' and a.get('name')=='ukwa-build':self.build=a.get('content')
    marker=Marker();marker.feed(body.decode('utf-8'))
    if marker.build!=BUILD:raise RuntimeError('Published HTML has the wrong build marker')
    html_hash=hashlib.sha256(body).hexdigest()
    if html_hash!=hashlib.sha256((ROOT/'guide-question/guide-question-20261028-v02.html').read_bytes()).hexdigest():raise RuntimeError('Published HTML does not match the tested release bytes')
    hashes={}
    for path in MEDIA:
        status,final_url,payload=fetch(BASE+path)
        if status!=200 or final_url!=BASE+path:raise RuntimeError('Missing/redirected media: '+path)
        expected=hashlib.sha256((ROOT/path).read_bytes()).hexdigest();actual=hashlib.sha256(payload).hexdigest()
        if actual!=expected:raise RuntimeError('Deployed media hash mismatch: '+path)
        hashes[path]=actual
    return {'ready':True,'url':URL,'http_status':200,'build':BUILD,'html_sha256':html_hash,'commit':sha,'pages_run':run['html_url'],'verified_media_sha256':hashes}
def main():
    repository=os.environ.get('GITHUB_REPOSITORY','Paddyordish/ukwa-html5-demo');sha=os.environ['GITHUB_SHA']
    for attempt in range(36):
        try:
            receipt=verify(request,repository,sha);out=ROOT/'work/guide-publication.json';out.parent.mkdir(exist_ok=True);out.write_text(json.dumps(receipt,indent=2)+'\n');print(json.dumps(receipt,indent=2));return
        except Exception as error:
            print('Not verified yet: '+str(error),flush=True)
            if attempt==35:raise
            time.sleep(10)
if __name__=='__main__':main()
