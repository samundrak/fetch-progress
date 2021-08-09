# [Fetch Progress](https://samundrak.github.io/fetch-progress)

Progress of response for fetch API.
Get progress report of your response called from fetch like percentage, speed, total, transferred, eta and remaining.

## Install

`npm i fetch-progress`

## Usage

import `fetchProgress` method to your project

```js
import fetchProgress from 'fetch-progress
```

Now use `fetchProgress` method on your fetch calls, try to put this before using response. You can

```js
fetch(this.props.src)
    .then(
      fetchProgress({
        // implement onProgress method
        onProgress(progress) {
          console.log({ progress });
          // A possible progress report you will get
          // {
          //    total: 3333,
          //    transferred: 3333,
          //    speed: 3333,
          //    eta: 33,
          //    percentage: 33
          //    remaining: 3333,
          // }
        },
      })
    )
```

# Example

```js
import fetchProgress from '../index';

const self = this;
    fetch(this.props.src)
      .then(
        fetchProgress({
          onProgress(progress) {
            self.setState({ progress });
          },
          onError(err) {
            console.log(err);
          },
        })
      )
      .then(r => r.blob())
      .then(src => {
        this.src = URL.createObjectURL(src);
        this.setState({
          loaded: true,
        });
      });
```

# Demo

[Live Demo](https://samundrak.github.io/fetch-progress)

Clone this repo and run `npm i` and `npm run dev` which will start a server or you can see `examples/` folder in this repo.
