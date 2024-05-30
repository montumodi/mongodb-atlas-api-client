// eslint.config.js
import pluginJs from "@eslint/js";

export default [
  pluginJs.configs.recommended,
  {
    "rules": {
      // Possible Errors
      // The following rules point out areas where you might have made mistakes.

      "comma-dangle": [2, "never"],               // - disallow or enforce trailing commas (recommended)
      "getter-return": 2,                         // - enforces that a return statement is present in property getters
      "no-async-promise-executor": 2,             // - disallow using an async function as a Promise executor
      "no-await-in-loop": 2,                      // - disallow await inside of loops
      "no-compare-neg-zero": 2,                   // - disallow checking for equality against negative zero
      "no-cond-assign": 2,                        // - disallow assignment in conditional expressions (recommended)
      "no-console": 2,                            // - disallow use of console in the node environment (recommended)
      "no-constant-condition": 2,                 // - disallow use of constant expressions in conditions (recommended)
      "no-control-regex": 2,                      // - disallow control characters in regular expressions (recommended)
      "no-debugger": 2,                           // - disallow use of debugger (recommended)
      "no-dupe-args": 2,                          // - disallow duplicate arguments in functions (recommended)
      "no-dupe-keys": 2,                          // - disallow duplicate keys when creating object literals (recommended)
      "no-duplicate-case": 2,                     // - disallow a duplicate case label. (recommended)
      "no-empty-character-class": 2,              // - disallow the use of empty character classes in regular expressions (recommended)
      "no-empty": 2,                              // - disallow empty statements (recommended)
      "no-ex-assign": 2,                          // - disallow assigning to the exception in a catch block (recommended)
      "no-extra-boolean-cast": 2,                 // - disallow double-negation boolean casts in a boolean context (recommended)
      "no-extra-parens": 0,                       // - disallow unnecessary parentheses
      "no-extra-semi": 2,                         // - disallow unnecessary semicolons (recommended)
      "no-func-assign": 2,                        // - disallow overwriting functions written as function declarations (recommended)
      "no-inner-declarations": [2, "functions"],  // - disallow function or variable declarations in nested blocks (recommended)
      "no-invalid-regexp": 2,                     // - disallow invalid regular expression strings in the RegExp constructor (recommended)
      "no-irregular-whitespace": 2,               // - disallow irregular whitespace outside of strings and comments (recommended)
      "no-negated-in-lhs": 2,                     // - disallow negation of the left operand of an in expression (recommended)
      "no-obj-calls": 2,                          // - disallow the use of object properties of the global object (Math and JSON) as functions (recommended)
      "no-regex-spaces": 2,                       // - disallow multiple spaces in a regular expression literal (recommended)
      "no-sparse-arrays": 0,                      // - disallow sparse arrays (recommended) Note: set to false because array destructuring in ES6
      "no-unreachable": 2,                        // - disallow unreachable statements after a return, throw, continue, or break statement (recommended)
      "use-isnan": 2,                             // - disallow comparisons with the value NaN (recommended)
      "valid-typeof": 2,                          // - Ensure that the results of typeof are compared against a valid string (recommended)
      "no-unexpected-multiline": 2,               // - Avoid code that looks like two expressions but is actually one

      // Best Practices
      // These are rules designed to prevent you from making mistakes. They either prescribe a better way of doing something or help you avoid footguns.

      "accessor-pairs": 2,                        // - Enforces getter/setter pairs in objects
      "block-scoped-var": 0,                      // - treat var statements as if they were block scoped
      "complexity": [1, 9],                       // - specify the maximum cyclomatic complexity allowed in a program
      "consistent-return": 1,                     // - require return statements to either always or never specify values
      "curly": [2, "all"],                       // - specify curly brace conventions for all control statements
      "default-case": 0,                          // - require default case in switch statements
      "dot-notation": 2,                          // - encourages use of dot notation whenever possible
      "dot-location": [2, "property"],            // - enforces consistent newlines before or after dots
      "eqeqeq": 2,                                // - require the use of === and !==
      "guard-for-in": 2,                          // - make sure for-in loops have an if statement
      "no-alert": 2,                              // - disallow the use of alert, confirm, and prompt
      "no-caller": 2,                             // - disallow use of arguments.caller or arguments.callee
      "no-div-regex": 2,                          // - disallow division operators explicitly at beginning of regular expression
      "no-else-return": 2,                        // - disallow else after a return in an if
      "no-eq-null": 2,                            // - disallow comparisons to null without a type-checking operator
      "no-eval": 2,                               // - disallow use of eval()
      "no-extend-native": 2,                      // - disallow adding to native types
      "no-extra-bind": 2,                         // - disallow unnecessary function binding
      "no-fallthrough": 2,                        // - disallow fallthrough of case statements (recommended)
      "no-floating-decimal": 2,                   // - disallow the use of leading or trailing decimal points in numeric literals
      "no-implicit-coercion": 2,                  // - disallow the type conversions with shorter notations
      "no-implied-eval": 2,                       // - disallow use of eval()-like methods
      "no-invalid-this": 2,                       // - disallow this keywords outside of classes or class-like objects
      "no-iterator": 2,                           // - disallow usage of __iterator__ property
      "no-labels": 2,                             // - disallow use of labeled statements
      "no-lone-blocks": 2,                        // - disallow unnecessary nested blocks
      "no-loop-func": 2,                          // - disallow creation of functions within loops
      "no-multi-spaces": [
        2,
        {
          "ignoreEOLComments": true
        }
      ],                                          // - disallow use of multiple spaces
      "no-multi-str": 2,                          // - disallow use of multiline strings
      "no-native-reassign": 2,                    // - disallow reassignments of native objects
      "no-new-func": 2,                           // - disallow use of new operator for Function object
      "no-new-wrappers": 2,                       // - disallows creating new instances of String,Number, and Boolean
      "no-new": 2,                                // - disallow use of the new operator when not part of an assignment or comparison
      "no-octal-escape": 2,                       // - disallow use of octal escape sequences in string literals, such as var foo = "Copyright \251";
      "no-octal": 2,                              // - disallow use of octal literals (recommended)
      "no-param-reassign": 2,                     // - disallow reassignment of function parameters
      "no-process-env": 2,                        // - disallow use of process.env
      "no-proto": 2,                              // - disallow usage of __proto__ property
      "no-redeclare": 2,                          // - disallow declaring the same variable more than once (recommended)
      "no-return-assign": 2,                      // - disallow use of assignment in return statement
      "no-return-await": 2,                       // - disallows unnecessary return await
      "no-script-url": 2,                         // - disallow use of javascript: urls.
      "no-self-assign": 2,                        // - disallow Self Assignment
      "no-self-compare": 2,                       // - disallow comparisons where both sides are exactly the same
      "no-sequences": 2,                          // - disallow use of the comma operator
      "no-throw-literal": 2,                      // - restrict what can be thrown as an exception
      "no-unused-expressions": 0,                 // - disallow usage of expressions in statement position
      "no-useless-call": 2,                       // - disallow unnecessary .call() and .apply()
      "no-void": 2,                               // - disallow use of the void operator
      "no-warning-comments": 0,                   // - disallow usage of configurable warning terms in comments - e.g. TODO or FIXME
      "no-with": 2,                               // - disallow use of the with statement
      "radix": 2,                                 // - require use of the second argument for parseInt()
      "vars-on-top": 2,                           // - require declaration of all vars at the top of their containing scope
      "wrap-iife": 2,                             // - require immediate function invocation to be wrapped in parentheses
      "yoda": 2,                                  // - require or disallow Yoda conditions

      // Strict Mode
      // These rules relate to using strict mode.

      "strict": [2, "global"],                    // - controls location of Use Strict Directives

      // Variables
      // These rules have to do with variable declarations.

      "init-declarations": 0,                     // - enforce or disallow variable initializations at definition
      "no-catch-shadow": 2,                       // - disallow the catch clause parameter name being the same as a variable in the outer scope
      "no-delete-var": 2,                         // - disallow deletion of variables (recommended)
      "no-label-var": 2,                          // - disallow labels that share a name with a variable
      "no-shadow-restricted-names": 2,            // - disallow shadowing of names such as arguments
      "no-shadow": 2,                             // - disallow declaration of variables already declared in the outer scope
      "no-undef-init": 2,                         // - disallow use of undefined when initializing variables
      "no-undef": 2,                              // - disallow use of undeclared variables unless mentioned in a /*global */ block (recommended)
      "no-undefined": 0,                          // - disallow use of undefined variable
      "no-unused-vars": 2,                        // - disallow declaration of variables that are not used in the code (recommended)
      "no-use-before-define": 2,                  // - disallow use of variables before they are defined

      // Node.js
      // These rules are specific to JavaScript running on Node.js.

      "callback-return": 2,                       // - enforce return after a callback
      "global-require": 2,                        // - enforce require() on the top-level module scope
      "handle-callback-err": 2,                   // - enforce error handling in callbacks
      "no-mixed-requires": 2,                     // - disallow mixing regular variable and require declarations
      "no-new-require": 2,                        // - disallow use of new operator with the require function
      "no-path-concat": 2,                        // - disallow string concatenation with __dirname and __filename
      "no-process-exit": 2,                       // - disallow process.exit()
      "no-restricted-modules": 2,                 // - restrict usage of specified node modules
      "no-sync": 2,                               // - disallow use of synchronous methods
      "no-buffer-constructor": 2,                 // - disallow use of the deprecated Buffer() constructor

      // Stylistic Issues
      // These rules are purely matters of style and are quite subjective.

      "array-bracket-spacing": 2,                 // - enforce spacing inside array brackets
      "brace-style": 2,                           // - enforce one true brace style
      "camelcase": 2,                             // - require camel case names
      "comma-spacing": 2,                         // - enforce spacing before and after comma
      "comma-style": 2,                           // - enforce one true comma style
      "computed-property-spacing": 2,             // - require or disallow padding inside computed properties
      "consistent-this": 2,                       // - enforce consistent naming when capturing the current execution context
      "eol-last": 2,                              // - enforce newline at the end of file, with no multiple empty lines
      "func-names": 0,                            // - require function expressions to have a name
      "func-style": [2, "declaration"],           // - enforce use of function declarations or expressions
      "id-length": [2,
        {
          "min": 2,
          "max": 70,
          "exceptions": ["i", "j", "k", "n", "Q", "_"]
        }
      ],                                          // - this option enforces minimum and maximum identifier lengths (variable names, property names etc.) (off by default)
      "id-match": 0,                              // - require identifiers to match the provided regular expression
      "indent": [2, 2,                            // - specify tab or space width for your code
        {
          "SwitchCase": 1
        }
      ],
      "key-spacing": 2,                           // - enforce spacing between keys and values in object literal properties
      "lines-around-comment": [2,
        {
          "beforeBlockComment": true,
          "afterBlockComment": false,
          "beforeLineComment": false,
          "afterLineComment": false,
          "allowBlockStart": true,
          "allowBlockEnd": true
        }
      ],                                          // - enforce empty lines around comments
      "linebreak-style": 2,                       // - disallow mixed 'LF' and 'CRLF' as linebreaks
      "max-nested-callbacks": [2, 6],             // - specify the maximum depth callbacks can be nested
      "max-statements-per-line": [
        2,
        {
          "max": 1
        }
      ],                                          // - enforce a maximum number of statements per line
      "new-cap": 0,                               // - require a capital letter for constructors
      "new-parens": 2,                            // - disallow the omission of parentheses when invoking a constructor with no arguments
      "newline-after-var": 0,                     // - require or disallow an empty newline after variable declarations
      "no-array-constructor": 2,                  // - disallow use of the Array constructor
      "no-continue": 2,                           // - disallow use of the continue statement
      "no-inline-comments": 0,                    // - disallow comments inline after code
      "no-lonely-if": 2,                          // - disallow if as the only statement in an else block
      "no-mixed-spaces-and-tabs": 2,              // - disallow mixed spaces and tabs for indentation (recommended)
      "no-multiple-empty-lines": [
        2,
        {
          "max": 2,
          "maxEOF": 1,
          "maxBOF": 0
        }
      ],                                          // - disallow multiple empty lines
      "no-nested-ternary": 2,                     // - disallow nested ternary expressions
      "no-new-object": 2,                         // - disallow the use of the Object constructor
      "no-spaced-func": 2,                        // - disallow space between function identifier and application
      "no-ternary": 0,                            // - disallow the use of ternary operators
      "no-trailing-spaces": 2,                    // - disallow trailing whitespace at the end of lines
      "no-underscore-dangle": 0,                  // - disallow dangling underscores in identifiers
      "no-unneeded-ternary": 2,                   // - disallow the use of Boolean literals in conditional expressions
      "object-curly-spacing": 2,                  // - require or disallow padding inside curly braces
      "one-var": [1, "never"],                    // - require or disallow one variable declaration per function
      "operator-assignment": [2, "always"],       // - require assignment operator shorthand where possible or prohibit it entirely
      "operator-linebreak": 2,                    // - enforce operators to be placed before or after line breaks
      "padded-blocks": 0,                         // - enforce padding within blocks
      "quote-props": 2,                           // - require quotes around object literal property names
      "quotes": [2, "double"],                    // - specify whether backticks, double or single quotes should be used
      "semi-spacing": 2,                          // - enforce spacing before and after semicolons
      "semi": 2,                                  // - require or disallow use of semicolons instead of ASI
      "sort-vars": 0,                             // - sort variables within the same declaration block
      "keyword-spacing": 2,                       // - require a space after certain keywords
      "space-before-blocks": 2,                   // - require or disallow a space before blocks
      "space-before-function-paren": [2,
        {
          "anonymous": "always",
          "named": "never"
        }
      ],                                          //  - require or disallow a space before function opening parenthesis
      "space-in-parens": 2,                       //  - require or disallow spaces inside parentheses
      "space-infix-ops": 2,                       // - require spaces around operators
      "space-unary-ops": 2,                       // - require or disallow spaces before/after unary operators
      "spaced-comment": 2,                        // - require or disallow a space immediately following the // or /* in a comment
      "wrap-regex": 2,                            // - require regex literals to be wrapped in parentheses

      // ECMAScript 6
      // These rules are only relevant to ES6 environments.

      "arrow-parens": [2, "as-needed"],           // - require parens in arrow function arguments
      "arrow-spacing": 2,                         // - require space before/after arrow function's arrow
      "constructor-super": 2,                     // - verify calls of super() in constructors
      "generator-star-spacing": 2,                // - enforce spacing around the * in generator functions
      "no-class-assign": 2,                       // - disallow modifying variables of class declarations
      "no-const-assign": 2,                       // - disallow modifying variables that are declared using const
      "no-this-before-super": 2,                  // - disallow use of this/super before calling super() in constructors.
      "no-var": 2,                                // - require let or const instead of var
      "object-shorthand": [2, "methods"],         // - require method and property shorthand syntax for object literals
      "prefer-const": 2,                          // - suggest using const declaration for variables that are never modified after declared
      "prefer-spread": 2,                         // - suggest using the spread operator instead of .apply().
      "require-yield": 2,                         // - disallow generator functions that do not have yield
      "prefer-template": 2
    }
  }
];