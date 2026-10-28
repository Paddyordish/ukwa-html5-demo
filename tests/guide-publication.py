import importlib.util,json,unittest
from pathlib import Path
root=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('verify_guide',root/'scripts/verify-guide-publication.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
class Gate(unittest.TestCase):
    def fake(self,mode):
        def fetch(url):
            if url.startswith('https://api.github.com/'):
                run={'name':'pages build and deployment','head_branch':'main','head_sha':'old' if mode=='old' else 'release-sha','status':'completed','conclusion':'failure' if mode=='failed' else 'success','html_url':'https://github.com/example/run'}
                return 200,url,json.dumps({'workflow_runs':[run]}).encode()
            if url==module.URL:
                data=(root/'guide-question/guide-question-20261028-v02.html').read_bytes()
                if mode=='wrong':data=data.replace(module.BUILD.encode(),b'old-build')
                if mode=='html':data+=b'<!-- unexpected release -->'
                return (404 if mode=='missing' else 200),url,data
            path=url.removeprefix(module.BASE);data=(root/path).read_bytes()
            return 200,url,b'wrong bytes' if mode=='media' else data
        return fetch
    def test_success(self):self.assertTrue(module.verify(self.fake('ready'),'Paddyordish/ukwa-html5-demo','release-sha')['ready'])
    def test_rejects(self):
        for mode in ['old','failed','missing','wrong','html','media']:
            with self.subTest(mode=mode),self.assertRaises(RuntimeError):module.verify(self.fake(mode),'Paddyordish/ukwa-html5-demo','release-sha')
unittest.main()
