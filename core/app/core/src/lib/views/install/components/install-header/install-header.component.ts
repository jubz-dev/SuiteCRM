/**
 * SuiteCRM is a customer relationship management program developed by SalesAgility Ltd.
 * Copyright (C) 2021 SalesAgility Ltd.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SALESAGILITY, SALESAGILITY DISCLAIMS THE
 * WARRANTY OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License
 * version 3, these Appropriate Legal Notices must retain the display of the
 * "Supercharged by SuiteCRM" logo. If the display of the logos is not reasonably
 * feasible for technical reasons, the Appropriate Legal Notices must display
 * the words "Supercharged by SuiteCRM".
 */

import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {InstallActionsAdapter} from '../../adapters/actions.adapter';
import {ActionContext} from '../../../../common/actions/action.model';
import {Record} from '../../../../common/record/record.model';
import {InstallViewStore} from '../../store/install-view/install-view.store';

@Component({
    selector: 'scrm-install-header',
    templateUrl: 'install-header.component.html',
    providers: [InstallActionsAdapter]
})
export class InstallHeaderComponent {


    vm$ = this.store.record$.pipe(
        map((record) => ({record}))
    );

    constructor(
        public actionsAdapter: InstallActionsAdapter,
        public store: InstallViewStore,
    ) {
    }

    /**
     * Build action context
     * @param record
     */
    getActionContext(record: Record): ActionContext {
        if (!record) {
            return {} as ActionContext
        }

        return {
            module: record.module || '',
            record
        } as ActionContext
    }

    getTitle() {

    }
}
