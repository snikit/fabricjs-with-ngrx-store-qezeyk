import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/canvas.reducers';
import { reducers, metaReducers } from "./store/reducers";
import { AppComponent } from './app.component';
import { CanvasStoreModule } from './store/canvas-store.module';

@NgModule({
  imports: [BrowserModule, FormsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
