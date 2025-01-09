import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css'

function App() {

  const copyIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24" width="20" viewBox="0 0 448 512"><path fill="#ffffff" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" /></svg>


  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  // useCallback hook
  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/";


    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);

      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword]);


  const copyPasswordToClipboard = useCallback((e) => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(password);

  }, [password]);


  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='container'>
      <h1>Password Generator</h1>

      <div className='password-generator-card'>
        <div>
          <input
            type="text"
            name="password generator"
            id="password-generator"
            value={password}
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            type="button"
            title='Copy Password'
            onClick={copyPasswordToClipboard}
          >Copy <i>{copyIcon}</i> </button>
        </div>
        <div className='input-type'>
          <div>
            <input
              type="range"
              name="range"
              id="range"
              min={4}
              max={20}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <i><label htmlFor="range">Length ({length})</label></i>
          </div>
          <div>
            <input
              type="checkbox"
              name="numberInput"
              id="numberInput"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
                // console.log(numAllowed);
              }}
            />
            <i><label htmlFor="numberInput">Numbers</label></i>
          </div>
          <div>
            <input
              type="checkbox"
              name="charInput"
              id="charInput"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
                // console.log(charAllowed);
              }}
            />
            <i><label htmlFor="charInput">Characters</label></i>
          </div>
        </div>
        <div className='pg-button'
          onClick={passwordGenerator}
        >
          Generate
        </div>
      </div>
    </div>
  )
}

export default App
