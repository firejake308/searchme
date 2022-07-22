import React from 'react';
import './App.css';

function App() {
  return (
    <div className="card m-2">
      <div className="card-body">
        <h3 className="card-title">SearchMe</h3>
        <p className="card-text">
          Welcome to SearchMe, an app that lets you search the full GroupMe message history.
          The app will use OAuth to get temporary access to your GroupMe profile, then use
          this access to load all of the messages from one of your groups. Once it is done
          loading, you can use Ctrl+F to search all of the messages.
        </p>
        <a href="https://oauth.groupme.com/oauth/authorize?client_id=yG78EE6bz5kpT4DjN2GarxhxeCyxbjgIWGPQijESrWfGU7Ev" className="btn btn-primary">
          Log into GroupMe
        </a>
      </div>
    </div>
  );
}

export default App;
