// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

'use strict';

import { IExperimentationTelemetry } from 'vscode-tas-client';
import { sendTelemetryEvent, setSharedProperty } from '../../telemetry';

export class ExperimentationTelemetry implements IExperimentationTelemetry {
    public setSharedProperty(name: string, value: string): void {
        // Add the shared property to all telemetry being sent, not just events being sent by the experimentation package.
        setSharedProperty(name, value);
    }

    public postEvent(eventName: string, properties: Map<string, string>): void {
        const formattedProperties: { [key: string]: string } = {};
        properties.forEach((value, key) => {
            formattedProperties[key] = value;
        });

        // tslint:disable-next-line: no-any
        sendTelemetryEvent(eventName as any, undefined, formattedProperties);
    }
}
