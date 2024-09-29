// import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import Pagination from '../index'
import mountTest from "#test/react/mountTest";
import styleTest from "#test/react/styleTest";
import { cssClasses } from '@snow-design/foundation/button/constants';

describe('Button', () => {
    const prefix = cssClasses.PREFIX;
    mountTest(() => <Pagination />)
    styleTest(Pagination)
});
