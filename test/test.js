import { Visual } from "./visual.js";

class Text {
  constructor() {
    this.setWebgl()

    this.visual = new Visual();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  setWebgl() {
    this.renderer = new PIXI.Renderer({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      antialias: true,
      transparent: false,
      resolution: window.devicePixelRatio > 1 ? 2 : 1,
      autoDensity: true,
      powerPreference: "high-performance",
      backgroundColor: 0xffffff,
    });
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.renderer.resize(this.stageWidth, this.stageHeight);

    this.visual.show(this.stage);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.visual.animate();

    this.renderer.render(this.stage);
  }
}

window.onload = () => {
  new Text()
}