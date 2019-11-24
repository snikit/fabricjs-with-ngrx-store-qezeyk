
import { Component, OnInit } from "@angular/core";
import * as fromFabric from "fabric";
import * as canvasActions from "./store/canvas.actions";
import { UndoActions } from "ngrx-undo-redo";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  canvas: fromFabric.fabric.Canvas;

  state = [];
  mods = 0;
  load  : number = 10

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.canvas = new fromFabric.fabric.Canvas("c", {
      imageSmoothingEnabled: false,
      enableRetinaScaling: true,
      preserveObjectStacking: false,
      targetFindTolerance: 4,
      stateful: false,
      backgroundColor: "yellow",
      perPixelTargetFind: false
    });

    this.canvas.setHeight(500);
    this.canvas.setWidth(1000);
    this.canvas["counter"] = 0;



  console.log(this.load)





  }

  clearcanvas() {
    console.log(this.canvas["counter"]);
    this.canvas.clear().renderAll();
  }

  

  addSvg() {
    console.log(this.load)
  }

  redo() {
    this.store.dispatch(<UndoActions>{ type: "REDO_STATE" });

    this.store
      .select("canvas")
      .pipe(take(1))
      .subscribe(x => {
        this.canvas.loadFromJSON(x.canvas, () => {
        });
      });

  }

  undo() {
    this.store.dispatch(<UndoActions>{ type: "UNDO_STATE" });
    this.store
      .select("canvas")
      .pipe(take(1))
      .subscribe(x => {
        this.canvas.loadFromJSON(x.canvas, () => {
        });
      });
  }
}
