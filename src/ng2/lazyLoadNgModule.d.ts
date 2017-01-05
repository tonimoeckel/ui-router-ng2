/** @module core */ /** */
import { NgModuleRef, Injector, NgModuleFactory, Type } from "@angular/core";
import { LazyLoadResult } from "ui-router-core";
export declare type ModuleTypeCallback = () => Type<any> | Promise<Type<any>>;
export declare type NgModuleToLoad = string | ModuleTypeCallback;
/**
 * Returns a function which lazy loads a nested module
 *
 * Use this function as a [[StateDeclaration.lazyLoad]] property to lazy load an NgModule and its state.
 *
 * Example using `System.import()`:
 * ```js
 * {
 *   name: 'home',
 *   url: '/home',
 *   lazyLoad: loadNgModule(() => System.import('./home.module').then(result => result.HomeModule))
 * }
 * ```
 *
 * Example using `NgModuleFactoryLoader`:
 * ```js
 * {
 *   name: 'home',
 *   url: '/home',
 *   lazyLoad: loadNgModule('./home.module')
 * }
 * ```
 *
 * @param moduleToLoad
 *    If a string, it should be the path to the NgModule code, which will then be loaded by the `NgModuleFactoryLoader`.
 *    If a function, the function should load the NgModule code and return a reference to the `NgModule` class being loaded.
 *
 * @returns A function which takes a transition, which:
 * - Gets the Injector (scoped properly for the destination state)
 * - Loads and creates the NgModule
 * - Finds the "replacement state" for the target state, and adds the new NgModule Injector to it (as a resolve)
 * - Returns the new states array
 */
export declare function loadNgModule(moduleToLoad: NgModuleToLoad, ng2Injector: any): Promise<LazyLoadResult>;
/**
 * Returns the module factory that can be used to instantiate a module
 *
 * For strings this:
 * - Finds the correct NgModuleFactoryLoader
 * - Loads the new NgModuleFactory from the path string (async)
 *
 * For a Type<any> or Promise<Type<any>> this:
 * - Compiles the component type (if not running with AOT)
 * - Returns the NgModuleFactory resulting from compilation (or direct loading if using AOT) as a Promise
 *
 * @internalapi
 */
export declare function loadModuleFactory(moduleToLoad: NgModuleToLoad, ng2Injector: Injector): Promise<NgModuleFactory<any>>;
/**
 * Apply the UI-Router Modules found in the lazy loaded module.
 *
 * Apply the Lazy Loaded NgModule's newly created Injector to the right state in the state tree.
 *
 * Lazy loading uses a placeholder state which is removed (and replaced) after the module is loaded.
 * The NgModule should include a state with the same name as the placeholder.
 *
 * Find the *newly loaded state* with the same name as the *placeholder state*.
 * The NgModule's Injector (and ComponentFactoryResolver) will be added to that state.
 * The Injector/Factory are used when creating Components for the `replacement` state and all its children.
 *
 * @internalapi
 */
export declare function applyNgModule(ng2Module: NgModuleRef<any>): LazyLoadResult;
