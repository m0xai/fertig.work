import * as React from 'react';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
    root: { marginTop: 10 },
};

export const PivotTab: React.FunctionComponent = () => {
    return (
        <Pivot aria-label="Basic Pivot Example">
            <PivotItem
                headerText="All"
                headerButtonProps={{
                    'data-order': 1,
                    'data-title': 'My Files Title',
                }}
            >
                <Label styles={labelStyles}>Pivot #1</Label>
            </PivotItem>
            <PivotItem headerText="Planned">
                <Label styles={labelStyles}>Pivot #2</Label>
            </PivotItem>
            <PivotItem headerText="To Do">
                <Label styles={labelStyles}>Pivot #3</Label>
            </PivotItem>
            <PivotItem headerText="Done">
                <Label styles={labelStyles}>Pivot #4</Label>
            </PivotItem>
        </Pivot>
    );
};