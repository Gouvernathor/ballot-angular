import { DOCUMENT, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LANG } from './language.service';

/**
 * Not really a guard.
 * This sets the `<html>` lang attribute to the current language.
 */
export const langGuard: CanActivateFn = () => {
    inject(DOCUMENT).documentElement.lang = inject(LANG);
    return true;
};
