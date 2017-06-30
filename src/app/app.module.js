"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const app_component_1 = require("./app.component");
const place_list_item_component_1 = require("./place-list-item/place-list-item.component");
const gmap_component_1 = require("./gmap/gmap.component");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            place_list_item_component_1.PlaceListItemComponent,
            gmap_component_1.GmapComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
