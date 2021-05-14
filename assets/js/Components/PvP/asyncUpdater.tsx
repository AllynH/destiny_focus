import React from 'react'

const UPDATE_TIME = 10;

const getNewData = async () => {
  // Simulate waiting a random time up to 5 seconds to see how we handle the countdown
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));
  return {
    date: new Date(),
  }
}

interface ProgressBarProps {
  value: number,
  max: number,
}
const ProgressBar = ({ value, max }: ProgressBarProps) => {
  // some 2-decimel precision on percentage progress
  const progress = Math.max(0, Math.round((value / max) * 10000) / 100);
  return (
    <div className='progress-bar'>
    <div className='inner' style={{ width: `${progress}%` }} />
  </div>
  );
}

interface TestComponentState {
  updating: Boolean,
  countdown: number,
  timerId: Object,
  data: Object,
  updateCount: number,
}
class TestComponent extends React.Component <{}, TestComponentState> {
  timerId: any;

  constructor(props) {
    super(props);
    this.state = {
      updating: false,
      countdown: 0,
      timerId: null,
      updateCount: 0,
      data: {},
    }
  }

  componentDidMount() {
    if (this.timerId) { clearInterval(this.timerId); }
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  async tick() {
    // Prevent ticking the countdown further if we're currently updating data
    if (!this.state.updating) {
      let newCountdown = this.state.countdown - 1;
      if (newCountdown < 0) {
        this.setState({ ...this.state, updating: true })
        console.log('update!');
        try {
          await this.update();
        } catch (err) {
          // Idk handle errors, you don't want unhandle errors thrown from async methods.
        } finally {
          newCountdown = UPDATE_TIME
        }
      }
      this.setState({ ...this.state, countdown: newCountdown, updating: false })
    }
  }

  async update() {
    try {
      const data = await getNewData();
      this.setState({
        ...this.state,
        updateCount: this.state.updateCount + 1,
        data,
      })
    } catch (err) {
      const data = { error: 'Error of some sort fetching data' }
      this.setState({
        ...this.state,
        updateCount: this.state.updateCount + 1,
        data,
      })
    }
  }

  render() {
    return <div>
      <div>Countdown: {this.state.countdown}</div>
      <div>Updates: {this.state.updateCount}</div>
      {this.state.data
        ? <div>Data: <pre>{JSON.stringify(this.state.data, null, 2)}</pre></div>
        : null}
      <ProgressBar max={UPDATE_TIME} value={this.state.countdown} />
      {this.state.updating ? <div>Updating...</div> : null}
    </div>
  }
}
export default TestComponent
// ReactDOM.render(<TestComponent />, document.getElementById('root'));
