import { Component, OnInit } from "@angular/core";
import * as fromFabric from "fabric";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  canvas: fromFabric.fabric.Canvas;
  fabricRef = fromFabric.fabric.Object.prototype;
  stacking = false;
  caching = true;
  baseSvgPath = TEST_SVG; //"/assets/sofa.svg";
  dims = {
    height: 700,
    width: 1000
  };

  ngOnInit() {
    this.init();
  }

  init() {
    let { height, width } = this.dims;

    this.canvas = new fromFabric.fabric.Canvas("c", {
      imageSmoothingEnabled: false,
      enableRetinaScaling: true,
      preserveObjectStacking: this.stacking,
      backgroundColor: "yellow",
      perPixelTargetFind: false
    });

    this.canvas.setHeight(height);
    this.canvas.setWidth(width);
  }

  clearcanvas() {
    this.canvas.clear().renderAll();
  }

  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomPoint() {
    const x = this.randomInt(0, this.dims.width);
    const y = this.randomInt(0, this.dims.height);

    return new fromFabric.fabric.Point(x, y);
  }

  addSvg(load: number) {
    this.canvas.renderOnAddRemove = false;
    for (let i = 0; i < load; i++) {
      this.fetchUsingFabric(this.baseSvgPath).then(
        asset => {

          this.setCaching(asset);

          const pt = this.randomPoint();
          asset.set({
            left: pt.x,
            top: pt.y
          });
          this.canvas.add(asset);

          console.log(asset);
        },
        rej => {
          console.log("");
        }
      );
    }
    this.canvas.renderOnAddRemove = true;
  }

  setCaching(object: fromFabric.fabric.Object) {

    if(this.caching){
      return object
    }

    object.set({
      objectCaching: this.caching
    });


    object["_objects"] &&
      object["_objects"].forEach(innerObj => {
        innerObj.objectCaching = this.caching;
      });

    return object;
  }

  fetchUsingFabric(path: string): Promise<any> {
    return new Promise((res, rej) => {
      fromFabric.fabric.loadSVGFromString(path, (objects, options) => {
        if (!objects) {
          rej("empty svg !");
        } else {
          res(fromFabric.fabric.util.groupSVGElements(objects, options));
        }
      });
    });
  }
}

const TEST_SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 100">
  <defs>
    <g id="sprite0" transform="matrix(1.0, 0.0, 0.0, 1.0, 216.05, 86.45)">
      <use height="172.95" transform="matrix(1.0, 0.0, 0.0, 1.0, -216.05, -86.45)" width="432.1" xlink:href="#shape0" />
    </g>
    <g id="shape0" transform="matrix(1.0, 0.0, 0.0, 1.0, 216.05, 86.45)">
      <path d="M-66.65 -14.0 Q-67.65 -12.85 -69.3 -12.65 -68.2 -12.25 -67.35 -11.35 -66.5 -10.55 -66.1 -9.5 L-64.85 -11.4 Q-63.8 -12.45 -62.35 -12.8 -63.4 -13.1 -64.25 -13.7 -65.45 -14.5 -65.9 -15.6 -66.05 -14.75 -66.65 -14.0 M-72.1 -53.05 L-72.5 -52.6 -71.4 -51.8 -70.5 -52.55 -71.05 -53.05 -71.55 -53.6 -72.1 -53.05 M-184.2 -12.0 Q-186.0 -11.95 -187.2 -10.85 L-187.2 72.05 Q-187.25 73.7 -188.4 74.85 L-188.75 75.15 -188.75 76.4 Q-188.7 78.3 -187.4 79.6 -186.15 80.9 -184.2 80.95 L-71.25 80.95 Q-69.3 80.9 -68.05 79.6 -66.75 78.3 -66.7 76.4 L-66.7 -7.45 Q-66.75 -9.4 -68.05 -10.65 -69.3 -11.95 -71.25 -12.0 L-184.2 -12.0 M-185.45 -12.85 L-187.2 -13.5 -187.2 -12.15 -185.45 -12.85 M-207.6 -30.5 Q-208.85 -30.45 -209.7 -29.65 -210.5 -28.8 -210.55 -27.55 L-210.55 72.05 Q-210.5 73.3 -209.7 74.15 -208.85 74.95 -207.6 75.0 L-191.2 75.0 Q-190.15 74.95 -189.45 74.45 L-189.1 74.15 Q-188.25 73.3 -188.2 72.05 L-188.2 -14.05 Q-189.7 -15.0 -190.6 -16.25 L-200.25 -30.5 -207.6 -30.5 M-209.3 -51.6 Q-211.35 -51.6 -211.95 -50.6 L-212.0 -49.6 -211.6 -48.75 -189.9 -16.75 -188.2 -15.05 -187.2 -14.45 -187.1 -14.4 Q-185.3 -13.45 -183.55 -13.4 L-70.1 -13.4 Q-68.25 -13.45 -67.25 -14.55 -66.7 -15.2 -66.7 -16.05 L-66.7 -16.45 -67.05 -18.5 -67.1 -18.8 -68.0 -24.75 -69.25 -32.45 -70.45 -40.15 -71.35 -46.1 -71.75 -48.45 Q-72.0 -49.8 -73.45 -50.7 -74.9 -51.6 -76.9 -51.6 L-209.3 -51.6 M-209.25 -84.2 Q-211.2 -84.15 -212.45 -82.85 -213.75 -81.6 -213.8 -79.65 L-213.8 -57.85 Q-213.75 -55.9 -212.45 -54.65 -211.2 -53.35 -209.25 -53.3 L-76.9 -53.3 Q-74.95 -53.35 -73.65 -54.65 -72.4 -55.9 -72.35 -57.85 L-72.35 -79.65 Q-72.4 -81.6 -73.65 -82.85 -74.95 -84.15 -76.9 -84.2 L-209.25 -84.2 M190.3 76.0 L190.15 76.0 189.75 76.0 189.75 76.4 Q189.7 77.9 189.05 79.1 L188.1 80.3 Q186.55 81.9 184.2 81.95 L71.25 81.95 Q68.9 81.9 67.3 80.3 66.5 79.5 66.15 78.55 L64.9 80.3 Q63.35 81.9 61.0 81.95 L-60.95 81.95 Q-63.3 81.9 -64.9 80.3 -65.7 79.5 -66.1 78.5 -66.5 79.5 -67.35 80.3 -68.9 81.9 -71.25 81.95 L-184.2 81.95 Q-186.55 81.9 -188.15 80.3 -189.05 79.4 -189.45 78.25 L-189.75 76.4 -189.75 75.75 -190.7 75.95 -190.7 83.3 Q-190.6 84.15 -189.75 84.25 L189.35 84.25 Q190.2 84.15 190.3 83.3 L190.3 76.0 M190.6 -16.25 Q189.5 -14.7 187.5 -13.65 L187.2 -13.5 187.2 72.05 Q187.25 73.3 188.05 74.15 188.5 74.55 189.05 74.8 L190.15 75.0 206.55 75.0 Q207.85 74.95 208.65 74.15 209.5 73.3 209.55 72.05 L209.55 -27.55 Q209.5 -28.8 208.65 -29.65 207.8 -30.45 206.55 -30.5 L200.25 -30.5 190.6 -16.25 M185.45 -12.85 L186.2 -12.6 186.2 -13.05 185.45 -12.85 M68.05 -10.65 Q66.75 -9.4 66.7 -7.45 L66.7 76.4 Q66.75 78.3 68.05 79.6 69.3 80.9 71.25 80.95 L184.2 80.95 Q186.15 80.9 187.4 79.6 188.7 78.3 188.75 76.4 L188.75 75.75 187.35 74.85 Q186.25 73.7 186.2 72.05 L186.2 -11.55 184.2 -12.0 71.25 -12.0 Q69.3 -11.95 68.05 -10.65 M65.55 -7.45 Q65.5 -9.4 64.2 -10.65 62.95 -11.95 61.0 -12.0 L-60.95 -12.0 Q-62.9 -11.95 -64.15 -10.65 -65.45 -9.4 -65.5 -7.45 L-65.5 76.4 Q-65.45 78.3 -64.15 79.6 -62.9 80.9 -60.95 80.95 L61.0 80.95 Q62.95 80.9 64.2 79.6 65.5 78.3 65.55 76.4 L65.55 -7.45 M66.6 -14.0 Q65.9 -14.9 65.9 -15.9 65.45 -14.6 64.15 -13.7 63.3 -13.1 62.3 -12.85 63.8 -12.5 64.9 -11.35 65.7 -10.55 66.15 -9.55 66.55 -10.6 67.35 -11.4 68.2 -12.25 69.3 -12.65 67.6 -12.85 66.6 -14.0 M76.9 -51.6 Q74.9 -51.6 73.45 -50.7 72.0 -49.8 71.7 -48.45 L66.7 -16.45 66.7 -16.05 Q66.7 -15.2 67.25 -14.55 68.25 -13.45 70.05 -13.4 L183.55 -13.4 186.2 -13.95 187.1 -14.4 187.2 -14.45 Q188.95 -15.4 189.9 -16.75 L211.6 -48.75 212.0 -49.6 Q212.15 -50.1 211.9 -50.6 211.3 -51.6 209.3 -51.6 L76.9 -51.6 M71.25 -51.75 L72.5 -52.65 72.1 -53.05 71.5 -53.7 70.9 -53.05 70.35 -52.55 71.25 -51.75 M69.7 -50.25 Q69.15 -50.9 68.2 -51.25 L66.1 -51.6 -66.25 -51.6 -68.35 -51.25 Q-69.3 -50.9 -69.85 -50.25 -70.45 -49.5 -70.35 -48.6 L-65.35 -16.55 Q-65.1 -15.25 -63.75 -14.35 -62.4 -13.45 -60.6 -13.4 L60.45 -13.4 Q62.25 -13.45 63.6 -14.35 64.95 -15.2 65.2 -16.55 L70.2 -48.6 Q70.35 -49.5 69.7 -50.25 M72.1 -84.45 Q74.0 -86.4 76.9 -86.45 L209.25 -86.45 Q212.15 -86.4 214.05 -84.45 216.0 -82.55 216.05 -79.65 L216.05 -57.85 Q216.0 -54.95 214.05 -53.05 L213.3 -52.35 213.8 -51.6 Q214.2 -50.9 214.2 -50.05 214.2 -48.8 213.35 -47.55 L212.15 -45.8 209.3 -41.6 206.0 -36.7 203.3 -32.75 205.55 -32.75 206.55 -32.75 Q208.8 -32.7 210.25 -31.25 211.75 -29.75 211.8 -27.55 L211.8 72.05 Q211.75 74.25 210.25 75.7 208.8 77.2 206.55 77.25 L204.75 77.25 200.6 77.25 195.9 77.25 192.55 77.25 192.55 79.75 192.55 82.2 192.55 83.3 Q192.5 84.65 191.6 85.55 190.7 86.45 189.35 86.5 L-189.8 86.5 Q-191.15 86.45 -192.05 85.55 -192.95 84.65 -192.95 83.3 L-192.95 82.2 -192.95 79.75 -192.95 77.25 -196.45 77.25 -201.35 77.25 -205.7 77.25 -207.6 77.25 Q-209.8 77.2 -211.25 75.7 -212.75 74.25 -212.8 72.05 L-212.8 -27.55 Q-212.75 -29.75 -211.25 -31.25 -209.8 -32.7 -207.6 -32.75 L-206.25 -32.75 -203.4 -32.75 -206.05 -36.7 -209.4 -41.6 -212.2 -45.8 -213.4 -47.55 Q-214.25 -48.8 -214.25 -50.05 -214.25 -50.9 -213.85 -51.6 L-213.3 -52.35 -214.05 -53.05 Q-216.0 -54.95 -216.05 -57.85 L-216.05 -79.65 Q-216.0 -82.55 -214.05 -84.45 -212.15 -86.4 -209.25 -86.45 L-76.9 -86.45 Q-74.0 -86.4 -72.1 -84.45 L-71.55 -83.85 -71.05 -84.45 Q-69.15 -86.4 -66.25 -86.45 L66.1 -86.45 Q69.0 -86.4 70.9 -84.45 L71.5 -83.75 72.1 -84.45 M73.7 -82.85 Q72.4 -81.6 72.35 -79.65 L72.35 -57.85 Q72.4 -55.9 73.7 -54.65 74.95 -53.35 76.9 -53.3 L209.25 -53.3 Q211.2 -53.35 212.5 -54.65 213.75 -55.9 213.8 -57.85 L213.8 -79.65 Q213.75 -81.6 212.5 -82.85 211.2 -84.15 209.25 -84.2 L76.9 -84.2 Q74.95 -84.15 73.7 -82.85 M70.65 -79.65 Q70.6 -81.6 69.35 -82.85 68.05 -84.15 66.1 -84.2 L-66.25 -84.2 Q-68.2 -84.15 -69.45 -82.85 -70.75 -81.6 -70.8 -79.65 L-70.8 -57.85 Q-70.75 -55.9 -69.45 -54.65 -68.2 -53.35 -66.25 -53.3 L66.1 -53.3 Q68.05 -53.35 69.35 -54.65 70.6 -55.9 70.65 -57.85 L70.65 -79.65" fill="#000000" fill-rule="evenodd" stroke="none" class="line" />
    </g>
    <g id="sprite1" transform="matrix(1.0, 0.0, 0.0, 1.0, 213.8, 84.2)">
      <use height="168.45" transform="matrix(1.0, 0.0, 0.0, 1.0, -213.8, -84.2)" width="427.6" xlink:href="#shape1" />
    </g>
    <g id="shape1" transform="matrix(1.0, 0.0, 0.0, 1.0, 213.8, 84.2)">
      <path d="M70.65 -79.65 L70.65 -57.85 Q70.6 -55.9 69.35 -54.65 68.05 -53.35 66.1 -53.3 L-66.25 -53.3 Q-68.2 -53.35 -69.45 -54.65 -70.75 -55.9 -70.8 -57.85 L-70.8 -79.65 Q-70.75 -81.6 -69.45 -82.85 -68.2 -84.15 -66.25 -84.2 L66.1 -84.2 Q68.05 -84.15 69.35 -82.85 70.6 -81.6 70.65 -79.65 M73.7 -82.85 Q74.95 -84.15 76.9 -84.2 L209.25 -84.2 Q211.2 -84.15 212.5 -82.85 213.75 -81.6 213.8 -79.65 L213.8 -57.85 Q213.75 -55.9 212.5 -54.65 211.2 -53.35 209.25 -53.3 L76.9 -53.3 Q74.95 -53.35 73.7 -54.65 72.4 -55.9 72.35 -57.85 L72.35 -79.65 Q72.4 -81.6 73.7 -82.85 M69.7 -50.25 Q70.35 -49.5 70.2 -48.6 L65.2 -16.55 Q64.95 -15.2 63.6 -14.35 62.25 -13.45 60.45 -13.4 L-60.6 -13.4 Q-62.4 -13.45 -63.75 -14.35 -65.1 -15.25 -65.35 -16.55 L-70.35 -48.6 Q-70.45 -49.5 -69.85 -50.25 -69.3 -50.9 -68.35 -51.25 L-66.25 -51.6 66.1 -51.6 68.2 -51.25 Q69.15 -50.9 69.7 -50.25 M76.9 -51.6 L209.3 -51.6 Q211.3 -51.6 211.9 -50.6 212.15 -50.1 212.0 -49.6 L211.6 -48.75 189.9 -16.75 Q188.95 -15.4 187.2 -14.45 L187.1 -14.4 186.2 -13.95 183.55 -13.4 70.05 -13.4 Q68.25 -13.45 67.25 -14.55 66.7 -15.2 66.7 -16.05 L66.7 -16.45 71.7 -48.45 Q72.0 -49.8 73.45 -50.7 74.9 -51.6 76.9 -51.6 M66.6 -14.0 Q67.6 -12.85 69.3 -12.65 68.2 -12.25 67.35 -11.4 66.55 -10.6 66.15 -9.55 65.7 -10.55 64.9 -11.35 63.8 -12.5 62.3 -12.85 63.3 -13.1 64.15 -13.7 65.45 -14.6 65.9 -15.9 65.9 -14.9 66.6 -14.0 M65.55 -7.45 L65.55 76.4 Q65.5 78.3 64.2 79.6 62.95 80.9 61.0 80.95 L-60.95 80.95 Q-62.9 80.9 -64.15 79.6 -65.45 78.3 -65.5 76.4 L-65.5 -7.45 Q-65.45 -9.4 -64.15 -10.65 -62.9 -11.95 -60.95 -12.0 L61.0 -12.0 Q62.95 -11.95 64.2 -10.65 65.5 -9.4 65.55 -7.45 M68.05 -10.65 Q69.3 -11.95 71.25 -12.0 L184.2 -12.0 186.2 -11.55 186.2 72.05 Q186.25 73.7 187.35 74.85 L188.75 75.75 188.75 76.4 Q188.7 78.3 187.4 79.6 186.15 80.9 184.2 80.95 L71.25 80.95 Q69.3 80.9 68.05 79.6 66.75 78.3 66.7 76.4 L66.7 -7.45 Q66.75 -9.4 68.05 -10.65 M186.2 -12.6 L185.45 -12.85 186.2 -13.05 186.2 -12.6 M190.6 -16.25 L200.25 -30.5 206.55 -30.5 Q207.8 -30.45 208.65 -29.65 209.5 -28.8 209.55 -27.55 L209.55 72.05 Q209.5 73.3 208.65 74.15 207.85 74.95 206.55 75.0 L190.15 75.0 189.05 74.8 Q188.5 74.55 188.05 74.15 187.25 73.3 187.2 72.05 L187.2 -13.5 187.5 -13.65 Q189.5 -14.7 190.6 -16.25 M190.3 76.0 L190.3 83.3 Q190.2 84.15 189.35 84.25 L-189.75 84.25 Q-190.6 84.15 -190.7 83.3 L-190.7 75.95 -189.75 75.75 -189.75 76.4 -189.45 78.25 Q-189.05 79.4 -188.15 80.3 -186.55 81.9 -184.2 81.95 L-71.25 81.95 Q-68.9 81.9 -67.35 80.3 -66.5 79.5 -66.1 78.5 -65.7 79.5 -64.9 80.3 -63.3 81.9 -60.95 81.95 L61.0 81.95 Q63.35 81.9 64.9 80.3 L66.15 78.55 Q66.5 79.5 67.3 80.3 68.9 81.9 71.25 81.95 L184.2 81.95 Q186.55 81.9 188.1 80.3 L189.05 79.1 Q189.7 77.9 189.75 76.4 L189.75 76.0 190.15 76.0 190.3 76.0 M-209.3 -51.6 L-76.9 -51.6 Q-74.9 -51.6 -73.45 -50.7 -72.0 -49.8 -71.75 -48.45 L-71.35 -46.1 -70.45 -40.15 -69.25 -32.45 -68.0 -24.75 -67.1 -18.8 -67.05 -18.5 -66.7 -16.45 -66.7 -16.05 Q-66.7 -15.2 -67.25 -14.55 -68.25 -13.45 -70.1 -13.4 L-183.55 -13.4 Q-185.3 -13.45 -187.1 -14.4 L-187.2 -14.45 -188.2 -15.05 -189.9 -16.75 -211.6 -48.75 -212.0 -49.6 -211.95 -50.6 Q-211.35 -51.6 -209.3 -51.6 M-209.25 -84.2 L-76.9 -84.2 Q-74.95 -84.15 -73.65 -82.85 -72.4 -81.6 -72.35 -79.65 L-72.35 -57.85 Q-72.4 -55.9 -73.65 -54.65 -74.95 -53.35 -76.9 -53.3 L-209.25 -53.3 Q-211.2 -53.35 -212.45 -54.65 -213.75 -55.9 -213.8 -57.85 L-213.8 -79.65 Q-213.75 -81.6 -212.45 -82.85 -211.2 -84.15 -209.25 -84.2 M-207.6 -30.5 L-200.25 -30.5 -190.6 -16.25 Q-189.7 -15.0 -188.2 -14.05 L-188.2 72.05 Q-188.25 73.3 -189.1 74.15 L-189.45 74.45 Q-190.15 74.95 -191.2 75.0 L-207.6 75.0 Q-208.85 74.95 -209.7 74.15 -210.5 73.3 -210.55 72.05 L-210.55 -27.55 Q-210.5 -28.8 -209.7 -29.65 -208.85 -30.45 -207.6 -30.5 M-185.45 -12.85 L-187.2 -12.15 -187.2 -13.5 -185.45 -12.85 M-184.2 -12.0 L-71.25 -12.0 Q-69.3 -11.95 -68.05 -10.65 -66.75 -9.4 -66.7 -7.45 L-66.7 76.4 Q-66.75 78.3 -68.05 79.6 -69.3 80.9 -71.25 80.95 L-184.2 80.95 Q-186.15 80.9 -187.4 79.6 -188.7 78.3 -188.75 76.4 L-188.75 75.15 -188.4 74.85 Q-187.25 73.7 -187.2 72.05 L-187.2 -10.85 Q-186.0 -11.95 -184.2 -12.0 M-65.9 -15.6 Q-65.45 -14.5 -64.25 -13.7 -63.4 -13.1 -62.35 -12.8 -63.8 -12.45 -64.85 -11.4 L-66.1 -9.5 Q-66.5 -10.55 -67.35 -11.35 -68.2 -12.25 -69.3 -12.65 -67.65 -12.85 -66.65 -14.0 -66.05 -14.75 -65.9 -15.6" fill="#ffffff" fill-rule="evenodd" stroke="none" class="fill" />
    </g>
  </defs>
  <g transform="matrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)">
    <use height="172.95" id="line" transform="matrix(0.2314, 0.0, 0.0, 0.5784, -0.0005, 0.0)" width="432.1" xlink:href="#sprite0" />
    <use height="168.45" id="fill" transform="matrix(0.2314, 0.0, 0.0, 0.5784, 0.5203, 1.3013)" width="427.6" xlink:href="#sprite1" />
  </g>
</svg>`;
