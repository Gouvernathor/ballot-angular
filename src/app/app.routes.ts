import { Routes } from '@angular/router';
import { Index } from './+index';
import { Sandbox } from './+sandbox/sandbox';
import { sandboxResolvers } from './+sandbox/sandbox.resolvers';

export const routes: Routes = [
    {
        path: '',
        component: Index,
    }, {
        path: 'sandbox',
        component: Sandbox,
        resolve: sandboxResolvers,
    },
];
