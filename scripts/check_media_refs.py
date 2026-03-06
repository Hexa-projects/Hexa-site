import os,re,glob
base=r'C:/Users/lucas/.openclaw/workspace/hexamed-site'
files=[]
for path in glob.glob(base+'/src/**/*.*',recursive=True):
    if path.endswith(('.ts','.tsx','.css')):
        txt=open(path,'r',encoding='utf-8',errors='ignore').read()
        for m in re.findall(r'"(/assets/hexa/[^"]+)"',txt):
            files.append((path,m))
missing=[]
for p,m in files:
    fs=base+'/public'+m
    if not os.path.exists(fs):
        missing.append((p,m))
print('refs',len(files),'missing',len(missing))
for _,m in missing:
    print(m)
