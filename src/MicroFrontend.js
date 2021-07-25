import React, { useState, useEffect } from "react";

function MicroFrontend({ name, host, history, fnc }) {
  const [log, setLog] = useState("")

  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;

    if (document.getElementById(scriptId)) {
      setLog('found');
      const renderFncName = "render" + name;
      const containerName = name + "-container";
      try {
        fnc(containerName, history);
      } catch (e) {
        console.log(e)
      }
      return;
    }
    setLog('not found');

    //TODO: load scripts using the .env file and like below
    // fetch(`${host}/asset-manifest.json`)
    //   .then((res) => res.json())
    //   .then((manifest) => {
    //     const script = document.createElement("script");
    //     script.id = scriptId;
    //     script.crossOrigin = "";
    //     script.type = "text/javascript";
    //     script.defer = true;
    //     console.log(script.defer, script.async)
    //     script.onerror = (oError) => {
    //       console.log("The script " + oError.target.src + " didn't load correctly.");
    //     }
    //     script.onload = () => {
    //       console.log('onload', name, script.src, window.renderCats)
    //       renderMicroFrontend();
    //     };
    //     //document.currentScript.parentNode.insertBefore(script, document.currentScript);
    //     document.body.appendChild(script);
    //     script.src = `${host}${manifest.files["main.js"]}`;
    //   });

    return () => {
      window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
    };
  }, [name]);

  return <div>
    <div>{log}</div>
    <main id={`${name}-container`}></main>
  </div>;
}

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;