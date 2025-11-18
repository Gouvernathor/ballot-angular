import { Routes } from '@angular/router';
import { Index } from './+index';
import { ElectionModel } from './play/election-model/election-model';
import { sandboxResolvers } from './+sandbox/sandbox.resolvers';

export const routes: Routes = [{
    path: '',
    component: Index,
}, {
    path: 'sandbox',
    component: ElectionModel,
    resolve: sandboxResolvers,
}];
