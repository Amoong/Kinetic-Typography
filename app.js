import { Visual } from "./visual.js";

class App {
  constructor() {
    this.setWebgl();

    WebFont.load({
      google: {
        families: ["Hind:700"],
      },
      fontactive: () => {
        // 폰트 로딩이 완료된 후 추가 초기화 작업을 해준다.
        this.visual = new Visual();

        window.addEventListener("resize", this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
      },
    });
  }

  setWebgl() {
    // 그려줄 화면 세팅
    this.renderer = new PIXI.Renderer({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      antialias: true,
      transparent: false,
      resolution: window.devicePixelRatio > 1 ? 2 : 1,
      autoDensity: true,
      powerPreference: "high-performance",
      backgroundColor: 0x000000,
    });
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
  }

  resize() {
    // 화면 크기에 맞춰 다시 초기화
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.renderer.resize(this.stageWidth, this.stageHeight);

    this.visual.show(this.stageWidth, this.stageHeight, this.stage);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.visual.animate();

    this.renderer.render(this.stage);
  }
}

window.onload = () => {
  new App();
};
