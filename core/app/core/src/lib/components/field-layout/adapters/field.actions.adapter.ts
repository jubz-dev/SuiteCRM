/**
 * SuiteCRM is a customer relationship management program developed by SalesAgility Ltd.
 * Copyright (C) 2023 SalesAgility Ltd.
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

import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {MetadataStore} from '../../../store/metadata/metadata.store.service';
import {FieldActionManager} from '../actions/field-action-manager.service';
import {AsyncActionInput, AsyncActionService} from '../../../services/process/processes/async-action/async-action';
import {FieldActionData} from '../actions/field.action';
import {LanguageStore} from '../../../store/language/language.store';
import {MessageService} from '../../../services/message/message.service';
import {Process} from '../../../services/process/process.service';
import {ConfirmationModalService} from '../../../services/modals/confirmation-modal.service';
import {BaseFieldActionsAdapter} from '../../../services/actions/base-field-action.adapter';
import {SelectModalService} from '../../../services/modals/select-modal.service';
import {RecordViewStore} from '../../../views/record/store/record-view/record-view.store';
import {AppMetadataStore} from "../../../store/app-metadata/app-metadata.store.service";
import {Action, ActionContext} from "../../../common/actions/action.model";
import {ViewMode} from "../../../common/views/view.model";

@Injectable()
export class FieldActionsAdapter extends BaseFieldActionsAdapter<FieldActionData> {

    constructor(
        protected store: RecordViewStore,
        protected metadata: MetadataStore,
        protected appMetadataStore: AppMetadataStore,
        protected language: LanguageStore,
        protected actionManager: FieldActionManager,
        protected asyncActionService: AsyncActionService,
        protected message: MessageService,
        protected confirmation: ConfirmationModalService,
        protected selectModalService: SelectModalService,
        protected viewName: string,
        protected fieldName: string
    ) {
        super(
            actionManager,
            asyncActionService,
            message,
            confirmation,
            language,
            selectModalService,
            metadata,
            appMetadataStore
        );
    }

    getActions(context?: ActionContext): Observable<Action[]> {
        return combineLatest(
            [
                this.metadata.fieldActions$,
                this.store.mode$,
                this.store.record$,
                this.store.language$
            ]
        ).pipe(
            map((
                [
                    meta,
                    mode
                ]
            ) => {
                if (!mode || !meta) {
                    return [];
                }
                const actionsMeta = meta[this.viewName][this.fieldName] ?? [];
                return this.parseModeActions(actionsMeta, mode, this.store.getViewContext());
            })
        );
    }

    protected buildActionData(action: Action, context?: ActionContext): FieldActionData {
        return {
            store: this.store,
            action: action
        } as FieldActionData;
    }

    /**
     * Build backend process input
     *
     * @param action
     * @param actionName
     * @param moduleName
     * @param context
     */
    protected buildActionInput(action: Action, actionName: string, moduleName: string, context: ActionContext = null): AsyncActionInput {
        const baseRecord = this.store.recordStore.getBaseStaging();

        this.message.removeMessages();

        return {
            action: actionName,
            module: baseRecord.module,
            id: baseRecord.id,
            params: (action && action.params) || [],
            record: baseRecord
        } as AsyncActionInput;
    }

    protected getMode(): ViewMode {
        return this.store.getMode();
    }

    protected getModuleName(context?: ActionContext): string {
        return this.store.getModuleName();
    }

    protected reload(action: Action, process: Process, context?: ActionContext): void {
        this.store.load(false).pipe(take(1)).subscribe();
    }
}
