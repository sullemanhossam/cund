```js
import fs from 'fs';
import { parse } from 'esprima';
import { generateOutline } from './index.js';

function exampleFunction(a, b) {
    return a + b;
}

class ExampleClass {
    constructor() {
        this.name = 'Example';
    }

    greet() {
        return `Hello, ${this.name}`;
    }
}
```