import { Routes } from '@angular/router';
import { Index } from './+index';
import { Sandbox } from './+sandbox/sandbox';
import { sandboxResolvers } from './+sandbox/sandbox.resolvers';
import { FrFrIndex } from './tl/fr-FR/+index';
import { LANG } from './i18n/language.service';

export const routes: Routes = [
    // main language's routes : en-CA
    {
        path: "",
        providers: [
            { provide: LANG, useValue: "en-CA" },
        ],
        children: [
            {
                path: '',
                component: Index,
            },
            {
                path: 'sandbox',
                component: Sandbox,
                resolve: sandboxResolvers,
            },
        ],
    },

    // other language routes : the structure should be the same as the routes above
    {
        path: "fr-FR",
        providers: [
            { provide: LANG, useValue: "fr-FR" },
        ],
        children: [
            {
                path: "",
                component: FrFrIndex,
            },
            // TODO sandbox (same resolvers)
        ],
    },
];
