import { createElement } from "@b9g/crank";
import { renderer } from "@b9g/crank/dom";
import { App } from "./App";

import "./style.css";

renderer.render(
  <App />,
  document.body,
);
