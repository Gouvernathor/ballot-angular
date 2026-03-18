import { Component } from '@angular/core';
import { Misbehaviors } from '../../../../g/+misbehaviors/misbehaviors';
import { Banner } from '../../../../banner/banner';
import { Nav } from '../../../../nav/nav';

@Component({
    imports: [Banner, Nav],
    templateUrl: './misbehaviors.html',
    styleUrls: ['../../../../g/+misbehaviors/misbehaviors.scss'],
})
export class FrFrMisbehaviors extends Misbehaviors {
}
