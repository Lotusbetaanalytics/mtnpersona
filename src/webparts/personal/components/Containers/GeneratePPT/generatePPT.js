import * as React from "react";
import { Presentation, Slide, Text, Shape, Image, render } from "react-pptx";
import fs from "fs";
import Dashboard from "../../screens/Persona Dashboard/Dashboard";

const GeneratePPT = () => {
  const generatePPT = () => {
    render(
      <Presentation>
        <Slide>
          <Text>Hello</Text>
        </Slide>
      </Presentation>
    ).then((buffer) => {
      fs.writeFile("test.pptx", buffer);
    });
  };

  return <button onClick={generatePPT}>Generate PPT</button>;
};

export default GeneratePPT;
