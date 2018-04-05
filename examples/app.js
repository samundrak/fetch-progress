import { render, h, Component } from 'preact';
import ProgressItem from './ProgressItem';

class App extends Component {
  state = {
    images: [
      'https://images.unsplash.com/photo-1514832510016-108f38c20162?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dbb79afb2cb593a13ea63e3f4b393f95&auto=format',
      'https://images.unsplash.com/photo-1499514694201-9e89bcba16c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=14fa0571fb8d326c611e5aa87a5b843f&auto=format',
      'https://images.unsplash.com/photo-1495198551082-4499d2dd5312?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fad723e4a048edea0afb17605e11a853&auto=format&',
      'https://images.unsplash.com/photo-1496935127680-16e7e9e5eba3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a2ece95cddc5ac4a95a1e9b8fbbe6a61&auto=format',
    ],
  };
  render() {
    return (
      <div>
        <ul>
          {this.state.images.map(image => (
            <li>
              <ProgressItem
                src={image}
                width="200"
                height="200"
                render={({ blob, progress, loaded }) => (
                  <table border="1">
                    <tr>
                      <th>Total</th>
                      <th>Transferred</th>
                      <th>Remaining</th>
                      <th>ETA</th>
                      <th>Speed</th>
                      <th>Percentage</th>
                      <th>Image</th>
                    </tr>
                    <tr>
                      <td>{progress.total}</td>
                      <td>{progress.transferred}</td>
                      <td>{progress.remaining || 'N/A'}</td>
                      <td>{progress.eta}</td>
                      <td>{progress.speed}</td>
                      <td>{progress.percentage || 'N/A'}</td>
                      <td>
                        {loaded ? (
                          <img src={blob} width="100" height="100" />
                        ) : (
                          'Loading'
                        )}
                      </td>
                    </tr>
                  </table>
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
