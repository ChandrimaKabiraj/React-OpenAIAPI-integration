import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [clicked, setClicked] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setClicked(true);
    await axios.post('https://a5xmpae7e6.execute-api.ap-south-1.amazonaws.com/dev/message', {
      "body": message ,
    }).then((response) => { 
      setResponse(response.data);
    }).catch((error) => console.log(error))
    
  };

  const handleClear = () => {
    setResponse('');
    setMessage('');
    setClicked(false);
  }

  return (
    <div className="App">
        <div className="heading">Ask ChatGPT Anything</div>
        <div className="chat">
          <div className="chat-box">
              <input
                className="chat-message"
                type="text"
                value={message}
                placeholder='Enter your prompt here...'
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={handleSend} className={(clicked === true && response === '') ? "null_button" : "send_button"}>Send</button>
              {clicked === true ? <button onClick={handleClear} className="send_button">Clear</button> : ''}
              <div className="response-header">Response from ChatGPT:</div>
            <div className={clicked === false ? "": "chat-response"}>{(response === '' && clicked === true) ? 'Loading Response ...' : response}</div>
          </div>
        </div>
    </div>
  );
}
export default App;