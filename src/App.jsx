import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { use } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");
  const passref = useRef(null)
  const passwordGenerator = useCallback(() => {
    let Pas = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_=+|[]{};:/?.>";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      Pas += str.charAt(char);
    }

    setPass(Pas);
    // console.log(str.toLowerCase);
    // return str
  }, [length, numberAllowed, charAllowed]);

  const copyPasstoClipbord = useCallback(() => {
    passref.current?.select()
    passref.current?.setSelectionRange(0,70)
    window.navigator.clipboard.writeText(pass)
  },[pass])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed,passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md  mx-auto text-orange-400 shadow-md rounded-lg py-3 px-4 my-8 bg-gray-700">
        <h1 className="text-2xl text-center text-white my-3 ">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passref}
          />
          <button onClick={copyPasstoClipbord} className="outline-none bg-blue-700 px-3 py-0.5 shrink-0 text-white text-lg">
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={70}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInp"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className="cursor-pointer"
            />
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charinp"
              onChange={() => {
                setCharAllowed((char) => !char);
              }}
              className="cursor-pointer"
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
