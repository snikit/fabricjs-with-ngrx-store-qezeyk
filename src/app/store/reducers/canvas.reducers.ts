import * as CanvasActions from "../canvas.actions";
import * as fromFabric from "fabric";
// Section 1

const initialState = {
  canvas: JSON.stringify(new fromFabric.fabric.Canvas("c"))
};

// Section 2
export function reducer(state = initialState, action: CanvasActions.Actions) {
  // Section 3
  switch (action.type) {
    case CanvasActions.UPDATE_CANVAS:
      const payload = action.payload;
      return { ...state, ...payload };

    default:
      return state;
  }
}
