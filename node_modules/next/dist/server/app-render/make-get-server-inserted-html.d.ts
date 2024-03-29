import React from 'react';
export declare function makeGetServerInsertedHTML({ polyfills, renderServerInsertedHTML, basePath, hasPostponed, }: {
    polyfills: JSX.IntrinsicElements['script'][];
    renderServerInsertedHTML: () => React.ReactNode;
    hasPostponed: boolean;
    basePath: string;
}): (serverCapturedErrors: Error[]) => Promise<string>;
