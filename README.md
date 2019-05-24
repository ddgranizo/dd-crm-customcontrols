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
pac solution init --publisherName "DanielDiazGranizo" --customizationPrefix ddg

# add component to solution
pac solution add-reference --path "../../src/HelloWorldField"

# build

msbuild /t:restore
msbuild
msbuild /P:Configuration=Release



