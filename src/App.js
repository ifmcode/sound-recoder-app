import Recorder from './components/Recorder'
import './App.less';
import { useEffect, useState, useMemo } from 'react';
import {Provider} from 'react-redux'
import store from './redux/store/store';

function App() {
  const constraints = useMemo(() => { return {audio: true} }, []),
    [stream, setStream] = useState(null),
    [error, setError] = useState(null);

  useEffect(() => {
    if ( stream ) {
      return
    }

    let didCancel = false

    const getUserMedia = async () => {
      try {
        if (!didCancel) {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          setStream(stream);
        }
      } catch (err) {
        if (!didCancel) {
          setError(err);
        }
      }
    }

    const cancel = () => {
      didCancel = true;
      if (stream) {
        if ((stream).getAudioTracks) {
          (stream).getAudioTracks().map(track => track.stop());
        }
  
        if ((stream).stop) {
          (stream).stop();
        }
      }
    }

    getUserMedia();

    return cancel;
  }, [constraints, stream, error])
  
  return (
    <Provider store={store}>
      <header>
        <h1>Web Dictaphone</h1>
      </header>
      <main>
        {
          (stream)
            ? <Recorder stream={stream}/>
            : <p className="loading-phrase">Loading…</p>
        }
      </main>
    </Provider>
  );
}

export default App;
