import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// import { Effects } from './effects';
import { reducer } from './reducers/canvas.reducers';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('canvas', reducer),
    // EffectsModule.forFeature([Effects])
  ],
  providers: []
})
export class CanvasStoreModule {}
