import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../../environments/environment";
import { reducer } from "./canvas.reducers";

export interface State {}

export const reducers: ActionReducerMap<State> = { canvas: reducer };

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
