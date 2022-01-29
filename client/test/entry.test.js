import './jestConfig/enzyme.config.js';

import React from 'react';

import entry from "../src/entry.js";
import {describe, it} from "@jest/globals";

describe('Entry', () => {
    let something = entry;

    it('renders a root', () => {
        expect(something).toBeDefined();
    });
});
