const esprima = require("esprima");

export function generateOutline(content) {

    // Parse the content into an AST
    const ast = esprima.parseModule(content, { loc: true });

    const outline = {
        imports: [],
        functions: [],
        classes: [],
    };

    // Traverse the AST
    ast.body.forEach((node) => {
        console.log("🚀 ~ ast.body.forEach ~ node:", node)
        switch (node.type) {
            case 'ImportDeclaration':
                outline.imports.push({
                    source: node.source.value,
                    specifiers: node.specifiers.map(spec => ({
                        localName: spec.local.name,
                        importedName: spec.imported?.name || 'default',
                    })),
                });
                break;

            case 'FunctionDeclaration':
                outline.functions.push({
                    name: node.id ? node.id.name : '(anonymous)',
                    params: node.params.map(param => param.name || param.type),
                    location: node.loc,
                });
                break;

            case 'ClassDeclaration':
                outline.classes.push({
                    name: node.id.name,
                    methods: [],
                    location: node.loc,
                });

                // Extract methods within the class
                if (node.body && node.body.body) {
                    node.body.body.forEach((classElement) => {
                        if (classElement.type === 'MethodDefinition') {
                            outline.classes[outline.classes.length - 1].methods.push({
                                name: classElement.key.name,
                                kind: classElement.kind, // "constructor", "method", "get", or "set"
                                location: classElement.loc,
                            });
                        }
                    });
                }
                break;

            default:
                break;
        }
    });

    return JSON.stringify(ast);
}

