import * as React from "react";
import { toPng } from "html-to-image";

const ToImage: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const onButtonClick = React.useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <>
      <div ref={ref}>{/* DOM nodes you want to convert to PNG */}</div>
      <button onClick={onButtonClick}>Click me</button>
    </>
  );
};

export default ToImage;
