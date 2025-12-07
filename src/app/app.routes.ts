import { Routes } from '@angular/router';
import { Index } from './+index';
import { Sandbox } from './+sandbox/sandbox';
import { sandboxResolvers } from './+sandbox/sandbox.resolvers';
import { FrFrIndex } from './tl/fr-FR/+index';

export const routes: Routes = [
    {
        path: '',
        component: Index,
    },
    {
        path: 'sandbox',
        component: Sandbox,
        resolve: sandboxResolvers,
    },

    // other language routes : the structure should be the same as the routes above
    {
        path: "fr-FR",
        data: { lang: "fr-FR" },
        children: [
            {
                path: "",
                component: FrFrIndex,
            },
            // TODO sandbox (same resolvers)
        ],
    },
];
