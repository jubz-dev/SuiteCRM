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

import {Action, ActionData, ActionHandler} from '../../../../common/actions/action.model';
import {Record} from '../../../../common/record/record.model';
import {ModuleNavigation} from '../../../../services/navigation/module-navigation/module-navigation.service';
import {RecordThreadStore} from '../../store/record-thread/record-thread.store';
import {RecordThreadItemStore} from '../../store/record-thread/record-thread-item.store';

export interface RecordThreadItemActionData extends ActionData {
    itemStore?: RecordThreadItemStore;
    threadStore?: RecordThreadStore;
    action?: Action;
}

export abstract class RecordThreadItemActionHandler extends ActionHandler<RecordThreadItemActionData> {

    abstract run(data: RecordThreadItemActionData): void;

    abstract shouldDisplay(data: RecordThreadItemActionData): boolean;

    checkRecordAccess(data: RecordThreadItemActionData, defaultAcls: string[] = []): boolean {

        const record = data.itemStore.recordStore.getBaseRecord();
        const acls = record.acls ?? [];

        if (!acls || !acls.length) {
            return false;
        }

        const action = data.action ?? null;

        return this.checkAccess(action, acls, defaultAcls);
    }

    /**
     * Navigate back
     * @param navigation
     * @param params
     * @param id
     * @param moduleName
     * @param record
     */
    protected navigateBack(
        navigation: ModuleNavigation,
        params: { [p: string]: string },
        id: string,
        moduleName: string,
        record: Record
    ) {
        let returnModule = navigation.getReturnModule(params);
        let returnAction = navigation.getReturnAction(params);
        let returnId = navigation.getReturnId(params);

        if (id === returnId) {
            return;
        }

        if (returnModule === moduleName &&
            returnAction === 'record' &&
            returnId !== id
        ) {
            return;
        }

        if (!returnModule || !returnAction) {
            return;
        }

        navigation.navigateBack(record, moduleName, params);
    }

}
