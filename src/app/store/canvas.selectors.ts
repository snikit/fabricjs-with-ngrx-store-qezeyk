
import { createFeatureSelector, createSelector } from '@ngrx/store';

const canvasState = createFeatureSelector('canvas');

const getCanvasState = createSelector(canvasState, state => state);

export const getCanvas = createSelector(getCanvasState, state => state);
