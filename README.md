# cotracking

A JavaScript library with TypeScript support for tracking orders through Correios(BR) 🚚

## 🚀 Getting started

```sh
  $ npm install --save cotracking

    # or

  $ yarn add cotracking
```

## 👨🏻‍💻 Examples

Example tracking a code:
```js
  import cotracking from 'cotracking';

  const example = async () => {
    const track = await cotracking.track('JT124720455BR');

    console.log(track); //response -> Order{code: string, tracks: Track[]}

  };

  example();
```

Example tracking many codes:
```js
  import cotracking from 'cotracking';

  const example = async () => {
    const track = await cotracking.track(['JT124720455BR', 'JT124720455BR']);

    console.log(track); //response -> [Order{code: string, tracks: Track[]}]
  };

  example();
```

## 📎 Contributing

See how to contribute in [CONTRIBUTIND.md](./CONTRIBUTING.md)

>Any questions or suggestions, send me a message: vilsonfcastilho@gmail.com

## 💼 License

cotracking is fully open and is under MIT license

---

Made with ♥ by Vilson Castilho
