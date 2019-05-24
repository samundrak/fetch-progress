import { h, Component } from 'preact';
import fetchProgress from '../index';

class ProgressItem extends Component {
  src = null;
  state = {
    loaded: false,
    progress: {
      percentage: 0,
    },
  };
  componentDidMount() {
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
      .then((r) => r.blob())
      .then((src) => {
        this.src = URL.createObjectURL(src);
        this.setState({
          loaded: true,
        });
      });
  }

  render() {
    return this.props.render({
      loaded: this.state.loaded,
      blob: this.src,
      progress: this.state.progress,
    });
  }
}
export default ProgressItem;
