'use client'
import React, { useEffect, useState } from 'react';
// FIXME: fuck this component
type RenderComponentOptions = {
    zeroValueComponent?: React.ReactNode;
    nullValueComponent?: React.ReactNode;
    falseValueComponent?: React.ReactNode;
    trueValueComponent: React.ReactNode;
};

type RenderConditionalComponentProps = {
    value: any | Promise<any>;
    options: RenderComponentOptions;
};

const RenderConditionalComponent: React.FC<RenderConditionalComponentProps> = ({ value, options }) => {
    const { zeroValueComponent, nullValueComponent, falseValueComponent, trueValueComponent } = options;

    if (value === null) {
        return null; // Replace this with a loading spinner if needed
    } else if (value === 0 && zeroValueComponent !== undefined) {
        return zeroValueComponent;
    } else if (value === null && nullValueComponent !== undefined) {
        return nullValueComponent;
    } else if (value === false && falseValueComponent !== undefined) {
        return falseValueComponent;
    } else if (value) {
        return trueValueComponent;
    }
    return null;
};

export default RenderConditionalComponent;
