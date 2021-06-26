/** React for jsx */
import React from "react";

/** fenced block function */
const fencedBlock = (Code) => {
  return {
    /** Overwriting default pre */
    pre: (object) => {
      const { props } = object.children;
      let code = props.children;
      let language = props.className.split("-");
      return <Code code={code} language={language[1]} />;
    },
  };
};

export default fencedBlock;
