<?php
/**
 * SuiteCRM is a customer relationship management program developed by SalesAgility Ltd.
 * Copyright (C) 2024 SalesAgility Ltd.
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

namespace App\Data\Service\Record\EntityRecordMappers;

use App\Data\Service\Record\Mappers\BaseFieldMapperRegistry;
use App\Data\Service\Record\Mappers\BaseFieldTypeMapperRegistry;
use App\Data\Service\Record\Mappers\BaseRecordMapperRegistry;
use App\Data\Service\Record\Mappers\RecordMapperRunner;
use App\FieldDefinitions\Service\FieldDefinitionsProviderInterface;

class EntityRecordMapperRunner extends RecordMapperRunner
{
    public function __construct(
        BaseFieldMapperRegistry $entityFieldMapperRegistry,
        BaseFieldTypeMapperRegistry $entityFieldTypeMapperRegistry,
        BaseRecordMapperRegistry $entityRecordMapperRegistry,
        FieldDefinitionsProviderInterface $fieldDefinitions
    ) {
        parent::__construct($entityFieldMapperRegistry, $entityFieldTypeMapperRegistry, $entityRecordMapperRegistry, $fieldDefinitions);
    }
}
