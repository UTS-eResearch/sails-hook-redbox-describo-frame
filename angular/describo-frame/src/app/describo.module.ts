import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from "@angular/forms";
import { HttpModule } from '@angular/http';
import { WorkspaceTypeService } from './shared/workspace-service';
import { PaginationModule,TooltipModule } from 'ngx-bootstrap';
import { SharedModule } from './shared/shared.module';
import {DescriboFrameComponent} from "./describo.component";
import {DescriboService} from "./describo.service";
import {UserSimpleService} from "./shared/user.service-simple";

/**
 * Workspace List Module
 *
 * Author: <a href='https://github.com/moisbo' target='_blank'>Moises Sacal</a>
 * @param  {[   BrowserModule}           {imports
 * @param  {[type]} HttpModule
 * @param  {[type]} ReactiveFormsModule
 * @param  {[type]} FormsModule
 * @param  {[type]} PaginationModule.forRoot(
 * @return {[type]}
 */
@NgModule({
  imports:      [ BrowserModule, HttpModule, ReactiveFormsModule, FormsModule, PaginationModule.forRoot(), TooltipModule.forRoot(), SharedModule ],
  declarations: [ DescriboFrameComponent ],
  providers:    [ WorkspaceTypeService, DescriboService, UserSimpleService ],
  bootstrap:    [ DescriboFrameComponent ],
  entryComponents: [ ]
})
export class DescriboModule { }
