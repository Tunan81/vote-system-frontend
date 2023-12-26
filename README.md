# vote-system-frontend

## 根据后台生成接口代码
```
openapi --input http://localhost:8101/api/v2/api-docs --output ./generated --client axios
```

## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

### Compiles and minifies for production
```
pnpm run build
```

### Lints and fixes files
```
pnpm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
