/**
 * This file need to WebdriverIO has its independent type definitions
 * and does not require @wdio/globals to be available. This seems to be
 * the only feasable way to avoid cyclic dependencies between webdriverio
 * and @wdio/globals
 */

type BrowserImport = import('../types').Browser
type ElementImport = import('../types').Element
type MultiRemoteBrowserImport = import('../types').MultiRemoteBrowser

declare namespace WebdriverIOAsync {
    interface Browser {}
    interface Element {}
    interface MultiRemoteBrowser {}
}

declare namespace WebdriverIO {
    interface Browser extends BrowserImport, WebdriverIOAsync.Browser { }
    interface Element extends ElementImport, WebdriverIOAsync.Element { }
    // @ts-expect-error
    interface MultiRemoteBrowser extends MultiRemoteBrowserImport, WebdriverIOAsync.MultiRemoteBrowser { }
}

declare module NodeJS {
    interface Global {
        browser: WebdriverIO.Browser
        multiremotebrowser: WebdriverIO.MultiRemoteBrowser
    }
}

declare function $(...args: Parameters<WebdriverIO.Browser['$']>): WebdriverIO.Element
declare function $$(...args: Parameters<WebdriverIO.Browser['$$']>): ReturnType<WebdriverIO.Browser['$$']>
declare const browser: WebdriverIO.Browser
declare const driver: WebdriverIO.Browser
declare const multiremotebrowser: WebdriverIO.MultiRemoteBrowser
