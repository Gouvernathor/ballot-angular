import { Routes } from '@angular/router';
import { LANG } from './i18n/language.service';
import { langGuard } from './i18n/lang-guard';
import { Index } from './+index';
import { Sandbox } from './+sandbox/sandbox';
import { sandboxResolvers } from './+sandbox/sandbox.resolvers';
import { FrFrIndex } from './tl/fr-FR/+index/index';
import { FrFrSandbox } from './tl/fr-FR/+sandbox/sandbox';

export const routes: Routes = [
    // main language's routes : en-CA
    {
        path: "",
        providers: [
            { provide: LANG, useValue: "en-CA" },
        ],
        canActivate: [langGuard],
        children: [
            {
                path: '',
                title: "To Build a Better Ballot",
                component: Index,
            },
            {
                path: 'sandbox',
                title: "Ballot Sandbox",
                component: Sandbox,
                resolve: sandboxResolvers,
                runGuardsAndResolvers: 'always', // because you can click on the link of the same scenario
            },
        ],
    },

    // other language routes : the structure should be the same as the routes above
    {
        path: "fr-FR",
        providers: [
            { provide: LANG, useValue: "fr-FR" },
        ],
        canActivate: [langGuard],
        children: [
            {
                path: "",
                title: "Pour un meilleur scrutin",
                component: FrFrIndex,
            },
            {
                path: 'sandbox',
                title: "Meilleur scrutin : Sandbox",
                component: FrFrSandbox,
                resolve: sandboxResolvers,
                runGuardsAndResolvers: 'always',
            },
        ],
    },
];
