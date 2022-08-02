https://docs.microsoft.com/en-us/power-apps/developer/component-framework/create-custom-controls-using-pcf

https://developer.microsoft.com/en-us/fluentui#/get-started/web

#Creating crud

pac pcf init --namespace careers --name careersInput --template field
Npm i
npm install react react-dom @fluentui/react sass react-router-dom json-server webpack sass-loader url-loader css-loader axios

npm start watch

#index.tsx config
create assets and css images folder
create mainRoutes folder with index.tsx
create typescript function component declare the interface of context

goto index.tsx, update below code in updateView function

delcare the container in init function

```
 this.appContainer = container;
```

```
  const dataObject: ImainRouter = { context: context };
    ReactDOM.render(
      React.createElement(MainRoute, dataObject),
      this.appContainer
    );
```

Create SCSS files

```
// Reset PCF
.harness-root > .navbar,
div.container .io-pane,
[data-id="topBar"],
[data-id="navbar-container"] {
  display: none;
}
.control-pane {
  padding: 0;
  flex: 100%;
}
.control-container {
  border: 0;
}
select::-ms-expand {
  display: none;
}
```

config the webpack config
check the file for full config

create featureconfig.json

```
{
    "pcfAllowCustomWebpack": "on"
}
```

config the tsconfig.json file

```
 "compilerOptions": {
        "typeRoots": ["node_modules/@types"],
        "sourceMap": true
    },
    "include": ["./careersInput/**/*", "careersInput/Types/index.d.ts"]
```

crate Types folder in careersInput folder
create the file careersInput/Types/index.d.ts 
declare the module of image
````
declare module '*.jpg' {
	const content: any;
	export default content;
}

declare module '*.png' {
	const content: any;
	export default content;
}

declare module '*.json' {
	const content: any;
	export default content;
}

declare module '*.svg' {
	const content: any;
	export default content;
}

```
#form validation using React hooks forms with yup
npm i react-hook-form yup @hookform/resolvers



npm install
npm run build
npm run build
