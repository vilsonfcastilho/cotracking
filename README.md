# cotracking

A JavaScript library with TypeScript support for tracking orders through Correios(BR) 🚚

## 🚀 Getting started

```sh
  $ npm install --save cotracking

    # or

  $ yarn add cotracking
```

## 👨🏻‍💻 Examples

Tracking a code with JavaScript:
```js
  const { cotracking } = require('cotracking');

  const example = async () => {
    const track = await cotracking.track('JT124720455BR');

    console.log(track); //response -> Order{code: string, tracks: Track[]}
  };

  example();
```

Tracking many codes with TypeScript:
```js
  import cotracking from 'cotracking';

  const example = async () => {
    const track = await cotracking.track(['JT124720455BR', 'JT124720455BR']);

    console.log(track); //response -> [Order{code: string, tracks: Track[]}]
  };

  example();
```

## 📎 Contributing

See how to contribute in [CONTRIBUTING.md](./CONTRIBUTING.md)

>Any questions or suggestions, send me a message: vilsonfcastilho@gmail.com

## 💼 License

cotracking is fully open and is under [MIT](./LICENSE) license

---

Made with ♥ by Vilson Castilho
