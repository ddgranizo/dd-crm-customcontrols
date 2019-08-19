# dd-crm-customcontrols
Custom Crm Controls

# add new component

Crate folder "src/MyControlName"
cd to "src/MyControlName"

*field:
pac pcf init --namespace "DD.Crm.CustomControls.Fields" --name "MyControlName" --template field
cd "MyControlName"
npm install


*dataset:
TODO

# create solution
cd release
pac solution init --publisher-name "DanielDiazGranizo" --publisher-prefix ddg

# add project to solution 
pac solution add-reference --path "../src/Component1"
pac solution add-reference --path "../src/Component2"
etc

# build

msbuild /t:restore
msbuild
msbuild /P:Configuration=Release



