/*! Flocking 0.2.0-dev, Copyright 2015 Colin Clark | flockingjs.org */

(function (root, factory) {
    if (typeof exports === "object") {
        // We're in a CommonJS-style loader.
        root.flock = exports;  // Always create the "flock" global.
        factory(exports, require("jquery"));
    } else if (typeof define === "function" && define.amd) {
        // We're in an AMD-style loader.
        define(["exports", "jquery"], function (exports, jQuery) {
            root.flock = exports; // Always create the "flock" global.
            return (root.flock, factory(exports, jQuery));
        });
    } else {
        // Plain old browser.
        root.flock = {};
        factory(root.flock, jQuery);
    }
}(this, function (exports, jQuery) {
    // To hell with isolationism.
    window.jQuery = jQuery;
;/*
 * Definitions in this file taken from:
 *
 * jQuery JavaScript Library v1.6.1
 * http://jquery.com/
 *
 * This implementation is only intended to be used in contexts where the Fluid Infusion framework
 * is required to be used without a functioning DOM being available (node.js or other standalone contexts).
 * It includes the minimum definitions taken from jQuery required to operate the core of Fluid.js
 * without FluidView.js. Consult http://issues.fluidproject.org/browse/FLUID-4568 for more details.
 *
 * Copyright 2011, John Resig
 * Copyright 2011- OCAD University
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 * Date: Thu May 12 15:04:36 2011 -0400
 */

/* global jQuery:true, global */
/* exported jQuery */

var fluid_2_0 = fluid_2_0 || {};
var fluid = fluid || fluid_2_0;

(function (fluid) {
    "use strict";

    // Save a reference to some core methods
    var toString = Object.prototype.toString;
    var hasOwn = Object.prototype.hasOwnProperty;
    var globalScope = typeof window !== "undefined" ? window :
        typeof self !== "undefined" ? self : global;
    // Map over jQuery in case of overwrite
    var _jQuery = globalScope.jQuery;
    // Map over the $ in case of overwrite
    var _$ = globalScope.$;

    var jQuery = fluid.jQueryStandalone = {

        // The current version of jQuery being used
        jquery: "1.6.1-fluidStandalone",

        noConflict: function (deep) {
            if (globalScope.$ === jQuery) {
                globalScope.$ = _$;
            }
            if (deep && globalScope.jQuery === jQuery) {
                globalScope.jQuery = _jQuery;
            }
            return jQuery;
        },

        isArray: Array.isArray || function (obj) {
            return toString.call(obj) === "[object Array]";
        },

        // A crude way of determining if an object is a window
        isWindow: function (obj) {
            return obj && typeof obj === "object" && "setInterval" in obj;
        },

        isPlainObject: function (obj) {
            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if ( !obj || toString.call(obj) !== "[object Object]" || obj.nodeType || jQuery.isWindow( obj ) ) {
                return false;
            }

            // Not own constructor property must be Object
            if ( obj.constructor &&
                !hasOwn.call(obj, "constructor") &&
                !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                return false;
            }
            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            // TODO: Isn't this enormously expensive?
            var key;
            for (key in obj) {}
            return key === undefined || hasOwn.call( obj, key );
        },

        trim: function (str) {
            return str.trim();
        },

        isEmptyObject: function (obj) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
        },

        extend: function () {
            var options,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

            // Handle a deep copy situation
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            }

            // Handle case when target is a string or something (possible in deep copy)
            if (typeof target !== "object" && typeof(target) !== "function") {
                target = {};
            }

            for ( ; i < length; i++ ) {
                // Only deal with non-null/undefined values
                if ( (options = arguments[ i ]) !== null ) {
                    // Extend the base object
                    for (var name in options) {
                        var src = target[ name ];
                        var copy = options[ name ];

                        // Prevent never-ending loop
                        if ( target === copy ) {
                            continue;
                        }
                        var copyIsArray, clone;
                        // Recurse if we're merging plain objects or arrays
                        if (deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && jQuery.isArray(src) ? src : [];
                            } else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }
                            // Never move original objects, clone them
                            target[name] = jQuery.extend( deep, clone, copy );
                        } else if (copy !== undefined) {
                            // Don't bring in undefined values
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        }
    };

})(fluid_2_0);

var jQuery = fluid.jQueryStandalone;
;/*!
 * Fluid Infusion v2.0
 *
 * Infusion is distributed under the Educational Community License 2.0 and new BSD licenses:
 * http://wiki.fluidproject.org/display/fluid/Fluid+Licensing
 *
 * For information on copyright, see the individual Infusion source code files:
 * https://github.com/fluid-project/infusion/
 */
/*
Copyright 2007-2010 University of Cambridge
Copyright 2007-2009 University of Toronto
Copyright 2007-2009 University of California, Berkeley
Copyright 2010-2011 Lucendo Development Ltd.
Copyright 2010 OCAD University
Copyright 2011 Charly Molter
Copyright 2014-2015 Raising the Floor (International)

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/* global console */

var fluid_2_0 = fluid_2_0 || {};
var fluid = fluid || fluid_2_0;

(function ($, fluid) {
    "use strict";

    fluid.version = "Infusion 2.0-SNAPSHOT";

    // Export this for use in environments like node.js, where it is useful for
    // configuring stack trace behaviour
    fluid.Error = Error;

    fluid.environment = {
        fluid: fluid
    };

    fluid.global = fluid.global || typeof window !== "undefined" ?
        window : typeof self !== "undefined" ? self : {};

    // A standard utility to schedule the invocation of a function after the current
    // stack returns. On browsers this defaults to setTimeout(func, 1) but in
    // other environments can be customised - e.g. to process.nextTick in node.js
    // In future, this could be optimised in the browser to not dispatch into the event queue
    fluid.invokeLater = function (func) {
        return setTimeout(func, 1);
    };

    // The following flag defeats all logging/tracing activities in the most performance-critical parts of the framework.
    // This should really be performed by a build-time step which eliminates calls to pushActivity/popActivity and fluid.log.
    fluid.defeatLogging = true;

    // This flag enables the accumulating of all "activity" records generated by pushActivity into a running trace, rather
    // than removing them from the stack record permanently when receiving popActivity. This trace will be consumed by
    // visual debugging tools.
    fluid.activityTracing = false;
    fluid.activityTrace = [];

    var activityParser = /(%\w+)/g;

    // Renders a single activity element in a form suitable to be sent to a modern browser's console
    // unsupported, non-API function
    fluid.renderOneActivity = function (activity, nowhile) {
        var togo = nowhile === true ? [] : ["    while "];
        var message = activity.message;
        var index = activityParser.lastIndex = 0;
        while (true) {
            var match = activityParser.exec(message);
            if (match) {
                var key = match[1].substring(1);
                togo.push(message.substring(index, match.index));
                togo.push(activity.args[key]);
                index = activityParser.lastIndex;
            }
            else {
                break;
            }
        }
        if (index < message.length) {
            togo.push(message.substring(index));
        }
        return togo;
    };

    // Renders an activity stack in a form suitable to be sent to a modern browser's console
    // unsupported, non-API function
    fluid.renderActivity = function (activityStack, renderer) {
        renderer = renderer || fluid.renderOneActivity;
        return fluid.transform(activityStack, renderer);
    };
    
    // Definitions for ThreadLocals, the static and dynamic environment - lifted here from
    // FluidIoC.js so that we can issue calls to fluid.describeActivity for debugging purposes
    // in the core framework

    // unsupported, non-API function
    fluid.singleThreadLocal = function (initFunc) {
        var value = initFunc();
        return function (newValue) {
            return newValue === undefined ? value : value = newValue;
        };
    };

    // Currently we only support single-threaded environments - ensure that this function
    // is not used on startup so it can be successfully monkey-patched
    // only remaining uses of threadLocals are for activity reporting and in the renderer utilities
    // unsupported, non-API function
    fluid.threadLocal = fluid.singleThreadLocal;

    // unsupported, non-API function
    fluid.globalThreadLocal = fluid.threadLocal(function () {
        return {};
    });

    // Return an array of objects describing the current activity
    // unsupported, non-API function
    fluid.getActivityStack = function () {
        var root = fluid.globalThreadLocal();
        if (!root.activityStack) {
            root.activityStack = [];
        }
        return root.activityStack;
    };

    // Return an array of objects describing the current activity
    // unsupported, non-API function
    fluid.describeActivity = fluid.getActivityStack;

    // Renders either the current activity or the supplied activity to the console
    fluid.logActivity = function (activity) {
        activity = activity || fluid.describeActivity();
        var rendered = fluid.renderActivity(activity).reverse();
        fluid.log("Current activity: ");
        fluid.each(rendered, function (args) {
            fluid.doLog(args);
        });
    };

    // Execute the supplied function with the specified activity description pushed onto the stack
    // unsupported, non-API function
    fluid.pushActivity = function (type, message, args) {
        var record = {type: type, message: message, args: args, time: new Date().getTime()};
        if (fluid.activityTracing) {
            fluid.activityTrace.push(record);
        }
        if (fluid.passLogLevel(fluid.logLevel.TRACE)) {
            fluid.doLog(fluid.renderOneActivity(record, true));
        }
        var activityStack = fluid.getActivityStack();
        activityStack.push(record);
    };

    // Undo the effect of the most recent pushActivity, or multiple frames if an argument is supplied
    fluid.popActivity = function (popframes) {
        popframes = popframes || 1;
        if (fluid.activityTracing) {
            fluid.activityTrace.push({pop: popframes});
        }
        var activityStack = fluid.getActivityStack();
        var popped = activityStack.length - popframes;
        activityStack.length = popped < 0 ? 0 : popped;
    };
    // "this-ist" style Error so that we can distinguish framework errors whilst still retaining access to platform Error features
    // unsupported, non-API function
    fluid.FluidError = function (message) {
        this.message = message;
        this.stack = new Error().stack;
    };
    fluid.FluidError.prototype = new Error();
    
    // The framework's built-in "log" failure handler - this logs the supplied message as well as any framework activity in progress via fluid.log
    fluid.logFailure = function (args, activity) {
        fluid.log.apply(null, [fluid.logLevel.FAIL, "ASSERTION FAILED: "].concat(args));
        fluid.logActivity(activity);
    };
    
    fluid.renderLoggingArg = function (arg) {
        return fluid.isPrimitive(arg) || !fluid.isPlainObject(arg) ? arg : JSON.stringify(arg);
    };

    // The framework's built-in "fail" failure handler - this throws an exception of type <code>fluid.FluidError</code>
    fluid.builtinFail = function (args /*, activity*/) {
        var message = fluid.transform(args, fluid.renderLoggingArg).join("");
        throw new fluid.FluidError("Assertion failure - check console for more details: " + message);
    };

    /**
     * Signals an error to the framework. The default behaviour is to log a structured error message and throw an exception. This strategy may be configured using the legacy
     * API <code>fluid.pushSoftFailure</code> or else by adding and removing suitably namespaced listeners to the special event <code>fluid.failureEvent</code>
     *
     * @param {String} message the error message to log
     * @param ... Additional arguments, suitable for being sent to the native console.log function
     */
    fluid.fail = function (/* message, ... */) {
        var args = fluid.makeArray(arguments);
        var activity = fluid.makeArray(fluid.describeActivity()); // Take copy since we will destructively modify
        fluid.popActivity(activity.length); // clear any current activity - TODO: the framework currently has no exception handlers, although it will in time
        if (fluid.failureEvent) { // notify any framework failure prior to successfully setting up the failure event below
            fluid.failureEvent.fire(args, activity);
        } else {
            fluid.logFailure(args, activity);
            fluid.builtinFail(args, activity);
        }
    };

    // TODO: rescued from kettleCouchDB.js - clean up in time
    fluid.expect = function (name, target, members) {
        fluid.transform(fluid.makeArray(members), function (key) {
            if (typeof target[key] === "undefined") {
                fluid.fail(name + " missing required parameter " + key);
            }
        });
    };

    // Logging

    /** Returns whether logging is enabled **/
    fluid.isLogging = function () {
        return logLevelStack[0].priority > fluid.logLevel.IMPORTANT.priority;
    };

    /** Determines whether the supplied argument is a valid logLevel marker **/
    fluid.isLogLevel = function (arg) {
        return fluid.isMarker(arg) && arg.priority !== undefined;
    };

    /** Accepts one of the members of the <code>fluid.logLevel</code> structure. Returns <code>true</code> if
     *  a message supplied at that log priority would be accepted at the current logging level. Clients who
     *  issue particularly expensive log payload arguments are recommended to guard their logging statements with this
     *  function */

    fluid.passLogLevel = function (testLogLevel) {
        return testLogLevel.priority <= logLevelStack[0].priority;
    };

    /** Method to allow user to control the logging level. Accepts either a boolean, for which <code>true</code>
      * represents <code>fluid.logLevel.INFO</code> and <code>false</code> represents <code>fluid.logLevel.IMPORTANT</code> (the default),
      * or else any other member of the structure <code>fluid.logLevel</code>
      * Messages whose priority is strictly less than the current logging level will not be shown*/
    fluid.setLogging = function (enabled) {
        var logLevel;
        if (typeof enabled === "boolean") {
            logLevel = fluid.logLevel[enabled? "INFO" : "IMPORTANT"];
        } else if (fluid.isLogLevel(enabled)) {
            logLevel = enabled;
        } else {
            fluid.fail("Unrecognised fluid logging level ", enabled);
        }
        logLevelStack.unshift(logLevel);
        fluid.defeatLogging = !fluid.isLogging();
    };

    fluid.setLogLevel = fluid.setLogging;

    /** Undo the effect of the most recent "setLogging", returning the logging system to its previous state **/
    fluid.popLogging = function () {
        var togo = logLevelStack.length === 1? logLevelStack[0] : logLevelStack.shift();
        fluid.defeatLogging = !fluid.isLogging();
        return togo;
    };

    /** Actually do the work of logging <code>args</code> to the environment's console. If the standard "console"
     * stream is available, the message will be sent there.
     */
    fluid.doLog = function (args) {
        if (typeof (console) !== "undefined") {
            if (console.debug) {
                console.debug.apply(console, args);
            } else if (typeof (console.log) === "function") {
                console.log.apply(console, args);
            }
        }
    };

    /** Log a message to a suitable environmental console. If the first argument to fluid.log is
     * one of the members of the <code>fluid.logLevel</code> structure, this will be taken as the priority
     * of the logged message - else if will default to <code>fluid.logLevel.INFO</code>. If the logged message
     * priority does not exceed that set by the most recent call to the <code>fluid.setLogging</code> function,
     * the message will not appear.
     */
    fluid.log = function (/* message /*, ... */) {
        var directArgs = fluid.makeArray(arguments);
        var userLogLevel = fluid.logLevel.INFO;
        if (fluid.isLogLevel(directArgs[0])) {
            userLogLevel = directArgs.shift();
        }
        if (fluid.passLogLevel(userLogLevel)) {
            var arg0 = fluid.renderTimestamp(new Date()) + ":  ";
            var args = [arg0].concat(directArgs);
            fluid.doLog(args);
        }
    };

    // Functional programming utilities.

    // Type checking functions

    /** Returns true if the argument is a value other than null or undefined **/
    fluid.isValue = function (value) {
        return value !== undefined && value !== null;
    };

    /** Returns true if the argument is a primitive type **/
    fluid.isPrimitive = function (value) {
        var valueType = typeof (value);
        return !value || valueType === "string" || valueType === "boolean" || valueType === "number" || valueType === "function";
    };

    /** Determines whether the supplied object is an array. The strategy used is an optimised
     * approach taken from an earlier version of jQuery - detecting whether the toString() version
     * of the object agrees with the textual form [object Array], or else whether the object is a
     * jQuery object (the most common source of "fake arrays").
     */
    fluid.isArrayable = function (totest) {
        return totest && (totest.jquery || Object.prototype.toString.call(totest) === "[object Array]");
    };

    /** Determines whether the supplied object is a plain JSON-forming container - that is, it is either a plain Object
     * or a plain Array */
    fluid.isPlainObject = function (totest) {
        var string = Object.prototype.toString.call(totest);
        if (string === "[object Array]") {
            return true;
        } else if (string !== "[object Object]") {
            return false;
        } // FLUID-5226: This inventive strategy taken from jQuery detects whether the object's prototype is directly Object.prototype by virtue of having an "isPrototypeOf" direct member
        return !totest.constructor || !totest.constructor.prototype || Object.prototype.hasOwnProperty.call(totest.constructor.prototype, "isPrototypeOf");
    };
    
    /** Returns <code>primitive</code>, <code>array</code> or <code>object</code> depending on whether the supplied object has
     * one of those types, by use of the <code>fluid.isPrimitive</code>, <code>fluid.isPlainObject</code> and <code>fluid.isArrayable</code> utilities
     */
    fluid.typeCode = function (totest) {
        return fluid.isPrimitive(totest) || !fluid.isPlainObject(totest) ? "primitive" :
            fluid.isArrayable(totest) ? "array" : "object";
    };

    fluid.isDOMNode = function (obj) {
      // This could be more sound, but messy:
      // http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
      // The real problem is browsers like IE6, 7 and 8 which still do not feature a "constructor" property on DOM nodes
        return obj && typeof (obj.nodeType) === "number";
    };

    fluid.isDOMish = function (obj) {
        return fluid.isDOMNode(obj) || obj.jquery;
    };

    fluid.isComponent = function (obj) {
        return obj && obj.constructor === fluid.componentConstructor;
    };

    /** A basic utility that returns its argument unchanged */

    fluid.identity = function (arg) {
        return arg;
    };

    /** A function which raises a failure if executed */
    
    fluid.notImplemented = function () {
        fluid.fail("This operation is not implemented");
    };

    /** Return an empty container as the same type as the argument (either an
     * array or hash */
    fluid.freshContainer = function (tocopy) {
        return fluid.isArrayable(tocopy) ? [] : {};
    };

    fluid.isUncopyable = function (totest) {
        return fluid.isPrimitive(totest) || fluid.isDOMish(totest) || !fluid.isPlainObject(totest);
    };
    
    fluid.copyRecurse = function (tocopy, segs) {
        if (segs.length > fluid.strategyRecursionBailout) {
            fluid.fail("Runaway recursion encountered in fluid.copy - reached path depth of " + fluid.strategyRecursionBailout + " via path of " + segs.join(".") +
                "this object is probably circularly connected. Either adjust your object structure to remove the circularity or increase fluid.strategyRecursionBailout");
        }
        if (fluid.isUncopyable(tocopy)) {
            return tocopy;
        } else {
            return fluid.transform(tocopy, function (value, key) {
                segs.push(key);
                var togo = fluid.copyRecurse(value, segs);
                segs.pop();
                return togo;
            });
        }
    };

    /** Performs a deep copy (clone) of its argument. This will guard against cloning a circular object by terminating if it reaches a path depth
     * greater than <code>fluid.strategyRecursionBailout</code>
     **/

    fluid.copy = function (tocopy) {
        return fluid.copyRecurse(tocopy, []);
    };

    /** Corrected version of jQuery makeArray that returns an empty array on undefined rather than crashing.
      * We don't deal with as many pathological cases as jQuery **/
    fluid.makeArray = function (arg) {
        var togo = [];
        if (arg !== null && arg !== undefined) {
            if (fluid.isPrimitive(arg) || typeof(arg.length) !== "number") {
                togo.push(arg);
            }
            else {
                for (var i = 0; i < arg.length; ++ i) {
                    togo[i] = arg[i];
                }
            }
        }
        return togo;
    };

    function transformInternal(source, togo, key, args) {
        var transit = source[key];
        for (var j = 0; j < args.length - 1; ++j) {
            transit = args[j + 1](transit, key);
        }
        togo[key] = transit;
    }

    /** Return a list or hash of objects, transformed by one or more functions. Similar to
     * jQuery.map, only will accept an arbitrary list of transformation functions and also
     * works on non-arrays.
     * @param source {Array or Object} The initial container of objects to be transformed. If the source is
     * neither an array nor an object, it will be returned untransformed
     * @param fn1, fn2, etc. {Function} An arbitrary number of optional further arguments,
     * all of type Function, accepting the signature (object, index), where object is the
     * list member to be transformed, and index is its list index. Each function will be
     * applied in turn to each list member, which will be replaced by the return value
     * from the function.
     * @return The finally transformed list, where each member has been replaced by the
     * original member acted on by the function or functions.
     */
    fluid.transform = function (source) {
        if (fluid.isPrimitive(source)) {
            return source;
        }
        var togo = fluid.freshContainer(source);
        if (fluid.isArrayable(source)) {
            for (var i = 0; i < source.length; ++i) {
                transformInternal(source, togo, i, arguments);
            }
        } else {
            for (var key in source) {
                transformInternal(source, togo, key, arguments);
            }
        }
        return togo;
    };

    /** Better jQuery.each which works on hashes as well as having the arguments
     * the right way round.
     * @param source {Arrayable or Object} The container to be iterated over
     * @param func {Function} A function accepting (value, key) for each iterated
     * object.
     */
    fluid.each = function (source, func) {
        if (fluid.isArrayable(source)) {
            for (var i = 0; i < source.length; ++i) {
                func(source[i], i);
            }
        } else {
            for (var key in source) {
                func(source[key], key);
            }
        }
    };

    fluid.make_find = function (find_if) {
        var target = find_if ? false : undefined;
        return function (source, func, deffolt) {
            var disp;
            if (fluid.isArrayable(source)) {
                for (var i = 0; i < source.length; ++i) {
                    disp = func(source[i], i);
                    if (disp !== target) {
                        return find_if ? source[i] : disp;
                    }
                }
            } else {
                for (var key in source) {
                    disp = func(source[key], key);
                    if (disp !== target) {
                        return find_if ? source[key] : disp;
                    }
                }
            }
            return deffolt;
        };
    };

    /** Scan through a list or hash of objects, terminating on the first member which
     * matches a predicate function.
     * @param source {Arrayable or Object} The list or hash of objects to be searched.
     * @param func {Function} A predicate function, acting on a member. A predicate which
     * returns any value which is not <code>undefined</code> will terminate
     * the search. The function accepts (object, index).
     * @param deflt {Object} A value to be returned in the case no predicate function matches
     * a list member. The default will be the natural value of <code>undefined</code>
     * @return The first return value from the predicate function which is not <code>undefined</code>
     */
    fluid.find = fluid.make_find(false);
    /** The same signature as fluid.find, only the return value is the actual element for which the
     * predicate returns a value different from <code>false</code>
     */
    fluid.find_if = fluid.make_find(true);

    /** Scan through a list of objects, "accumulating" a value over them
     * (may be a straightforward "sum" or some other chained computation). "accumulate" is the name derived
     * from the C++ STL, other names for this algorithm are "reduce" or "fold".
     * @param list {Array} The list of objects to be accumulated over.
     * @param fn {Function} An "accumulation function" accepting the signature (object, total, index) where
     * object is the list member, total is the "running total" object (which is the return value from the previous function),
     * and index is the index number.
     * @param arg {Object} The initial value for the "running total" object.
     * @return {Object} the final running total object as returned from the final invocation of the function on the last list member.
     */
    fluid.accumulate = function (list, fn, arg) {
        for (var i = 0; i < list.length; ++i) {
            arg = fn(list[i], arg, i);
        }
        return arg;
    };

    /** Scan through a list or hash of objects, removing those which match a predicate. Similar to
     * jQuery.grep, only acts on the list in-place by removal, rather than by creating
     * a new list by inclusion.
     * @param source {Array|Object} The list or hash of objects to be scanned over.
     * @param fn {Function} A predicate function determining whether an element should be
     * removed. This accepts the standard signature (object, index) and returns a "truthy"
     * result in order to determine that the supplied object should be removed from the list.
     * @param target {Array|Object} (optional) A target object of the same type as <code>source</code>, which will
     * receive any objects removed from it.
     * @return <code>target</code>, containing the removed elements, if it was supplied, or else <code>source</code>
     * modified by the operation of removing the matched elements.
     */
    fluid.remove_if = function (source, fn, target) {
        if (fluid.isArrayable(source)) {
            for (var i = source.length - 1; i >= 0; --i) {
                if (fn(source[i], i)) {
                    if (target) {
                        target.unshift(source[i]);
                    }
                    source.splice(i, 1);
                }
            }
        } else {
            for (var key in source) {
                if (fn(source[key], key)) {
                    if (target) {
                        target[key] = source[key];
                    }
                    delete source[key];
                }
            }
        }
        return target || source;
    };

    /** Fills an array of given size with copies of a value or result of a function invocation
     * @param n {Number} The size of the array to be filled
     * @param generator {Object|Function} Either a value to be replicated or function to be called
     * @param applyFunc {Boolean} If true, treat the generator value as a function to be invoked with
     * argument equal to the index position
     */

    fluid.generate = function (n, generator, applyFunc) {
        var togo = [];
        for (var i = 0; i < n; ++ i) {
            togo[i] = applyFunc? generator(i) : generator;
        }
        return togo;
    };

    /** Returns an array of size count, filled with increasing integers, starting at 0 or at the index specified by first.
     * @param count {Number} Size of the filled array to be returned
     * @param first {Number} (optional, defaults to 0) First element to appear in the array
     */

    fluid.iota = function (count, first) {
        first = first || 0;
        var togo = [];
        for (var i = 0; i < count; ++i) {
            togo[togo.length] = first++;
        }
        return togo;
    };

    /** Extracts a particular member from each top-level member of a container, returning a new container of the same type
     * @param holder {Array|Object} The container to be filtered
     * @param name {String|Array of String} An EL path to be fetched from each top-level member
     */

    fluid.getMembers = function (holder, name) {
        return fluid.transform(holder, function(member) {
            return fluid.get(member, name);
        });
    };

    /** Accepts an object to be filtered, and a list of keys. Either all keys not present in
     * the list are removed, or only keys present in the list are returned.
     * @param toFilter {Array|Object} The object to be filtered - this will be NOT modified by the operation (current implementation
     * passes through $.extend shallow algorithm)
     * @param keys {Array of String} The list of keys to operate with
     * @param exclude {boolean} If <code>true</code>, the keys listed are removed rather than included
     * @return the filtered object (the same object that was supplied as <code>toFilter</code>
     */

    fluid.filterKeys = function (toFilter, keys, exclude) {
        return fluid.remove_if($.extend({}, toFilter), function (value, key) {
            return exclude ^ (keys.indexOf(key) === -1);
        });
    };

    /** A convenience wrapper for <code>fluid.filterKeys</code> with the parameter <code>exclude</code> set to <code>true</code>
     *  Returns the supplied object with listed keys removed */

    fluid.censorKeys = function (toCensor, keys) {
        return fluid.filterKeys(toCensor, keys, true);
    };

    // TODO: This is not as clever an idea as we think it is - this typically inner-loop function will optimise badly due to closure
    fluid.makeFlatten = function (index) {
        return function (obj) {
            var togo = [];
            fluid.each(obj, function (/* value, key */) {
                togo.push(arguments[index]);
            });
            return togo;
        };
    };

    /** Return the keys in the supplied object as an array. Note that this will return keys found in the prototype chain as well as "own properties", unlike Object.keys() **/
    fluid.keys = fluid.makeFlatten(1);

    /** Return the values in the supplied object as an array **/
    fluid.values = fluid.makeFlatten(0);

    /**
     * Searches through the supplied object, and returns <code>true</code> if the supplied value
     * can be found
     */
    fluid.contains = function (obj, value) {
        return obj ? (fluid.isArrayable(obj) ? obj.indexOf(value) !== -1 : fluid.find(obj, function (thisValue) {
            if (value === thisValue) {
                return true;
            }
        })) : undefined;
    };

    /**
     * Searches through the supplied object for the first value which matches the one supplied.
     * @param obj {Object} the Object to be searched through
     * @param value {Object} the value to be found. This will be compared against the object's
     * member using === equality.
     * @return {String} The first key whose value matches the one supplied, or <code>null</code> if no
     * such key is found.
     */
    fluid.keyForValue = function (obj, value) {
        return fluid.find(obj, function (thisValue, key) {
            if (value === thisValue) {
                return key;
            }
        });
    };

    /** Converts an array into an object whose keys are the elements of the array, each with the value "true"
     * @param array {Array of String} The array to be converted to a hash
     * @return hash {Object} An object with value <code>true</code> for each key taken from a member of <code>array</code>
     */

    fluid.arrayToHash = function (array) {
        var togo = {};
        fluid.each(array, function (el) {
            togo[el] = true;
        });
        return togo;
    };
    
    /** Applies a stable sorting algorithm to the supplied array and comparator (note that Array.sort in JavaScript is not specified
     * to be stable). The algorithm used will be an insertion sort, which whilst quadratic in time, will perform well
     * on small array sizes.
     * @param array {Array} The array to be sorted. This input array will be modified in place.
     * @param func {Function} A comparator returning >0, 0, or <0 on pairs of elements representing their sort order (same contract as Array.sort comparator)
     */
    
    fluid.stableSort = function (array, func) {
        for (var i = 0; i < array.length; i++) {
            var k = array[i];
            for (var j = i; j > 0 && func(k, array[j - 1]) < 0; j--) {
                array[j] = array[j - 1];
            }
            array[j] = k;
        }
    };
    
    /** Converts a hash into an object by hoisting out the object's keys into an array element via the supplied String "key", and then transforming via an optional further function, which receives the signature
     * (newElement, oldElement, key) where newElement is the freshly cloned element, oldElement is the original hash's element, and key is the key of the element.
     * If the function is not supplied, the old element is simply deep-cloned onto the new element (same effect
     * as transform fluid.transforms.objectToArray) 
     */
    fluid.hashToArray = function (hash, keyName, func) {
        var togo = [];
        fluid.each(hash, function (el, key) {
            var newEl = {};
            newEl[keyName] = key;
            if (func) {
                newEl = func(newEl, el, key) || newEl;
            } else {
                $.extend(true, newEl, el);
            }
            togo.push(newEl);
        });
        return togo;
    };

    /** Converts an array consisting of a mixture of arrays and non-arrays into the concatenation of any inner arrays 
     * with the non-array elements
     */
    fluid.flatten = function (array) {
        var togo = [];
        fluid.each(array, function (element) {
            if (fluid.isArrayable(element)) {
                togo = togo.concat(element);
            } else {
                togo.push(element);
            }
        });
        return togo;
    };

    /**
     * Clears an object or array of its contents. For objects, each property is deleted.
     *
     * @param {Object|Array} target the target to be cleared
     */
    fluid.clear = function (target) {
        if (fluid.isArrayable(target)) {
            target.length = 0;
        } else {
            for (var i in target) {
                delete target[i];
            }
        }
    };

   /**
    * @param boolean ascending <code>true</code> if a comparator is to be returned which
    * sorts strings in descending order of length
    */
    fluid.compareStringLength = function (ascending) {
        return ascending ? function (a, b) {
            return a.length - b.length;
        } : function (a, b) {
            return b.length - a.length;
        };
    };

    /**
     * Returns the converted integer if the input string can be converted to an integer. Otherwise, return NaN.
     * @param {String} a string to be returned in integer
     */
    fluid.parseInteger = function (string) {
        return isFinite(string) && ((string % 1) === 0) ? Number(string) : NaN;
    };

    /** A set of special "marker values" used in signalling in function arguments and return values,
      * to partially compensate for JavaScript's lack of distinguished types. These should never appear
      * in JSON structures or other kinds of static configuration. An API specifically documents if it
      * accepts or returns any of these values, and if so, what its semantic is  - most are of private
      * use internal to the framework **/

    fluid.marker = function () {};
    
    fluid.makeMarker = function (value, extra) {
        var togo = Object.create(fluid.marker.prototype);
        togo.value = value;
        $.extend(togo, extra);
        return Object.freeze(togo);
    };
    
    /** A special "marker object" representing that a distinguished
     * (probably context-dependent) value should be substituted.
     */
    fluid.VALUE = fluid.makeMarker("VALUE");

    /** A special "marker object" representing that no value is present (where
     * signalling using the value "undefined" is not possible - e.g. the return value from a "strategy") */
    fluid.NO_VALUE = fluid.makeMarker("NO_VALUE");

    /** A marker indicating that a value requires to be expanded after component construction begins **/
    fluid.EXPAND = fluid.makeMarker("EXPAND");

    /** Determine whether an object is any marker, or a particular marker - omit the
     * 2nd argument to detect any marker
     */
    fluid.isMarker = function (totest, type) {
        if (!(totest instanceof fluid.marker)) {
            return false;
        }
        if (!type) {
            return true;
        }
        return totest.value === type.value;
    };
    
    fluid.logLevelsSpec = {
        "FATAL":      0,
        "FAIL":       5,
        "WARN":      10,
        "IMPORTANT": 12, // The default logging "off" level - corresponds to the old "false"
        "INFO":      15, // The default logging "on" level - corresponds to the old "true"
        "TRACE":     20
    };

    /** A structure holding all supported log levels as supplied as a possible first argument to fluid.log
     * Members with a higher value of the "priority" field represent lower priority logging levels */
    // Moved down here since it uses fluid.transform and fluid.makeMarker on startup
    fluid.logLevel = fluid.transform(fluid.logLevelsSpec, function (value, key) {
        return fluid.makeMarker(key, {priority: value});
    });
    var logLevelStack = [fluid.logLevel.IMPORTANT]; // The stack of active logging levels, with the current level at index 0
    

    // Model functions
    fluid.model = {}; // cannot call registerNamespace yet since it depends on fluid.model

    /** Copy a source "model" onto a target **/
    fluid.model.copyModel = function (target, source) {
        fluid.clear(target);
        $.extend(true, target, source);
    };

    /** Parse an EL expression separated by periods (.) into its component segments.
     * @param {String} EL The EL expression to be split
     * @return {Array of String} the component path expressions.
     * TODO: This needs to be upgraded to handle (the same) escaping rules (as RSF), so that
     * path segments containing periods and backslashes etc. can be processed, and be harmonised
     * with the more complex implementations in fluid.pathUtil(data binding).
     */
    fluid.model.parseEL = function (EL) {
        return EL === "" ? [] : String(EL).split(".");
    };

    /** Compose an EL expression from two separate EL expressions. The returned
     * expression will be the one that will navigate the first expression, and then
     * the second, from the value reached by the first. Either prefix or suffix may be
     * the empty string **/

    fluid.model.composePath = function (prefix, suffix) {
        return prefix === "" ? suffix : (suffix === "" ? prefix : prefix + "." + suffix);
    };

    /** Compose any number of path segments, none of which may be empty **/
    fluid.model.composeSegments = function () {
        return fluid.makeArray(arguments).join(".");
    };

    /** Returns the index of the last occurrence of the period character . in the supplied string */
    fluid.lastDotIndex = function (path) {
        return path.lastIndexOf(".");
    };

    /** Returns all of an EL path minus its final segment - if the path consists of just one segment, returns "" -
     * WARNING - this method does not follow escaping rules */
    fluid.model.getToTailPath = function (path) {
        var lastdot = fluid.lastDotIndex(path);
        return lastdot === -1 ? "" : path.substring(0, lastdot);
    };

    /** Returns the very last path component of an EL path
     * WARNING - this method does not follow escaping rules */
    fluid.model.getTailPath = function (path) {
        var lastdot = fluid.lastDotIndex(path);
        return path.substring(lastdot + 1);
    };

    /** Helpful alias for old-style API **/
    fluid.path = fluid.model.composeSegments;
    fluid.composePath = fluid.model.composePath;


    // unsupported, NON-API function
    fluid.requireDataBinding = function () {
        fluid.fail("Please include DataBinding.js in order to operate complex model accessor configuration");
    };

    fluid.model.setWithStrategy = fluid.model.getWithStrategy = fluid.requireDataBinding;

    // unsupported, NON-API function
    fluid.model.resolvePathSegment = function (root, segment, create, origEnv) {
        if (!origEnv && root.resolvePathSegment) {
            return root.resolvePathSegment(segment);
        }
        if (create && root[segment] === undefined) {
            // This optimisation in this heavily used function has a fair effect
            return root[segment] = {}; // jshint ignore:line
        }
        return root[segment];
    };

    // unsupported, NON-API function
    fluid.model.parseToSegments = function (EL, parseEL, copy) {
        return typeof(EL) === "number" || typeof(EL) === "string" ? parseEL(EL) : (copy ? fluid.makeArray(EL) : EL);
    };

    // unsupported, NON-API function
    fluid.model.pathToSegments = function (EL, config) {
        var parser = config && config.parser ? config.parser.parse : fluid.model.parseEL;
        return fluid.model.parseToSegments(EL, parser);
    };

    // Overall strategy skeleton for all implementations of fluid.get/set
    fluid.model.accessImpl = function (root, EL, newValue, config, initSegs, returnSegs, traverser) {
        var segs = fluid.model.pathToSegments(EL, config);
        var initPos = 0;
        if (initSegs) {
            initPos = initSegs.length;
            segs = initSegs.concat(segs);
        }
        var uncess = newValue === fluid.NO_VALUE ? 0 : 1;
        root = traverser(root, segs, initPos, config, uncess);
        if (newValue === fluid.NO_VALUE || newValue === fluid.VALUE) { // get or custom
            return returnSegs ? {root: root, segs: segs} : root;
        }
        else { // set
            root[segs[segs.length - 1]] = newValue;
        }
    };

    // unsupported, NON-API function
    fluid.model.accessSimple = function (root, EL, newValue, environment, initSegs, returnSegs) {
        return fluid.model.accessImpl(root, EL, newValue, environment, initSegs, returnSegs, fluid.model.traverseSimple);
    };

    // unsupported, NON-API function
    fluid.model.traverseSimple = function (root, segs, initPos, environment, uncess) {
        var origEnv = environment;
        var limit = segs.length - uncess;
        for (var i = 0; i < limit; ++i) {
            if (!root) {
                return root;
            }
            var segment = segs[i];
            if (environment && environment[segment]) {
                root = environment[segment];
            } else {
                root = fluid.model.resolvePathSegment(root, segment, uncess === 1, origEnv);
            }
            environment = null;
        }
        return root;
    };

    fluid.model.setSimple = function (root, EL, newValue, environment, initSegs) {
        fluid.model.accessSimple(root, EL, newValue, environment, initSegs, false);
    };

    /** Optimised version of fluid.get for uncustomised configurations **/

    fluid.model.getSimple = function (root, EL, environment, initSegs) {
        if (EL === null || EL === undefined || EL.length === 0) {
            return root;
        }
        return fluid.model.accessSimple(root, EL, fluid.NO_VALUE, environment, initSegs, false);
    };
    
    /** Even more optimised version which assumes segs are parsed and no configuration **/
    fluid.getImmediate = function (root, segs, i) {
        var limit = (i === undefined ? segs.length: i + 1);
        for (var j = 0; j < limit; ++ j) {
            root = root ? root[segs[j]] : undefined;
        }
        return root;
    };

    // unsupported, NON-API function
    // Returns undefined to signal complex configuration which needs to be farmed out to DataBinding.js
    // any other return represents an environment value AND a simple configuration we can handle here
    fluid.decodeAccessorArg = function (arg3) {
        return (!arg3 || arg3 === fluid.model.defaultGetConfig || arg3 === fluid.model.defaultSetConfig) ?
            null : (arg3.type === "environment" ? arg3.value : undefined);
    };

    fluid.set = function (root, EL, newValue, config, initSegs) {
        var env = fluid.decodeAccessorArg(config);
        if (env === undefined) {
            fluid.model.setWithStrategy(root, EL, newValue, config, initSegs);
        } else {
            fluid.model.setSimple(root, EL, newValue, env, initSegs);
        }
    };

    /** Evaluates an EL expression by fetching a dot-separated list of members
     * recursively from a provided root.
     * @param root The root data structure in which the EL expression is to be evaluated
     * @param {string/array} EL The EL expression to be evaluated, or an array of path segments
     * @param config An optional configuration or environment structure which can customise the fetch operation
     * @return The fetched data value.
     */

    fluid.get = function (root, EL, config, initSegs) {
        var env = fluid.decodeAccessorArg(config);
        return env === undefined ?
            fluid.model.getWithStrategy(root, EL, config, initSegs)
            : fluid.model.accessImpl(root, EL, fluid.NO_VALUE, env, null, false, fluid.model.traverseSimple);
    };

    fluid.getGlobalValue = function (path, env) {
        if (path) {
            env = env || fluid.environment;
            return fluid.get(fluid.global, path, {type: "environment", value: env});
        }
    };

    /**
     * Allows for the binding to a "this-ist" function
     * @param {Object} obj, "this-ist" object to bind to
     * @param {Object} fnName, the name of the function to call
     * @param {Object} args, arguments to call the function with
     */
    fluid.bind = function (obj, fnName, args) {
        return obj[fnName].apply(obj, fluid.makeArray(args));
    };

    /**
     * Allows for the calling of a function from an EL expression "functionPath", with the arguments "args", scoped to an framework version "environment".
     * @param {Object} functionPath - An EL expression
     * @param {Object} args - An array of arguments to be applied to the function, specified in functionPath
     * @param {Object} environment - (optional) The object to scope the functionPath to  (typically the framework root for version control)
     */
    fluid.invokeGlobalFunction = function (functionPath, args, environment) {
        var func = fluid.getGlobalValue(functionPath, environment);
        if (!func) {
            fluid.fail("Error invoking global function: " + functionPath + " could not be located");
        } else {
            return func.apply(null, fluid.isArrayable(args) ? args : fluid.makeArray(args));
        }
    };

    /** Registers a new global function at a given path
     */

    fluid.registerGlobalFunction = function (functionPath, func, env) {
        env = env || fluid.environment;
        fluid.set(fluid.global, functionPath, func, {type: "environment", value: env});
    };

    fluid.setGlobalValue = fluid.registerGlobalFunction;

    /** Ensures that an entry in the global namespace exists. If it does not, a new entry is created as {} and returned. If an existing
     * value is found, it is returned instead **/
    fluid.registerNamespace = function (naimspace, env) {
        env = env || fluid.environment;
        var existing = fluid.getGlobalValue(naimspace, env);
        if (!existing) {
            existing = {};
            fluid.setGlobalValue(naimspace, existing, env);
        }
        return existing;
    };

    // stubs for two functions in FluidDebugging.js
    fluid.dumpEl = fluid.identity;
    fluid.renderTimestamp = fluid.identity;


    /*** The Fluid Event system. ***/

    fluid.registerNamespace("fluid.event");

    // unsupported, NON-API function
    fluid.generateUniquePrefix = function () {
        return (Math.floor(Math.random() * 1e12)).toString(36) + "-";
    };

    var fluid_prefix = fluid.generateUniquePrefix();

    fluid.fluidInstance = fluid_prefix;

    var fluid_guid = 1;

    /** Allocate a string value that will be unique within this Infusion instance (frame or process), and
     * globally unique with high probability (50% chance of collision after a million trials) **/

    fluid.allocateGuid = function () {
        return fluid_prefix + (fluid_guid++);
    };
    
    // Fluid priority system for encoding relative positions of, e.g. listeners, transforms, options, in lists
    
    fluid.extremePriority = 4e9; // around 2^32 - allows headroom of 21 fractional bits for sub-priorities
    fluid.priorityTypes = {
        first: -1,
        last: 1,
        before: 0,
        after: 0
    };
    // TODO: This should be properly done with defaults blocks and a much more performant fluid.indexDefaults
    fluid.extremalPriorities = {
        // a built-in definition to allow test infrastructure "last" listeners to sort after all impl listeners, and authoring/debugging listeners to sort after those
        // these are "priority intensities", and will be flipped for "first" listeners
        none: 0,
        testing: 10,
        authoring: 20
    };
    
    // unsupported, NON-API function    
    fluid.parsePriorityConstraint = function (constraint, fixedOnly, site) {
        var segs = constraint.split(":");
        var type = segs[0];
        var lookup = fluid.priorityTypes[type];
        if (lookup === undefined) {
            fluid.fail("Invalid priority constraint type in constraint " + constraint + ": the only supported values are " + fluid.keys(fluid.priorityType).join(", "));
        }
        if (fixedOnly && lookup === 0) {
            fluid.fail("Constraint-based priority in constraint " + constraint + " is not supported in a " + site + " record - you must use either a numeric value or first, last");
        }
        return {
            type: segs[0],
            target: segs[1]
        };
    };
    
    // unsupported, NON-API function
    fluid.parsePriority = function (priority, count, fixedOnly, site) {
        priority = priority || 0;
        var togo = {
            count: count || 0,
            fixed: null,
            constraint: null,
            site: site
        };
        if (typeof(priority) === "number") {
            togo.fixed = -priority;
        } else {
            togo.constraint = fluid.parsePriorityConstraint(priority, fixedOnly, site);
        }
        var multiplier = togo.constraint ? fluid.priorityTypes[togo.constraint.type] : 0;
        if (multiplier !== 0) {
            var target = togo.constraint.target || "none";
            var extremal = fluid.extremalPriorities[target];
            if (extremal === undefined) {
                fluid.fail("Unrecognised extremal priority target " + target + ": the currently supported values are " + fluid.keys(fluid.extremalPriorities).join(", ") + ": register your value in fluid.extremalPriorities");
            }
            togo.fixed = multiplier * (fluid.extremePriority + extremal);
        }
        if (togo.fixed !== null) {
            togo.fixed += togo.count / 1024; // use some fractional bits to encode count bias
        }
        
        return togo;
    };
    
    fluid.renderPriority = function (parsed) {
        return parsed.constraint ? (parsed.constraint.target ? parsed.constraint.type + ":" + parsed.constraint.target : parsed.constraint.type ) : Math.floor(parsed.fixed);
    };

    // unsupported, NON-API function
    fluid.compareByPriority = function (recA, recB) {
        if (recA.priority.fixed !== null && recB.priority.fixed !== null) {
            return recA.priority.fixed - recB.priority.fixed;
        } else { // sort constraint records to the end
            // relies on JavaScript boolean coercion rules (ECMA 9.3 toNumber)
            return (recA.priority.fixed === null) - (recB.priority.fixed === null);
        }
    };
    
    fluid.honourConstraint = function (array, firstConstraint, c) {
        var constraint = array[c].priority.constraint;
        var matchIndex = fluid.find(array, function (element, index) {
            return element.namespace === constraint.target ? index : undefined;
        }, -1);
        if (matchIndex === -1) { // TODO: We should report an error during firing if this condition persists until then
            return true;
        } else if (matchIndex >= firstConstraint) {
            return false;
        } else {
            var offset = constraint.type === "after" ? 1 : 0;
            var target = matchIndex + offset;
            var temp = array[c];
            for (var shift = c; shift >= target; -- shift) {
                array[shift] = array[shift - 1];
            }
            array[target] = temp;
            return true;
        }
    };

    // unsupported, NON-API function
    // Priorities accepted from users have higher numbers representing high priority (sort first) - 
    fluid.sortByPriority = function (array) {
        fluid.stableSort(array, fluid.compareByPriority);

        var firstConstraint = fluid.find(array, function (element, index) {
            return element.priority.constraint && fluid.priorityTypes[element.priority.constraint.type] === 0 ? index : undefined;
        }, array.length);
        
        while (true) {
            if (firstConstraint === array.length) {
                return array;
            }
            var oldFirstConstraint = firstConstraint;
            for (var c = firstConstraint; c < array.length; ++ c) {
                var applied = fluid.honourConstraint(array, firstConstraint, c);
                if (applied) {
                    ++firstConstraint;
                }
            }
            if (firstConstraint === oldFirstConstraint) {
                var holders = array.slice(firstConstraint);
                fluid.fail("Could not find targets for any constraints in " + holders[0].priority.site + " ", holders, ": none of the targets (" + fluid.getMembers(holders, "priority.constraint.target").join(", ") +
                    ") matched any namespaces of the elements in (", array.slice(0, firstConstraint) + ") - this is caused by either an invalid or circular reference");
            }
        }
    };

    fluid.event.identifyListener = function (listener, soft) {
        if (typeof(listener) !== "string" && !listener.$$fluid_guid && !soft) {
            listener.$$fluid_guid = fluid.allocateGuid();
        }
        return listener.$$fluid_guid;
    };

    // unsupported, NON-API function
    fluid.event.impersonateListener = function (origListener, newListener) {
        fluid.event.identifyListener(origListener);
        newListener.$$fluid_guid = origListener.$$fluid_guid;
    };


    // unsupported, NON-API function
    fluid.event.sortListeners = function (listeners) {
        var togo = [];
        fluid.each(listeners, function (oneNamespace) {
            var headHard; // notify only the first listener with hard namespace - or else all if all are soft
            for (var i = 0; i < oneNamespace.length; ++ i) {
                var thisListener = oneNamespace[i];
                if (!thisListener.softNamespace && !headHard) {
                    headHard = thisListener;
                }
            }
            if (headHard) {
                togo.push(headHard);
            } else {
                togo = togo.concat(oneNamespace);
            }
        });
        return fluid.sortByPriority(togo);
    };

    // unsupported, non-API function
    fluid.event.invokeListener = function (listener, args) {
        if (typeof(listener) === "string") {
            listener = fluid.event.resolveListener({globalName: listener}); // just resolves globals
        }
        return listener.apply(null, args);
    };

    // unsupported, NON-API function
    fluid.event.resolveListener = function (listener) {
        if (listener.globalName) {
            var listenerFunc = fluid.getGlobalValue(listener.globalName);
            if (!listenerFunc) {
                fluid.fail("Unable to look up name " + listener.globalName + " as a global function");
            } else {
                listener = listenerFunc;
            }
        }
        return listener;
    };

    /** Generate a name for a component for debugging purposes */
    fluid.nameComponent = function (that) {
        return that ? "component with typename " + that.typeName + " and id " + that.id : "[unknown component]";
    };

    fluid.event.nameEvent = function (that, eventName) {
        return eventName + " of " + fluid.nameComponent(that);
    };

    /** Construct an "event firer" object which can be used to register and deregister
     * listeners, to which "events" can be fired. These events consist of an arbitrary
     * function signature. General documentation on the Fluid events system is at
     * http://wiki.fluidproject.org/display/fluid/The+Fluid+Event+System .
     * @param {Object} options - A structure to configure this event firer. Supported fields:
     *     {String} name - a name for this firer
     *     {Boolean} preventable - If <code>true</code> the return value of each handler will
     * be checked for <code>false</code> in which case further listeners will be shortcircuited, and this
     * will be the return value of fire()
     */
    fluid.makeEventFirer = function (options) {
        options = options || {};
        var name = options.name || "<anonymous>";
        var that;

        var lazyInit = function () { // Lazy init function to economise on object references for events which are never listened to
            that.listeners = {};
            that.byId = {};
            that.sortedListeners = [];
            that.addListener = function (listener, namespace, priority, softNamespace, listenerId) {
                if (that.destroyed) {
                    fluid.fail("Cannot add listener to destroyed event firer " + that.name);
                }
                if (!listener) {
                    return;
                }
                if (typeof(listener) === "string") {
                    listener = {globalName: listener};
                }
                var id = listenerId || fluid.event.identifyListener(listener);
                namespace = namespace || id;
                var record = {listener: listener,
                    namespace: namespace,
                    softNamespace: softNamespace,
                    listenerId: listenerId,
                    priority: fluid.parsePriority(priority, that.sortedListeners.length, false, "listeners")
                };
                that.byId[id] = record;

                var thisListeners = (that.listeners[namespace] = fluid.makeArray(that.listeners[namespace]));
                thisListeners[softNamespace ? "push" : "unshift"] (record);

                that.sortedListeners = fluid.event.sortListeners(that.listeners);
            };
            that.addListener.apply(null, arguments);
        };
        that = {
            eventId: fluid.allocateGuid(),
            name: name,
            ownerId: options.ownerId,
            typeName: "fluid.event.firer",
            destroy: function () {
                that.destroyed = true;
            },
            addListener: function () {
                lazyInit.apply(null, arguments);
            },

            removeListener: function (listener) {
                if (!that.listeners) { return; }
                var namespace, id, record;
                if (typeof (listener) === "string") {
                    namespace = listener;
                    record = that.listeners[namespace];
                    if (!record) { // it was an id and not a namespace - take the namespace from its record later
                        id = namespace;
                        namespace = null;
                    }
                }
                else if (typeof(listener) === "function") {
                    id = fluid.event.identifyListener(listener, true);
                    if (!id) {
                        fluid.fail("Cannot remove unregistered listener function ", listener, " from event " + that.name);
                    }
                }
                var rec = that.byId[id];
                var softNamespace = rec && rec.softNamespace;
                namespace = namespace || (rec && rec.namespace) || id;
                delete that.byId[id];
                record = that.listeners[namespace];
                if (record) {
                    if (softNamespace) {
                        fluid.remove_if(record, function (thisLis) {
                            return thisLis.listener.$$fluid_guid === id || thisLis.listenerId === id;
                        });
                    } else {
                        record.shift();
                    }
                    if (record.length === 0) {
                        delete that.listeners[namespace];
                    }
                }
                that.sortedListeners = fluid.event.sortListeners(that.listeners);
            },
            fire: function () {
                var listeners = that.sortedListeners;
                if (!listeners || that.destroyed) { return; }
                fluid.log(fluid.logLevel.TRACE, "Firing event " + name + " to list of " + listeners.length + " listeners");
                for (var i = 0; i < listeners.length; ++i) {
                    var lisrec = listeners[i];
                    lisrec.listener = fluid.event.resolveListener(lisrec.listener);
                    var listener = lisrec.listener;
                    var ret = listener.apply(null, arguments);
                    var value;
                    if (options.preventable && ret === false || that.destroyed) {
                        value = false;
                    }
                    if (value !== undefined) {
                        return value;
                    }
                }
            }
        };
        return that;
    };

    // unsupported, NON-API function
    fluid.event.addListenerToFirer = function (firer, value, namespace, wrapper) {
        wrapper = wrapper || fluid.identity;
        if (fluid.isArrayable(value)) {
            for (var i = 0; i < value.length; ++i) {
                fluid.event.addListenerToFirer(firer, value[i], namespace, wrapper);
            }
        } else if (typeof (value) === "function" || typeof (value) === "string") {
            wrapper(firer).addListener(value, namespace);
        } else if (value && typeof (value) === "object") {
            wrapper(firer).addListener(value.listener, namespace || value.namespace, value.priority, value.softNamespace, value.listenerId);
        }
    };

    // unsupported, NON-API function - non-IOC passthrough
    fluid.event.resolveListenerRecord = function (records) {
        return { records: records };
    };

    fluid.expandImmediate = function (material) {
        fluid.fail("fluid.expandImmediate could not be loaded - please include FluidIoC.js in order to operate IoC-driven event with descriptor " + material);
    };

    // unsupported, NON-API function
    fluid.mergeListeners = function (that, events, listeners) {
        fluid.each(listeners, function (value, key) {
            var firer, namespace;
            if (key.charAt(0) === "{") {
                firer = fluid.expandImmediate(key, that);
                if (!firer) {
                    fluid.fail("Error in listener record: key " + key + " could not be looked up to an event firer - did you miss out \"events.\" when referring to an event firer?");
                }
            } else {
                var keydot = key.indexOf(".");

                if (keydot !== -1) {
                    namespace = key.substring(keydot + 1);
                    key = key.substring(0, keydot);
                }
                if (!events[key]) {
                    fluid.fail("Listener registered for event " + key + " which is not defined for this component");
                }
                firer = events[key];
            }
            var record = fluid.event.resolveListenerRecord(value, that, key, namespace, true);
            fluid.event.addListenerToFirer(firer, record.records, namespace, record.adderWrapper);
        });
    };

    // unsupported, NON-API function
    fluid.eventFromRecord = function (eventSpec, eventKey, that) {
        var isIoCEvent = eventSpec && (typeof (eventSpec) !== "string" || eventSpec.charAt(0) === "{");
        var event;
        if (isIoCEvent) {
            if (!fluid.event.resolveEvent) {
                fluid.fail("fluid.event.resolveEvent could not be loaded - please include FluidIoC.js in order to operate IoC-driven event with descriptor ",
                    eventSpec);
            } else {
                event = fluid.event.resolveEvent(that, eventKey, eventSpec);
            }
        } else {
            event = fluid.makeEventFirer({
                name: fluid.event.nameEvent(that, eventKey),
                preventable: eventSpec === "preventable",
                ownerId: that.id
            });
        }
        return event;
    };

    // unsupported, NON-API function - this is patched from FluidIoC.js
    fluid.instantiateFirers = function (that, options) {
        fluid.each(options.events, function (eventSpec, eventKey) {
            that.events[eventKey] = fluid.eventFromRecord(eventSpec, eventKey, that);
        });
    };

    // unsupported, NON-API function
    fluid.mergeListenerPolicy = function (target, source, key) {
        if (typeof (key) !== "string") {
            fluid.fail("Error in listeners declaration - the keys in this structure must resolve to event names - got " + key + " from ", source);
        }
        // cf. triage in mergeListeners
        var hasNamespace = key.charAt(0) !== "{" && key.indexOf(".") !== -1;
        return hasNamespace ? (source || target) : fluid.arrayConcatPolicy(target, source);
    };

    // unsupported, NON-API function
    fluid.makeMergeListenersPolicy = function (merger) {
        return function (target, source) {
            target = target || {};
            fluid.each(source, function (listeners, key) {
                target[key] = merger(target[key], listeners, key);
            });
            return target;
        };
    };
    
    fluid.validateListenersImplemented = function (that) {
        var errors = [];
        fluid.each(that.events, function (event, name) {
            fluid.each(event.sortedListeners, function (lisrec) {
                if (lisrec.listener === fluid.notImplemented || lisrec.listener.globalName === "fluid.notImplemented") {
                    errors.push({name: name, namespace: lisrec.namespace, componentSource: fluid.model.getSimple(that.options.listeners, [name + "." + lisrec.namespace, 0, "componentSource"])});
                }
            });
        });
        return errors;
    };

    /** Removes duplicated and empty elements from an already sorted array **/
    fluid.unique = function (array) {
        return fluid.remove_if(array, function (element, i) {
            return !element || i > 0 && element === array[i - 1];
        });
    };

    fluid.arrayConcatPolicy = function (target, source) {
        return fluid.makeArray(target).concat(fluid.makeArray(source));
    };
    
    /*** FLUID ERROR SYSTEM ***/
    
    fluid.failureEvent = fluid.makeEventFirer({name: "failure event"});
    
    fluid.failureEvent.addListener(fluid.builtinFail, "fail");
    fluid.failureEvent.addListener(fluid.logFailure, "log", "before:fail");
    
    /**
     * Configure the behaviour of fluid.fail by pushing or popping a disposition record onto a stack.
     * @param {Number|Function} condition
     & Supply either a function, which will be called with two arguments, args (the complete arguments to
     * fluid.fail) and activity, an array of strings describing the current framework invocation state.
     * Or, the argument may be the number <code>-1</code> indicating that the previously supplied disposition should
     * be popped off the stack
     */
    fluid.pushSoftFailure = function (condition) {
        if (typeof (condition) === "function") {
            fluid.failureEvent.addListener(condition, "fail");
        } else if (condition === -1) {
            fluid.failureEvent.removeListener("fail");
        } else if (typeof(condition) === "boolean") {
            fluid.fail("pushSoftFailure with boolean value is no longer supported");
        }
    };

    /*** DEFAULTS AND OPTIONS MERGING SYSTEM ***/
    
    // A function to tag the types of all Fluid components
    fluid.componentConstructor = function () {};

    /** Create a "type tag" component with no state but simply a type name and id. The most
     *  minimal form of Fluid component */
    // No longer a publically supported function - we don't abolish this because it is too annoying to prevent 
    // circularity during the bootup of the IoC system if we try to construct full components before it is complete
    // unsupported, non-API function
    fluid.typeTag = function (name) {
        var that = Object.create(fluid.componentConstructor.prototype);
        that.typeName = name;
        that.id = fluid.allocateGuid();
        return that;
    };

    var gradeTick = 1; // tick counter for managing grade cache invalidation
    var gradeTickStore = {};

    fluid.defaultsStore = {};

    var resolveGradesImpl = function (gs, gradeNames, base) {
        var raw = true;
        if (base) {
            raw = gradeNames.length === 1; // We are just resolving a single grade and populating the cache
        }
        else {
            gradeNames = fluid.makeArray(gradeNames);
        }
        for (var i = gradeNames.length - 1; i >= 0; -- i) {
            var gradeName = gradeNames[i];
            if (gradeName && !gs.gradeHash[gradeName]) {
                var isDynamic = gradeName.charAt(0) === "{";
                var options = (isDynamic ? null : (raw ? fluid.rawDefaults(gradeName) : fluid.getGradedDefaults(gradeName))) || {};
                var thisTick = gradeTickStore[gradeName] || (gradeTick - 1); // a nonexistent grade is recorded as previous to current
                gs.lastTick = Math.max(gs.lastTick, thisTick);
                gs.gradeHash[gradeName] = true;
                gs.gradeChain.push(gradeName);
                gs.optionsChain.push(options);
                var oGradeNames = fluid.makeArray(options.gradeNames);
                for (var j = oGradeNames.length - 1; j >= 0; -- j) { // from stronger to weaker grades
                    var oGradeName = oGradeNames[j];
                    if (raw) {
                        resolveGradesImpl(gs, oGradeName);
                    } else {
                        if (!gs.gradeHash[oGradeName]) {
                            gs.gradeHash[oGradeName] = true; // these have already been resolved
                            gs.gradeChain.push(oGradeName);
                        }
                    }
                }
            }
        }
        return gs;
    };

    // unsupported, NON-API function
    fluid.resolveGradeStructure = function (defaultName, gradeNames) {
        var gradeStruct = {
            lastTick: 0,
            gradeChain: [],
            gradeHash: {},
            optionsChain: []
        };
        // stronger grades appear to the right in defaults - dynamic grades are stronger still - FLUID-5085 
        // we supply these in reverse order to resolveGradesImpl with weak grades at the right
        return resolveGradesImpl(gradeStruct, [defaultName].concat(fluid.makeArray(gradeNames)), true);
    };

    var mergedDefaultsCache = {};

    // unsupported, NON-API function
    fluid.gradeNamesToKey = function (defaultName, gradeNames) {
        return defaultName + "|" + gradeNames.join("|");
    };

    fluid.hasGrade = function (options, gradeName) {
        return !options || !options.gradeNames ? false : fluid.contains(options.gradeNames, gradeName);
    };

    // unsupported, NON-API function
    fluid.resolveGrade = function (defaults, defaultName, gradeNames) {
        var gradeStruct = fluid.resolveGradeStructure(defaultName, gradeNames);
        var mergeArgs = gradeStruct.optionsChain.reverse();
        var mergePolicy = {};
        for (var i = 0; i < mergeArgs.length; ++ i) {
            if (mergeArgs[i] && mergeArgs[i].mergePolicy) {
                mergePolicy = $.extend(true, mergePolicy, mergeArgs[i].mergePolicy);
            }
        }
        mergeArgs = [mergePolicy, {}].concat(mergeArgs);
        var mergedDefaults = fluid.merge.apply(null, mergeArgs);
        mergedDefaults.gradeNames = gradeStruct.gradeChain.reverse();
        return {defaults: mergedDefaults, lastTick: gradeStruct && gradeStruct.lastTick};
    };

    // unsupported, NON-API function
    fluid.getGradedDefaults = function (defaultName, gradeNames) {
        gradeNames = fluid.makeArray(gradeNames);
        var key = fluid.gradeNamesToKey(defaultName, gradeNames);
        var mergedDefaults = mergedDefaultsCache[key];
        if (mergedDefaults) {
            var lastTick = 0; // check if cache should be invalidated through real latest tick being later than the one stored
            var searchGrades = mergedDefaults.defaults.gradeNames || [];
            for (var i = 0; i < searchGrades.length; ++ i) {
                lastTick = Math.max(lastTick, gradeTickStore[searchGrades[i]] || 0);
            }
            if (lastTick > mergedDefaults.lastTick) {
                fluid.log("Clearing cache for component " + defaultName + " with gradeNames ", searchGrades);
                mergedDefaults = null;
            }
        }
        if (!mergedDefaults) {
            var defaults = fluid.rawDefaults(defaultName);
            if (!defaults) {
                return defaults;
            }
            mergedDefaults = mergedDefaultsCache[key] = fluid.resolveGrade(defaults, defaultName, gradeNames);
        }
        return mergedDefaults.defaults;
    };
    
    // unsupported, NON-API function    
    fluid.upgradePrimitiveFunc = function (rec, key) {
        if (rec && fluid.isPrimitive(rec)) {
            var togo = {};
            togo[key || (typeof(rec) === "string" && rec.charAt(0) !== "{" ? "funcName" : "func")] = rec;
            togo.args = fluid.NO_VALUE;
            return togo;
        } else {
            return rec;
        }
    };

    // unsupported, NON-API function
    // Modify supplied options record to include "componentSource" annotation required by FLUID-5082
    // TODO: This function really needs to act recursively in order to catch listeners registered for subcomponents - fix with FLUID-5614
    fluid.annotateListeners = function (componentName, options) {
        options.listeners = fluid.transform(options.listeners, function (record) {
            var togo = fluid.makeArray(record);
            return fluid.transform(togo, function (onerec) {
                onerec = fluid.upgradePrimitiveFunc(onerec, "listener");
                onerec.componentSource = componentName;
                return onerec;
            });
        });
        options.invokers = fluid.transform(options.invokers, function (record) {
            record = fluid.upgradePrimitiveFunc(record);
            if (record) {
                record.componentSource = componentName;
            }
            return record;
        });
    };

    // unsupported, NON-API function
    fluid.rawDefaults = function (componentName, options) {
        if (options === undefined) {
            var entry = fluid.defaultsStore[componentName];
            return entry && entry.options;
        } else {
            fluid.pushActivity("registerDefaults", "registering defaults for grade %componentName with options %options",
                {componentName: componentName, options: options});
            var optionsCopy = fluid.expandCompact ? fluid.expandCompact(options) : fluid.copy(options);
            fluid.annotateListeners(componentName, optionsCopy);
            var callerInfo = fluid.getCallerInfo && fluid.getCallerInfo(6);
            fluid.defaultsStore[componentName] = {
                options: optionsCopy,
                callerInfo: callerInfo
            };
            gradeTickStore[componentName] = gradeTick++;
            fluid.popActivity();
        }
    };

    // unsupported, NON-API function
    fluid.doIndexDefaults = function (defaultName, defaults, index, indexSpec) {
        var requiredGrades = fluid.makeArray(indexSpec.gradeNames);
        for (var i = 0; i < requiredGrades.length; ++ i) {
            if (!fluid.hasGrade(defaults, requiredGrades[i])) { return; }
        }
        var indexFunc = typeof(indexSpec.indexFunc) === "function" ? indexSpec.indexFunc : fluid.getGlobalValue(indexSpec.indexFunc);
        var keys = indexFunc(defaults) || [];
        for (var j = 0; j < keys.length; ++ j) {
            (index[keys[j]] = index[keys[j]] || []).push(defaultName);
        }
    };

    /** Evaluates an index specification over all the defaults records registered into the system.
     * @param indexName {String} The name of this index record (currently ignored)
     * @param indexSpec {Object} Specification of the index to be performed - fields:
     *     gradeNames: {String/Array of String} List of grades that must be matched by this indexer
     *     indexFunc:  {String/Function} An index function which accepts a defaults record and returns a list of keys
     * @return A structure indexing keys to lists of matched gradenames
     */
    // The expectation is that this function is extremely rarely used with respect to registration of defaults
    // in the system, so currently we do not make any attempts to cache the results. The field "indexName" is
    // supplied in case a future implementation chooses to implement caching
    fluid.indexDefaults = function (indexName, indexSpec) {
        var index = {};
        for (var defaultName in fluid.defaultsStore) {
            var defaults = fluid.getGradedDefaults(defaultName);
            fluid.doIndexDefaults(defaultName, defaults, index, indexSpec);
        }
        return index;
    };

    /**
     * Retrieves and stores a component's default settings centrally.
     * @param {String} componentName the name of the component
     * @param {Object} (optional) an container of key/value pairs to set
     */

    fluid.defaults = function (componentName, options) {
        if (options === undefined) {
            return fluid.getGradedDefaults(componentName);
        }
        else {
            if (options && options.options) {
                fluid.fail("Probable error in options structure for " + componentName +
                    " with option named \"options\" - perhaps you meant to write these options at top level in fluid.defaults? - ", options);
            }
            fluid.rawDefaults(componentName, options);
            var gradedDefaults = fluid.getGradedDefaults(componentName);
            if (!fluid.hasGrade(gradedDefaults, "fluid.function")) {
                fluid.makeComponentCreator(componentName);
            }
        }
    };

    fluid.makeComponentCreator = function (componentName) {
        var creator = function () {
            var defaults = fluid.getGradedDefaults(componentName);
            if (!defaults.gradeNames || defaults.gradeNames.length === 0) {
                fluid.fail("Cannot make component creator for type " + componentName + " which does not have any gradeNames defined");
            } else if (!defaults.initFunction) {
                var blankGrades = [];
                for (var i = 0; i < defaults.gradeNames.length; ++ i) {
                    var gradeName = defaults.gradeNames[i];
                    var rawDefaults = fluid.rawDefaults(gradeName);
                    if (!rawDefaults) {
                        blankGrades.push(gradeName);
                    }
                }
                if (blankGrades.length === 0) {
                    fluid.fail("Cannot make component creator for type " + componentName + " which does not have an initFunction defined");
                } else {
                    fluid.fail("The grade hierarchy of component with type " + componentName + " is incomplete - it inherits from the following grade(s): " +
                     blankGrades.join(", ") + " for which the grade definitions are corrupt or missing. Please check the files which might include these " +
                     "grades and ensure they are readable and have been loaded by this instance of Infusion");
                }
            } else {
                return fluid.initComponent(componentName, arguments);
            }
        };
        var existing = fluid.getGlobalValue(componentName);
        if (existing) {
            $.extend(creator, existing);
        }
        fluid.setGlobalValue(componentName, creator);
    };

    // Cheapskate implementation which avoids dependency on DataBinding.js
    // TODO: This is apparently still used by the core merging algorithm, for reasons we no longer understand, even though
    // it has long been disused by DataBinding itself
    fluid.model.mergeModel = function (target, source) {
        if (fluid.isPlainObject(target)) {
            var copySource = fluid.copy(source);
            $.extend(true, source, target);
            $.extend(true, source, copySource);
        }
        return source;
    };

    var emptyPolicy = {};
    // unsupported, NON-API function
    fluid.derefMergePolicy = function (policy) {
        return (policy? policy["*"]: emptyPolicy) || emptyPolicy;
    };

    // unsupported, NON-API function
    fluid.compileMergePolicy = function (mergePolicy) {
        var builtins = {}, defaultValues = {};
        var togo = {builtins: builtins, defaultValues: defaultValues};

        if (!mergePolicy) {
            return togo;
        }
        fluid.each(mergePolicy, function (value, key) {
            var parsed = {}, builtin = true;
            if (typeof(value) === "function") {
                parsed.func = value;
            }
            else if (typeof(value) === "object") {
                parsed = value;
            }
            else if (!fluid.isDefaultValueMergePolicy(value)) {
                var split = value.split(/\s*,\s*/);
                for (var i = 0; i < split.length; ++ i) {
                    parsed[split[i]] = true;
                }
            }
            else {
                // Convert to ginger self-reference - NB, this can only be parsed by IoC
                fluid.set(defaultValues, key, "{that}.options." + value);
                togo.hasDefaults = true;
                builtin = false;
            }
            if (builtin) {
                fluid.set(builtins, fluid.composePath(key, "*"), parsed);
            }
        });
        return togo;
    };

    // TODO: deprecate this method of detecting default value merge policies before 1.6 in favour of
    // explicit typed records a la ModelTransformations
    // unsupported, NON-API function
    fluid.isDefaultValueMergePolicy = function (policy) {
        return typeof(policy) === "string" &&
            (policy.indexOf(",") === -1 && !/replace|nomerge|noexpand/.test(policy));
    };

    // unsupported, NON-API function
    fluid.mergeOneImpl = function (thisTarget, thisSource, j, sources, newPolicy, i, segs) {
        var togo = thisTarget;

        var primitiveTarget = fluid.isPrimitive(thisTarget);

        if (thisSource !== undefined) {
            if (!newPolicy.func && thisSource !== null && fluid.isPlainObject(thisSource) &&
                    !fluid.isDOMish(thisSource) && thisSource !== fluid.VALUE && !newPolicy.nomerge) {
                if (primitiveTarget) {
                    togo = thisTarget = fluid.freshContainer(thisSource);
                }
                // recursion is now external? We can't do it from here since sources are not all known
                // options.recurse(thisTarget, i + 1, segs, sources, newPolicyHolder, options);
            } else {
                sources[j] = undefined;
                if (newPolicy.func) {
                    togo = newPolicy.func.call(null, thisTarget, thisSource, segs[i - 1], segs, i); // NB - change in this mostly unused argument
                } else {
                    togo = fluid.isValue(thisTarget) ? fluid.model.mergeModel(thisTarget, thisSource) : thisSource;
                }
            }
        }
        return togo;
    };
    // NB - same quadratic worry about these as in FluidIoC in the case the RHS trundler is live -
    // since at each regeneration step driving the RHS we are discarding the "cursor arguments" these
    // would have to be regenerated at each step - although in practice this can only happen once for
    // each object for all time, since after first resolution it will be concrete.
    function regenerateCursor (source, segs, limit, sourceStrategy) {
        for (var i = 0; i < limit; ++ i) {
            source = sourceStrategy(source, segs[i], i, fluid.makeArray(segs)); // copy for FLUID-5243
        }
        return source;
    }

    function regenerateSources (sources, segs, limit, sourceStrategies) {
        var togo = [];
        for (var i = 0; i < sources.length; ++ i) {
            var thisSource = regenerateCursor(sources[i], segs, limit, sourceStrategies[i]);
            if (thisSource !== undefined) {
                togo.push(thisSource);
            }
        }
        return togo;
    }

    // unsupported, NON-API function
    fluid.fetchMergeChildren = function (target, i, segs, sources, mergePolicy, options) { /* unused parameter left for documentation purposes */ // jshint ignore:line
        var thisPolicy = fluid.derefMergePolicy(mergePolicy);
        for (var j = sources.length - 1; j >= 0; -- j) { // this direction now irrelevant - control is in the strategy
            var source = sources[j];
            // NB - this detection relies on strategy return being complete objects - which they are
            // although we need to set up the roots separately. We need to START the process of evaluating each
            // object root (sources) COMPLETELY, before we even begin! Even if the effect of this is to cause a
            // dispatch into ourselves almost immediately. We can do this because we can take control over our
            // TARGET objects and construct them early. Even if there is a self-dispatch, it will be fine since it is
            // DIRECTED and so will not trouble our "slow" detection of properties. After all self-dispatches end, control
            // will THEN return to "evaluation of arguments" (expander blocks) and only then FINALLY to this "slow"
            // traversal of concrete properties to do the final merge.
            if (source !== undefined) {
                fluid.each(source, function (newSource, name) {
                    if (!(name in target)) { // only request each new target key once -- all sources will be queried per strategy
                        segs[i] = name;
                        if (!fluid.getImmediate(options.exceptions, segs, i)) {
                            options.strategy(target, name, i + 1, segs, sources, mergePolicy);
                        }
                    }
                });  /* function in loop */ // jshint ignore:line
                if (thisPolicy.replace) { // this branch primarily deals with a policy of replace at the root
                    break;
                }
            }
        }
        return target;
    };

    // A special marker object which will be placed at a current evaluation point in the tree in order
    // to protect against circular evaluation
    fluid.inEvaluationMarker = Object.freeze({"__CURRENTLY_IN_EVALUATION__": true});

    // A path depth above which the core "process strategies" will bail out, assuming that the
    // structure has become circularly linked. Helpful in environments such as Firebug which will
    // kill the browser process if they happen to be open when a stack overflow occurs. Also provides
    // a more helpful diagnostic.
    fluid.strategyRecursionBailout = 50;

    // unsupported, NON-API function
    fluid.makeMergeStrategy = function (options) {
        var strategy = function (target, name, i, segs, sources, policy) {
            if (i > fluid.strategyRecursionBailout) {
                fluid.fail("Overflow/circularity in options merging, current path is ", segs, " at depth " , i, " - please protect components from merging using the \"nomerge\" merge policy");
            }
            if (fluid.isPrimitive(target)) { // For "use strict"
                return undefined; // Review this after FLUID-4925 since the only trigger is in slow component lookahead
            }
            if (fluid.isTracing) {
                fluid.tracing.pathCount.push(fluid.path(segs.slice(0, i)));
            }

            var oldTarget;
            if (name in target) { // bail out if our work has already been done
                oldTarget = target[name];
                if (!options.evaluateFully) { // see notes on this hack in "initter" - early attempt to deal with FLUID-4930
                    return oldTarget;
                }
            }
            else {
                if (target !== fluid.inEvaluationMarker) { // TODO: blatant "coding to the test" - this enables the simplest "re-trunking" in
                    // FluidIoCTests to function. In practice, we need to throw away this implementation entirely in favour of the 
                    // "iterative deepening" model coming with FLUID-4925
                    target[name] = fluid.inEvaluationMarker;
                }
            }
            if (sources === undefined) { // recover our state in case this is an external entry point
                segs = fluid.makeArray(segs); // avoid trashing caller's segs
                sources = regenerateSources(options.sources, segs, i - 1, options.sourceStrategies);
                policy = regenerateCursor(options.mergePolicy, segs, i - 1, fluid.concreteTrundler);
            }
            // var thisPolicy = fluid.derefMergePolicy(policy);
            var newPolicyHolder = fluid.concreteTrundler(policy, name);
            var newPolicy = fluid.derefMergePolicy(newPolicyHolder);

            var start, limit, mul;
            if (newPolicy.replace) {
                start = 1 - sources.length; limit = 0; mul = -1; /* on one line for easier visual comparison of the two algorithms  */ // jshint ignore:line
            }
            else {
                start = 0; limit = sources.length - 1; mul = +1; /* on one line for easier visual comparison of the two algorithms  */ // jshint ignore:line
            }
            var newSources = [];
            var thisTarget;

            for (var j = start; j <= limit; ++j) { // TODO: try to economise on this array and on gaps
                var k = mul * j;
                var thisSource = options.sourceStrategies[k](sources[k], name, i, segs); // Run the RH algorithm in "driving" mode
                if (thisSource !== undefined) {
                    newSources[k] = thisSource;
                    if (oldTarget === undefined) {
                        if (mul === -1) { // if we are going backwards, it is "replace"
                            thisTarget = target[name] = thisSource;
                            break;
                        }
                        else {
                            // write this in early, since early expansions may generate a trunk object which is written in to by later ones
                            thisTarget = fluid.mergeOneImpl(thisTarget, thisSource, j, newSources, newPolicy, i, segs, options);
                            if (target !== fluid.inEvaluationMarker) {
                                target[name] = thisTarget;
                            }
                        }
                    }
                }
            }
            if (oldTarget !== undefined) {
                thisTarget = oldTarget;
            }
            if (newSources.length > 0) {
                if (fluid.isPlainObject(thisTarget)) {
                    fluid.fetchMergeChildren(thisTarget, i, segs, newSources, newPolicyHolder, options);
                }
            }
            if (oldTarget === undefined && newSources.length === 0) {
                delete target[name]; // remove the evaluation marker - nothing to evaluate
            }
            return thisTarget;
        };
        options.strategy = strategy;
        return strategy;
    };

    // A simple stand-in for "fluid.get" where the material is covered by a single strategy
    fluid.driveStrategy = function (root, pathSegs, strategy) {
        pathSegs = fluid.makeArray(pathSegs);
        for (var i = 0; i < pathSegs.length; ++ i) {
            if (!root) {
                return undefined;
            }
            root = strategy(root, pathSegs[i], i + 1, pathSegs);
        }
        return root;
    };

    // A very simple "new inner trundler" that just performs concrete property access
    // Note that every "strategy" is also a "trundler" of this type, considering just the first two arguments
    fluid.concreteTrundler = function (source, seg) {
        return !source? undefined : source[seg];
    };

    /** Merge a collection of options structures onto a target, following an optional policy.
     * This method is now used only for the purpose of merging "dead" option documents in order to
     * cache graded component defaults. Component option merging is now performed by the
     * fluid.makeMergeOptions pathway which sets up a deferred merging process. This function
     * will not be removed in the Fluid 2.0 release but it is recommended that users not call it
     * directly.
     * The behaviour of this function is explained more fully on
     * the page http://wiki.fluidproject.org/display/fluid/Options+Merging+for+Fluid+Components .
     * @param policy {Object/String} A "policy object" specifiying the type of merge to be performed.
     * If policy is of type {String} it should take on the value "replace" representing
     * a static policy. If it is an
     * Object, it should contain a mapping of EL paths onto these String values, representing a
     * fine-grained policy. If it is an Object, the values may also themselves be EL paths
     * representing that a default value is to be taken from that path.
     * @param options1, options2, .... {Object} an arbitrary list of options structure which are to
     * be merged together. These will not be modified.
     */

    fluid.merge = function (policy /*, ... sources */) {
        var sources = Array.prototype.slice.call(arguments, 1);
        var compiled = fluid.compileMergePolicy(policy).builtins;
        var options = fluid.makeMergeOptions(compiled, sources, {});
        options.initter();
        return options.target;
    };

    // unsupported, NON-API function
    fluid.simpleGingerBlock = function (source, recordType) {
        var block = {
            target: source,
            simple: true,
            strategy: fluid.concreteTrundler,
            initter: fluid.identity,
            recordType: recordType,
            priority: fluid.mergeRecordTypes[recordType]
        };
        return block;
    };

    // unsupported, NON-API function
    fluid.makeMergeOptions = function (policy, sources, userOptions) {
        // note - we close over the supplied policy as a shared object reference - it will be updated during discovery
        var options = {
            mergePolicy: policy,
            sources: sources
        };
        options = $.extend(options, userOptions);
        options.target = options.target || fluid.freshContainer(options.sources[0]);
        options.sourceStrategies = options.sourceStrategies || fluid.generate(options.sources.length, fluid.concreteTrundler);
        options.initter = function () {
            // This hack is necessary to ensure that the FINAL evaluation doesn't balk when discovering a trunk path which was already
            // visited during self-driving via the expander. This bi-modality is sort of rubbish, but we currently don't have "room"
            // in the strategy API to express when full evaluation is required - and the "flooding API" is not standardised. See FLUID-4930
            options.evaluateFully = true;
            fluid.fetchMergeChildren(options.target, 0, [], options.sources, options.mergePolicy, options);
        };
        fluid.makeMergeStrategy(options);
        return options;
    };

    // unsupported, NON-API function
    fluid.transformOptions = function (options, transRec) {
        fluid.expect("Options transformation record", transRec, ["transformer", "config"]);
        var transFunc = fluid.getGlobalValue(transRec.transformer);
        return transFunc.call(null, options, transRec.config);
    };

    // unsupported, NON-API function
    fluid.findMergeBlocks = function (mergeBlocks, recordType) {
        return fluid.remove_if(fluid.makeArray(mergeBlocks), function (block) { return block.recordType !== recordType; });
    };

    // unsupported, NON-API function
    fluid.transformOptionsBlocks = function (mergeBlocks, transformOptions, recordTypes) {
        fluid.each(recordTypes, function (recordType) {
            var blocks = fluid.findMergeBlocks(mergeBlocks, recordType);
            fluid.each(blocks, function (block) {
                var source = block.source ? "source" : "target"; // TODO: Problem here with irregular presentation of options which consist of a reference in their entirety
                block[block.simple || source === "target" ? "target": "source"] = fluid.transformOptions(block[source], transformOptions);
            });
        });
    };

    // unsupported, NON-API function
    fluid.deliverOptionsStrategy = fluid.identity;
    fluid.computeComponentAccessor = fluid.identity;
    fluid.computeDynamicComponents = fluid.identity;

    // The types of merge record the system supports, with the weakest records first
    fluid.mergeRecordTypes = {
        defaults:           1000,
        defaultValueMerge:  900,
        subcomponentRecord: 800,
        user:               700,
        distribution:       100 // and above
    };

    // Utility used in the framework (primarily with distribution assembly), unconnected with new ChangeApplier
    // unsupported, NON-API function
    fluid.model.applyChangeRequest = function (model, request) {
        var segs = request.segs;
        if (segs.length === 0) {
            if (request.type === "ADD") {
                $.extend(true, model, request.value);
            } else {
                fluid.clear(model);
            }
        } else if (request.type === "ADD") {
            fluid.model.setSimple(model, request.segs, request.value);
        } else {
            for (var i = 0; i < segs.length - 1; ++ i) {
                model = model[segs[i]];
                if (!model) {
                    return;
                }
            }
            var last = segs[segs.length - 1];
            delete model[last];
        }
    };

    /** Delete the value in the supplied object held at the specified path
     * @param target {Object} The object holding the value to be deleted (possibly empty)
     * @param segs {Array of String} the path of the value to be deleted
     */
    // unsupported, NON-API function
    fluid.destroyValue = function (target, segs) {
        if (target) {
            fluid.model.applyChangeRequest(target, {type: "DELETE", segs: segs});
        }
    };
    
    /**
     * Merges the component's declared defaults, as obtained from fluid.defaults(),
     * with the user's specified overrides.
     *
     * @param {Object} that the instance to attach the options to
     * @param {String} componentName the unique "name" of the component, which will be used
     * to fetch the default options from store. By recommendation, this should be the global
     * name of the component's creator function.
     * @param {Object} userOptions the user-specified configuration options for this component
     */
    // unsupported, NON-API function
    fluid.mergeComponentOptions = function (that, componentName, userOptions, localOptions) {
        var rawDefaults = fluid.rawDefaults(componentName);
        var defaults = fluid.getGradedDefaults(componentName, rawDefaults && rawDefaults.gradeNames ? null : localOptions.gradeNames);
        var sharedMergePolicy = {};

        var mergeBlocks = [];

        if (fluid.expandComponentOptions) {
            mergeBlocks = mergeBlocks.concat(fluid.expandComponentOptions(sharedMergePolicy, defaults, userOptions, that));
        }
        else {
            mergeBlocks = mergeBlocks.concat([fluid.simpleGingerBlock(defaults, "defaults"),
                                              fluid.simpleGingerBlock(userOptions, "user")]);
        }
        var options = {}; // ultimate target
        var sourceStrategies = [], sources = [];
        var baseMergeOptions = {
            target: options,
            sourceStrategies: sourceStrategies
        };
        // Called both from here and from IoC whenever there is a change of block content or arguments which
        // requires them to be resorted and rebound
        var updateBlocks = function () {
            fluid.each(mergeBlocks, function (block) {
                if (fluid.isPrimitive(block.priority)) {
                    block.priority = fluid.parsePriority(block.priority, 0, false, "options distribution");
                }
            });
            fluid.sortByPriority(mergeBlocks);
            sourceStrategies.length = 0;
            sources.length = 0;
            fluid.each(mergeBlocks, function (block) {
                sourceStrategies.push(block.strategy);
                sources.push(block.target);
            });
        };
        updateBlocks();
        var mergeOptions = fluid.makeMergeOptions(sharedMergePolicy, sources, baseMergeOptions);
        mergeOptions.mergeBlocks = mergeBlocks;
        mergeOptions.updateBlocks = updateBlocks;
        mergeOptions.destroyValue = function (segs) { // This method is a temporary hack to assist FLUID-5091
            for (var i = 0; i < mergeBlocks.length; ++ i) {
                fluid.destroyValue(mergeBlocks[i].target, segs);
            }
            fluid.destroyValue(baseMergeOptions.target, segs);
        };

        var compiledPolicy;
        var mergePolicy;
        function computeMergePolicy() {
            // Decode the now available mergePolicy
            mergePolicy = fluid.driveStrategy(options, "mergePolicy", mergeOptions.strategy);
            mergePolicy = $.extend({}, fluid.rootMergePolicy, mergePolicy);
            compiledPolicy = fluid.compileMergePolicy(mergePolicy);
            // TODO: expandComponentOptions has already put some builtins here - performance implications of the now huge
            // default mergePolicy material need to be investigated as well as this deep merge
            $.extend(true, sharedMergePolicy, compiledPolicy.builtins); // ensure it gets broadcast to all sharers
        }
        computeMergePolicy();
        mergeOptions.computeMergePolicy = computeMergePolicy;

        if (compiledPolicy.hasDefaults) {
            if (fluid.generateExpandBlock) {
                mergeBlocks.push(fluid.generateExpandBlock({
                        options: compiledPolicy.defaultValues,
                        recordType: "defaultValueMerge",
                        priority: fluid.mergeRecordTypes.defaultValueMerge
                    }, that, {}));
                updateBlocks();
            }
            else {
                fluid.fail("Cannot operate mergePolicy ", mergePolicy, " for component ", that, " without including FluidIoC.js");
            }
        }
        that.options = options;
        fluid.driveStrategy(options, "gradeNames", mergeOptions.strategy);

        fluid.deliverOptionsStrategy(that, options, mergeOptions); // do this early to broadcast and receive "distributeOptions"

        fluid.computeComponentAccessor(that, userOptions && userOptions.localRecord);
        
        var transformOptions = fluid.driveStrategy(options, "transformOptions", mergeOptions.strategy);
        if (transformOptions) {
            fluid.transformOptionsBlocks(mergeBlocks, transformOptions, ["user", "subcomponentRecord"]);
            updateBlocks(); // because the possibly simple blocks may have changed target
        }
        
        if (!baseMergeOptions.target.mergePolicy) {
            computeMergePolicy();
        }

        return mergeOptions;
    };

    // The Fluid Component System proper

    // The base system grade definitions

    fluid.defaults("fluid.function", {});

    /** Invoke a global function by name and named arguments. A courtesy to allow declaratively encoded function calls
     * to use named arguments rather than bare arrays.
     * @param name {String} A global name which can be resolved to a Function. The defaults for this name must
     * resolve onto a grade including "fluid.function". The defaults record should also contain an entry
     * <code>argumentMap</code>, a hash of argument names onto indexes.
     * @param spec {Object} A named hash holding the argument values to be sent to the function. These will be looked
     * up in the <code>argumentMap</code> and resolved into a flat list of arguments.
     * @return {Any} The return value from the function
     */

    fluid.invokeGradedFunction = function (name, spec) {
        var defaults = fluid.defaults(name);
        if (!defaults || !defaults.argumentMap || !fluid.hasGrade(defaults, "fluid.function")) {
            fluid.fail("Cannot look up name " + name +
                " to a function with registered argumentMap - got defaults ", defaults);
        }
        var args = [];
        fluid.each(defaults.argumentMap, function (value, key) {
            args[value] = spec[key];
        });
        return fluid.invokeGlobalFunction(name, args);
    };
    
    fluid.noNamespaceDistributionPrefix = "no-namespace-distribution-";
    
    fluid.mergeOneDistribution = function (target, source, key) {
        var namespace = source.namespace || key || fluid.noNamespaceDistributionPrefix + fluid.allocateGuid();
        source.namespace = namespace;
        target[namespace] = source;
    };
    
    fluid.distributeOptionsPolicy = function (target, source) {
        target = target || {};
        if (fluid.isArrayable(source)) {
            for (var i = 0; i < source.length; ++ i) {
                fluid.mergeOneDistribution(target, source[i]);
            }
        } else if (typeof(source.target) === "string") {
            fluid.mergeOneDistribution(target, source);
        } else {
            fluid.each(source, function (oneSource, key) {
                fluid.mergeOneDistribution(target, oneSource, key);
            });
        }
        return target;
    };
    
    fluid.mergingArray = function () {};
    fluid.mergingArray.prototype = [];
    
    // Defer all evaluation of all nested members to resolve FLUID-5668
    fluid.membersMergePolicy = function (target, source) {
        target = target || {};
        fluid.each(source, function (oneSource, key) {
            if (!target[key]) {
                target[key] = new fluid.mergingArray();
            }
            if (oneSource instanceof fluid.mergingArray) {
                target[key].push.apply(target[key], oneSource);
            } else if (oneSource !== undefined) {
                target[key].push(oneSource);
            }
        });
        return target;
    };
    
    fluid.invokerStrategies = fluid.arrayToHash(["func", "funcName", "listener", "this", "method"]);
    
    // Resolve FLUID-5741, FLUID-5184 by ensuring that we avoid mixing incompatible invoker strategies
    fluid.invokersMergePolicy = function (target, source) {
        target = target || {};
        fluid.each(source, function (oneInvoker, name) {
            if (!oneInvoker) {
                target[name] = oneInvoker;
                return;
            } else {
                oneInvoker = fluid.upgradePrimitiveFunc(oneInvoker);
            }
            var oneT = target[name];
            if (!oneT) {
                oneT = target[name] = {};
            }
            for (var key in fluid.invokerStrategies) {
                if (key in oneInvoker) {
                    for (var key2 in fluid.invokerStrategies) {
                        oneT[key2] = undefined; // can't delete since stupid driveStrategy bug from recordStrategy reinstates them
                    }
                }
            }
            $.extend(oneT, oneInvoker);
        });
        return target;
    };

    fluid.rootMergePolicy = {
        gradeNames: fluid.arrayConcatPolicy,
        distributeOptions: fluid.distributeOptionsPolicy,
        members: {
            noexpand: true,
            func: fluid.membersMergePolicy
        },
        invokers: {
            noexpand: true,
            func: fluid.invokersMergePolicy
        },
        transformOptions: "replace",
        listeners: fluid.makeMergeListenersPolicy(fluid.mergeListenerPolicy)
    };

    fluid.defaults("fluid.component", {
        initFunction: "fluid.initLittleComponent",
        mergePolicy: fluid.rootMergePolicy,
        argumentMap: {
            options: 0
        },
        events: { // Three standard lifecycle points common to all components
            onCreate:     null,
            onDestroy:    null,
            afterDestroy: null
        }
    });
    
    fluid.defaults("fluid.emptySubcomponent", {
        gradeNames: ["fluid.component"]
    });

    /** Compute a "nickname" given a fully qualified typename, by returning the last path
     * segment.
     */

    fluid.computeNickName = function (typeName) {
        var segs = fluid.model.parseEL(typeName);
        return segs[segs.length - 1];
    };

    /** A specially recognised grade tag which directs the IoC framework to instantiate this component first amongst
     * its set of siblings, since it is likely to bear a context-forming type name. This will be removed from the framework
     * once we have implemented FLUID-4925 "wave of explosions" */

    fluid.defaults("fluid.typeFount", {
        gradeNames: ["fluid.component"]
    });

    /**
     * Creates a new "little component": a that-ist object with options merged into it by the framework.
     * This method is a convenience for creating small objects that have options but don't require full
     * View-like features such as the DOM Binder or events
     *
     * @param {Object} name the name of the little component to create
     * @param {Object} options user-supplied options to merge with the defaults
     */
    // NOTE: the 3rd argument localOptions is NOT to be advertised as part of the stable API, it is present
    // just to allow backward compatibility whilst grade specifications are not mandatory - similarly for 4th arg "receiver"
    // NOTE historical name to avoid confusion with fluid.initComponent below - this will all be refactored with FLUID-4925
    fluid.initLittleComponent = function (name, userOptions, localOptions, receiver) {
        var that = fluid.typeTag(name);
        that.lifecycleStatus = "constructing";
        localOptions = localOptions || {gradeNames: "fluid.component"};

        that.destroy = fluid.makeRootDestroy(that); // overwritten by FluidIoC for constructed subcomponents
        var mergeOptions = fluid.mergeComponentOptions(that, name, userOptions, localOptions);
        mergeOptions.exceptions = {members: {model: true, modelRelay: true}}; // don't evaluate these in "early flooding" - they must be fetched explicitly
        var options = that.options;
        that.events = {};
        // deliver to a non-IoC side early receiver of the component (currently only initView)
        (receiver || fluid.identity)(that, options, mergeOptions.strategy);
        fluid.computeDynamicComponents(that, mergeOptions);

        // TODO: ****THIS**** is the point we must deliver and suspend!! Construct the "component skeleton" first, and then continue
        // for as long as we can continue to find components.
        for (var i = 0; i < mergeOptions.mergeBlocks.length; ++ i) {
            mergeOptions.mergeBlocks[i].initter();
        }
        mergeOptions.initter();
        delete options.mergePolicy;

        fluid.instantiateFirers(that, options);
        fluid.mergeListeners(that, that.events, options.listeners);
        
        return that;
    };

    fluid.diagnoseFailedView = fluid.identity;

    // unsupported, NON-API function
    fluid.makeRootDestroy = function (that) {
        return function () {
            fluid.doDestroy(that);
            that.events.afterDestroy.fire(that, "", null);
        };
    };

    /** Returns <code>true</code> if the supplied reference holds a component which has been destroyed **/

    fluid.isDestroyed = function (that) {
        return that.lifecycleStatus === "destroyed";
    };

    // unsupported, NON-API function
    fluid.doDestroy = function (that, name, parent) {
        that.events.onDestroy.fire(that, name || "", parent);
        that.lifecycleStatus = "destroyed";
        for (var key in that.events) {
            if (key !== "afterDestroy" && typeof(that.events[key].destroy) === "function") {
                that.events[key].destroy();
            }
        }
        if (that.applier) { // TODO: Break this out into the grade's destroyer
            that.applier.destroy();
        }
    };

    // unsupported, NON-API function
    fluid.initComponent = function (componentName, initArgs) {
        var options = fluid.defaults(componentName);
        if (!options.gradeNames) {
            fluid.fail("Cannot initialise component " + componentName + " which has no gradeName registered");
        }
        var args = [componentName].concat(fluid.makeArray(initArgs));
        var that;
        fluid.pushActivity("initComponent", "constructing component of type %componentName with arguments %initArgs",
            {componentName: componentName, initArgs: initArgs});
        that = fluid.invokeGlobalFunction(options.initFunction, args);
        fluid.diagnoseFailedView(componentName, that, options, args);
        if (fluid.initDependents) {
            fluid.initDependents(that);
        }
        var errors = fluid.validateListenersImplemented(that);
        if (errors.length > 0) {
            fluid.fail(fluid.transform(errors, function (error) {
                return "Error constructing component ", that, " - the listener for event " + error.name + " with namespace " + error.namespace + (
                    (error.componentSource ? " which was defined in grade " + error.componentSource : "") + " needs to be overridden with a concrete implementation");
            })).join("\n");
        }
        that.lifecycleStatus = "constructed";
        that.events.onCreate.fire(that);
        fluid.popActivity();
        return that;
    };

    // unsupported, NON-API function
    fluid.initSubcomponentImpl = function (that, entry, args) {
        var togo;
        if (typeof (entry) !== "function") {
            var entryType = typeof (entry) === "string" ? entry : entry.type;
            togo = entryType === "fluid.emptySubcomponent" ?
                null : fluid.invokeGlobalFunction(entryType, args);
        } else {
            togo = entry.apply(null, args);
        }
        return togo;
    };

    // ******* SELECTOR ENGINE *********

    // selector regexps copied from jQuery - recent versions correct the range to start C0
    // The initial portion of the main character selector: "just add water" to add on extra
    // accepted characters, as well as the "\\\\." -> "\." portion necessary for matching
    // period characters escaped in selectors
    var charStart = "(?:[\\w\\u00c0-\\uFFFF*_-";

    fluid.simpleCSSMatcher = {
        regexp: new RegExp("([#.]?)(" + charStart + "]|\\\\.)+)", "g"),
        charToTag: {
            "": "tag",
            "#": "id",
            ".": "clazz"
        }
    };

    fluid.IoCSSMatcher = {
        regexp: new RegExp("([&#]?)(" + charStart + "]|\\.|\\/)+)", "g"),
        charToTag: {
            "": "context",
            "&": "context",
            "#": "id"
        }
    };

    var childSeg = new RegExp("\\s*(>)?\\s*", "g");
//    var whiteSpace = new RegExp("^\\w*$");

    // Parses a selector expression into a data structure holding a list of predicates
    // 2nd argument is a "strategy" structure, e.g.  fluid.simpleCSSMatcher or fluid.IoCSSMatcher
    // unsupported, non-API function
    fluid.parseSelector = function (selstring, strategy) {
        var togo = [];
        selstring = selstring.trim();
        //ws-(ss*)[ws/>]
        var regexp = strategy.regexp;
        regexp.lastIndex = 0;
        var lastIndex = 0;
        while (true) {
            var atNode = []; // a list of predicates at a particular node
            var first = true;
            while (true) {
                var segMatch = regexp.exec(selstring);
                if (!segMatch) {
                    break;
                }
                if (segMatch.index !== lastIndex) {
                    if (first) {
                        fluid.fail("Error in selector string - cannot match child selector expression starting at " + selstring.substring(lastIndex));
                    }
                    else {
                        break;
                    }
                }
                var thisNode = {};
                var text = segMatch[2];
                var targetTag = strategy.charToTag[segMatch[1]];
                if (targetTag) {
                    thisNode[targetTag] = text;
                }
                atNode[atNode.length] = thisNode;
                lastIndex = regexp.lastIndex;
                first = false;
            }
            childSeg.lastIndex = lastIndex;
            var fullAtNode = {predList: atNode};
            var childMatch = childSeg.exec(selstring);
            if (!childMatch || childMatch.index !== lastIndex) {
                fluid.fail("Error in selector string - can not match child selector expression at " + selstring.substring(lastIndex));
            }
            if (childMatch[1] === ">") {
                fullAtNode.child = true;
            }
            togo[togo.length] = fullAtNode;
            // >= test here to compensate for IE bug http://blog.stevenlevithan.com/archives/exec-bugs
            if (childSeg.lastIndex >= selstring.length) {
                break;
            }
            lastIndex = childSeg.lastIndex;
            regexp.lastIndex = childSeg.lastIndex;
        }
        return togo;
    };

    // Message resolution and templating

   /**
    * Converts a string to a regexp with the specified flags given in parameters
    * @param {String} a string that has to be turned into a regular expression
    * @param {String} the flags to provide to the reg exp
    */
    // TODO: this is an abominably inefficient technique for something that could simply be done by means of indexOf and slice
    fluid.stringToRegExp = function (str, flags) {
        return new RegExp(str.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), flags);
    };

    /**
     * Simple string template system.
     * Takes a template string containing tokens in the form of "%value".
     * Returns a new string with the tokens replaced by the specified values.
     * Keys and values can be of any data type that can be coerced into a string. Arrays will work here as well.
     *
     * @param {String}    template    a string (can be HTML) that contains tokens embedded into it
     * @param {object}    values      a collection of token keys and values
     */
    fluid.stringTemplate = function (template, values) {
        var keys = fluid.keys(values);
        keys = keys.sort(fluid.compareStringLength());
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            var re = fluid.stringToRegExp("%" + key, "g");
            template = template.replace(re, values[key]);
        }
        return template;
    };

})(jQuery, fluid_2_0);
;/*
Copyright 2007-2010 University of Cambridge
Copyright 2007-2009 University of Toronto
Copyright 2007-2009 University of California, Berkeley
Copyright 2010 OCAD University
Copyright 2010-2011 Lucendo Development Ltd.

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var fluid_2_0 = fluid_2_0 || {};
var fluid = fluid || fluid_2_0;

(function ($, fluid) {
    "use strict";

    /** Render a timestamp from a Date object into a helpful fixed format for debug logs to millisecond accuracy
     * @param date {Date} The date to be rendered
     * @return {String} A string format consisting of hours:minutes:seconds.millis for the datestamp padded to fixed with 
     */

    fluid.renderTimestamp = function (date) {
        var zeropad = function (num, width) {
            if (!width) { width = 2; }
            var numstr = (num === undefined ? "" : num.toString());
            return "00000".substring(5 - width + numstr.length) + numstr;
        };
        return zeropad(date.getHours()) + ":" + zeropad(date.getMinutes()) + ":" + zeropad(date.getSeconds()) + "." + zeropad(date.getMilliseconds(), 3);
    };

    fluid.isTracing = false;

    fluid.registerNamespace("fluid.tracing");

    fluid.tracing.pathCount = [];

    fluid.tracing.summarisePathCount = function (pathCount) {
        pathCount = pathCount || fluid.tracing.pathCount;
        var togo = {};
        for (var i = 0; i < pathCount.length; ++ i) {
            var path = pathCount[i];
            if (!togo[path]) {
                togo[path] = 1;
            }
            else {
                ++togo[path];
            }
        }
        var toReallyGo = [];
        fluid.each(togo, function (el, path) {
            toReallyGo.push({path: path, count: el});
        });
        toReallyGo.sort(function (a, b) {return b.count - a.count;});
        return toReallyGo;
    };

    fluid.tracing.condensePathCount = function (prefixes, pathCount) {
        prefixes = fluid.makeArray(prefixes);
        var prefixCount = {};
        fluid.each(prefixes, function(prefix) {
            prefixCount[prefix] = 0;
        });
        var togo = [];
        fluid.each(pathCount, function (el) {
            var path = el.path;
            if (!fluid.find(prefixes, function(prefix) {
                if (path.indexOf(prefix) === 0) {
                    prefixCount[prefix] += el.count;
                    return true;
                }
            })) {
                togo.push(el);
            }
        });
        fluid.each(prefixCount, function(count, path) {
            togo.unshift({path: path, count: count});
        });
        return togo;
    };

    // Exception stripping code taken from https://github.com/emwendelin/javascript-stacktrace/blob/master/stacktrace.js
    // BSD licence, see header

    fluid.detectStackStyle = function (e) {
        var style = "other";
        var stackStyle = {
            offset: 0
        };
        if (e["arguments"]) {
            style = "chrome";
        } else if (typeof window !== "undefined" && window.opera && e.stacktrace) {
            style = "opera10";
        } else if (e.stack) {
            style = "firefox";
            // Detect FireFox 4-style stacks which are 1 level less deep
            stackStyle.offset = e.stack.indexOf("Trace exception") === -1? 1 : 0;
        } else if (typeof window !== "undefined" && window.opera && !("stacktrace" in e)) { //Opera 9-
            style = "opera";
        }
        stackStyle.style = style;
        return stackStyle;
    };

    fluid.obtainException = function () {
        try {
            throw new Error("Trace exception");
        }
        catch (e) {
            return e;
        }
    };

    var stackStyle = fluid.detectStackStyle(fluid.obtainException());

    fluid.registerNamespace("fluid.exceptionDecoders");

    fluid.decodeStack = function () {
        if (stackStyle.style !== "firefox") {
            return null;
        }
        var e = fluid.obtainException();
        return fluid.exceptionDecoders[stackStyle.style](e);
    };

    fluid.exceptionDecoders.firefox = function (e) {
        var delimiter = "at ";
        var lines = e.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^\(/gm, "{anonymous}(").split("\n");
        return fluid.transform(lines, function (line) {
            line = line.replace(/\)/g, "");
            var atind = line.indexOf(delimiter);
            return atind === -1? [line] : [line.substring(atind + delimiter.length), line.substring(0, atind)];
        });
    };

    // Main entry point for callers. 
    fluid.getCallerInfo = function (atDepth) {
        atDepth = (atDepth || 3) - stackStyle.offset;
        var stack = fluid.decodeStack();
        var element = stack && stack[atDepth][0];
        if (element) {
            var lastslash = element.lastIndexOf("/");
            if (lastslash === -1) {
                lastslash = 0;
            }
            var nextColon = element.indexOf(":", lastslash);
            return {
                path: element.substring(0, lastslash),
                filename: element.substring(lastslash + 1, nextColon),
                index: element.substring(nextColon + 1)
            };
        } else {
            return null;
        }
    };

    /** Generates a string for padding purposes by replicating a character a given number of times
     * @param c {Character} A character to be used for padding
     * @param count {Integer} The number of times to repeat the character
     * @return A string of length <code>count</code> consisting of repetitions of the supplied character
     */
    // UNOPTIMISED 
    fluid.generatePadding = function (c, count) {
        var togo = "";
        for (var i = 0; i < count; ++ i) {
            togo += c;
        }
        return togo;
    };
     
    // Marker so that we can render a custom string for properties which are not direct and concrete
    fluid.SYNTHETIC_PROPERTY = {};

    // utility to avoid triggering custom getter code which could throw an exception - e.g. express 3.x's request object 
    fluid.getSafeProperty = function (obj, key) {
        var desc = Object.getOwnPropertyDescriptor(obj, key); // supported on all of our environments - is broken on IE8
        return desc && !desc.get ? obj[key] : fluid.SYNTHETIC_PROPERTY;
    };

    function printImpl (obj, small, options) {
        function out(str) {
            options.output += str;
        }
        var big = small + options.indentChars, isFunction = typeof(obj) === "function";
        if (options.maxRenderChars !== undefined && options.output.length > options.maxRenderChars) {
            return true;
        }
        if (obj === null) {
            out("null");
        } else if (obj === undefined) {
            out("undefined"); // NB - object invalid for JSON interchange
        } else if (obj === fluid.SYNTHETIC_PROPERTY) {
            out("[Synthetic property]");
        } else if (fluid.isPrimitive(obj) && !isFunction) {
            out(JSON.stringify(obj));
        }
        else {
            if (options.stack.indexOf(obj) !== -1) {
                out("(CIRCULAR)"); // NB - object invalid for JSON interchange
                return;
            }
            options.stack.push(obj);
            var i;
            if (fluid.isArrayable(obj)) {
                if (obj.length === 0) {
                    out("[]");
                } else {
                    out("[\n" + big);
                    for (i = 0; i < obj.length; ++ i) {
                        if (printImpl(obj[i], big, options)) {
                            return true;
                        }
                        if (i !== obj.length - 1) {
                            out(",\n" + big);
                        }
                    }
                    out("\n" + small + "]");
                }
            }
            else {
                out("{" + (isFunction ? " Function" : "") + "\n" + big); // NB - Function object invalid for JSON interchange
                var keys = fluid.keys(obj);
                for (i = 0; i < keys.length; ++ i) {
                    var key = keys[i];
                    var value = fluid.getSafeProperty(obj, key);
                    out(JSON.stringify(key) + ": ");
                    if (printImpl(value, big, options)) {
                        return true;
                    }
                    if (i !== keys.length - 1) {
                        out(",\n" + big);
                    }
                }
                out("\n" + small + "}");
            }
            options.stack.pop();
        }
        return;
    }

    /** Render a complex JSON object into a nicely indented format suitable for human readability.
     * @param obj {Object} The object to be rendered
     * @param options {Object} An options structure governing the rendering process. This supports the following options:
     *     <code>indent</code> {Integer} the number of space characters to be used to indent each level of containment (default value: 4)
     *     <code>maxRenderChars</code> {Integer} rendering the object will cease once this number of characters has been generated
     */
    fluid.prettyPrintJSON = function (obj, options) {
        options = $.extend({indent: 4, stack: [], output: ""}, options);
        options.indentChars = fluid.generatePadding(" ", options.indent);
        printImpl(obj, "", options);
        return options.output;
    };

    /**
     * Dumps a DOM element into a readily recognisable form for debugging - produces a
     * "semi-selector" summarising its tag name, class and id, whichever are set.
     *
     * @param {jQueryable} element The element to be dumped
     * @return A string representing the element.
     */
    fluid.dumpEl = function (element) {
        var togo;

        if (!element) {
            return "null";
        }
        if (element.nodeType === 3 || element.nodeType === 8) {
            return "[data: " + element.data + "]";
        }
        if (element.nodeType === 9) {
            return "[document: location " + element.location + "]";
        }
        if (!element.nodeType && fluid.isArrayable(element)) {
            togo = "[";
            for (var i = 0; i < element.length; ++ i) {
                togo += fluid.dumpEl(element[i]);
                if (i < element.length - 1) {
                    togo += ", ";
                }
            }
            return togo + "]";
        }
        element = $(element);
        togo = element.get(0).tagName;
        if (element.id) {
            togo += "#" + element.id;
        }
        if (element.attr("class")) {
            togo += "." + element.attr("class");
        }
        return togo;
    };

})(jQuery, fluid_2_0);
;/*
Copyright 2011-2013 OCAD University
Copyright 2010-2015 Lucendo Development Ltd.

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var fluid_2_0 = fluid_2_0 || {};

(function ($, fluid) {
    "use strict";
    
    /** NOTE: The contents of this file are by default NOT PART OF THE PUBLIC FLUID API unless explicitly annotated before the function **/

    /** The Fluid "IoC System proper" - resolution of references and
     * completely automated instantiation of declaratively defined
     * component trees */

    // Currently still uses manual traversal - once we ban manually instantiated components,
    // it will use the instantiator's records instead.
    fluid.visitComponentChildren = function (that, visitor, options, segs) {
        segs = segs || [];
        for (var name in that) {
            var component = that[name];
            // This entire algorithm is primitive and expensive and will be removed once we can abolish manual init components
            if (!fluid.isComponent(component) || (options.visited && options.visited[component.id])) {
                continue;
            }
            segs.push(name);
            if (options.visited) { // recall that this is here because we may run into a component that has been cross-injected which might otherwise cause cyclicity
                options.visited[component.id] = true;
            }
            if (visitor(component, name, segs, segs.length - 1)) {
                return true;
            }
            if (!options.flat) {
                fluid.visitComponentChildren(component, visitor, options, segs);
            }
            segs.pop();
        }
    };
    
    fluid.getContextHash = function (instantiator, that) {
        var shadow = instantiator.idToShadow[that.id];
        return shadow && shadow.contextHash;
    };
    
    fluid.componentHasGrade = function (that, gradeName) {
        var contextHash = fluid.getContextHash(fluid.globalInstantiator, that);
        return !!(contextHash && contextHash[gradeName]);
    };
    
    // A variant of fluid.visitComponentChildren that supplies the signature expected for fluid.matchIoCSelector
    // this is: thatStack, contextHashes, memberNames, i - note, the supplied arrays are NOT writeable and shared through the iteration
    fluid.visitComponentsForMatching = function (that, options, visitor) {
        var instantiator = fluid.getInstantiator(that);
        options = $.extend({
            visited: {},
            instantiator: instantiator
        }, options);
        var thatStack = [that];
        var contextHashes = [fluid.getContextHash(instantiator, that)];
        var visitorWrapper = function (component, name, segs) {
            thatStack.length = 1;
            contextHashes.length = 1;
            for (var i = 0; i < segs.length; ++ i) {
                var child = thatStack[i][segs[i]];
                thatStack[i + 1] = child;
                contextHashes[i + 1] = fluid.getContextHash(instantiator, child) || {};
            }
            return visitor(component, thatStack, contextHashes, segs, segs.length);
        };
        fluid.visitComponentChildren(that, visitorWrapper, options, []);
    };

    fluid.getMemberNames = function (instantiator, thatStack) {
        var path = instantiator.idToPath(thatStack[thatStack.length - 1].id);
        var segs = instantiator.parseEL(path);
            // TODO: we should now have no longer shortness in the stack
        segs.unshift.apply(segs, fluid.generate(thatStack.length - segs.length, ""));
        
        return segs;
    };

    // thatStack contains an increasing list of MORE SPECIFIC thats.
    // this visits all components starting from the current location (end of stack)
    // in visibility order UP the tree.
    fluid.visitComponentsForVisibility = function (instantiator, thatStack, visitor, options) {
        options = options || {
            visited: {},
            flat: true,
            instantiator: instantiator
        };
        var memberNames = fluid.getMemberNames(instantiator, thatStack);
        for (var i = thatStack.length - 1; i >= 0; --i) {
            var that = thatStack[i];

            // explicitly visit the direct parent first
            options.visited[that.id] = true;
            if (visitor(that, memberNames[i], memberNames, i)) {
                return;
            }
            
            if (fluid.visitComponentChildren(that, visitor, options, memberNames)) {
                return;
            }
            memberNames.pop();
        }
    };

    fluid.mountStrategy = function (prefix, root, toMount) {
        var offset = prefix.length;
        return function (target, name, i, segs) {
            if (i <= prefix.length) { // Avoid OOB to not trigger deoptimisation!
                return;
            }
            for (var j = 0; j < prefix.length; ++ j) {
                if (segs[j] !== prefix[j]) {
                    return;
                }
            }
            return toMount(target, name, i - prefix.length, segs.slice(offset));
        };
    };

    fluid.invokerFromRecord = function (invokerec, name, that) {
        fluid.pushActivity("makeInvoker", "beginning instantiation of invoker with name %name and record %record as child of %that",
            {name: name, record: invokerec, that: that});
        var invoker = invokerec ? fluid.makeInvoker(that, invokerec, name) : undefined;
        fluid.popActivity();
        return invoker;
    };

    fluid.memberFromRecord = function (memberrecs, name, that) {
        var togo;
        for (var i = 0; i < memberrecs.length; ++ i) { // memberrecs is the special "fluid.mergingArray" type which is not Arrayable
            var expanded = fluid.expandImmediate(memberrecs[i], that);
            if (!fluid.isPlainObject(togo)) { // poor man's "merge" algorithm to hack FLUID-5668 for now
                togo = expanded;
            } else {
                togo = $.extend(true, togo, expanded);
            }
        }
        return togo;
    };

    fluid.recordStrategy = function (that, options, optionsStrategy, recordPath, recordMaker, prefix, exceptions) {
        prefix = prefix || [];
        return {
            strategy: function (target, name, i) {
                if (i !== 1) {
                    return;
                }
                var record = fluid.driveStrategy(options, [recordPath, name], optionsStrategy);
                if (record === undefined) {
                    return;
                }
                fluid.set(target, [name], fluid.inEvaluationMarker);
                var member = recordMaker(record, name, that);
                fluid.set(target, [name], member);
                return member;
            },
            initter: function () {
                var records = fluid.driveStrategy(options, recordPath, optionsStrategy) || {};
                for (var name in records) {
                    if (!exceptions || !exceptions[name]) {
                        fluid.getForComponent(that, prefix.concat([name]));
                    }
                }
            }
        };
    };

    // patch Fluid.js version for timing
    fluid.instantiateFirers = function (that) {
        var shadow = fluid.shadowForComponent(that);
        var initter = fluid.get(shadow, ["eventStrategyBlock", "initter"]) || fluid.identity;
        initter();
    };

    fluid.makeDistributionRecord = function (contextThat, sourceRecord, sourcePath, targetSegs, exclusions, sourceType) {
        sourceType = sourceType || "distribution";

        var source = fluid.copy(fluid.get(sourceRecord, sourcePath));
        fluid.each(exclusions, function (exclusion) {
            fluid.model.applyChangeRequest(source, {segs: exclusion, type: "DELETE"});
        });

        var record = {options: {}};
        fluid.model.applyChangeRequest(record, {segs: targetSegs, type: "ADD", value: source});
        return $.extend(record, {contextThat: contextThat, recordType: sourceType});
    };

    // Part of the early "distributeOptions" workflow. Given the description of the blocks to be distributed, assembles "canned" records
    // suitable to be either registered into the shadow record for later or directly pushed to an existing component, as well as honouring
    // any "removeSource" annotations by removing these options from the source block.
    fluid.filterBlocks = function (contextThat, sourceBlocks, sourceSegs, targetSegs, exclusions, removeSource) {
        var togo = [];
        fluid.each(sourceBlocks, function (block) {
            var source = fluid.get(block.source, sourceSegs);
            if (source) {
                togo.push(fluid.makeDistributionRecord(contextThat, block.source, sourceSegs, targetSegs, exclusions, block.recordType));
                var rescued = $.extend({}, source);
                if (removeSource) {
                    fluid.model.applyChangeRequest(block.source, {segs: sourceSegs, type: "DELETE"});
                }
                fluid.each(exclusions, function (exclusion) {
                    var orig = fluid.get(rescued, exclusion);
                    fluid.set(block.source, sourceSegs.concat(exclusion), orig);
                });
            }
        });
        return togo;
    };

    // Use this peculiar signature since the actual component and shadow itself may not exist yet. Perhaps clean up with FLUID-4925
    fluid.noteCollectedDistribution = function (parentShadow, memberName, distribution) {
        fluid.model.setSimple(parentShadow, ["collectedDistributions", memberName, distribution.id], true);
    };

    fluid.isCollectedDistribution = function (parentShadow, memberName, distribution) {
        return fluid.model.getSimple(parentShadow, ["collectedDistributions", memberName, distribution.id]);
    };

    fluid.clearCollectedDistributions = function (parentShadow, memberName) {
        fluid.model.applyChangeRequest(parentShadow, {segs: ["collectedDistributions", memberName], type: "DELETE"});
    };

    fluid.collectDistributions = function (distributedBlocks, parentShadow, distribution, thatStack, contextHashes, memberNames, i) {
        var lastMember = memberNames[memberNames.length - 1];
        if (!fluid.isCollectedDistribution(parentShadow, lastMember, distribution) &&
                fluid.matchIoCSelector(distribution.selector, thatStack, contextHashes, memberNames, i)) {
            distributedBlocks.push.apply(distributedBlocks, distribution.blocks);
            fluid.noteCollectedDistribution(parentShadow, lastMember, distribution);
        }
    };

    // Slightly silly function to clean up the "appliedDistributions" records. In general we need to be much more aggressive both
    // about clearing instantiation garbage (e.g. onCreate and most of the shadow)
    // as well as caching frequently-used records such as the "thatStack" which
    // would mean this function could be written in a sensible way
    fluid.registerCollectedClearer = function (shadow, parentShadow, memberName) {
        if (!shadow.collectedClearer && parentShadow) {
            shadow.collectedClearer = function () {
                fluid.clearCollectedDistributions(parentShadow, memberName);
            };
        }
    };

    fluid.receiveDistributions = function (parentThat, gradeNames, memberName, that) {
        var instantiator = fluid.getInstantiator(parentThat || that);
        var thatStack = instantiator.getThatStack(parentThat || that); // most specific is at end
        thatStack.unshift(fluid.rootComponent);
        var memberNames = fluid.getMemberNames(instantiator, thatStack);
        var shadows = fluid.transform(thatStack, function (thisThat) {
            return instantiator.idToShadow[thisThat.id];
        });
        var parentShadow = shadows[shadows.length - (parentThat ? 1 : 2)];
        var contextHashes = fluid.getMembers(shadows, "contextHash");
        if (parentThat) { // if called before construction of component from assembleCreatorArguments - NB this path will be abolished/amalgamated
            memberNames.push(memberName);
            contextHashes.push(fluid.gradeNamesToHash(gradeNames));
            thatStack.push(that);
        } else {
            fluid.registerCollectedClearer(shadows[shadows.length - 1], parentShadow, memberNames[memberNames.length - 1]);
        }
        var distributedBlocks = [];
        for (var i = 0; i < thatStack.length - 1; ++ i) {
            fluid.each(shadows[i].distributions, function (distribution) {
                fluid.collectDistributions(distributedBlocks, parentShadow, distribution, thatStack, contextHashes, memberNames, i);
            });  /* function in loop */ /* jshint ignore:line */
        }
        return distributedBlocks;
    };
    
    fluid.computeTreeDistance = function (path1, path2) {
        var i = 0;
        while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
            ++i;
        }
        return path1.length + path2.length - 2*i;
    };
    
    // Called from applyDistributions (immediate application route) as well as mergeRecordsToList (pre-instantiation route)
    fluid.computeDistributionPriority = function (targetThat, distributedBlock) {
        if (!distributedBlock.priority) {
            var instantiator = fluid.getInstantiator(targetThat);
            var targetStack = instantiator.getThatStack(targetThat);
            var targetPath = fluid.getMemberNames(instantiator, targetStack);
            var sourceStack = instantiator.getThatStack(distributedBlock.contextThat);
            var sourcePath = fluid.getMemberNames(instantiator, sourceStack);
            var distance = fluid.computeTreeDistance(targetPath, sourcePath);
            distributedBlock.priority = fluid.mergeRecordTypes.distribution + distance;
        }
        return distributedBlock;
    };

    // convert "preBlocks" as produced from fluid.filterBlocks into "real blocks" suitable to be used by the expansion machinery.
    fluid.applyDistributions = function (that, preBlocks, targetShadow) {
        var distributedBlocks = fluid.transform(preBlocks, function (preBlock) {
            return fluid.generateExpandBlock(preBlock, that, targetShadow.mergePolicy);
        }, function (distributedBlock) {
            return fluid.computeDistributionPriority(that, distributedBlock);
        });
        var mergeOptions = targetShadow.mergeOptions;
        mergeOptions.mergeBlocks.push.apply(mergeOptions.mergeBlocks, distributedBlocks);
        mergeOptions.updateBlocks();
        return distributedBlocks;
    };
    
    // TODO: This implementation is obviously poor and has numerous flaws - in particular it does no backtracking as well as matching backwards through the selector
    fluid.matchIoCSelector = function (selector, thatStack, contextHashes, memberNames, i) {
        var thatpos = thatStack.length - 1;
        var selpos = selector.length - 1;
        while (true) {
            var mustMatchHere = thatpos === thatStack.length - 1 || selector[selpos].child;

            var that = thatStack[thatpos];
            var selel = selector[selpos];
            var match = true;
            for (var j = 0; j < selel.predList.length; ++j) {
                var pred = selel.predList[j];
                if (pred.context && !(contextHashes[thatpos][pred.context] || memberNames[thatpos] === pred.context)) {
                    match = false;
                    break;
                }
                if (pred.id && that.id !== pred.id) {
                    match = false;
                    break;
                }
            }
            if (selpos === 0 && thatpos > i && mustMatchHere) {
                match = false; // child selector must exhaust stack completely - FLUID-5029
            }
            if (match) {
                if (selpos === 0) {
                    return true;
                }
                --thatpos;
                --selpos;
            }
            else {
                if (mustMatchHere) {
                    return false;
                }
                else {
                    --thatpos;
                }
            }
            if (thatpos < i) {
                return false;
            }
        }
    };
    
    /** Query for all components matching a selector in a particular tree
     * @param root {Component} The root component at which to start the search
     * @param selector {String} An IoCSS selector, in form of a string. Note that since selectors supplied to this function implicitly
     * match downwards, they need not contain the "head context" followed by whitespace required in the distributeOptions form. E.g.
     * simply <code>"fluid.viewComponent"</code> will match all viewComponents below the root.
     * @param flat {Boolean} [Optional] <code>true</code> if the search should just be performed at top level of the component tree
     * Note that with <code>flat=true</code> this search will scan every component in the tree and may well be very slow.
     */
    // supported, PUBLIC API function 
    fluid.queryIoCSelector = function (root, selector, flat) {
        var parsed = fluid.parseSelector(selector, fluid.IoCSSMatcher);
        var togo = [];

        fluid.visitComponentsForMatching(root, {flat: flat}, function (that, thatStack, contextHashes, memberNames, i) {
            if (fluid.matchIoCSelector(parsed, thatStack, contextHashes, memberNames, i)) {
                togo.push(that);
            }
        });
        return togo;
    };

    fluid.isIoCSSSelector = function (context) {
        return context.indexOf(" ") !== -1; // simple-minded check for an IoCSS reference
    };

    fluid.pushDistributions = function (targetHead, selector, blocks) {
        var targetShadow = fluid.shadowForComponent(targetHead);
        var id = fluid.allocateGuid();
        var distributions = (targetShadow.distributions = targetShadow.distributions || []);
        distributions.push({
            id: id, // This id is used in clearDistributions
            selector: selector,
            blocks: blocks
        });
        return id;
    };

    fluid.clearDistribution = function (targetHead, id) {
        var targetShadow = fluid.shadowForComponent(targetHead);
        fluid.remove_if(targetShadow.distributions, function (distribution) {
            return distribution.id === id;
        });
    };
    
    fluid.clearDistributions = function (shadow) {
        fluid.each(shadow.outDistributions, function (outDist) {
            fluid.clearDistribution(outDist.targetComponent, outDist.distributionId);
        });
    };

    // Modifies a parsed selector to extract and remove its head context which will be matched upwards
    fluid.extractSelectorHead = function (parsedSelector) {
        var predList = parsedSelector[0].predList;
        var context = predList[0].context;
        predList.length = 0;
        return context;
    };
    
    fluid.parseExpectedOptionsPath = function (path, role) {
        var segs = fluid.model.parseEL(path);
        if (segs.length > 1 && segs[0] !== "options") {
            fluid.fail("Error in options distribution path ", path, " - only " + role + " paths beginning with \"options\" are supported");
        }
        return segs.slice(1);
    };
    
    fluid.replicateProperty = function (source, property, targets) {
        if (source[property] !== undefined) {
            fluid.each(targets, function (target) {
                target[property] = source[property];
            });
        }
    };

    fluid.undistributableOptions = ["gradeNames", "distributeOptions", "argumentMap", "initFunction", "mergePolicy", "progressiveCheckerOptions"]; // automatically added to "exclusions" of every distribution

    fluid.distributeOptions = function (that, optionsStrategy) {
        var thatShadow = fluid.shadowForComponent(that);
        var records = fluid.driveStrategy(that.options, "distributeOptions", optionsStrategy);
        fluid.each(records, function (record) {
            var targetRef = fluid.parseContextReference(record.target);
            var targetComp, selector, context;
            if (fluid.isIoCSSSelector(targetRef.context)) {
                selector = fluid.parseSelector(targetRef.context, fluid.IoCSSMatcher);
                var headContext = fluid.extractSelectorHead(selector);
                if (headContext === "/") {
                    targetComp = fluid.rootComponent;
                } else {
                    context = headContext;
                }
            }
            else {
                context = targetRef.context;
            }
            targetComp = targetComp || fluid.resolveContext(context, that);
            if (!targetComp) {
                fluid.fail("Error in options distribution record ", record, " - could not resolve context {"+context+"} to a root component");
            }
            var targetSegs = fluid.model.parseEL(targetRef.path);
            var preBlocks;
            if (record.record !== undefined) {
                preBlocks = [(fluid.makeDistributionRecord(that, record.record, [], targetSegs, []))];
            }
            else {
                var source = fluid.parseContextReference(record.source || "{that}.options"); // TODO: This is probably not a sensible default
                if (source.context !== "that") {
                    fluid.fail("Error in options distribution record ", record, " only a context of {that} is supported");
                }
                var sourceSegs = fluid.parseExpectedOptionsPath(source.path, "source");
                var fullExclusions = fluid.makeArray(record.exclusions).concat(sourceSegs.length === 0 ? fluid.undistributableOptions : []);

                var exclusions = fluid.transform(fullExclusions, function (exclusion) {
                    return fluid.model.parseEL(exclusion);
                });

                preBlocks = fluid.filterBlocks(that, thatShadow.mergeOptions.mergeBlocks, sourceSegs, targetSegs, exclusions, record.removeSource);
                thatShadow.mergeOptions.updateBlocks(); // perhaps unnecessary
            }
            fluid.replicateProperty(record, "priority", preBlocks);
            fluid.replicateProperty(record, "namespace", preBlocks);
            // TODO: inline material has to be expanded in its original context!

            if (selector) {
                var distributionId = fluid.pushDistributions(targetComp, selector, preBlocks);
                thatShadow.outDistributions = thatShadow.outDistributions || [];
                thatShadow.outDistributions.push({
                    targetComponent: targetComp,
                    distributionId: distributionId
                });
            }
            else { // The component exists now, we must rebalance it
                var targetShadow = fluid.shadowForComponent(targetComp);
                fluid.applyDistributions(that, preBlocks, targetShadow);
            }
        });
    };

    fluid.gradeNamesToHash = function (gradeNames) {
        var contextHash = {};
        fluid.each(gradeNames, function (gradeName) {
            contextHash[gradeName] = true;
            contextHash[fluid.computeNickName(gradeName)] = true;
        });
        return contextHash;
    };

    fluid.cacheShadowGrades = function (that, shadow) {
        var contextHash = fluid.gradeNamesToHash(that.options.gradeNames);
        if (!contextHash[shadow.memberName]) {
            contextHash[shadow.memberName] = "memberName"; // This is filtered out again in recordComponent - TODO: Ensure that ALL resolution uses the scope chain eventually
        }
        shadow.contextHash = contextHash;
        fluid.each(contextHash, function (troo, context) {
            shadow.ownScope[context] = that;
            if (shadow.parentShadow && shadow.parentShadow.that.type !== "fluid.rootComponent") {
                shadow.parentShadow.childrenScope[context] = that;
            }
        });
    };

    // First sequence point where the mergeOptions strategy is delivered from Fluid.js - here we take care
    // of both receiving and transmitting options distributions
    fluid.deliverOptionsStrategy = function (that, target, mergeOptions) {
        var shadow = fluid.shadowForComponent(that, shadow);
        fluid.cacheShadowGrades(that, shadow);
        shadow.mergeOptions = mergeOptions;
    };

    fluid.expandDynamicGrades = function (that, shadow, gradeNames, dynamicGrades) {
        var resolved = [];
        // Receive distributions first since these may cause arrival of more contextAwareness blocks.
        // TODO: this closure algorithm is not reliable since we only get one shot at a "function" grade source when
        // really we should perform complete closure over all other sources of options before we try it at the very end - particularly important for contextAwareness
        var distributedBlocks = fluid.receiveDistributions(null, null, null, that);
        if (distributedBlocks.length > 0) {
            var readyBlocks = fluid.applyDistributions(that, distributedBlocks, shadow);
            // rely on the fact that "dirty tricks are not permitted" wrt. resolving gradeNames - each element must be a literal entry or array
            // holding primitive or EL values - otherwise we would have to go all round the houses and reenter the top of fluid.computeDynamicGrades
            var gradeNamesList = fluid.transform(fluid.getMembers(readyBlocks, ["source", "gradeNames"]), fluid.makeArray);
            resolved = resolved.concat.apply(resolved, gradeNamesList);
        }
        fluid.each(dynamicGrades, function (dynamicGrade) {
            var expanded = fluid.expandImmediate(dynamicGrade, that, shadow.localDynamic);
            if (typeof(expanded) === "function") {
                expanded = expanded();
            }
            if (expanded) {
                resolved = resolved.concat(expanded);
            }
        });
        return resolved;
    };

    // Discover further grades that are entailed by the given base typeName and the current total "dynamic grades list" held in the argument "resolved".
    // These are looked up conjointly in the grade registry, and then any further dynamic grades references  
    // are expanded and added into the list and concatenated into "resolved". Additional grades discovered during this function are returned as
    // "furtherResolved".
    fluid.collectDynamicGrades = function (that, shadow, defaultsBlock, gradeNames, dynamicGrades, resolved) {
        var newDefaults = fluid.copy(fluid.getGradedDefaults(that.typeName, resolved));
        gradeNames.length = 0; // acquire derivatives of dynamic grades (FLUID-5054)
        gradeNames.push.apply(gradeNames, newDefaults.gradeNames);

        fluid.cacheShadowGrades(that, shadow);
        // This cheap strategy patches FLUID-5091 for now - some more sophisticated activity will take place
        // at this site when we have a full fix for FLUID-5028
        shadow.mergeOptions.destroyValue(["mergePolicy"]);
        shadow.mergeOptions.destroyValue(["components"]);
        shadow.mergeOptions.destroyValue(["invokers"]);

        defaultsBlock.source = newDefaults;
        shadow.mergeOptions.updateBlocks();
        shadow.mergeOptions.computeMergePolicy(); // TODO: we should really only do this if its content changed - this implies moving all options evaluation over to some (cheap) variety of the ChangeApplier

        var furtherResolved = fluid.remove_if(gradeNames, function (gradeName) {
            return gradeName.charAt(0) === "{" && !fluid.contains(dynamicGrades, gradeName);
        }, []);
        dynamicGrades.push.apply(dynamicGrades, furtherResolved);
        furtherResolved = fluid.expandDynamicGrades(that, shadow, gradeNames, furtherResolved);

        resolved.push.apply(resolved, furtherResolved);

        return furtherResolved;
    };

    fluid.computeDynamicGrades = function (that, shadow, strategy) {
        delete that.options.gradeNames; // Recompute gradeNames for FLUID-5012 and others

        var gradeNames = fluid.driveStrategy(that.options, "gradeNames", strategy);
        // TODO: In complex distribution cases, a component might end up with multiple default blocks
        var defaultsBlock = fluid.findMergeBlocks(shadow.mergeOptions.mergeBlocks, "defaults")[0];
        var dynamicGrades = fluid.remove_if(gradeNames, function (gradeName) {
            return gradeName.charAt(0) === "{" || !fluid.hasGrade(defaultsBlock.target, gradeName);
        }, []);
        var resolved = fluid.expandDynamicGrades(that, shadow, gradeNames, dynamicGrades);
        if (resolved.length !== 0) {
            var furtherResolved;
            do { // repeatedly collect dynamic grades whilst they arrive (FLUID-5155)
                furtherResolved = fluid.collectDynamicGrades(that, shadow, defaultsBlock, gradeNames, dynamicGrades, resolved);
            }
            while (furtherResolved.length !== 0);
        }
        if (shadow.collectedClearer) {
            shadow.collectedClearer();
            delete shadow.collectedClearer;
        }
    };

    fluid.computeDynamicComponentKey = function (recordKey, sourceKey) {
        return recordKey + (sourceKey === 0 ? "" : "-" + sourceKey); // TODO: configurable name strategies
    };

    fluid.registerDynamicRecord = function (that, recordKey, sourceKey, record, toCensor) {
        var key = fluid.computeDynamicComponentKey(recordKey, sourceKey);
        var cRecord = fluid.copy(record);
        delete cRecord[toCensor];
        fluid.set(that.options, ["components", key], cRecord);
        return key;
    };

    fluid.computeDynamicComponents = function (that, mergeOptions) {
        var shadow = fluid.shadowForComponent(that);
        var localSub = shadow.subcomponentLocal = {};
        var records = fluid.driveStrategy(that.options, "dynamicComponents", mergeOptions.strategy);
        fluid.each(records, function (record, recordKey) {
            if (!record.sources && !record.createOnEvent) {
                fluid.fail("Cannot process dynamicComponents record ", record, " without a \"sources\" or \"createOnEvent\" entry");
            }
            if (record.sources) {
                var sources = fluid.expandOptions(record.sources, that);
                fluid.each(sources, function (source, sourceKey) {
                    var key = fluid.registerDynamicRecord(that, recordKey, sourceKey, record, "sources");
                    localSub[key] = {"source": source, "sourcePath": sourceKey};
                });
            }
            else if (record.createOnEvent) {
                var event = fluid.event.expandOneEvent(that, record.createOnEvent);
                fluid.set(shadow, ["dynamicComponentCount", recordKey], 0);
                var listener = function () {
                    var key = fluid.registerDynamicRecord(that, recordKey, shadow.dynamicComponentCount[recordKey]++, record, "createOnEvent");
                    var localRecord = {"arguments": fluid.makeArray(arguments)};
                    fluid.initDependent(that, key, localRecord);
                };
                event.addListener(listener);
                fluid.recordListener(event, listener, shadow);
            }
        });
    };

    // Second sequence point for mergeOptions from Fluid.js - here we construct all further
    // strategies required on the IoC side and mount them into the shadow's getConfig for universal use
    fluid.computeComponentAccessor = function (that, localRecord) {
        var instantiator = fluid.globalInstantiator;
        var shadow = fluid.shadowForComponent(that);
        shadow.localDynamic = localRecord; // for signalling to dynamic grades from dynamic components
        var options = that.options;
        var strategy = shadow.mergeOptions.strategy;
        var optionsStrategy = fluid.mountStrategy(["options"], options, strategy);
        shadow.invokerStrategy = fluid.recordStrategy(that, options, strategy, "invokers", fluid.invokerFromRecord);
        shadow.eventStrategyBlock = fluid.recordStrategy(that, options, strategy, "events", fluid.eventFromRecord, ["events"]);
        var eventStrategy = fluid.mountStrategy(["events"], that, shadow.eventStrategyBlock.strategy, ["events"]);
        shadow.memberStrategy = fluid.recordStrategy(that, options, strategy, "members", fluid.memberFromRecord, null, {model: true, modelRelay: true});
        // NB - ginger strategy handles concrete, rationalise
        shadow.getConfig = {strategies: [fluid.model.funcResolverStrategy, fluid.makeGingerStrategy(that),
            optionsStrategy, shadow.invokerStrategy.strategy, shadow.memberStrategy.strategy, eventStrategy]};

        fluid.computeDynamicGrades(that, shadow, strategy, shadow.mergeOptions.mergeBlocks);
        fluid.distributeOptions(that, strategy);
        if (shadow.contextHash["fluid.resolveRoot"]) {
            var memberName;
            if (shadow.contextHash["fluid.resolveRootSingle"]) {
                var singleRootType = fluid.getForComponent(that, ["options", "singleRootType"]);
                if (!singleRootType) {
                    fluid.fail("Cannot register object with grades " + Object.keys(shadow.contextHash).join(", ") + " as fluid.resolveRootSingle since it has not defined option singleRootType");
                }
                memberName = fluid.typeNameToMemberName(singleRootType);
            } else {
                memberName = fluid.computeGlobalMemberName(that);
            }
            var parent = fluid.resolveRootComponent;
            if (parent[memberName]) {
                instantiator.clearComponent(parent, memberName);
            }
            instantiator.recordKnownComponent(parent, that, memberName, false);
        }

        return shadow.getConfig;
    };

    // About the SHADOW:
    // Allocated at: instantiator's "recordComponent"
    // Contents:
    //     path {String} Principal allocated path (point of construction) in tree
    //     that {Component} The component itself
    //     contextHash {String to Boolean} Map of context names which this component matches
    //     mergePolicy, mergeOptions: Machinery for last phase of options merging
    //     invokerStrategy, eventStrategyBlock, memberStrategy, getConfig: Junk required to operate the accessor
    //     listeners: Listeners registered during this component's construction, to be cleared during clearListeners
    //     distributions, collectedClearer: Managing options distributions
    //     subcomponentLocal: Signalling local record from computeDynamicComponents to assembleCreatorArguments
    //     dynamicLocal: Local signalling for dynamic grades
    
    fluid.shadowForComponent = function (component) {
        var instantiator = fluid.getInstantiator(component);
        return instantiator && component ? instantiator.idToShadow[component.id] : null;
    };

    // Access the member at a particular path in a component, forcing it to be constructed gingerly if necessary
    // supported, PUBLIC API function 
    fluid.getForComponent = function (component, path) {
        var shadow = fluid.shadowForComponent(component);
        var getConfig = shadow ? shadow.getConfig : undefined;
        return fluid.get(component, path, getConfig);
    };

    // An EL segment resolver strategy that will attempt to trigger creation of
    // components that it discovers along the EL path, if they have been defined but not yet
    // constructed.
    fluid.makeGingerStrategy = function (that) {
        var instantiator = fluid.getInstantiator(that);
        return function (component, thisSeg, index, segs) {
            var atval = component[thisSeg];
            if (atval === fluid.inEvaluationMarker && index === segs.length) {
                fluid.fail("Error in component configuration - a circular reference was found during evaluation of path segment \"" + thisSeg +
                    "\": for more details, see the activity records following this message in the console, or issue fluid.setLogging(fluid.logLevel.TRACE) when running your application");
            }
            if (index > 1) {
                return atval;
            }
            if (atval === undefined && component.hasOwnProperty(thisSeg)) { // avoid recomputing properties that have been explicitly evaluated to undefined
                return fluid.NO_VALUE;
            }
            if (atval === undefined) { // pick up components in instantiation here - we can cut this branch by attaching early
                var parentPath = instantiator.idToShadow[component.id].path;
                var childPath = instantiator.composePath(parentPath, thisSeg);
                atval = instantiator.pathToComponent[childPath];
            }
            if (atval === undefined) {
                // TODO: This check is very expensive - once gingerness is stable, we ought to be able to
                // eagerly compute and cache the value of options.components - check is also incorrect and will miss injections
                var subRecord = fluid.getForComponent(component, ["options", "components", thisSeg]);
                if (subRecord) {
                    if (subRecord.createOnEvent) {
                        fluid.fail("Error resolving path segment \"" + thisSeg + "\" of path " + segs.join(".") + " since component with record ", subRecord,
                            " has annotation \"createOnEvent\" - this very likely represents an implementation error. Either alter the reference so it does not " +
                            " match this component, or alter your workflow to ensure that the component is instantiated by the time this reference resolves");
                    }
                    fluid.initDependent(component, thisSeg);
                    atval = component[thisSeg];
                }
            }
            return atval;
        };
    };
    
    // Listed in dependence order
    fluid.frameworkGrades = ["fluid.component", "fluid.modelComponent", "fluid.viewComponent", "fluid.rendererComponent"];
        
    fluid.filterBuiltinGrades = function (gradeNames) {
        return fluid.remove_if(fluid.makeArray(gradeNames), function (gradeName) {
            return fluid.frameworkGrades.indexOf(gradeName) !== -1;
        });
    };

    fluid.dumpGradeNames = function (that) {
        return that.options && that.options.gradeNames ?
            " gradeNames: " + JSON.stringify(fluid.filterBuiltinGrades(that.options.gradeNames)) : "";
    };

    fluid.dumpThat = function (that) {
        return "{ typeName: \"" + that.typeName + "\"" + fluid.dumpGradeNames(that) + " id: " + that.id + "}";
    };

    fluid.dumpThatStack = function (thatStack, instantiator) {
        var togo = fluid.transform(thatStack, function(that) {
            var path = instantiator.idToPath(that.id);
            return fluid.dumpThat(that) + (path? (" - path: " + path) : "");
        });
        return togo.join("\n");
    };

    fluid.resolveContext = function (context, that, fast) {
        var instantiator = fluid.getInstantiator(that);
        if (context === "that") {
            return that;
        }
        var foundComponent;
        if (fast) {
            var shadow = instantiator.idToShadow[that.id];
            return shadow.ownScope[context];
        } else {
            var thatStack = instantiator.getFullStack(that);
            fluid.visitComponentsForVisibility(instantiator, thatStack, function (component, name) {
                var shadow = fluid.shadowForComponent(component);
                // TODO: Some components, e.g. the static environment and typeTags do not have a shadow, which slows us down here
                if (context === name || shadow && shadow.contextHash && shadow.contextHash[context] || context === component.typeName) {
                    foundComponent = component;
                    return true; // YOUR VISIT IS AT AN END!!
                }
                if (fluid.getForComponent(component, ["options", "components", context]) && !component[context]) {
      // This is an expensive guess since we make it for every component up the stack - must apply the WAVE OF EXPLOSIONS (FLUID-4925) to discover all components first
      // This line attempts a hopeful construction of components that could be guessed by nickname through finding them unconstructed
      // in options. In the near future we should eagerly BEGIN the process of constructing components, discovering their
      // types and then attaching them to the tree VERY EARLY so that we get consistent results from different strategies.
                    foundComponent = fluid.getForComponent(component, context);
                    return true;
                }
            });
            return foundComponent;
        }
    };
    
    fluid.makeStackFetcher = function (parentThat, localRecord, fast) {
        var fetcher = function (parsed) {
            if (parentThat && parentThat.lifecycleStatus === "destroyed") {
                fluid.fail("Cannot resolve reference " + fluid.renderContextReference(parsed) + " from component " + fluid.dumpThat(parentThat) + " which has been destroyed");
            }
            var context = parsed.context;
            if (localRecord && context in localRecord) {
                return fluid.get(localRecord[context], parsed.path);
            }
            var foundComponent = fluid.resolveContext(context, parentThat, fast);
            if (!foundComponent && parsed.path !== "") {
                var ref = fluid.renderContextReference(parsed);
                fluid.fail("Failed to resolve reference " + ref + " - could not match context with name " +
                    context + " from component " + fluid.dumpThat(parentThat), parentThat);
            }
            return fluid.getForComponent(foundComponent, parsed.path);
        };
        return fetcher;
    };

    fluid.makeStackResolverOptions = function (parentThat, localRecord, fast) {
        return $.extend(fluid.copy(fluid.rawDefaults("fluid.makeExpandOptions")), {
            localRecord: localRecord || {},
            fetcher: fluid.makeStackFetcher(parentThat, localRecord, fast),
            contextThat: parentThat,
            exceptions: {members: {model: true, modelRelay: true}}
        });
    };

    fluid.clearListeners = function (shadow) {
        // TODO: bug here - "afterDestroy" listeners will be unregistered already unless they come from this component
        fluid.each(shadow.listeners, function (rec) {
            rec.event.removeListener(rec.listenerId || rec.listener);
        });
        delete shadow.listeners;
    };

    fluid.recordListener = function (event, listener, shadow, listenerId) {
        if (event.ownerId !== shadow.that.id) { // don't bother recording listeners registered from this component itself
            var listeners = shadow.listeners;
            if (!listeners) {
                listeners = shadow.listeners = [];
            }
            listeners.push({event: event, listener: listener, listenerId: listenerId});
        }
    };
    
    fluid.constructScopeObjects = function (instantiator, parent, child, childShadow) {
        var parentShadow = parent ? instantiator.idToShadow[parent.id] : null;
        childShadow.childrenScope = parentShadow ? Object.create(parentShadow.ownScope) : {};
        childShadow.ownScope = Object.create(childShadow.childrenScope);
        childShadow.parentShadow = parentShadow;
    };
    
    fluid.clearChildrenScope = function (instantiator, parentShadow, child, childShadow) {
        fluid.each(childShadow.contextHash, function (troo, context) {
            if (parentShadow.childrenScope[context] === child) {
                delete parentShadow.childrenScope[context]; // TODO: ambiguous resolution
            }
        });
    };

    // unsupported, non-API function - however, this structure is of considerable interest to those debugging
    // into IoC issues. The structures idToShadow and pathToComponent contain a complete map of the component tree
    // forming the surrounding scope
    fluid.instantiator = function () {
        var that = fluid.typeTag("instantiator");
        $.extend(that, {
            lifecycleStatus: "constructed",
            pathToComponent: {},
            idToShadow: {},
            modelTransactions: {init: {}}, // a map of transaction id to map of component id to records of components enlisted in a current model initialisation transaction
            composePath: fluid.model.composePath, // For speed, we declare that no component's name may contain a period
            composeSegments: fluid.model.composeSegments,
            parseEL: fluid.model.parseEL,
            events: {
                onComponentAttach: fluid.makeEventFirer({name: "instantiator's onComponentAttach event"}),
                onComponentClear: fluid.makeEventFirer({name: "instantiator's onComponentClear event"})
            }
        });
        // TODO: this API can shortly be removed
        that.idToPath = function (id) {
            var shadow = that.idToShadow[id];
            return shadow ? shadow.path : "";
        };
        // Note - the returned stack is assumed writeable and does not include the root
        that.getThatStack = function (component) {
            var shadow = that.idToShadow[component.id];
            if (shadow) {
                var path = shadow.path;
                var parsed = that.parseEL(path);
                var root = that.pathToComponent[""], togo = [];
                for (var i = 0; i < parsed.length; ++ i) {
                    root = root[parsed[i]];
                    togo.push(root);
                }
                return togo;
            }
            else { return [];}
        };
        that.getFullStack = function (component) {
            var thatStack = component? that.getThatStack(component) : [];
            thatStack.unshift(fluid.resolveRootComponent);
            return thatStack;
        };
        function recordComponent(parent, component, path, name, created) {
            var shadow;
            if (created) {
                shadow = that.idToShadow[component.id] = {};
                shadow.that = component;
                shadow.path = path;
                shadow.memberName = name;
                fluid.constructScopeObjects(that, parent, component, shadow);
            } else {
                shadow = that.idToShadow[component.id];
                shadow.injectedPaths = shadow.injectedPaths || [];
                shadow.injectedPaths.push(path);
                var parentShadow = that.idToShadow[parent.id]; // structural parent shadow - e.g. resolveRootComponent
                var keys = fluid.keys(shadow.contextHash);
                keys.push(name); // add local name - FLUID-5696
                fluid.remove_if(keys, function (key) {
                    return shadow.contextHash && shadow.contextHash[key] === "memberName";
                });
                fluid.each(keys, function (context) {
                    if (!parentShadow.childrenScope[context]) {
                        parentShadow.childrenScope[context] = component;
                    }
                });
            }
            if (that.pathToComponent[path]) {
                fluid.fail("Error during instantiation - path " + path + " which has just created component " + fluid.dumpThat(component) +
                    " has already been used for component " + fluid.dumpThat(that.pathToComponent[path]) + " - this is a circular instantiation or other oversight." +
                    " Please clear the component using instantiator.clearComponent() before reusing the path.");
            }
            that.pathToComponent[path] = component;
        }
        that.recordRoot = function (component) {
            recordComponent(null, component, "", "", true);
        };
        that.recordKnownComponent = function (parent, component, name, created) {
            parent[name] = component;
            if (fluid.isComponent(component) || component.type === "instantiator") {
                var parentPath = that.idToShadow[parent.id].path;
                var path = that.composePath(parentPath, name);
                recordComponent(parent, component, path, name, created);
                that.events.onComponentAttach.fire(component, path, that, created);
            } else {
                fluid.fail("Cannot record non-component with value ", component, " at path \"" + name + "\" of parent ", parent);
            }
        };
        that.clearComponent = function (component, name, child, options, noModTree, path) {
            // options are visitor options for recursive driving
            var shadow = that.idToShadow[component.id];
            // use flat recursion since we want to use our own recursion rather than rely on "visited" records
            options = options || {flat: true, instantiator: that};
            child = child || component[name];
            path = path || shadow.path;
            if (path === undefined) {
                fluid.fail("Cannot clear component " + name + " from component ", component,
                    " which was not created by this instantiator");
            }

            var childPath = that.composePath(path, name);
            var childShadow = that.idToShadow[child.id];
            var created = childShadow.path === childPath;
            that.events.onComponentClear.fire(child, childPath, component, created);

            // only recurse on components which were created in place - if the id record disagrees with the
            // recurse path, it must have been injected
            if (created) {
                // Clear injected instance of this component from all other paths - historically we didn't bother
                // to do this since injecting into a shorter scope is an error - but now we have resolveRoot area
                fluid.each(childShadow.injectedPaths, function (injectedPath) {
                    var parentPath = fluid.model.getToTailPath(injectedPath);
                    var otherParent = that.pathToComponent[parentPath];
                    that.clearComponent(otherParent, fluid.model.getTailPath(injectedPath), child);
                });
                fluid.visitComponentChildren(child, function(gchild, gchildname, segs, i) {
                    var parentPath = that.composeSegments.apply(null, segs.slice(0, i));
                    that.clearComponent(child, gchildname, null, options, true, parentPath);
                }, options, that.parseEL(childPath));
                fluid.doDestroy(child, name, component);
                fluid.clearDistributions(childShadow);
                fluid.clearListeners(childShadow);
                child.events.afterDestroy.fire(child, name, component);
                delete that.idToShadow[child.id];
            }
            fluid.clearChildrenScope(that, shadow, child, childShadow);
            delete that.pathToComponent[childPath];
            if (!noModTree) {
                delete component[name]; // there may be no entry - if creation is not concluded
            }
        };
        return that;
    };

    // The global instantiator, holding all components instantiated in this context (instance of Infusion)
    fluid.globalInstantiator = fluid.instantiator();
    
    // Look up the globally registered instantiator for a particular component - we now only really support a
    // single, global instantiator, but this method is left as a notation point in case this ever reverts
    fluid.getInstantiator = function (component) {
        var instantiator = fluid.globalInstantiator;
        return component && instantiator.idToShadow[component.id] ? instantiator : null;
    };
    
    // The grade supplied to components which will be resolvable from all parts of the component tree
    fluid.defaults("fluid.resolveRoot");
    // In addition to being resolvable at the root, "resolveRootSingle" component will have just a single instance available. Fresh
    // instances will displace older ones.
    fluid.defaults("fluid.resolveRootSingle", {
        gradeNames: "fluid.resolveRoot"
    });
    
    fluid.constructRootComponents = function (instantiator) {
        // Instantiate the primordial components at the root of each context tree
        fluid.rootComponent = instantiator.rootComponent = fluid.typeTag("fluid.rootComponent");
        instantiator.recordRoot(fluid.rootComponent);
        
        // The component which for convenience holds injected instances of all components with fluid.resolveRoot grade
        fluid.resolveRootComponent = instantiator.resolveRootComponent = fluid.typeTag("fluid.resolveRootComponent");
        instantiator.recordKnownComponent(fluid.rootComponent, fluid.resolveRootComponent, "resolveRootComponent", true);
      
        // obliterate resolveRoot's scope objects and replace by the real root scope - which is unused by its own children 
        var rootShadow = instantiator.idToShadow[fluid.rootComponent.id];
        var resolveRootShadow = instantiator.idToShadow[fluid.resolveRootComponent.id];
        resolveRootShadow.ownScope = rootShadow.ownScope;
        resolveRootShadow.childrenScope = rootShadow.childrenScope;
        
        instantiator.recordKnownComponent(fluid.resolveRootComponent, instantiator, "instantiator", true); // needs to have a shadow so it can be injected
        resolveRootShadow.childrenScope.instantiator = instantiator; // needs to be mounted since it never passes through cacheShadowGrades
    };
    
    fluid.constructRootComponents(fluid.globalInstantiator); // currently a singleton - in future, alternative instantiators might come back

    /** Expand a set of component options either immediately, or with deferred effect.
     *  The current policy is to expand immediately function arguments within fluid.assembleCreatorArguments which are not the main options of a
     *  component. The component's own options take <code>{defer: true}</code> as part of
     *  <code>outerExpandOptions</code> which produces an "expandOptions" structure holding the "strategy" and "initter" pattern
     *  common to ginger participants.
     *  Probably not to be advertised as part of a public API, but is considerably more stable than most of the rest
     *  of the IoC API structure especially with respect to the first arguments.
     */

// TODO: Can we move outerExpandOptions to 2nd place? only user of 3 and 4 is fluid.makeExpandBlock
    fluid.expandOptions = function (args, that, mergePolicy, localRecord, outerExpandOptions) {
        if (!args) {
            return args;
        }
        fluid.pushActivity("expandOptions", "expanding options %args for component %that ", {that: that, args: args});
        var expandOptions = fluid.makeStackResolverOptions(that, localRecord);
        expandOptions.mergePolicy = mergePolicy;
        var expanded = outerExpandOptions && outerExpandOptions.defer ?
            fluid.makeExpandOptions(args, expandOptions) : fluid.expand(args, expandOptions);
        fluid.popActivity();
        return expanded;
    };

    fluid.localRecordExpected = ["type", "options", "args", "createOnEvent", "priority", "recordType"]; // last element unavoidably polluting

    fluid.checkComponentRecord = function (defaults, localRecord) {
        var expected = fluid.arrayToHash(fluid.localRecordExpected);
        fluid.each(defaults && defaults.argumentMap, function(value, key) {
            expected[key] = true;
        });
        fluid.each(localRecord, function (value, key) {
            if (!expected[key]) {
                fluid.fail("Probable error in subcomponent record ", localRecord, " - key \"" + key +
                    "\" found, where the only legal options are " +
                    fluid.keys(expected).join(", "));
            }
        });
    };

    fluid.mergeRecordsToList = function (that, mergeRecords) {
        var list = [];
        fluid.each(mergeRecords, function (value, key) {
            value.recordType = key;
            if (key === "distributions") {
                list.push.apply(list, fluid.transform(value, function (distributedBlock) {
                    return fluid.computeDistributionPriority(that, distributedBlock);
                }));
            }
            else {
                if (!value.options) { return; }
                value.priority = fluid.mergeRecordTypes[key];
                if (value.priority === undefined) {
                    fluid.fail("Merge record with unrecognised type " + key + ": ", value);
                }
                list.push(value);
            }
        });
        return list;
    };

    // TODO: overall efficiency could huge be improved by resorting to the hated PROTOTYPALISM as an optimisation
    // for this mergePolicy which occurs in every component. Although it is a deep structure, the root keys are all we need
    var addPolicyBuiltins = function (policy) {
        fluid.each(["gradeNames", "mergePolicy", "argumentMap", "components", "dynamicComponents", "events", "listeners", "modelListeners", "distributeOptions", "transformOptions"], function (key) {
            fluid.set(policy, [key, "*", "noexpand"], true);
        });
        return policy;
    };

    // used from Fluid.js
    fluid.generateExpandBlock = function (record, that, mergePolicy, localRecord) {
        var expanded = fluid.expandOptions(record.options, record.contextThat || that, mergePolicy, localRecord, {defer: true});
        expanded.priority = record.priority;
        expanded.namespace = record.namespace;
        expanded.recordType = record.recordType;
        return expanded;
    };

    var expandComponentOptionsImpl = function (mergePolicy, defaults, initRecord, that) {
        var defaultCopy = fluid.copy(defaults);
        addPolicyBuiltins(mergePolicy);
        var shadow = fluid.shadowForComponent(that);
        shadow.mergePolicy = mergePolicy;
        var mergeRecords = {
            defaults: {options: defaultCopy}
        };

        $.extend(mergeRecords, initRecord.mergeRecords);
        // Do this here for gradeless components that were corrected by "localOptions"
        if (mergeRecords.subcomponentRecord) {
            fluid.checkComponentRecord(defaults, mergeRecords.subcomponentRecord);
        }
        
        var expandList = fluid.mergeRecordsToList(that, mergeRecords);

        var togo = fluid.transform(expandList, function (value) {
            return fluid.generateExpandBlock(value, that, mergePolicy, initRecord.localRecord);
        });
        return togo;
    };

    fluid.fabricateDestroyMethod = function (that, name, instantiator, child) {
        return function () {
            instantiator.clearComponent(that, name, child);
        };
    };
    
    // Computes a name for a component appearing at the global root which is globally unique, from its nickName and id
    fluid.computeGlobalMemberName = function (that) {
        var nickName = fluid.computeNickName(that.typeName);
        return nickName + "-" + that.id;
    };
    
    // Maps a type name to the member name to be used for it at a particular path level where it is intended to be unique
    // Note that "." is still not supported within a member name
    // unsupported, NON-API function
    fluid.typeNameToMemberName = function (typeName) {
        return typeName.replace(/\./g, "_");
    };

    // This is the initial entry point from the non-IoC side reporting the first presence of a new component - called from fluid.mergeComponentOptions
    fluid.expandComponentOptions = function (mergePolicy, defaults, userOptions, that) {
        var initRecord = userOptions; // might have been tunnelled through "userOptions" from "assembleCreatorArguments"
        var instantiator = userOptions && userOptions.marker === fluid.EXPAND ? userOptions.instantiator : null;
        if (!instantiator) { // it is a top-level component which needs to be attached to the global root
            instantiator = fluid.globalInstantiator;
            initRecord = { // upgrade "userOptions" to the same format produced by fluid.assembleCreatorArguments via the subcomponent route
                mergeRecords: {user: {options: fluid.expandCompact(userOptions, true)}},
                memberName: fluid.computeGlobalMemberName(that),
                instantiator: instantiator,
                parentThat: fluid.rootComponent
            };
        }
        that.destroy = fluid.fabricateDestroyMethod(initRecord.parentThat, initRecord.memberName, instantiator, that);
        fluid.pushActivity("expandComponentOptions", "expanding component options %options with record %record for component %that",
            {options: fluid.get(initRecord.mergeRecords, "user.options"), record: initRecord, that: that});
            
        instantiator.recordKnownComponent(initRecord.parentThat, that, initRecord.memberName, true);
        var togo = expandComponentOptionsImpl(mergePolicy, defaults, initRecord, that);
        
        fluid.popActivity();
        return togo;
    };

    /** Given a typeName, determine the final concrete
     * "invocation specification" consisting of a concrete global function name
     * and argument list which is suitable to be executed directly by fluid.invokeGlobalFunction.
     */
    // options is just a disposition record containing memberName, componentRecord
    fluid.assembleCreatorArguments = function (parentThat, typeName, options) {
        var upDefaults = fluid.defaults(typeName); // we're not responsive to dynamic changes in argMap, but we don't believe in these anyway
        if (!upDefaults || !upDefaults.argumentMap) {
            fluid.fail("Error in assembleCreatorArguments: cannot look up component type name " + typeName + " to a component creator grade with an argumentMap");
        }

        var fakeThat = {}; // fake "that" for receiveDistributions since we try to match selectors before creation for FLUID-5013
        var distributions = parentThat ? fluid.receiveDistributions(parentThat, upDefaults.gradeNames, options.memberName, fakeThat) : [];

        var localDynamic = options.localDynamic;
        var localRecord = $.extend({}, fluid.censorKeys(options.componentRecord, ["type"]), localDynamic);
 
        var argMap = upDefaults.argumentMap;
        var findKeys = Object.keys(argMap).concat(["type"]);

        fluid.each(findKeys, function (name) {
            for (var i = 0; i < distributions.length; ++ i) { // Apply non-options material from distributions (FLUID-5013)
                if (distributions[i][name] !== undefined) {
                    localRecord[name] = distributions[i][name];
                }
            }
        });
        typeName = localRecord.type || typeName;
        
        delete localRecord.type;
        delete localRecord.options;

        var mergeRecords = {distributions: distributions};

        if (options.componentRecord !== undefined) {
            // Deliberately put too many things here so they can be checked in expandComponentOptions (FLUID-4285)
            mergeRecords.subcomponentRecord = $.extend({}, options.componentRecord);
        }
        var args = [];
        fluid.each(argMap, function (index, name) {
            var arg;
            if (name === "options") {
                arg = {marker: fluid.EXPAND,
                           localRecord: localDynamic,
                           mergeRecords: mergeRecords,
                           instantiator: fluid.getInstantiator(parentThat),
                           parentThat: parentThat,
                           memberName: options.memberName};
            } else {
                var value = localRecord[name];
                arg = fluid.expandImmediate(value, parentThat, localRecord);
            }
            args[index] = arg;
        });

        var togo = {
            args: args,
            funcName: typeName
        };
        return togo;
    };

    /** Instantiate the subcomponent with the supplied name of the supplied top-level component. Although this method
     * is published as part of the Fluid API, it should not be called by general users and may not remain stable. It is
     * currently the only mechanism provided for instantiating components whose definitions are dynamic, and will be
     * replaced in time by dedicated declarative framework described by FLUID-5022.
     * @param that {Component} the parent component for which the subcomponent is to be instantiated
     * @param name {String} the name of the component - the index of the options block which configures it as part of the
     * <code>components</code> section of its parent's options
     */
    fluid.initDependent = function (that, name, localRecord) {
        if (that[name]) { return; } // TODO: move this into strategy
        var component = that.options.components[name];
        fluid.pushActivity("initDependent", "instantiating dependent component with name \"%name\" with record %record as child of %parent",
            {name: name, record: component, parent: that});
        var instance;
        var instantiator = fluid.globalInstantiator;
        var shadow = instantiator.idToShadow[that.id];
        var localDynamic = localRecord || shadow.subcomponentLocal && shadow.subcomponentLocal[name];

        if (typeof(component) === "string") {
            that[name] = fluid.inEvaluationMarker;
            instance = fluid.expandImmediate(component, that);
            if (instance) {
                instantiator.recordKnownComponent(that, instance, name, false);
            } else {
                delete that[name];
            }
        }
        else if (component.type) {
            var type = fluid.expandImmediate(component.type, that, localDynamic);
            if (!type) {
                fluid.fail("Error in subcomponent record: ", component.type, " could not be resolved to a type for component ", name,
                    " of parent ", that);
            }
            var invokeSpec = fluid.assembleCreatorArguments(that, type, {componentRecord: component, memberName: name, localDynamic: localDynamic});
            instance = fluid.initSubcomponentImpl(that, {type: invokeSpec.funcName}, invokeSpec.args);
        }
        else {
            fluid.fail("Unrecognised material in place of subcomponent " + name + " - no \"type\" field found");
        }
        fluid.popActivity();
        return instance;
    };

    fluid.bindDeferredComponent = function (that, componentName, component) {
        var events = fluid.makeArray(component.createOnEvent);
        fluid.each(events, function(eventName) {
            var event = eventName.charAt(0) === "{" ? fluid.expandOptions(eventName, that) : that.events[eventName];
            if (!event || !event.addListener) {
                fluid.fail("Error instantiating createOnEvent component with name " + componentName + " of parent ", that, " since event specification " +
                    eventName + " could not be expanded to an event - got ", event);
            }
            event.addListener(function () {
                fluid.pushActivity("initDeferred", "instantiating deferred component %componentName of parent %that due to event %eventName",
                 {componentName: componentName, that: that, eventName: eventName});
                if (that[componentName]) {
                    fluid.globalInstantiator.clearComponent(that, componentName);
                }
                fluid.initDependent(that, componentName);
                fluid.popActivity();
            }, null, component.priority);
        });
    };

    fluid.priorityForComponent = function (component) {
        return component.priority? component.priority :
            (component.type === "fluid.typeFount" || fluid.hasGrade(fluid.defaults(component.type), "fluid.typeFount"))?
            "first" : undefined;
    };

    fluid.initDependents = function (that) {
        fluid.pushActivity("initDependents", "instantiating dependent components for component %that", {that: that});
        var shadow = fluid.shadowForComponent(that);
        shadow.memberStrategy.initter();
        shadow.invokerStrategy.initter();

        fluid.getForComponent(that, "modelRelay");
        fluid.getForComponent(that, "model"); // trigger this as late as possible - but must be before components so that child component has model on its onCreate

        var options = that.options;
        var components = options.components || {};
        var componentSort = [];

        fluid.each(components, function (component, name) {
            if (!component.createOnEvent) {
                var priority = fluid.priorityForComponent(component);
                componentSort.push({namespace: name, priority: fluid.parsePriority(priority)});
            }
            else {
                fluid.bindDeferredComponent(that, name, component);
            }
        });
        fluid.sortByPriority(componentSort);
        fluid.each(componentSort, function (entry) {
            fluid.initDependent(that, entry.namespace);
        });
        if (shadow.subcomponentLocal) {
            fluid.clear(shadow.subcomponentLocal); // still need repo for event-driven dynamic components - abolish these in time
        }

        fluid.popActivity();
    };

    
    /** BEGIN NEXUS METHODS **/
    
    fluid.pathForComponent = function (component, instantiator) {
        instantiator = instantiator || fluid.getInstantiator(component);
        var shadow = instantiator.idToShadow[component.id];
        if (!shadow) {
            fluid.fail("Cannot get path for ", component, " which is not a component");
        }
        return instantiator.parseEL(shadow.path);
    };
    
    /** Construct a component with the supplied options at the specified path in the component tree. The parent path of the location must already be a component.
     * @param path {String|Array of String} Path where the new component is to be constructed, represented as a string or array of segments
     * @param options {Object} Top-level options supplied to the component - must at the very least include a field <code>type</code> holding the component's type 
     * @param instantiator {Instantiator} [optional] The instantiator holding the component to be created - if blank, the global instantiator will be used
     */
    fluid.construct = function (path, options, instantiator) {
        var record = fluid.destroy(path, instantiator);
        // TODO: We must construct a more principled scheme for designating child components than this - especially once options become immutable
        fluid.set(record.parent, ["options", "components", record.memberName], {
            type: options.type,
            options: options
        });
        return fluid.initDependent(record.parent, record.memberName);
    };

    /** Destroys a component held at the specified path. The parent path must represent a component, although the component itself may be nonexistent
     * @param path {String|Array of String} Path where the new component is to be destroyed, represented as a string or array of segments
     * @param instantiator {Instantiator} [optional] The instantiator holding the component to be destroyed - if blank, the global instantiator will be used
     */
    fluid.destroy = function (path, instantiator) {
        instantiator = instantiator || fluid.globalInstantiator;
        var segs = fluid.model.parseToSegments(path, instantiator.parseEL, true);
        if (segs.length === 0) {
            fluid.fail("Cannot destroy the root component");
        }
        var memberName = segs.pop(), parentPath = instantiator.composeSegments.apply(null, segs);
        var parent = instantiator.pathToComponent[parentPath];
        if (!parent) {
            fluid.fail("Cannot modify component with nonexistent parent at path ", path);
        }
        if (parent[memberName]) {
            parent[memberName].destroy();
        }
        return {
            parent: parent,
            memberName: memberName
        };
    };
    
    /** END NEXUS METHODS **/
    
    /** BEGIN IOC DEBUGGING METHODS **/
    fluid["debugger"] = function () {
        /* jshint ignore:start */
        debugger;
        /* jshint ignore:end */
    };
    
    fluid.defaults("fluid.debuggingProbe", {
        gradeNames: ["fluid.component"]
    });
    
    // probe looks like:
    // target: {preview other}.listeners.eventName
    // priority: first/last
    // func: console.log/fluid.log/fluid.debugger
    fluid.probeToDistribution = function (probe) {
        var instantiator = fluid.globalInstantiator;
        var parsed = fluid.parseContextReference(probe.target);
        var segs = fluid.model.parseToSegments(parsed.path, instantiator.parseEL, true);
        if (segs[0] !== "options") {
            segs.unshift("options"); // compensate for this insanity until we have the great options flattening
        }
        var parsedPriority = fluid.parsePriority(probe.priority);
        if (parsedPriority.constraint && !parsedPriority.constraint.target) {
            parsedPriority.constraint.target = "authoring";
        }
        return {
            target: "{/ " + parsed.context + "}." + instantiator.composeSegments.apply(null, segs),
            record: {
                func: probe.func,
                funcName: probe.funcName,
                args: probe.args,
                priority: fluid.renderPriority(parsedPriority)
            }
        };
    };
    
    fluid.registerProbes = function (probes) {
        var probeDistribution = fluid.transform(probes, fluid.probeToDistribution);
        var memberName = "fluid_debuggingProbe_" + fluid.allocateGuid();
        fluid.construct([memberName], {
            type: "fluid.debuggingProbe",
            distributeOptions: probeDistribution
        });
        return memberName;
    };
    
    fluid.deregisterProbes = function (probeName) {
        fluid.destroy([probeName]);
    };
    
    /** END IOC DEBUGGING METHODS **/

    fluid.thisistToApplicable = function (record, recthis, that) {
        return {
            apply: function (noThis, args) {
                // Resolve this material late, to deal with cases where the target has only just been brought into existence
                // (e.g. a jQuery target for rendered material) - TODO: Possibly implement cached versions of these as we might do for invokers
                var resolvedThis = fluid.expandOptions(recthis, that);
                if (typeof(resolvedThis) === "string") {
                    resolvedThis = fluid.getGlobalValue(resolvedThis);
                }
                if (!resolvedThis) {
                    fluid.fail("Could not resolve reference " + recthis + " to a value");
                }
                var resolvedFunc = resolvedThis[record.method];
                if (typeof(resolvedFunc) !== "function") {
                    fluid.fail("Object ", resolvedThis, " at reference " + recthis + " has no member named " + record.method + " which is a function ");
                }
                fluid.log("Applying arguments ", args, " to method " + record.method + " of instance ", resolvedThis);
                return resolvedFunc.apply(resolvedThis, args);
            }
        };
    };

    fluid.changeToApplicable = function (record, that) {
        return {
            apply: function (noThis, args) {
                var parsed = fluid.parseValidModelReference(that, "changePath listener record", record.changePath);
                var value = fluid.expandOptions(record.value, that, {}, {"arguments": args});
                fluid.fireSourcedChange(parsed.applier, parsed.path, value, record.source);
            }
        };
    };

    // Convert "exotic records" into an applicable form ("this/method" for FLUID-4878 or "changePath" for FLUID-3674)
    fluid.recordToApplicable = function (record, that) {
        if (record.changePath) {
            return fluid.changeToApplicable(record, that);
        }
        var recthis = record["this"];
        if (record.method ^ recthis) {
            fluid.fail("Record ", that, " must contain both entries \"method\" and \"this\" if it contains either");
        }
        return record.method ? fluid.thisistToApplicable(record, recthis, that) : null;
    };
    
    fluid.getGlobalValueNonComponent = function (funcName, context) { // TODO: Guard this in listeners as well
        var defaults = fluid.defaults(funcName);
        if (defaults && fluid.hasGrade(defaults, "fluid.component")) {
            fluid.fail("Error in function specification - cannot invoke function " + funcName + " in the context of " + context + ": component creator functions can only be used as subcomponents");
        }
        return fluid.getGlobalValue(funcName);
    };

    fluid.makeInvoker = function (that, invokerec, name) {
        invokerec = fluid.upgradePrimitiveFunc(invokerec); // shorthand case for direct function invokers (FLUID-4926)
        if (invokerec.args !== undefined && invokerec.args !== fluid.NO_VALUE && !fluid.isArrayable(invokerec.args)) {
            invokerec.args = fluid.makeArray(invokerec.args);
        }
        var func = fluid.recordToApplicable(invokerec, that);
        var invokePre = fluid.preExpand(invokerec.args);
        var localRecord = {};
        var expandOptions = fluid.makeStackResolverOptions(that, localRecord, true);
        func = func || (invokerec.funcName? fluid.getGlobalValueNonComponent(invokerec.funcName, "an invoker") : fluid.expandImmediate(invokerec.func, that));
        if (!func || !func.apply) {
            fluid.fail("Error in invoker record: could not resolve members func, funcName or method to a function implementation - got " + func + " from ", invokerec);
        } else if (func === fluid.notImplemented) {
            fluid.fail("Error constructing component ", that, " - the invoker named " + name + " which was defined in grade " + invokerec.componentSource + " needs to be overridden with a concrete implementation");
        }
        return function invokeInvoker () {
            if (fluid.defeatLogging === false) {
                fluid.pushActivity("invokeInvoker", "invoking invoker with name %name and record %record from component %that", {name: name, record: invokerec, that: that});
            }
            var togo, finalArgs;
            localRecord["arguments"] = arguments;
            if (invokerec.args === undefined || invokerec.args === fluid.NO_VALUE) {
                finalArgs = arguments;
            } else {
                fluid.expandImmediateImpl(invokePre, expandOptions);
                finalArgs = invokePre.source;
            }
            togo = func.apply(null, finalArgs);
            if (fluid.defeatLogging === false) {
                fluid.popActivity();
            }
            return togo;
        };
    };

    // weird higher-order function so that we can staightforwardly dispatch original args back onto listener
    fluid.event.makeTrackedListenerAdder = function (source) {
        var shadow = fluid.shadowForComponent(source);
        return function (event) {
            return {addListener: function (listener, namespace, priority, softNamespace, listenerId) {
                    fluid.recordListener(event, listener, shadow, listenerId);
                    event.addListener.apply(null, arguments);
                }
            };
        };
    };

    fluid.event.listenerEngine = function (eventSpec, callback, adder) {
        var argstruc = {};
        function checkFire() {
            var notall = fluid.find(eventSpec, function(value, key) {
                if (argstruc[key] === undefined) {
                    return true;
                }
            });
            if (!notall) {
                var oldstruc = argstruc;
                argstruc = {}; // guard against the case the callback perversely fires one of its prerequisites (FLUID-5112)
                callback(oldstruc);
            }
        }
        fluid.each(eventSpec, function (event, eventName) {
            adder(event).addListener(function () {
                argstruc[eventName] = fluid.makeArray(arguments);
                checkFire();
            });
        });
    };

    fluid.event.dispatchListener = function (that, listener, eventName, eventSpec, indirectArgs) {
        var togo = function () {
            fluid.pushActivity("dispatchListener", "firing to listener to event named %eventName of component %that",
                {eventName: eventName, that: that});
                
            var args = indirectArgs ? arguments[0] : fluid.makeArray(arguments);
            if (eventSpec.args !== undefined && eventSpec.args !== fluid.NO_VALUE) {
                if (!fluid.isArrayable(eventSpec.args)) {
                    eventSpec.args = fluid.makeArray(eventSpec.args);
                }
                args = fluid.expandImmediate(eventSpec.args, that, {"arguments": args});
            }
            var togo = fluid.event.invokeListener(listener, args);
            
            fluid.popActivity();
            return togo;
        };
        fluid.event.impersonateListener(listener, togo); // still necessary for FLUID-5254 even though framework's listeners now get explicit guids
        return togo;
    };

    fluid.event.resolveSoftNamespace = function (key) {
        if (typeof(key) !== "string") {
            return null;
        } else {
            var lastpos = Math.max(key.lastIndexOf("."), key.lastIndexOf("}"));
            return key.substring(lastpos + 1);
        }
    };

    fluid.event.resolveListenerRecord = function (lisrec, that, eventName, namespace, standard) {
        var badRec = function (record, extra) {
            fluid.fail("Error in listener record - could not resolve reference ", record, " to a listener or firer. " +
                "Did you miss out \"events.\" when referring to an event firer?" + extra);
        };
        fluid.pushActivity("resolveListenerRecord", "resolving listener record for event named %eventName for component %that",
            {eventName: eventName, that: that});
        var records = fluid.makeArray(lisrec);
        var transRecs = fluid.transform(records, function (record) {
            // TODO: FLUID-5242 fix - we copy here since distributeOptions does not copy options blocks that it distributes and we can hence corrupt them.
            // need to clarify policy on options sharing - for slightly better efficiency, copy should happen during distribution and not here
            var expanded = fluid.isPrimitive(record) || record.expander ? {listener: record} : fluid.copy(record);
            var methodist = fluid.recordToApplicable(record, that);
            if (methodist) {
                expanded.listener = methodist;
            }
            else {
                expanded.listener = expanded.listener || expanded.func || expanded.funcName;
            }
            if (!expanded.listener) {
                badRec(record, " Listener record must contain a member named \"listener\", \"func\", \"funcName\" or \"method\"");
            }
            var softNamespace = record.method ?
                fluid.event.resolveSoftNamespace(record["this"]) + "." + record.method :
                fluid.event.resolveSoftNamespace(expanded.listener);
            if (!expanded.namespace && !namespace && softNamespace) {
                expanded.softNamespace = true;
                expanded.namespace = (record.componentSource ? record.componentSource : that.typeName) + "." + softNamespace;
            }
            var listener = expanded.listener = fluid.expandOptions(expanded.listener, that);
            if (!listener) {
                badRec(record, "");
            }
            var firer = false;
            if (listener.typeName === "fluid.event.firer") {
                listener = listener.fire;
                firer = true;
            }
            expanded.listener = (standard && (expanded.args && listener !== "fluid.notImplemented" || firer)) ? fluid.event.dispatchListener(that, listener, eventName, expanded) : listener;
            expanded.listenerId = fluid.allocateGuid();
            return expanded;
        });
        var togo = {
            records: transRecs,
            adderWrapper: standard ? fluid.event.makeTrackedListenerAdder(that) : null
        };
        fluid.popActivity();
        return togo;
    };

    fluid.event.expandOneEvent = function (that, event) {
        var origin;
        if (typeof(event) === "string" && event.charAt(0) !== "{") {
            // Shorthand for resolving onto our own events, but with GINGER WORLD!
            origin = fluid.getForComponent(that, ["events", event]);
        }
        else {
            origin = fluid.expandOptions(event, that);
        }
        if (!origin || origin.typeName !== "fluid.event.firer") {
            fluid.fail("Error in event specification - could not resolve base event reference ", event, " to an event firer: got ", origin);
        }
        return origin;
    };

    fluid.event.expandEvents = function (that, event) {
        return typeof(event) === "string" ?
            fluid.event.expandOneEvent(that, event) :
            fluid.transform(event, function (oneEvent) {
                return fluid.event.expandOneEvent(that, oneEvent);
            });
    };

    fluid.event.resolveEvent = function (that, eventName, eventSpec) {
        fluid.pushActivity("resolveEvent", "resolving event with name %eventName attached to component %that",
            {eventName: eventName, that: that});
        var adder = fluid.event.makeTrackedListenerAdder(that);
        if (typeof(eventSpec) === "string") {
            eventSpec = {event: eventSpec};
        }
        var event = eventSpec.typeName === "fluid.event.firer" ? eventSpec : eventSpec.event || eventSpec.events;
        if (!event) {
            fluid.fail("Event specification for event with name " + eventName + " does not include a base event specification: ", eventSpec);
        }

        var origin = event.typeName === "fluid.event.firer" ? event : fluid.event.expandEvents(that, event);

        var isMultiple = origin.typeName !== "fluid.event.firer";
        var isComposite = eventSpec.args || isMultiple;
        // If "event" is not composite, we want to share the listener list and FIRE method with the original
        // If "event" is composite, we need to create a new firer. "composite" includes case where any boiling
        // occurred - this was implemented wrongly in 1.4.
        var firer;
        if (isComposite) {
            firer = fluid.makeEventFirer({name: " [composite] " + fluid.event.nameEvent(that, eventName)});
            var dispatcher = fluid.event.dispatchListener(that, firer.fire, eventName, eventSpec, isMultiple);
            if (isMultiple) {
                fluid.event.listenerEngine(origin, dispatcher, adder);
            }
            else {
                adder(origin).addListener(dispatcher);
            }
        }
        else {
            firer = {typeName: "fluid.event.firer"};
            firer.fire = function () {
                var outerArgs = fluid.makeArray(arguments);
                fluid.pushActivity("fireSynthetic", "firing synthetic event %eventName ", {eventName: eventName});
                var togo = origin.fire.apply(null, outerArgs);
                fluid.popActivity();
                return togo;
            };
            firer.addListener = function (listener, namespace, priority, softNamespace, listenerId) {
                var dispatcher = fluid.event.dispatchListener(that, listener, eventName, eventSpec);
                adder(origin).addListener(dispatcher, namespace, priority, softNamespace, listenerId);
            };
            firer.removeListener = function (listener) {
                origin.removeListener(listener);
            };
        }
        fluid.popActivity();
        return firer;
    };

    /** BEGIN unofficial IoC material **/
    // The following three functions are unsupported ane only used in the renderer expander.
    // The material they produce is no longer recognised for component resolution.

    fluid.withEnvironment = function (envAdd, func, root) {
        root = root || fluid.globalThreadLocal();
        try {
            for (var key in envAdd) {
                root[key] = envAdd[key];
            }
            $.extend(root, envAdd);
            return func();
        } finally {
            for (var key in envAdd) { /* jshint ignore:line */ /* duplicate "key" */
                delete root[key]; // TODO: users may want a recursive "scoping" model
            }
        }
    };

    fluid.fetchContextReference = function (parsed, directModel, env, elResolver, externalFetcher) {
        // The "elResolver" is a hack to make certain common idioms in protoTrees work correctly, where a contextualised EL
        // path actually resolves onto a further EL reference rather than directly onto a value target
        if (elResolver) {
            parsed = elResolver(parsed, env);
        }
        var base = parsed.context? env[parsed.context] : directModel;
        if (!base) {
            var resolveExternal = externalFetcher && externalFetcher(parsed);
            return resolveExternal || base;
        }
        return parsed.noDereference? parsed.path : fluid.get(base, parsed.path);
    };

    fluid.makeEnvironmentFetcher = function (directModel, elResolver, envGetter, externalFetcher) {
        envGetter = envGetter || fluid.globalThreadLocal;
        return function(parsed) {
            var env = envGetter();
            return fluid.fetchContextReference(parsed, directModel, env, elResolver, externalFetcher);
        };
    };

    /** END of unofficial IoC material **/
    
    /* Compact expansion machinery - for short form invoker and expander references such as @expand:func(arg) and func(arg) */

    fluid.coerceToPrimitive = function (string) {
        return string === "false" ? false : (string === "true" ? true :
            (isFinite(string) ? Number(string) : string));
    };

    fluid.compactStringToRec = function (string, type) {
        var openPos = string.indexOf("(");
        var closePos = string.indexOf(")");
        if (openPos === -1 ^ closePos === -1 || openPos > closePos) {
            fluid.fail("Badly-formed compact " + type + " record without matching parentheses: ", string);
        }
        if (openPos !== -1 && closePos !== -1) {
            var prefix = string.substring(0, openPos);
            var body = string.substring(openPos + 1, closePos);
            var args = fluid.transform(body.split(","), $.trim, fluid.coerceToPrimitive);
            var togo = fluid.upgradePrimitiveFunc(prefix, null);
            togo.args = args;
            return togo;
        }
        else if (type === "expander") {
            fluid.fail("Badly-formed compact expander record without parentheses: ", string);
        }
        return string;
    };

    fluid.expandPrefix = "@expand:";

    fluid.expandCompactString = function (string, active) {
        var rec = string;
        if (string.indexOf(fluid.expandPrefix) === 0) {
            var rem = string.substring(fluid.expandPrefix.length);
            rec = {
                expander: fluid.compactStringToRec(rem, "expander")
            };
        }
        else if (active) {
            rec = fluid.compactStringToRec(string, active);
        }
        return rec;
    };

    var singularPenRecord = {
        listeners: "listener",
        modelListeners: "modelListener"
    };

    var singularRecord = $.extend({
        invokers: "invoker"
    }, singularPenRecord);

    fluid.expandCompactRec = function (segs, target, source) {
        fluid.guardCircularExpansion(segs, segs.length);
        var pen = segs.length > 0 ? segs[segs.length - 1] : "";
        var active = singularRecord[pen];
        if (!active && segs.length > 1) {
            active = singularPenRecord[segs[segs.length - 2]]; // support array of listeners and modelListeners
        }
        fluid.each(source, function (value, key) {
            if (fluid.isPlainObject(value)) {
                target[key] = fluid.freshContainer(value);
                segs.push(key);
                fluid.expandCompactRec(segs, target[key], value);
                segs.pop();
                return;
            }
            else if (typeof(value) === "string") {
                value = fluid.expandCompactString(value, active);
            }
            target[key] = value;
        });
    };

    fluid.expandCompact = function (options) {
        var togo = {};
        fluid.expandCompactRec([], togo, options);
        return togo;
    };
    
    /** End compact record expansion machinery **/
    
    fluid.isIoCReference = function (ref) {
        return typeof(ref) === "string" && ref.charAt(0) === "{" && ref.indexOf("}") > 0;
    };

    fluid.extractEL = function (string, options) {
        if (options.ELstyle === "ALL") {
            return string;
        }
        else if (options.ELstyle.length === 1) {
            if (string.charAt(0) === options.ELstyle) {
                return string.substring(1);
            }
        }
        else if (options.ELstyle === "${}") {
            var i1 = string.indexOf("${");
            var i2 = string.lastIndexOf("}");
            if (i1 === 0 && i2 !== -1) {
                return string.substring(2, i2);
            }
        }
    };

    fluid.extractELWithContext = function (string, options) {
        var EL = fluid.extractEL(string, options);
        if (fluid.isIoCReference(EL)) {
            return fluid.parseContextReference(EL);
        }
        return EL? {path: EL} : EL;
    };

    fluid.parseContextReference = function (reference, index, delimiter) {
        index = index || 0;
        var endcpos = reference.indexOf("}", index + 1);
        if (endcpos === -1) {
            fluid.fail("Cannot parse context reference \"" + reference + "\": Malformed context reference without }");
        }
        var context = reference.substring(index + 1, endcpos);
        var endpos = delimiter? reference.indexOf(delimiter, endcpos + 1) : reference.length;
        var path = reference.substring(endcpos + 1, endpos);
        if (path.charAt(0) === ".") {
            path = path.substring(1);
        }
        return {context: context, path: path, endpos: endpos};
    };

    fluid.renderContextReference = function (parsed) {
        return "{" + parsed.context + "}" + (parsed.path ? "." + parsed.path : "");
    };
    
    // TODO: Once we eliminate expandSource, all of this tree of functions can be hived off to RendererUtilities
    fluid.resolveContextValue = function (string, options) {
        function fetch(parsed) {
            fluid.pushActivity("resolveContextValue", "resolving context value %string", {string: string});
            var togo = options.fetcher(parsed);
            fluid.pushActivity("resolvedContextValue", "resolved value %string to value %value", {string: string, value: togo});
            fluid.popActivity(2);
            return togo;
        }
        var parsed;
        if (options.bareContextRefs && fluid.isIoCReference(string)) {
            parsed = fluid.parseContextReference(string);
            return fetch(parsed);
        }
        else if (options.ELstyle && options.ELstyle !== "${}") {
            parsed = fluid.extractELWithContext(string, options);
            if (parsed) {
                return fetch(parsed);
            }
        }
        while (typeof(string) === "string") {
            var i1 = string.indexOf("${");
            var i2 = string.indexOf("}", i1 + 2);
            if (i1 !== -1 && i2 !== -1) {
                if (string.charAt(i1 + 2) === "{") {
                    parsed = fluid.parseContextReference(string, i1 + 2, "}");
                    i2 = parsed.endpos;
                }
                else {
                    parsed = {path: string.substring(i1 + 2, i2)};
                }
                var subs = fetch(parsed);
                var all = (i1 === 0 && i2 === string.length - 1);
                // TODO: test case for all undefined substitution
                if (subs === undefined || subs === null) {
                    return subs;
                }
                string = all? subs : string.substring(0, i1) + subs + string.substring(i2 + 1);
            }
            else {
                break;
            }
        }
        return string;
    };

    // This function appears somewhat reusable, but not entirely - it probably needs to be packaged
    // along with the particular "strategy". Very similar to the old "filter"... the "outer driver" needs
    // to execute it to get the first recursion going at top level. This was one of the most odd results
    // of the reorganisation, since the "old work" seemed much more naturally expressed in terms of values
    // and what happened to them. The "new work" is expressed in terms of paths and how to move amongst them.
    fluid.fetchExpandChildren = function (target, i, segs, source, mergePolicy, options) {
        if (source.expander) { // possible expander at top level
            var expanded = fluid.expandExpander(target, source, options);
            if (fluid.isPrimitive(expanded) || fluid.isDOMish(expanded) || !fluid.isPlainObject(expanded) || (fluid.isArrayable(expanded) ^ fluid.isArrayable(target))) {
                return expanded;
            }
            else { // make an attempt to preserve the root reference if possible
                $.extend(true, target, expanded);
            }
        }
        // NOTE! This expects that RHS is concrete! For material input to "expansion" this happens to be the case, but is not
        // true for other algorithms. Inconsistently, this algorithm uses "sourceStrategy" below. In fact, this "fetchChildren"
        // operation looks like it is a fundamental primitive of the system. We do call "deliverer" early which enables correct
        // reference to parent nodes up the tree - however, anyone processing a tree IN THE CHAIN requires that it is produced
        // concretely at the point STRATEGY returns. Which in fact it is...............
        fluid.each(source, function (newSource, key) {
            if (newSource === undefined) {
                target[key] = undefined; // avoid ever dispatching to ourselves with undefined source
            }
            else if (key !== "expander") {
                segs[i] = key;
                if (fluid.getImmediate(options.exceptions, segs, i) !== true) {
                    options.strategy(target, key, i + 1, segs, source, mergePolicy);
                }
            }
        });
        return target;
    };

    // TODO: This method is unnecessary and will quadratic inefficiency if RHS block is not concrete.
    // The driver should detect "homogeneous uni-strategy trundling" and agree to preserve the extra
    // "cursor arguments" which should be advertised somehow (at least their number)
    function regenerateCursor (source, segs, limit, sourceStrategy) {
        for (var i = 0; i < limit; ++ i) {
            // copy segs to avoid aliasing with FLUID-5243
            source = sourceStrategy(source, segs[i], i, fluid.makeArray(segs));
        }
        return source;
    }

    fluid.isUnexpandable = function (source) { // slightly more efficient compound of fluid.isCopyable and fluid.isComponent - review performance
        return fluid.isPrimitive(source) || !fluid.isPlainObject(source);
    };

    fluid.expandSource = function (options, target, i, segs, deliverer, source, policy, recurse) {
        var expanded, isTrunk;
        var thisPolicy = fluid.derefMergePolicy(policy);
        if (typeof (source) === "string" && !thisPolicy.noexpand) {
            if (!options.defaultEL || source.charAt(0) === "{") { // hard-code this for performance
                fluid.pushActivity("expandContextValue", "expanding context value %source held at path %path", {source: source, path: fluid.path.apply(null, segs.slice(0, i))});
                expanded = fluid.resolveContextValue(source, options);
                fluid.popActivity(1);
            } else {
                expanded = source;
            }
        }
        else if (thisPolicy.noexpand || fluid.isUnexpandable(source)) {
            expanded = source;
        }
        else if (source.expander) {
            expanded = fluid.expandExpander(deliverer, source, options);
        }
        else {
            expanded = fluid.freshContainer(source);
            isTrunk = true;
        }
        if (expanded !== fluid.NO_VALUE) {
            deliverer(expanded);
        }
        if (isTrunk) {
            recurse(expanded, source, i, segs, policy);
        }
        return expanded;
    };
    
    fluid.guardCircularExpansion = function (segs, i) {
        if (i > fluid.strategyRecursionBailout) {
            fluid.fail("Overflow/circularity in options expansion, current path is ", segs, " at depth " , i, " - please ensure options are not circularly connected, or protect from expansion using the \"noexpand\" policy or expander");
        }
    };

    fluid.makeExpandStrategy = function (options) {
        var recurse = function (target, source, i, segs, policy) {
            return fluid.fetchExpandChildren(target, i || 0, segs || [], source, policy, options);
        };
        var strategy = function (target, name, i, segs, source, policy) {
            fluid.guardCircularExpansion(segs, i);
            if (!target) {
                return;
            }
            if (target.hasOwnProperty(name)) { // bail out if our work has already been done
                return target[name];
            }
            if (source === undefined) { // recover our state in case this is an external entry point
                source = regenerateCursor(options.source, segs, i - 1, options.sourceStrategy);
                policy = regenerateCursor(options.mergePolicy, segs, i - 1, fluid.concreteTrundler);
            }
            var thisSource = options.sourceStrategy(source, name, i, segs);
            var thisPolicy = fluid.concreteTrundler(policy, name);
            function deliverer(value) {
                target[name] = value;
            }
            return fluid.expandSource(options, target, i, segs, deliverer, thisSource, thisPolicy, recurse);
        };
        options.recurse = recurse;
        options.strategy = strategy;
        return strategy;
    };

    fluid.defaults("fluid.makeExpandOptions", {
        ELstyle:          "${}",
        bareContextRefs:  true,
        target:           fluid.inCreationMarker
    });

    fluid.makeExpandOptions = function (source, options) {
        options = $.extend({}, fluid.rawDefaults("fluid.makeExpandOptions"), options);
        options.defaultEL = options.ELStyle === "${}" && options.bareContextRefs; // optimisation to help expander
        options.expandSource = function (source) {
            return fluid.expandSource(options, null, 0, [], fluid.identity, source, options.mergePolicy, false);
        };
        if (!fluid.isUnexpandable(source)) {
            options.source = source;
            options.target = fluid.freshContainer(source);
            options.sourceStrategy = options.sourceStrategy || fluid.concreteTrundler;
            fluid.makeExpandStrategy(options);
            options.initter = function () {
                options.target = fluid.fetchExpandChildren(options.target, 0, [], options.source, options.mergePolicy, options);
            };
        }
        else { // these init immediately since we must deliver a valid root target
            options.strategy = fluid.concreteTrundler;
            options.initter = fluid.identity;
            if (typeof(source) === "string") {
                options.target = options.expandSource(source);
            }
            else {
                options.target = source;
            }
        }
        return options;
    };

    // supported, PUBLIC API function
    fluid.expand = function (source, options) {
        var expandOptions = fluid.makeExpandOptions(source, options);
        expandOptions.initter();
        return expandOptions.target;
    };
    
    fluid.preExpandRecurse = function (root, source, holder, member, rootSegs) { // on entry, holder[member] = source
        fluid.guardCircularExpansion(rootSegs, rootSegs.length);
        function pushExpander(expander) {
            root.expanders.push({expander: expander, holder: holder, member: member});
            delete holder[member];
        }
        if (fluid.isIoCReference(source)) {
            var parsed = fluid.parseContextReference(source);
            var segs = fluid.model.parseEL(parsed.path);
            pushExpander({
                typeFunc: fluid.expander.fetch,
                context: parsed.context,
                segs: segs
            });
        } else if (fluid.isPlainObject(source)) {
            if (source.expander) {
                source.expander.typeFunc = fluid.getGlobalValue(source.expander.type || "fluid.invokeFunc");
                pushExpander(source.expander);
            } else {
                fluid.each(source, function (value, key) {
                    rootSegs.push(key);
                    fluid.preExpandRecurse(root, value, source, key, rootSegs);
                    rootSegs.pop();
                });
            }
        }
    };
    
    fluid.preExpand = function (source) {
        var root = {
            expanders: [],
            source: fluid.isUnexpandable(source) ? source : fluid.copy(source)
        };
        fluid.preExpandRecurse(root, root.source, root, "source", []);
        return root;
    };
    
    // Main pathway for freestanding material that is not part of a component's options
    fluid.expandImmediate = function (source, that, localRecord) {
        var options = fluid.makeStackResolverOptions(that, localRecord, true); // TODO: ELstyle and target are now ignored
        var root = fluid.preExpand(source);
        fluid.expandImmediateImpl(root, options);
        return root.source;
    };
    
    // High performance expander for situations such as invokers, listeners, where raw materials can be cached - consumes "root" structure produced by preExpand
    fluid.expandImmediateImpl = function (root, options) {
        var expanders = root.expanders;
        for (var i = 0; i < expanders.length; ++ i) {
            var expander = expanders[i];
            expander.holder[expander.member] = expander.expander.typeFunc(null, expander, options);
        }
    };

    fluid.expandExpander = function (deliverer, source, options) {
        var expander = fluid.getGlobalValue(source.expander.type || "fluid.invokeFunc");
        if (!expander) {
            fluid.fail("Unknown expander with type " + source.expander.type);
        }
        return expander(deliverer, source, options);
    };

    fluid.registerNamespace("fluid.expander");
    
    fluid.expander.fetch = function (deliverer, source, options) {
        var localRecord = options.localRecord, context = source.expander.context, segs = source.expander.segs;
        var inLocal = localRecord[context] !== undefined;
        // somewhat hack to anticipate "fits" for FLUID-4925 - we assume that if THIS component is in construction, its reference target might be too
        var component = inLocal ? localRecord[context] : fluid.resolveContext(context, options.contextThat, options.contextThat.lifecycleStatus === "constructed");
        if (component) {
            var root = component;
            if (inLocal || component.lifecycleStatus === "constructed") {
                for (var i = 0; i < segs.length; ++ i) {
                    root = root ? root[segs[i]] : undefined;
                }
            } else if (component.lifecycleStatus !== "destroyed") {
                root = fluid.getForComponent(component, segs);
            } else {
                fluid.fail("Cannot resolve path " + segs.join(".") + " into component ", component, " which has been destroyed");
            }
            if (root === undefined && !inLocal) { // last-ditch attempt to get exotic EL value from component
                root = fluid.getForComponent(component, segs);
            }
            return root;
        }
    };

    /** "light" expanders, starting with the default expander invokeFunc,
         which makes an arbitrary function call (after expanding arguments) and are then replaced in
         the configuration with the call results. These will probably be abolished and replaced with
         equivalent model transformation machinery **/

    // This one is now positioned as the "universal expander" - default if no type supplied
    fluid.invokeFunc = function (deliverer, source, options) {
        var expander = source.expander;
        var args = fluid.makeArray(expander.args);
        expander.args = args; // head off case where args is an EL reference which resolves to an array
        if (options.recurse) { // only available in the path from fluid.expandOptions - this will be abolished in the end
            args = options.recurse([], args);
        } else {
            expander = fluid.expandImmediate(expander, options.contextThat);
            args = expander.args;
        }
        var funcEntry = expander.func || expander.funcName;
        var func = (options.expandSource ? options.expandSource(funcEntry) : funcEntry) || fluid.recordToApplicable(expander, options.contextThat);
        if (!func) {
            fluid.fail("Error in expander record - " + funcEntry + " could not be resolved to a function for component ", options.contextThat);
        }
        return func.apply ? func.apply(null, args) : fluid.invokeGlobalFunction(func, args);
    };

    // The "noexpand" expander which simply unwraps one level of expansion and ceases.
    fluid.noexpand = function (deliverer, source) {
        return source.expander.value ? source.expander.value : source.expander.tree;
    };

})(jQuery, fluid_2_0);
;/*
Copyright 2008-2010 University of Cambridge
Copyright 2008-2009 University of Toronto
Copyright 2010-2011 Lucendo Development Ltd.
Copyright 2010-2014 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var fluid_2_0 = fluid_2_0 || {};

(function ($, fluid) {
    "use strict";

    /** NOTE: The contents of this file are by default NOT PART OF THE PUBLIC FLUID API unless explicitly annotated before the function **/

    /** MODEL ACCESSOR ENGINE **/

    /** Standard strategies for resolving path segments **/

    fluid.model.makeEnvironmentStrategy = function (environment) {
        return function (root, segment, index) {
            return index === 0 && environment[segment] ?
                environment[segment] : undefined;
        };
    };

    fluid.model.defaultCreatorStrategy = function (root, segment) {
        if (root[segment] === undefined) {
            root[segment] = {};
            return root[segment];
        }
    };

    fluid.model.defaultFetchStrategy = function (root, segment) {
        return root[segment];
    };

    fluid.model.funcResolverStrategy = function (root, segment) {
        if (root.resolvePathSegment) {
            return root.resolvePathSegment(segment);
        }
    };

    fluid.model.traverseWithStrategy = function (root, segs, initPos, config, uncess) {
        var strategies = config.strategies;
        var limit = segs.length - uncess;
        for (var i = initPos; i < limit; ++i) {
            if (!root) {
                return root;
            }
            var accepted;
            for (var j = 0; j < strategies.length; ++ j) {
                accepted = strategies[j](root, segs[i], i + 1, segs);
                if (accepted !== undefined) {
                    break; // May now short-circuit with stateless strategies
                }
            }
            if (accepted === fluid.NO_VALUE) {
                accepted = undefined;
            }
            root = accepted;
        }
        return root;
    };

    /** Returns both the value and the path of the value held at the supplied EL path **/
    fluid.model.getValueAndSegments = function (root, EL, config, initSegs) {
        return fluid.model.accessWithStrategy(root, EL, fluid.NO_VALUE, config, initSegs, true);
    };

    // Very lightweight remnant of trundler, only used in resolvers
    fluid.model.makeTrundler = function (config) {
        return function (valueSeg, EL) {
            return fluid.model.getValueAndSegments(valueSeg.root, EL, config, valueSeg.segs);
        };
    };

    fluid.model.getWithStrategy = function (root, EL, config, initSegs) {
        return fluid.model.accessWithStrategy(root, EL, fluid.NO_VALUE, config, initSegs);
    };

    fluid.model.setWithStrategy = function (root, EL, newValue, config, initSegs) {
        fluid.model.accessWithStrategy(root, EL, newValue, config, initSegs);
    };

    fluid.model.accessWithStrategy = function (root, EL, newValue, config, initSegs, returnSegs) {
        // This function is written in this unfortunate style largely for efficiency reasons. In many cases
        // it should be capable of running with 0 allocations (EL is preparsed, initSegs is empty)
        if (!fluid.isPrimitive(EL) && !fluid.isArrayable(EL)) {
            var key = EL.type || "default";
            var resolver = config.resolvers[key];
            if (!resolver) {
                fluid.fail("Unable to find resolver of type " + key);
            }
            var trundler = fluid.model.makeTrundler(config); // very lightweight trundler for resolvers
            var valueSeg = {root: root, segs: initSegs};
            valueSeg = resolver(valueSeg, EL, trundler);
            if (EL.path && valueSeg) { // every resolver supports this piece of output resolution
                valueSeg = trundler(valueSeg, EL.path);
            }
            return returnSegs ? valueSeg : (valueSeg ? valueSeg.root : undefined);
        }
        else {
            return fluid.model.accessImpl(root, EL, newValue, config, initSegs, returnSegs, fluid.model.traverseWithStrategy);
        }
    };

    // Implementation notes: The EL path manipulation utilities here are equivalents of the simpler ones
    // that are provided in Fluid.js and elsewhere - they apply escaping rules to parse characters .
    // as \. and \ as \\ - allowing us to process member names containing periods. These versions are mostly 
    // in use within model machinery, whereas the cheaper versions based on String.split(".") are mostly used
    // within the IoC machinery.
    // Performance testing in early 2015 suggests that modern browsers now allow these to execute slightly faster
    // than the equivalent machinery written using complex regexps - therefore they will continue to be maintained
    // here. However, there is still a significant performance gap with respect to the performance of String.split(".")
    // especially on Chrome, so we will continue to insist that component member names do not contain a "." character
    // for the time being.
    // See http://jsperf.com/parsing-escaped-el for some experiments

    fluid.registerNamespace("fluid.pathUtil");

    fluid.pathUtil.getPathSegmentImpl = function (accept, path, i) {
        var segment = null;
        if (accept) {
            segment = "";
        }
        var escaped = false;
        var limit = path.length;
        for (; i < limit; ++i) {
            var c = path.charAt(i);
            if (!escaped) {
                if (c === ".") {
                    break;
                }
                else if (c === "\\") {
                    escaped = true;
                }
                else if (segment !== null) {
                    segment += c;
                }
            }
            else {
                escaped = false;
                if (segment !== null) {
                    segment += c;
                }
            }
        }
        if (segment !== null) {
            accept[0] = segment;
        }
        return i;
    };

    var globalAccept = []; // TODO: reentrancy risk here. This holder is here to allow parseEL to make two returns without an allocation.

    /** A version of fluid.model.parseEL that apples escaping rules - this allows path segments
     * to contain period characters . - characters "\" and "}" will also be escaped. WARNING -
     * this current implementation is EXTREMELY slow compared to fluid.model.parseEL and should
     * not be used in performance-sensitive applications */
    // supported, PUBLIC API function
    fluid.pathUtil.parseEL = function (path) {
        var togo = [];
        var index = 0;
        var limit = path.length;
        while (index < limit) {
            var firstdot = fluid.pathUtil.getPathSegmentImpl(globalAccept, path, index);
            togo.push(globalAccept[0]);
            index = firstdot + 1;
        }
        return togo;
    };

    // supported, PUBLIC API function
    fluid.pathUtil.composeSegment = function (prefix, toappend) {
        toappend = toappend.toString();
        for (var i = 0; i < toappend.length; ++i) {
            var c = toappend.charAt(i);
            if (c === "." || c === "\\" || c === "}") {
                prefix += "\\";
            }
            prefix += c;
        }
        return prefix;
    };

    /** Escapes a single path segment by replacing any character ".", "\" or "}" with
     * itself prepended by \
     */
    // supported, PUBLIC API function
    fluid.pathUtil.escapeSegment = function (segment) {
        return fluid.pathUtil.composeSegment("", segment);
    };

    /**
     * Compose a prefix and suffix EL path, where the prefix is already escaped.
     * Prefix may be empty, but not null. The suffix will become escaped.
     */
    // supported, PUBLIC API function
    fluid.pathUtil.composePath = function (prefix, suffix) {
        if (prefix.length !== 0) {
            prefix += ".";
        }
        return fluid.pathUtil.composeSegment(prefix, suffix);
    };

    /**
     * Compose a set of path segments supplied as arguments into an escaped EL expression. Escaped version
     * of fluid.model.composeSegments
     */

    // supported, PUBLIC API function
    fluid.pathUtil.composeSegments = function () {
        var path = "";
        for (var i = 0; i < arguments.length; ++ i) {
            path = fluid.pathUtil.composePath(path, arguments[i]);
        }
        return path;
    };
    
    /** Helpful utility for use in resolvers - matches a path which has already been
     * parsed into segments **/

    fluid.pathUtil.matchSegments = function (toMatch, segs, start, end) {
        if (end - start !== toMatch.length) {
            return false;
        }
        for (var i = start; i < end; ++ i) {
            if (segs[i] !== toMatch[i - start]) {
                return false;
            }
        }
        return true;
    };

    fluid.model.unescapedParser = {
        parse: fluid.model.parseEL,
        compose: fluid.model.composeSegments
    };

    // supported, PUBLIC API record
    fluid.model.defaultGetConfig = {
        parser: fluid.model.unescapedParser,
        strategies: [fluid.model.funcResolverStrategy, fluid.model.defaultFetchStrategy]
    };

    // supported, PUBLIC API record
    fluid.model.defaultSetConfig = {
        parser: fluid.model.unescapedParser,
        strategies: [fluid.model.funcResolverStrategy, fluid.model.defaultFetchStrategy, fluid.model.defaultCreatorStrategy]
    };

    fluid.model.escapedParser = {
        parse: fluid.pathUtil.parseEL,
        compose: fluid.pathUtil.composeSegments
    };

    // supported, PUBLIC API record
    fluid.model.escapedGetConfig = {
        parser: fluid.model.escapedParser,
        strategies: [fluid.model.defaultFetchStrategy]
    };

    // supported, PUBLIC API record
    fluid.model.escapedSetConfig = {
        parser: fluid.model.escapedParser,
        strategies: [fluid.model.defaultFetchStrategy, fluid.model.defaultCreatorStrategy]
    };

    /** MODEL COMPONENT HIERARCHY AND RELAY SYSTEM **/

    fluid.initRelayModel = function (that) {
        fluid.deenlistModelComponent(that);
        return that.model;
    };

    // TODO: This utility compensates for our lack of control over "wave of explosions" initialisation - we may
    // catch a model when it is apparently "completely initialised" and that's the best we can do, since we have
    // missed its own initial transaction

    fluid.isModelComplete = function (that) {
        return "model" in that && that.model !== fluid.inEvaluationMarker;
    };

    // Enlist this model component as part of the "initial transaction" wave - note that "special transaction" init
    // is indexed by component, not by applier, and has special record type (complete + initModel), not transaction
    fluid.enlistModelComponent = function (that) {
        var instantiator = fluid.getInstantiator(that);
        var enlist = instantiator.modelTransactions.init[that.id];
        if (!enlist) {
            enlist = {
                that: that,
                applier: fluid.getForComponent(that, "applier"), // required for FLUID-5504 even though currently unused
                complete: fluid.isModelComplete(that)
            };
            instantiator.modelTransactions.init[that.id] = enlist;
        }
        return enlist;
    };
    
    fluid.clearTransactions = function () {
        var instantiator = fluid.globalInstantiator;
        fluid.clear(instantiator.modelTransactions);
        instantiator.modelTransactions.init = {};
    };
    
    fluid.failureEvent.addListener(fluid.clearTransactions, "clearTransactions", "before:fail");

    // Utility to coordinate with our crude "oscillation prevention system" which limits each link to 2 updates (presumably
    // in opposite directions). In the case of the initial transaction, we need to reset the count given that genuine
    // changes are arising in the system with each new enlisted model. TODO: if we ever get users operating their own
    // transactions, think of a way to incorporate this into that workflow
    fluid.clearLinkCounts = function (transRec, relaysAlso) {
        fluid.each(transRec, function (value, key) {
            if (typeof(value) === "number") {
                transRec[key] = 0;
            } else if (relaysAlso && value.options && typeof(value.relayCount) === "number") {
                value.relayCount = 0;
            }
        });
    };

    fluid.sortCompleteLast = function (reca, recb) {
        return (reca.completeOnInit ? 1 : 0) - (recb.completeOnInit ? 1 : 0);
    };

    // Operate all coordinated transactions by bringing models to their respective initial values, and then commit them all
    fluid.operateInitialTransaction = function (instantiator, mrec) {
        var transId = fluid.allocateGuid();
        var transRec = fluid.getModelTransactionRec(instantiator, transId);
        var transac;
        var transacs = fluid.transform(mrec, function (recel) {
            transac = recel.that.applier.initiate("init", transId);
            transRec[recel.that.applier.applierId] = {transaction: transac};
            return transac;
        });
        // TODO: This sort has very little effect in any current test (can be replaced by no-op - see FLUID-5339) - but
        // at least can't be performed in reverse order ("FLUID-3674 event coordination test" will fail) - need more cases
        var recs = fluid.values(mrec).sort(fluid.sortCompleteLast);
        fluid.each(recs, function (recel) {
            var that = recel.that;
            var transac = transacs[that.id];
            if (recel.completeOnInit) {
                fluid.initModelEvent(that, that.applier, transac, that.applier.changeListeners.listeners);
            } else {
                fluid.each(recel.initModels, function (initModel) {
                    transac.fireChangeRequest({type: "ADD", segs: [], value: initModel});
                    fluid.clearLinkCounts(transRec, true);
                });
            }
            var shadow = fluid.shadowForComponent(that);
            shadow.modelComplete = true; // technically this is a little early, but this flag is only read in fluid.connectModelRelay
        });

        transac.commit(); // committing one representative transaction will commit them all
    };

    // This modelComponent has now concluded initialisation - commit its initialisation transaction if it is the last such in the wave
    fluid.deenlistModelComponent = function (that) {
        var instantiator = fluid.getInstantiator(that);
        var mrec = instantiator.modelTransactions.init;
        if (!mrec[that.id]) { // avoid double evaluation through currently hacked "members" implementation
            return;
        }
        that.model = undefined; // Abuse of the ginger system - in fact it is "currently in evaluation" - we need to return a proper initial model value even if no init occurred yet
        mrec[that.id].complete = true; // flag means - "complete as in ready to participate in this transaction"
        var incomplete = fluid.find_if(mrec, function (recel) {
            return recel.complete !== true;
        });
        if (!incomplete) {
            fluid.operateInitialTransaction(instantiator, mrec);
            // NB: Don't call fluid.concludeTransaction since "init" is not a standard record - this occurs in commitRelays for the corresponding genuine record as usual
            instantiator.modelTransactions.init = {};
        }
    };

    fluid.transformToAdapter = function (transform, targetPath) {
        var basedTransform = {};
        basedTransform[targetPath] = transform;
        return function (trans, newValue /*, sourceSegs, targetSegs */) {
            // TODO: More efficient model that can only run invalidated portion of transform (need to access changeMap of source transaction)
            fluid.model.transformWithRules(newValue, basedTransform, {finalApplier: trans});
        };
    };

    fluid.parseModelReference = function (that, ref) {
        var parsed = fluid.parseContextReference(ref);
        parsed.segs = that.applier.parseEL(parsed.path);
        return parsed;
    };

    fluid.parseValidModelReference = function (that, name, ref) {
        var reject = function (message) {
            fluid.fail("Error in " + name + ": " + ref + message);
        };
        var parsed, target;
        if (ref.charAt(0) === "{") {
            parsed = fluid.parseModelReference(that, ref);
            if (parsed.segs[0] !== "model") {
                reject(" must be a reference into a component model beginning with \"model\"");
            } else {
                parsed.modelSegs = parsed.segs.slice(1);
                delete parsed.path;
            }
            target = fluid.resolveContext(parsed.context, that);
            if (!target) {
                reject(" must be a reference to an existing component");
            }
        } else {
            target = that;
            parsed = {
                path: ref,
                modelSegs: that.applier.parseEL(ref)
            };
        }
        if (!target.applier) {
            fluid.getForComponent(target, ["applier"]);
        }
        if (!target.applier) {
            reject(" must be a reference to a component with a ChangeApplier (descended from fluid.modelComponent)");
        }
        parsed.that = target;
        parsed.applier = target.applier;
        if (!parsed.path) { // ChangeToApplicable amongst others rely on this
            parsed.path = target.applier.composeSegments.apply(null, parsed.modelSegs);
        }
        return parsed;
    };

    // Gets global record for a particular transaction id - looks up applier id to transaction,
    // as well as looking up source id (linkId in below) to count/true
    fluid.getModelTransactionRec = function (instantiator, transId) {
        if (!transId) {
            fluid.fail("Cannot get transaction record without transaction id");
        }
        if (!instantiator) {
            return null;
        }
        var transRec = instantiator.modelTransactions[transId];
        if (!transRec) {
            transRec = instantiator.modelTransactions[transId] = {
                externalChanges: {} // index by applierId to changePath to listener record
            };
        }
        return transRec;
    };

    fluid.recordChangeListener = function (component, applier, sourceListener) {
        var shadow = fluid.shadowForComponent(component);
        fluid.recordListener(applier.modelChanged, sourceListener, shadow);
    };
    
    // Configure this parameter to tweak the number of relays the model will attempt per transaction before bailing out with an error
    fluid.relayRecursionBailout = 100;

    // Used with various arg combinations from different sources. For standard "implicit relay" or fully lensed relay,
    // the first 4 args will be set, and "options" will be empty

    // For a model-dependent relay, this will be used in two halves - firstly, all of the model
    // sources will bind to the relay transform document itself. In this case the argument "targetApplier" within "options" will be set.
    // In this case, the component known as "target" is really the source - it is a component reference discovered by parsing the
    // relay document.

    // Secondly, the relay itself will schedule an invalidation (as if receiving change to "*" of its source - which may in most
    // cases actually be empty) and play through its transducer. "Source" component itself is never empty, since it is used for listener
    // degistration on destruction (check this is correct for external model relay). However, "sourceSegs" may be empty in the case
    // there is no "source" component registered for the link. This change is played in a "half-transactional" way - that is, we wait
    // for all other changes in the system to settle before playing the relay document, in order to minimise the chances of multiple
    // firing and corruption. This is done via the "preCommit" hook registered at top level in establishModelRelay. This listener
    // is transactional but it does not require the transaction to conclude in order to fire - it may be reused as many times as
    // required within the "overall" transaction whilst genuine (external) changes continue to arrive.

    fluid.registerDirectChangeRelay = function (target, targetSegs, source, sourceSegs, linkId, transducer, options) {
        var instantiator = fluid.getInstantiator(target);
        var targetApplier = options.targetApplier || target.applier; // implies the target is a relay document
        var sourceApplier = options.sourceApplier || source.applier; // implies the source is a relay document - listener will be transactional
        var applierId = targetApplier.applierId;
        targetSegs = fluid.makeArray(targetSegs);
        sourceSegs = sourceSegs ? fluid.makeArray(sourceSegs) : sourceSegs; // take copies since originals will be trashed
        var sourceListener = function (newValue, oldValue, path, changeRequest, trans, applier) {
            var transId = trans.id;
            var transRec = fluid.getModelTransactionRec(instantiator, transId);
            if (applier && trans && !transRec[applier.applierId]) { // don't trash existing record which may contain "options" (FLUID-5397)
                transRec[applier.applierId] = {transaction: trans}; // enlist the outer user's original transaction
            }
            var existing = transRec[applierId];
            transRec[linkId] = transRec[linkId] || 0;
            // Crude "oscillation prevention" system limits each link to maximum of 2 operations per cycle (presumably in opposite directions)
            var relay = true; // TODO: See FLUID-5303 - we currently disable this check entirely to solve FLUID-5293 - perhaps we might remove link counts entirely
            if (relay) {
                ++transRec[linkId];
                if (transRec[linkId] > fluid.relayRecursionBailout) {
                    fluid.fail("Error in model relay specification at component ", target, " - operated more than " + fluid.relayRecursionBailout + " relays without model value settling - current model contents are ", trans.newHolder.model);
                }
                if (!existing) {
                    var newTrans = targetApplier.initiate("relay", transId); // non-top-level transaction will defeat postCommit
                    existing = transRec[applierId] = {transaction: newTrans, relayCount: 0, options: options};
                }
                if (transducer && !options.targetApplier) {
                    // TODO: This is just for safety but is still unusual and now abused. The transducer doesn't need the "newValue" since all the transform information
                    // has been baked into the transform document itself. However, we now rely on this special signalling value to make sure we regenerate transforms in 
                    // the "forwardAdapter"
                    transducer(existing.transaction, options.sourceApplier ? undefined : newValue, sourceSegs, targetSegs);
                } else if (newValue !== undefined) {
                    existing.transaction.fireChangeRequest({type: "ADD", segs: targetSegs, value: newValue});
                }
            }
        };
        sourceListener.relayListenerId = fluid.allocateGuid();
        if (sourceSegs) {
            fluid.log(fluid.logLevel.TRACE, "Adding relay listener with id " + sourceListener.relayListenerId + " to source applier with id " +
                sourceApplier.applierId + " from target applier with id " + applierId + " for target component with id " + target.id);
            sourceApplier.modelChanged.addListener({
                isRelay: true,
                segs: sourceSegs,
                transactional: options.transactional
            }, sourceListener);
        }
        if (source) { // TODO - we actually may require to register on THREE sources in the case modelRelay is attached to a
            // component which is neither source nor target. Note there will be problems if source, say, is destroyed and recreated,
            // and holder is not - relay will in that case be lost. Need to integrate relay expressions with IoCSS.
            fluid.recordChangeListener(source, sourceApplier, sourceListener);
            if (target !== source) {
                fluid.recordChangeListener(target, sourceApplier, sourceListener);
            }
        }
    };

    // When called during parsing a contextualised model relay document, these arguments are reversed - "source" refers to the
    // current component, and "target" refers successively to the various "source" components.
    // "options" will be transformPackage
    fluid.connectModelRelay = function (source, sourceSegs, target, targetSegs, options) {
        var linkId = fluid.allocateGuid();
        function enlistComponent(component) {
            var enlist = fluid.enlistModelComponent(component);

            if (enlist.complete) {
                var shadow = fluid.shadowForComponent(component);
                if (shadow.modelComplete) {
                    enlist.completeOnInit = true;
                }
            }
        }
        enlistComponent(target);
        enlistComponent(source); // role of "source" and "target" may have been swapped in a modelRelay document

        if (options.update) { // it is a call via parseImplicitRelay for a relay document
            if (options.targetApplier) {
                // register changes from the model onto changes to the model relay document
                fluid.registerDirectChangeRelay(source, sourceSegs, target, targetSegs, linkId, null, {
                    transactional: false,
                    targetApplier: options.targetApplier,
                    update: options.update
                });
            } else {
                // if parsing a contextualised MR, skip the "orthogonal" registration - instead
                // register the "half-transactional" listener which binds changes from the relay itself onto the target
                fluid.registerDirectChangeRelay(target, targetSegs, source, [], linkId+"-transform", options.forwardAdapter, {transactional: true, sourceApplier: options.forwardApplier});
            }
        } else { // more efficient branch where relay is uncontextualised
            fluid.registerDirectChangeRelay(target, targetSegs, source, sourceSegs, linkId, options.forwardAdapter, {transactional: false});
            if (sourceSegs) {
                fluid.registerDirectChangeRelay(source, sourceSegs, target, targetSegs, linkId, options.backwardAdapter, {transactional: false});
            }
        }
    };

    fluid.model.guardedAdapter = function (componentThat, cond, func, args) {
        // TODO: We can't use fluid.isModelComplete here because of the broken half-transactional system - it may appear that model has arrived halfway through init transaction
        var instantiator = fluid.getInstantiator(componentThat);
        var enlist = instantiator.modelTransactions.init[componentThat.id];
        var condValue = cond[enlist ? "init" : "live"];
        if (condValue) {
            func.apply(null, args);
        }
    };

    fluid.makeTransformPackage = function (componentThat, transform, sourcePath, targetPath, forwardCond, backwardCond) {
        var that = {
            forwardHolder: {model: transform},
            backwardHolder: {model: null}
        };
        that.generateAdapters = function (trans) {
            // can't commit "half-transaction" or events will fire - violate encapsulation in this way
            that.forwardAdapterImpl = fluid.transformToAdapter(trans ? trans.newHolder.model : that.forwardHolder.model, targetPath);
            if (sourcePath !== null) {
                that.backwardHolder.model = fluid.model.transform.invertConfiguration(transform);
                that.backwardAdapterImpl = fluid.transformToAdapter(that.backwardHolder.model, sourcePath);
            }
        };
        that.forwardAdapter = function (transaction, newValue) { // create a stable function reference for this possibly changing adapter
            if (newValue === undefined) {
                that.generateAdapters(); // TODO: Quick fix for incorrect scheduling of invalidation/transducing
                // "it so happens" that fluid.registerDirectChangeRelay invokes us with empty newValue in the case of invalidation -> transduction
            }
            fluid.model.guardedAdapter(componentThat, forwardCond, that.forwardAdapterImpl, arguments);
        };
        // fired from fluid.model.updateRelays via invalidator event
        that.runTransform = function (trans) {
            trans.commit(); // this will reach the special "half-transactional listener" registered in fluid.connectModelRelay,
            // branch with options.targetApplier - by committing the transaction, we update the relay document in bulk and then cause
            // it to execute (via "transducer")
            trans.reset();
        };
        that.forwardApplier = fluid.makeHolderChangeApplier(that.forwardHolder);
        that.forwardApplier.isRelayApplier = true; // special annotation so these can be discovered in the transaction record
        that.invalidator = fluid.makeEventFirer({name: "Invalidator for model relay with applier " + that.forwardApplier.applierId});
        if (sourcePath !== null) {
            that.backwardApplier = fluid.makeHolderChangeApplier(that.backwardHolder);
            that.backwardAdapter = function () {
                fluid.model.guardedAdapter(componentThat, backwardCond, that.backwardAdapterImpl, arguments);
            };
        }
        that.update = that.invalidator.fire; // necessary so that both routes to fluid.connectModelRelay from here hit the first branch
        var implicitOptions = {
            targetApplier: that.forwardApplier, // this special field identifies us to fluid.connectModelRelay
            update: that.update,
            refCount: 0
        };
        that.forwardHolder.model = fluid.parseImplicitRelay(componentThat, transform, [], implicitOptions);
        that.refCount = implicitOptions.refCount;
        that.generateAdapters();
        that.invalidator.addListener(that.generateAdapters);
        that.invalidator.addListener(that.runTransform);
        return that;
    };

    fluid.singleTransformToFull = function (singleTransform) {
        var withPath = $.extend(true, {valuePath: ""}, singleTransform);
        return {
            "": {
                transform: withPath
            }
        };
    };

    fluid.model.relayConditions = {
        initOnly: {init: true,  live: false},
        liveOnly: {init: false, live: true},
        never:    {init: false, live: false},
        always:   {init: true,  live: true}
    };

    fluid.model.parseRelayCondition = function (condition) {
        return fluid.model.relayConditions[condition || "always"];
    };

    fluid.parseModelRelay = function (that, mrrec) {
        var parsedSource = mrrec.source ? fluid.parseValidModelReference(that, "modelRelay record member \"source\"", mrrec.source) :
            {path: null, modelSegs: null};
        var parsedTarget = fluid.parseValidModelReference(that, "modelRelay record member \"target\"", mrrec.target);

        var transform = mrrec.singleTransform ? fluid.singleTransformToFull(mrrec.singleTransform) : mrrec.transform;
        if (!transform) {
            fluid.fail("Cannot parse modelRelay record without element \"singleTransform\" or \"transform\":", mrrec);
        }
        var forwardCond = fluid.model.parseRelayCondition(mrrec.forward), backwardCond = fluid.model.parseRelayCondition(mrrec.backward);
        var transformPackage = fluid.makeTransformPackage(that, transform, parsedSource.path, parsedTarget.path, forwardCond, backwardCond);
        if (transformPackage.refCount === 0) {
            // This first call binds changes emitted from the relay ends to each other, synchronously
            fluid.connectModelRelay(parsedSource.that || that, parsedSource.modelSegs, parsedTarget.that, parsedTarget.modelSegs, {
                forwardAdapter: transformPackage.forwardAdapter,
                backwardAdapter: transformPackage.backwardAdapter
            });
        } else {
            // This second call binds changes emitted from the relay document itself onto the relay ends (using the "half-transactional system")
            fluid.connectModelRelay(parsedSource.that || that, parsedSource.modelSegs, parsedTarget.that, parsedTarget.modelSegs, transformPackage);
        }
    };

    fluid.parseImplicitRelay = function (that, modelRec, segs, options) {
        var value;
        if (typeof(modelRec) === "string" && modelRec.charAt(0) === "{") {
            var parsed = fluid.parseModelReference(that, modelRec);
            var target = fluid.resolveContext(parsed.context, that);
            if (parsed.segs[0] === "model") {
                var modelSegs = parsed.segs.slice(1);
                ++options.refCount;
                fluid.connectModelRelay(that, segs, target, modelSegs, options);
            } else {
                value = fluid.getForComponent(target, parsed.segs);
            }
        } else if (fluid.isPrimitive(modelRec) || !fluid.isPlainObject(modelRec)) {
            value = modelRec;
        } else if (modelRec.expander && fluid.isPlainObject(modelRec.expander)) {
            value = fluid.expandOptions(modelRec, that);
        } else {
            value = fluid.freshContainer(modelRec);
            fluid.each(modelRec, function (innerValue, key) {
                segs.push(key);
                var innerTrans = fluid.parseImplicitRelay(that, innerValue, segs, options);
                if (innerTrans !== undefined) {
                    value[key] = innerTrans;
                }
                segs.pop();
            });
        }
        return value;
    };


    // Conclude the transaction by firing to all external listeners in priority order
    fluid.model.notifyExternal = function (transRec) {
        var allChanges = transRec ? fluid.values(transRec.externalChanges) : [];
        fluid.sortByPriority(allChanges);
        for (var i = 0; i < allChanges.length; ++ i) {
            var change = allChanges[i];
            var targetApplier = change.args[5]; // NOTE: This argument gets here via fluid.model.storeExternalChange from fluid.notifyModelChanges
            if (!targetApplier.destroyed) { // 3rd point of guarding for FLUID-5592
                change.listener.apply(null, change.args);
            }
        }
        fluid.clearLinkCounts(transRec, true); // "options" structures for relayCount are aliased
    };

    fluid.model.commitRelays = function (instantiator, transactionId) {
        var transRec = instantiator.modelTransactions[transactionId];
        fluid.each(transRec, function (transEl) {
        // EXPLAIN: This must commit ALL current transactions, not just those for relays - why?
            if (transEl.transaction) { // some entries are links
                transEl.transaction.commit("relay");
                transEl.transaction.reset();
            }
        });
    };

    fluid.model.updateRelays = function (instantiator, transactionId) {
        var transRec = instantiator.modelTransactions[transactionId];
        var updates = 0;
        fluid.each(transRec, function (transEl) {
            // TODO: integrate the "source" if any into this computation, and fire the relay if it has changed - perhaps by adding a listener
            // to it that updates changeRecord.changes (assuming we can find it)
            if (transEl.options && transEl.transaction && transEl.transaction.changeRecord.changes > 0 && transEl.relayCount < 2 && transEl.options.update) {
                transEl.relayCount++;
                fluid.clearLinkCounts(transRec);
                transEl.options.update(transEl.transaction, transRec);
                ++updates;
            }
        });
        return updates;
    };

    fluid.establishModelRelay = function (that, optionsModel, optionsML, optionsMR, applier) {
        fluid.mergeModelListeners(that, optionsML);

        var enlist = fluid.enlistModelComponent(that);
        fluid.each(optionsMR, function (mrrec) {
            fluid.parseModelRelay(that, mrrec);
        });

        var initModels = fluid.transform(optionsModel, function (modelRec) {
            return fluid.parseImplicitRelay(that, modelRec, [], {refCount: 0});
        });
        enlist.initModels = initModels;

        var instantiator = fluid.getInstantiator(that);

        function updateRelays(transaction) {
            while (fluid.model.updateRelays(instantiator, transaction.id) > 0){}
        }

        function commitRelays(transaction, applier, code) {
            if (code !== "relay") { // don't commit relays if this commit is already a relay commit
                fluid.model.commitRelays(instantiator, transaction.id);
            }
        }

        function concludeTransaction(transaction, applier, code) {
            if (code !== "relay") {
                fluid.model.notifyExternal(instantiator.modelTransactions[transaction.id]);
                delete instantiator.modelTransactions[transaction.id];
            }
        }

        applier.preCommit.addListener(updateRelays);
        applier.preCommit.addListener(commitRelays);
        applier.postCommit.addListener(concludeTransaction);
        
        return null;
    };

    // supported, PUBLIC API grade
    fluid.defaults("fluid.modelComponent", {
        gradeNames: ["fluid.component"],
        changeApplierOptions: {
            relayStyle: true,
            cullUnchanged: true
        },
        members: {
            model: "@expand:fluid.initRelayModel({that}, {that}.modelRelay)",
            applier: "@expand:fluid.makeHolderChangeApplier({that}, {that}.options.changeApplierOptions)",
            modelRelay: "@expand:fluid.establishModelRelay({that}, {that}.options.model, {that}.options.modelListeners, {that}.options.modelRelay, {that}.applier)"
        },
        mergePolicy: {
            model: {
                noexpand: true,
                func: fluid.arrayConcatPolicy // TODO: bug here in case a model consists of an array
            },
            modelListeners: fluid.makeMergeListenersPolicy(fluid.arrayConcatPolicy),
            modelRelay: {
                noexpand: true,
                func: fluid.arrayConcatPolicy
            }
        }
    });

    fluid.modelChangedToChange = function (args) {
        return {
            value: args[0],
            oldValue: args[1],
            path: args[2]
        };
    };

    fluid.resolveModelListener = function (that, record) {
        var togo = function () {
            if (fluid.isDestroyed(that)) { // first guarding point to resolve FLUID-5592
                return;
            }
            var change = fluid.modelChangedToChange(arguments);
            var args = [change];
            var localRecord = {change: change, "arguments": args};
            if (record.args) {
                args = fluid.expandOptions(record.args, that, {}, localRecord);
            }
            fluid.event.invokeListener(record.listener, fluid.makeArray(args));
        };
        fluid.event.impersonateListener(record.listener, togo);
        return togo;
    };

    fluid.mergeModelListeners = function (that, listeners) {
        var listenerCount = 0;
        fluid.each(listeners, function (value, path) {
            if (typeof(value) === "string") {
                value = {
                    funcName: value
                };
            }
            var records = fluid.event.resolveListenerRecord(value, that, "modelListeners", null, false);
            var parsed = fluid.parseValidModelReference(that, "modelListeners entry", path);
            // Bypass fluid.event.dispatchListener by means of "standard = false" and enter our custom workflow including expanding "change":
            fluid.each(records.records, function (record) {
                var func = fluid.resolveModelListener(that, record);
                var spec = {
                    listener: func, // for initModelEvent
                    listenerIndex: listenerCount,
                    segs: parsed.modelSegs,
                    path: parsed.path,
                    includeSource: record.includeSource,
                    excludeSource: record.excludeSource,
                    priority: record.priority,
                    transactional: true
                };
                ++listenerCount;
                 // update "spec" so that we parse priority information just once
                spec = parsed.applier.modelChanged.addListener(spec, func, record.namespace, record.softNamespace);

                fluid.recordChangeListener(that, parsed.applier, func);
                function initModelEvent() {
                    if (fluid.isModelComplete(parsed.that)) {
                        var trans = parsed.applier.initiate("init");
                        fluid.initModelEvent(that, parsed.applier, trans, [spec]);
                        trans.commit();
                    }
                }
                if (that !== parsed.that && !fluid.isModelComplete(that)) { // TODO: Use FLUID-4883 "latched events" when available
                    // Don't confuse the end user by firing their listener before the component is constructed
                    // TODO: Better detection than this is requred - we assume that the target component will not be discovered as part
                    // of the initial transaction wave, but if it is, it will get a double notification - we really need "wave of explosions"
                    // since we are currently too early in initialisation of THIS component in order to tell if other will be found
                    // independently.
                    var onCreate = fluid.getForComponent(that, ["events", "onCreate"]);
                    onCreate.addListener(initModelEvent);
                }
            });
        });
    };


    /** CHANGE APPLIER **/

    /** Add a listener to a ChangeApplier event that only acts in the case the event
     * has not come from the specified source (typically ourself)
     * @param modelEvent An model event held by a changeApplier (typically applier.modelChanged)
     * @param path The path specification to listen to
     * @param source The source value to exclude (direct equality used)
     * @param func The listener to be notified of a change
     * @param [eventName] - optional - the event name to be listened to - defaults to "modelChanged"
     * @param [namespace] - optional - the event namespace
     */
     // TODO: Source guarding is not supported by the current ChangeApplier, these methods are no-ops
    fluid.addSourceGuardedListener = function(applier, path, source, func, eventName, namespace, softNamespace) {
        eventName = eventName || "modelChanged";
        var wrapped = function (newValue, oldValue, path, changes) { // TODO: adapt signature
            if (!applier.hasChangeSource(source, changes)) {
                return func.apply(null, arguments);
            }
        };
        fluid.event.impersonateListener(func, wrapped);
        return applier[eventName].addListener(path, wrapped, namespace, softNamespace);
    };

    /** Convenience method to fire a change event to a specified applier, including
     * a supplied "source" identified (perhaps for use with addSourceGuardedListener)
     */
    fluid.fireSourcedChange = function (applier, path, value, source) {
        applier.fireChangeRequest({
            path: path,
            value: value,
            source: source
        });
    };

    /** Dispatches a list of changes to the supplied applier */
    fluid.requestChanges = function (applier, changes) {
        for (var i = 0; i < changes.length; ++i) {
            applier.fireChangeRequest(changes[i]);
        }
    };


    // Automatically adapts requestChange onto fireChangeRequest
    fluid.bindRequestChange = function (that) {
        // The name "requestChange" will be deprecated in 1.5, removed in 2.0
        that.requestChange = that.change = function (path, value, type) {
            var changeRequest = {
                path: path,
                value: value,
                type: type
            };
            that.fireChangeRequest(changeRequest);
        };
    };

    fluid.identifyChangeListener = function (listener) {
        return fluid.event.identifyListener(listener) || listener;
    };


    fluid.model.isChangedPath = function (changeMap, segs) {
        for (var i = 0; i <= segs.length; ++ i) {
            if (typeof(changeMap) === "string") {
                return true;
            }
            if (i < segs.length && changeMap) {
                changeMap = changeMap[segs[i]];
            }
        }
        return false;
    };

    fluid.model.setChangedPath = function (options, segs, value) {
        var notePath = function (record) {
            segs.unshift(record);
            fluid.model.setSimple(options, segs, value);
            segs.shift();
        };
        if (!fluid.model.isChangedPath(options.changeMap, segs)) {
            ++options.changes;
            notePath("changeMap");
        }
        if (!fluid.model.isChangedPath(options.deltaMap, segs)) {
            ++options.deltas;
            notePath("deltaMap");
        }
    };

    fluid.model.fetchChangeChildren = function (target, i, segs, source, options) {
        fluid.each(source, function (value, key) {
            segs[i] = key;
            fluid.model.applyChangeStrategy(target, key, i, segs, value, options);
            segs.length = i;
        });
    };

    // Called with two primitives which are compared for equality. This takes account of "floating point slop" to avoid
    // continuing to propagate inverted values as changes
    // TODO: replace with a pluggable implementation
    fluid.model.isSameValue = function (a, b) {
        if (typeof(a) !== "number" || typeof(b) !== "number") {
            return a === b;
        } else {
            // Don't use isNaN because of https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/isNaN#Confusing_special-case_behavior
            if (a === b || a !== a && b !== b) { // Either the same concrete number or both NaN
                return true;
            } else {
                var relError = Math.abs((a - b) / b);
                return relError < 1e-12; // 64-bit floats have approx 16 digits accuracy, this should deal with most reasonable transforms
            }
        }
    };

    fluid.model.applyChangeStrategy = function (target, name, i, segs, source, options) {
        var targetSlot = target[name];
        var sourceCode = fluid.typeCode(source);
        var targetCode = fluid.typeCode(targetSlot);
        var changedValue = fluid.NO_VALUE;
        if (sourceCode === "primitive") {
            if (!fluid.model.isSameValue(targetSlot, source)) {
                changedValue = source;
                ++options.unchanged;
            }
        } else if (targetCode !== sourceCode || sourceCode === "array" && source.length !== targetSlot.length) {
            // RH is not primitive - array or object and mismatching or any array rewrite
            changedValue = fluid.freshContainer(source);
        }
        if (changedValue !== fluid.NO_VALUE) {
            target[name] = changedValue;
            if (options.changeMap) {
                fluid.model.setChangedPath(options, segs, options.inverse ? "DELETE" : "ADD");
            }
        }
        if (sourceCode !== "primitive") {
            fluid.model.fetchChangeChildren(target[name], i + 1, segs, source, options);
        }
    };

    fluid.model.stepTargetAccess = function (target, type, segs, startpos, endpos, options) {
        for (var i = startpos; i < endpos; ++ i) {
            if (!target) {
                continue;
            }
            var oldTrunk = target[segs[i]];
            target = fluid.model.traverseWithStrategy(target, segs, i, options[type === "ADD" ? "resolverSetConfig" : "resolverGetConfig"],
                segs.length - i - 1);
            if (oldTrunk !== target && options.changeMap) {
                fluid.model.setChangedPath(options, segs.slice(0, i + 1), "ADD");
            }
        }
        return {root: target, last: segs[endpos]};
    };

    fluid.model.defaultAccessorConfig = function (options) {
        options = options || {};
        options.resolverSetConfig = options.resolverSetConfig || fluid.model.escapedSetConfig;
        options.resolverGetConfig = options.resolverGetConfig || fluid.model.escapedGetConfig;
        return options;
    };

    // Changes: "MERGE" action abolished
    // ADD/DELETE at root can be destructive
    // changes tracked in optional final argument holding "changeMap: {}, changes: 0, unchanged: 0"
    fluid.model.applyHolderChangeRequest = function (holder, request, options) {
        options = fluid.model.defaultAccessorConfig(options);
        options.deltaMap = options.changeMap ? {} : null;
        options.deltas = 0;
        var length = request.segs.length;
        var pen, atRoot = length === 0;
        if (atRoot) {
            pen = {root: holder, last: "model"};
        } else {
            if (!holder.model) {
                holder.model = {};
                fluid.model.setChangedPath(options, [], options.inverse ? "DELETE" : "ADD");
            }
            pen = fluid.model.stepTargetAccess(holder.model, request.type, request.segs, 0, length - 1, options);
        }
        if (request.type === "ADD") {
            var value = request.value;
            var segs = fluid.makeArray(request.segs);
            fluid.model.applyChangeStrategy(pen.root, pen.last, length - 1, segs, value, options, atRoot);
        } else if (request.type === "DELETE") {
            if (pen.root && pen.root[pen.last] !== undefined) {
                delete pen.root[pen.last];
                if (options.changeMap) {
                    fluid.model.setChangedPath(options, request.segs, "DELETE");
                }
            }
        } else {
            fluid.fail("Unrecognised change type of " + request.type);
        }
        return options.deltas ? options.deltaMap : null;
    };
    
    /** Compare two models for equality using a deep algorithm. It is assumed that both models are JSON-equivalent and do
     * not contain circular links.
     * @param modela The first model to be compared
     * @param modelb The second model to be compared
     * @param options {Object} If supplied, will receive a map and summary of the change content between the objects. Structure is:
     *     changeMap: {Object/String} An isomorphic map of the object structures to values "ADD" or "DELETE" indicating
     * that values have been added/removed at that location. Note that in the case the object structure differs at the root, <code>changeMap</code> will hold
     * the plain String value "ADD" or "DELETE"
     *     changes: {Integer} Counts the number of changes between the objects - The two objects are identical iff <code>changes === 0</code>.
     *     unchanged: {Integer} Counts the number of leaf (primitive) values at which the two objects are identical. Note that the current implementation will
     * double-count, this summary should be considered indicative rather than precise.
     * @return <code>true</code> if the models are identical
     */
    // TODO: This algorithm is quite inefficient in that both models will be copied once each
    // supported, PUBLIC API function
    fluid.model.diff = function (modela, modelb, options) {
        options = options || {changes: 0, unchanged: 0, changeMap: {}}; // current algorithm can't avoid the expense of changeMap
        var typea = fluid.typeCode(modela);
        var typeb = fluid.typeCode(modelb);
        var togo;
        if (typea === "primitive" && typeb === "primitive") {
            togo = fluid.model.isSameValue(modela, modelb);
        } else if (typea === "primitive" ^ typeb === "primitive") {
            togo = false;
        } else {
            // Apply both forward and reverse changes - if no changes either way, models are identical
            // "ADD" reported in the reverse direction must be accounted as a "DELETE"
            var holdera = {
                model: fluid.copy(modela)
            };
            fluid.model.applyHolderChangeRequest(holdera, {value: modelb, segs: [], type: "ADD"}, options);
            var holderb = {
                model: fluid.copy(modelb)
            };
            options.inverse = true;
            fluid.model.applyHolderChangeRequest(holderb, {value: modela, segs: [], type: "ADD"}, options);
            togo = options.changes === 0;
        }
        if (togo === false && options.changes === 0) { // catch all primitive cases
            options.changes = 1;
            options.changeMap = modelb === undefined ? "DELETE" : "ADD";
        } else if (togo === true && options.unchanged === 0) {
            options.unchanged = 1;
        }
        return togo;
    };

    // Here we only support for now very simple expressions which have at most one
    // wildcard which must appear in the final segment
    fluid.matchChanges = function (changeMap, specSegs, newHolder) {
        var root = newHolder.model;
        var map = changeMap;
        var outSegs = ["model"];
        var wildcard = false;
        var togo = [];
        for (var i = 0; i < specSegs.length; ++ i) {
            var seg = specSegs[i];
            if (seg === "*") {
                if (i === specSegs.length - 1) {
                    wildcard = true;
                } else {
                    fluid.fail("Wildcard specification in modelChanged listener is only supported for the final path segment: " + specSegs.join("."));
                }
            } else {
                outSegs.push(seg);
                map = fluid.isPrimitive(map) ? map : map[seg];
                root = root ? root[seg] : undefined;
            }
        }
        if (map) {
            if (wildcard) {
                fluid.each(root, function (value, key) {
                    togo.push(outSegs.concat(key));
                });
            } else {
                togo.push(outSegs);
            }
        }
        return togo;
    };

    fluid.storeExternalChange = function (transRec, applier, invalidPath, spec, args) {
        var pathString = applier.composeSegments.apply(null, invalidPath);
        var keySegs = [applier.applierId, fluid.event.identifyListener(spec.listener), spec.listenerIndex, pathString];
        var keyString = keySegs.join("|");
        // These are unbottled in fluid.concludeTransaction
        transRec.externalChanges[keyString] = {listener: spec.listener, priority: spec.priority, args: args};
    };
    
    fluid.isExcludedChangeSource = function (transaction, spec) {
        if (!spec.excludeSource) { // mergeModelListeners initModelEvent fabricates a fake spec that bypasses processing
            return false;
        }
        var excluded = spec.excludeSource["*"];
        for (var source in transaction.sources) {
            if (spec.excludeSource[source]) {
                excluded = true;
            }
            if (spec.includeSource[source]) {
                excluded = false;
            }
        }
        return excluded;
    };

    fluid.notifyModelChanges = function (listeners, changeMap, newHolder, oldHolder, changeRequest, transaction, applier, that) {
        var instantiator = fluid.getInstantiator && fluid.getInstantiator(that); // may return nothing for non-component holder
        var transRec = transaction && fluid.getModelTransactionRec(instantiator, transaction.id);
        for (var i = 0; i < listeners.length; ++ i) {
            var spec = listeners[i];
            var invalidPaths = fluid.matchChanges(changeMap, spec.segs, newHolder);
            for (var j = 0; j < invalidPaths.length; ++ j) {
                if (applier.destroyed) { // 2nd guarding point for FLUID-5592
                    return;
                }
                var invalidPath = invalidPaths[j];
                spec.listener = fluid.event.resolveListener(spec.listener);
                // TODO: process namespace and softNamespace rules, and propagate "sources" in 4th argument
                var args = [fluid.model.getSimple(newHolder, invalidPath), fluid.model.getSimple(oldHolder, invalidPath), invalidPath.slice(1), changeRequest, transaction, applier];
                // FLUID-5489: Do not notify of null changes which were reported as a result of invalidating a higher path
                // TODO: We can improve greatly on efficiency by i) reporting a special code from fluid.matchChanges which signals the difference between invalidating a higher and lower path,
                // ii) improving fluid.model.diff to create fewer intermediate structures and no copies
                // TODO: The relay invalidation system is broken and must always be notified (branch 1) - since our old/new value detection is based on the wrong (global) timepoints in the transaction here,
                // rather than the "last received model" by the holder of the transform document
                if (!spec.isRelay) {
                    var isNull = fluid.model.diff(args[0], args[1]);
                    if (isNull) {
                        continue;
                    }
                    var sourceExcluded = fluid.isExcludedChangeSource(transaction, spec);
                    if (sourceExcluded) {
                        continue;
                    }
                }
                if (transRec && !spec.isRelay && spec.transactional) { // bottle up genuine external changes so we can sort and dedupe them later
                    fluid.storeExternalChange(transRec, applier, invalidPath, spec, args);
                } else {
                    spec.listener.apply(null, args);
                }
            }
        }
    };

    fluid.bindELMethods = function (applier) {
        applier.parseEL = function (EL) {
            return fluid.model.pathToSegments(EL, applier.options.resolverSetConfig);
        };
        applier.composeSegments = function () {
            return applier.options.resolverSetConfig.parser.compose.apply(null, arguments);
        };
    };

    fluid.initModelEvent = function (that, applier, trans, listeners) {
        fluid.notifyModelChanges(listeners, "ADD", trans.oldHolder, fluid.emptyHolder, null, trans, applier, that);
    };

    fluid.emptyHolder = { model: undefined };
    
    fluid.preFireChangeRequest = function (applier, changeRequest) {
        if (!changeRequest.type) {
            changeRequest.type = "ADD";
        }
        changeRequest.segs = changeRequest.segs || applier.parseEL(changeRequest.path);
    };
    
    fluid.ChangeApplier = function () {};

    fluid.makeHolderChangeApplier = function (holder, options) {
        options = fluid.model.defaultAccessorConfig(options);
        var applierId = fluid.allocateGuid();
        var that = new fluid.ChangeApplier();
        $.extend(that, {
            applierId: applierId,
            holder: holder,
            changeListeners: {
                listeners: [],
                transListeners: []
            },
            options: options,
            modelChanged: {},
            preCommit: fluid.makeEventFirer({name: "preCommit event for ChangeApplier " }),
            postCommit: fluid.makeEventFirer({name: "postCommit event for ChangeApplier "})
        });
        that.destroy = function () {
            that.preCommit.destroy();
            that.postCommit.destroy();
            that.destroyed = true;
        };
        that.modelChanged.addListener = function (spec, listener, namespace, softNamespace) {
            if (typeof(spec) === "string") {
                spec = {path: spec};
            } else {
                spec = fluid.copy(spec);
            }
            spec.id = fluid.event.identifyListener(listener);
            spec.namespace = namespace;
            spec.softNamespace = softNamespace;
            if (typeof(listener) === "string") { // TODO: replicate this nonsense from Fluid.js until we remember its purpose
                listener = {globalName: listener};
            }
            spec.listener = listener;
            if (spec.transactional !== false) {
                spec.transactional = true;
            }
            spec.segs = spec.segs || that.parseEL(spec.path);
            var collection = that.changeListeners[spec.transactional ? "transListeners" : "listeners"];
            spec.excludeSource = fluid.arrayToHash(fluid.makeArray(spec.excludeSource || (spec.includeSource ? "*" : undefined)));
            spec.includeSource = fluid.arrayToHash(fluid.makeArray(spec.includeSource));
            spec.priority = fluid.parsePriority(spec.priority, collection.length, true, "model listener");
            collection.push(spec);
            return spec;
        };
        that.modelChanged.removeListener = function (listener) {
            var id = fluid.event.identifyListener(listener);
            var namespace = typeof(listener) === "string" ? listener: null;
            var removePred = function (record) {
                return record.id === id || record.namespace === namespace;
            };
            fluid.remove_if(that.changeListeners.listeners, removePred);
            fluid.remove_if(that.changeListeners.transListeners, removePred);
        };
        that.fireChangeRequest = function (changeRequest) {
            var ation = that.initiate();
            ation.fireChangeRequest(changeRequest);
            ation.commit();
        };

        that.initiate = function (source, transactionId) {
            source = source || "local";
            var defeatPost = source === "relay"; // defeatPost is supplied for all non-top-level transactions
            var trans = {
                instanceId: fluid.allocateGuid(), // for debugging only
                id: transactionId || fluid.allocateGuid(),
                sources: {},
                changeRecord: {
                    resolverSetConfig: options.resolverSetConfig, // here to act as "options" in applyHolderChangeRequest
                    resolverGetConfig: options.resolverGetConfig
                },
                reset: function () {
                    trans.oldHolder = holder;
                    trans.newHolder = { model: fluid.copy(holder.model) };
                    trans.changeRecord.changes = 0;
                    trans.changeRecord.unchanged = 0; // just for type consistency - we don't use these values in the ChangeApplier
                    trans.changeRecord.changeMap = {};
                },
                commit: function (code) {
                    that.preCommit.fire(trans, that, code);
                    if (trans.changeRecord.changes > 0) {
                        var oldHolder = {model: holder.model};
                        holder.model = trans.newHolder.model;
                        fluid.notifyModelChanges(that.changeListeners.transListeners, trans.changeRecord.changeMap, holder, oldHolder, null, trans, that, holder);
                    }
                    if (!defeatPost) {
                        that.postCommit.fire(trans, that, code);
                    }
                },
                fireChangeRequest: function (changeRequest) {
                    fluid.preFireChangeRequest(that, changeRequest);
                    changeRequest.transactionId = trans.id;
                    var deltaMap = fluid.model.applyHolderChangeRequest(trans.newHolder, changeRequest, trans.changeRecord);
                    fluid.notifyModelChanges(that.changeListeners.listeners, deltaMap, trans.newHolder, holder, changeRequest, trans, that, holder);
                }
            };
            trans.sources[source] = true;
            trans.reset();
            fluid.bindRequestChange(trans);
            return trans;
        };
        that.hasChangeSource = function (source, changes) { // compatibility for old API
            return changes ? changes[source] : false;
        };

        fluid.bindRequestChange(that);
        fluid.bindELMethods(that);
        return that;
    };

})(jQuery, fluid_2_0);
;/*
Copyright 2010 University of Toronto
Copyright 2010-2011 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var fluid_2_0 = fluid_2_0 || {};
var fluid = fluid || fluid_2_0;

(function ($, fluid) {
    "use strict";

    fluid.registerNamespace("fluid.model.transform");

    /** Grade definitions for standard transformation function hierarchy **/

    fluid.defaults("fluid.transformFunction", {
        gradeNames: "fluid.function"
    });

    // uses standard layout and workflow involving inputPath
    fluid.defaults("fluid.standardInputTransformFunction", {
        gradeNames: "fluid.transformFunction"
    });

    fluid.defaults("fluid.standardOutputTransformFunction", {
        gradeNames: "fluid.transformFunction"
    });

    fluid.defaults("fluid.multiInputTransformFunction", {
        gradeNames: "fluid.transformFunction"
    });

    // uses the standard layout and workflow involving inputPath and outputPath
    fluid.defaults("fluid.standardTransformFunction", {
        gradeNames: ["fluid.standardInputTransformFunction", "fluid.standardOutputTransformFunction"]
    });

    fluid.defaults("fluid.lens", {
        gradeNames: "fluid.transformFunction",
        invertConfiguration: null
        // this function method returns "inverted configuration" rather than actually performing inversion
        // TODO: harmonise with strategy used in VideoPlayer_framework.js
    });

    /***********************************
     * Base utilities for transformers *
     ***********************************/

    // unsupported, NON-API function
    fluid.model.transform.pathToRule = function (inputPath) {
        return {
            transform: {
                type: "fluid.transforms.value",
                inputPath: inputPath
            }
        };
    };

    // unsupported, NON-API function
    fluid.model.transform.literalValueToRule = function (value) {
        return {
            transform: {
                type: "fluid.transforms.literalValue",
                value: value
            }
        };
    };

    /** Accepts two fully escaped paths, either of which may be empty or null **/
    fluid.model.composePaths = function (prefix, suffix) {
        prefix = prefix === 0 ? "0" : prefix || "";
        suffix = suffix === 0 ? "0" : suffix || "";
        return !prefix ? suffix : (!suffix ? prefix : prefix + "." + suffix);
    };

    fluid.model.transform.accumulateInputPath = function (inputPath, transform, paths) {
        if (inputPath !== undefined) {
            paths.push(fluid.model.composePaths(transform.inputPrefix, inputPath));
        }
    };

    fluid.model.transform.accumulateStandardInputPath = function (input, transformSpec, transform, paths) {
        fluid.model.transform.getValue(undefined, transformSpec[input], transform);
        fluid.model.transform.accumulateInputPath(transformSpec[input + "Path"], transform, paths);
    };

    fluid.model.transform.accumulateMultiInputPaths = function (inputVariables, transformSpec, transform, paths) {
        fluid.each(inputVariables, function (v, k) {
            fluid.model.transform.accumulateStandardInputPath(k, transformSpec, transform, paths);
        });
    };

    fluid.model.transform.getValue = function (inputPath, value, transform) {
        var togo;
        if (inputPath !== undefined) { // NB: We may one day want to reverse the crazy jQuery-like convention that "no path means root path"
            togo = fluid.get(transform.source, fluid.model.composePaths(transform.inputPrefix, inputPath), transform.resolverGetConfig);
        }
        if (togo === undefined) {
            togo = fluid.isPrimitive(value) ? value : transform.expand(value);
        }
        return togo;
    };

    // distinguished value which indicates that a transformation rule supplied a
    // non-default output path, and so the user should be prevented from making use of it
    // in a compound transform definition
    fluid.model.transform.NONDEFAULT_OUTPUT_PATH_RETURN = {};

    fluid.model.transform.setValue = function (userOutputPath, value, transform) {
        // avoid crosslinking to input object - this might be controlled by a "nocopy" option in future
        var toset = fluid.copy(value);
        var outputPath = fluid.model.composePaths(transform.outputPrefix, userOutputPath);
        // TODO: custom resolver config here to create non-hash output model structure
        if (toset !== undefined) {
            transform.applier.requestChange(outputPath, toset);
        }
        return userOutputPath ? fluid.model.transform.NONDEFAULT_OUTPUT_PATH_RETURN : toset;
    };

    /* Resolves the <key> given as parameter by looking up the path <key>Path in the object
     * to be transformed. If not present, it resolves the <key> by using the literal value if primitive,
     * or expanding otherwise. <def> defines the default value if unableto resolve the key. If no
     * default value is given undefined is returned
     */
    fluid.model.transform.resolveParam = function (transformSpec, transform, key, def) {
        var val = fluid.model.transform.getValue(transformSpec[key + "Path"], transformSpec[key], transform);
        return (val !== undefined) ? val : def;
    };

    // Compute a "match score" between two pieces of model material, with 0 indicating a complete mismatch, and
    // higher values indicating increasingly good matches
    fluid.model.transform.matchValue = function (expected, actual, partialMatches) {
        var stats = {changes: 0, unchanged: 0, changeMap: {}};
        fluid.model.diff(expected, actual, stats);
        // i) a pair with 0 matches counts for 0 in all cases
        // ii) without "partial match mode" (the default), we simply count matches, with any mismatch giving 0
        // iii) with "partial match mode", a "perfect score" in the top 24 bits is
        // penalised for each mismatch, with a positive score of matches store in the bottom 24 bits
        return stats.unchanged === 0 ? 0
            : (partialMatches ? 0xffffff000000 - 0x1000000 * stats.changes + stats.unchanged :
            (stats.changes ? 0 : 0xffffff000000 + stats.unchanged));
    };

    fluid.firstDefined = function (a, b) {
        return a === undefined ? b : a;
    };


    // TODO: prefixApplier is a transform which is currently unused and untested
    fluid.model.transform.prefixApplier = function (transformSpec, transform) {
        if (transformSpec.inputPrefix) {
            transform.inputPrefixOp.push(transformSpec.inputPrefix);
        }
        if (transformSpec.outputPrefix) {
            transform.outputPrefixOp.push(transformSpec.outputPrefix);
        }
        transform.expand(transformSpec.value);
        if (transformSpec.inputPrefix) {
            transform.inputPrefixOp.pop();
        }
        if (transformSpec.outputPrefix) {
            transform.outputPrefixOp.pop();
        }
    };

    fluid.defaults("fluid.model.transform.prefixApplier", {
        gradeNames: ["fluid.transformFunction"]
    });

    // unsupported, NON-API function
    fluid.model.makePathStack = function (transform, prefixName) {
        var stack = transform[prefixName + "Stack"] = [];
        transform[prefixName] = "";
        return {
            push: function (prefix) {
                var newPath = fluid.model.composePaths(transform[prefixName], prefix);
                stack.push(transform[prefixName]);
                transform[prefixName] = newPath;
            },
            pop: function () {
                transform[prefixName] = stack.pop();
            }
        };
    };

    fluid.model.transform.aliasStandardInput = function (transformSpec) {
        return { // alias input and value, and their paths
            value: transformSpec.value === undefined ? transformSpec.input : transformSpec.value,
            valuePath: transformSpec.valuePath === undefined ? transformSpec.inputPath : transformSpec.valuePath
        };
    };

    // unsupported, NON-API function
    fluid.model.transform.doTransform = function (transformSpec, transform, transformOpts) {
        var expdef = transformOpts.defaults;
        var transformFn = fluid.getGlobalValue(transformOpts.typeName);
        if (typeof(transformFn) !== "function") {
            fluid.fail("Transformation record specifies transformation function with name " +
                transformSpec.type + " which is not a function - ", transformFn);
        }
        if (!fluid.hasGrade(expdef, "fluid.transformFunction")) {
            // If no suitable grade is set up, assume that it is intended to be used as a standardTransformFunction
            expdef = fluid.defaults("fluid.standardTransformFunction");
        }
        var transformArgs = [transformSpec, transform];
        if (fluid.hasGrade(expdef, "fluid.standardInputTransformFunction")) {
            var valueHolder = fluid.model.transform.aliasStandardInput(transformSpec);
            var expanded = fluid.model.transform.getValue(valueHolder.valuePath, valueHolder.value, transform);

            transformArgs.unshift(expanded);
            // if the function has no input, the result is considered undefined, and this is returned
            if (expanded === undefined) {
                return undefined;
            }
        } else if (fluid.hasGrade(expdef, "fluid.multiInputTransformFunction")) {
            var inputs = {};
            fluid.each(expdef.inputVariables, function (v, k) {
                inputs[k] = function () {
                    var input = fluid.model.transform.getValue(transformSpec[k + "Path"], transformSpec[k], transform);
                    // if no match, assign default if one exists (v != null)
                    input = (input === undefined && v !== null) ? v : input;
                    return input;
                };
            });
            transformArgs.unshift(inputs);
        }
        var transformed = transformFn.apply(null, transformArgs);
        if (fluid.hasGrade(expdef, "fluid.standardOutputTransformFunction")) {
            // "doOutput" flag is currently set nowhere, but could be used in future
            var outputPath = transformSpec.outputPath !== undefined ? transformSpec.outputPath : (transformOpts.doOutput ? "" : undefined);
            if (outputPath !== undefined && transformed !== undefined) {
                //If outputPath is given in the expander we want to:
                // (1) output to the document
                // (2) return undefined, to ensure that expanders higher up in the hierarchy doesn't attempt to output it again
                fluid.model.transform.setValue(transformSpec.outputPath, transformed, transform);
                transformed = undefined;
            }
        }
        return transformed;
    };
    
    // OLD PATHUTIL utilities: Rescued from old DataBinding implementation to support obsolete "schema" scheme for transforms - all of this needs to be rethought
    var globalAccept = [];
    
    fluid.registerNamespace("fluid.pathUtil");

    /** Parses a path segment, following escaping rules, starting from character index i in the supplied path */
    fluid.pathUtil.getPathSegment = function (path, i) {
        fluid.pathUtil.getPathSegmentImpl(globalAccept, path, i);
        return globalAccept[0];
    };
    /** Returns just the head segment of an EL path */
    fluid.pathUtil.getHeadPath = function (path) {
        return fluid.pathUtil.getPathSegment(path, 0);
    };

    /** Returns all of an EL path minus its first segment - if the path consists of just one segment, returns "" */
    fluid.pathUtil.getFromHeadPath = function (path) {
        var firstdot = fluid.pathUtil.getPathSegmentImpl(null, path, 0);
        return firstdot === path.length ? "" : path.substring(firstdot + 1);
    };
    /** Determines whether a particular EL path matches a given path specification.
     * The specification consists of a path with optional wildcard segments represented by "*".
     * @param spec (string) The specification to be matched
     * @param path (string) The path to be tested
     * @param exact (boolean) Whether the path must exactly match the length of the specification in
     * terms of path segments in order to count as match. If exact is falsy, short specifications will
     * match all longer paths as if they were padded out with "*" segments
     * @return (array of string) The path segments which matched the specification, or <code>null</code> if there was no match
     */

    fluid.pathUtil.matchPath = function (spec, path, exact) {
        var togo = [];
        while (true) {
            if (((path === "") ^ (spec === "")) && exact) {
                return null;
            }
            // FLUID-4625 - symmetry on spec and path is actually undesirable, but this
            // quickly avoids at least missed notifications - improved (but slower)
            // implementation should explode composite changes
            if (!spec || !path) {
                break;
            }
            var spechead = fluid.pathUtil.getHeadPath(spec);
            var pathhead = fluid.pathUtil.getHeadPath(path);
            // if we fail to match on a specific component, fail.
            if (spechead !== "*" && spechead !== pathhead) {
                return null;
            }
            togo.push(pathhead);
            spec = fluid.pathUtil.getFromHeadPath(spec);
            path = fluid.pathUtil.getFromHeadPath(path);
        }
        return togo;
    };

    // unsupported, NON-API function
    fluid.model.transform.expandWildcards = function (transform, source) {
        fluid.each(source, function (value, key) {
            var q = transform.queuedTransforms;
            transform.pathOp.push(fluid.pathUtil.escapeSegment(key.toString()));
            for (var i = 0; i < q.length; ++i) {
                if (fluid.pathUtil.matchPath(q[i].matchPath, transform.path, true)) {
                    var esCopy = fluid.copy(q[i].transformSpec);
                    if (esCopy.inputPath === undefined || fluid.model.transform.hasWildcard(esCopy.inputPath)) {
                        esCopy.inputPath = "";
                    }
                    // TODO: allow some kind of interpolation for output path
                    // TODO: Also, we now require outputPath to be specified in these cases for output to be produced as well.. Is that something we want to continue with?
                    transform.inputPrefixOp.push(transform.path);
                    transform.outputPrefixOp.push(transform.path);
                    var transformOpts = fluid.model.transform.lookupType(esCopy.type);
                    var result = fluid.model.transform.doTransform(esCopy, transform, transformOpts);
                    if (result !== undefined) {
                        fluid.model.transform.setValue(null, result, transform);
                    }
                    transform.outputPrefixOp.pop();
                    transform.inputPrefixOp.pop();
                }
            }
            if (!fluid.isPrimitive(value)) {
                fluid.model.transform.expandWildcards(transform, value);
            }
            transform.pathOp.pop();
        });
    };

    // unsupported, NON-API function
    fluid.model.transform.hasWildcard = function (path) {
        return typeof(path) === "string" && path.indexOf("*") !== -1;
    };

    // unsupported, NON-API function
    fluid.model.transform.maybePushWildcard = function (transformSpec, transform) {
        var hw = fluid.model.transform.hasWildcard;
        var matchPath;
        if (hw(transformSpec.inputPath)) {
            matchPath = fluid.model.composePaths(transform.inputPrefix, transformSpec.inputPath);
        }
        else if (hw(transform.outputPrefix) || hw(transformSpec.outputPath)) {
            matchPath = fluid.model.composePaths(transform.outputPrefix, transformSpec.outputPath);
        }

        if (matchPath) {
            transform.queuedTransforms.push({transformSpec: transformSpec, outputPrefix: transform.outputPrefix, inputPrefix: transform.inputPrefix, matchPath: matchPath});
            return true;
        }
        return false;
    };

    fluid.model.sortByKeyLength = function (inObject) {
        var keys = fluid.keys(inObject);
        return keys.sort(fluid.compareStringLength(true));
    };

    // Three handler functions operating the (currently) three different processing modes
    // unsupported, NON-API function
    fluid.model.transform.handleTransformStrategy = function (transformSpec, transform, transformOpts) {
        if (fluid.model.transform.maybePushWildcard(transformSpec, transform)) {
            return;
        }
        else {
            return fluid.model.transform.doTransform(transformSpec, transform, transformOpts);
        }
    };
    // unsupported, NON-API function
    fluid.model.transform.handleInvertStrategy = function (transformSpec, transform, transformOpts) {
        var invertor = transformOpts.defaults && transformOpts.defaults.invertConfiguration;
        if (invertor) {
            var inverted = fluid.invokeGlobalFunction(invertor, [transformSpec, transform]);
            transform.inverted.push(inverted);
        }
    };

    // unsupported, NON-API function
    fluid.model.transform.handleCollectStrategy = function (transformSpec, transform, transformOpts) {
        var defaults = transformOpts.defaults;
        var standardInput = fluid.hasGrade(defaults, "fluid.standardInputTransformFunction");
        var multiInput = fluid.hasGrade(defaults, "fluid.multiInputTransformFunction");

        if (standardInput) {
            fluid.model.transform.accumulateStandardInputPath("input", transformSpec, transform, transform.inputPaths);
        } else if (multiInput) {
            fluid.model.transform.accumulateMultiInputPaths(defaults.inputVariables, transformSpec, transform, transform.inputPaths);
        } else {
            var collector = defaults.collectInputPaths;
            if (collector) {
                var collected = fluid.makeArray(fluid.invokeGlobalFunction(collector, [transformSpec, transform]));
                transform.inputPaths = transform.inputPaths.concat(collected);
            }
        }
    };

    fluid.model.transform.lookupType = function (typeName, transformSpec) {
        if (!typeName) {
            fluid.fail("Transformation record is missing a type name: ", transformSpec);
        }
        if (typeName.indexOf(".") === -1) {
            typeName = "fluid.transforms." + typeName;
        }
        var defaults = fluid.defaults(typeName);
        return { defaults: defaults, typeName: typeName};
    };
    
    // A utility which is helpful in computing inverses involving compound values. 
    // For example, with the valueMapper, compound input values are accepted as literals implicitly,
    // whereas as output values they must be escaped. This utility escapes a value if it is not primitive.
    fluid.model.transform.literaliseValue = function (value) {
        return fluid.isPrimitive(value) ? value : {
            literalValue: value
        };
    };

    // unsupported, NON-API function
    fluid.model.transform.processRule = function (rule, transform) {
        if (typeof(rule) === "string") {
            rule = fluid.model.transform.pathToRule(rule);
        }
        // special dispensation to allow "literalValue" to escape any value
        else if (rule.literalValue !== undefined) {
            rule = fluid.model.transform.literalValueToRule(rule.literalValue);
        }
        var togo;
        if (rule.transform) {
            var transformSpec, transformOpts;

            if (fluid.isArrayable(rule.transform)) {
                // if the transform holds an array, each transformer within that is responsible for its own output
                var transforms = rule.transform;
                togo = undefined;
                for (var i = 0; i < transforms.length; ++i) {
                    transformSpec = transforms[i];
                    transformOpts = fluid.model.transform.lookupType(transformSpec.type);
                    transform.transformHandler(transformSpec, transform, transformOpts);
                }
            } else {
                // else we just have a normal single transform which will return 'undefined' as a flag to defeat cascading output
                transformSpec = rule.transform;
                transformOpts = fluid.model.transform.lookupType(transformSpec.type);
                togo = transform.transformHandler(transformSpec, transform, transformOpts);
            }
        }
        // if rule is an array, save path for later use in schema strategy on final applier (so output will be interpreted as array)
        if (fluid.isArrayable(rule)) {
            transform.collectedFlatSchemaOpts = transform.collectedFlatSchemaOpts || {};
            transform.collectedFlatSchemaOpts[transform.outputPrefix] = "array";
        }
        fluid.each(rule, function (value, key) {
            if (key !== "transform") {
                transform.outputPrefixOp.push(key);
                var togo = transform.expand(value, transform);
                // Value expanders and arrays as rules implicitly outputs, unless they have nothing (undefined) to output
                if (togo !== undefined) {
                    fluid.model.transform.setValue(null, togo, transform);
                    // ensure that expanders further up does not try to output this value as well.
                    togo = undefined;
                }
                transform.outputPrefixOp.pop();
            }
        });
        return togo;
    };

    // unsupported, NON-API function
    // 3rd arg is disused by the framework and always defaults to fluid.model.transform.processRule
    fluid.model.transform.makeStrategy = function (transform, handleFn, transformFn) {
        transformFn = transformFn || fluid.model.transform.processRule;
        transform.expand = function (rules) {
            return transformFn(rules, transform);
        };
        transform.outputPrefixOp = fluid.model.makePathStack(transform, "outputPrefix");
        transform.inputPrefixOp = fluid.model.makePathStack(transform, "inputPrefix");
        transform.transformHandler = handleFn;
    };

    fluid.model.transform.invertConfiguration = function (rules) {
        var transform = {
            inverted: []
        };
        fluid.model.transform.makeStrategy(transform, fluid.model.transform.handleInvertStrategy);
        transform.expand(rules);
        return {
            transform: transform.inverted
        };
    };

    fluid.model.transform.collectInputPaths = function (rules) {
        var transform = {
            inputPaths: []
        };
        fluid.model.transform.makeStrategy(transform, fluid.model.transform.handleCollectStrategy);
        transform.expand(rules);
        return transform.inputPaths;
    };

    // unsupported, NON-API function
    fluid.model.transform.flatSchemaStrategy = function (flatSchema, getConfig) {
        var keys = fluid.model.sortByKeyLength(flatSchema);
        return function (root, segment, index, segs) {
            var path = getConfig.parser.compose.apply(null, segs.slice(0, index));
          // TODO: clearly this implementation could be much more efficient
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (fluid.pathUtil.matchPath(key, path, true) !== null) {
                    return flatSchema[key];
                }
            }
        };
    };

    // unsupported, NON-API function
    fluid.model.transform.defaultSchemaValue = function (schemaValue) {
        var type = fluid.isPrimitive(schemaValue) ? schemaValue : schemaValue.type;
        return type === "array" ? [] : {};
    };

    // unsupported, NON-API function
    fluid.model.transform.isomorphicSchemaStrategy = function (source, getConfig) {
        return function (root, segment, index, segs) {
            var existing = fluid.get(source, segs.slice(0, index), getConfig);
            return fluid.isArrayable(existing) ? "array" : "object";
        };
    };

    // unsupported, NON-API function
    fluid.model.transform.decodeStrategy = function (source, options, getConfig) {
        if (options.isomorphic) {
            return fluid.model.transform.isomorphicSchemaStrategy(source, getConfig);
        }
        else if (options.flatSchema) {
            return fluid.model.transform.flatSchemaStrategy(options.flatSchema, getConfig);
        }
    };

    // unsupported, NON-API function
    fluid.model.transform.schemaToCreatorStrategy = function (strategy) {
        return function (root, segment, index, segs) {
            if (root[segment] === undefined) {
                var schemaValue = strategy(root, segment, index, segs);
                root[segment] = fluid.model.transform.defaultSchemaValue(schemaValue);
                return root[segment];
            }
        };
    };

    /** Transforms a model by a sequence of rules. Parameters as for fluid.model.transform,
     * only with an array accepted for "rules"
     */
    fluid.model.transform.sequence = function (source, rules, options) {
        for (var i = 0; i < rules.length; ++i) {
            source = fluid.model.transform(source, rules[i], options);
        }
        return source;
    };

    fluid.model.compareByPathLength = function (changea, changeb) {
        var pdiff = changea.path.length - changeb.path.length;
        return pdiff === 0 ? changea.sequence - changeb.sequence : pdiff;
    };

   /** Fires an accumulated set of change requests in increasing order of target pathlength
     */
    fluid.model.fireSortedChanges = function (changes, applier) {
        changes.sort(fluid.model.compareByPathLength);
        fluid.requestChanges(applier, changes);
    };

    /**
     * Transforms a model based on a specified expansion rules objects.
     * Rules objects take the form of:
     *   {
     *       "target.path": "value.el.path" || {
     *          transform: {
     *              type: "transform.function.path",
     *               ...
     *           }
     *       }
     *   }
     *
     * @param {Object} source the model to transform
     * @param {Object} rules a rules object containing instructions on how to transform the model
     * @param {Object} options a set of rules governing the transformations. At present this may contain
     * the values <code>isomorphic: true</code> indicating that the output model is to be governed by the
     * same schema found in the input model, or <code>flatSchema</code> holding a flat schema object which
     * consists of a hash of EL path specifications with wildcards, to the values "array"/"object" defining
     * the schema to be used to construct missing trunk values.
     */
    fluid.model.transformWithRules = function (source, rules, options) {
        options = options || {};

        var getConfig = fluid.model.escapedGetConfig;

        var schemaStrategy = fluid.model.transform.decodeStrategy(source, options, getConfig);

        var transform = {
            source: source,
            target: {
                model: schemaStrategy ? fluid.model.transform.defaultSchemaValue(schemaStrategy(null, "", 0, [""])) : {}
            },
            resolverGetConfig: getConfig,
            collectedFlatSchemaOpts: undefined, // to hold options for flat schema collected during transforms
            queuedChanges: [],
            queuedTransforms: [] // TODO: This is used only by wildcard applier - explain its operation
        };
        fluid.model.transform.makeStrategy(transform, fluid.model.transform.handleTransformStrategy);
        transform.applier = {
            fireChangeRequest: function (changeRequest) {
                changeRequest.sequence = transform.queuedChanges.length;
                transform.queuedChanges.push(changeRequest);
            }
        };
        fluid.bindRequestChange(transform.applier);

        transform.expand(rules);

        var setConfig = fluid.copy(fluid.model.escapedSetConfig);
        // Modify schemaStrategy if we collected flat schema options for the setConfig of finalApplier
        if (transform.collectedFlatSchemaOpts !== undefined) {
            $.extend(transform.collectedFlatSchemaOpts, options.flatSchema);
            schemaStrategy = fluid.model.transform.flatSchemaStrategy(transform.collectedFlatSchemaOpts, getConfig);
        }
        setConfig.strategies = [fluid.model.defaultFetchStrategy, schemaStrategy ? fluid.model.transform.schemaToCreatorStrategy(schemaStrategy)
                : fluid.model.defaultCreatorStrategy];
        transform.finalApplier = options.finalApplier || fluid.makeHolderChangeApplier(transform.target, {resolverSetConfig: setConfig});

        if (transform.queuedTransforms.length > 0) {
            transform.typeStack = [];
            transform.pathOp = fluid.model.makePathStack(transform, "path");
            fluid.model.transform.expandWildcards(transform, source);
        }
        fluid.model.fireSortedChanges(transform.queuedChanges, transform.finalApplier);
        return transform.target.model;
    };

    $.extend(fluid.model.transformWithRules, fluid.model.transform);
    fluid.model.transform = fluid.model.transformWithRules;

    /** Utility function to produce a standard options transformation record for a single set of rules **/
    fluid.transformOne = function (rules) {
        return {
            transformOptions: {
                transformer: "fluid.model.transformWithRules",
                config: rules
            }
        };
    };

    /** Utility function to produce a standard options transformation record for multiple rules to be applied in sequence **/
    fluid.transformMany = function (rules) {
        return {
            transformOptions: {
                transformer: "fluid.model.transform.sequence",
                config: rules
            }
        };
    };

})(jQuery, fluid_2_0);
;/*
Copyright 2010 University of Toronto
Copyright 2010-2011 OCAD University
Copyright 2013 Raising the Floor - International

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var fluid_2_0 = fluid_2_0 || {};
var fluid = fluid || fluid_2_0;

(function ($, fluid) {
    "use strict";

    fluid.registerNamespace("fluid.model.transform");
    fluid.registerNamespace("fluid.transforms");

    /**********************************
     * Standard transformer functions *
     **********************************/

    fluid.defaults("fluid.transforms.value", {
        gradeNames: "fluid.standardTransformFunction",
        invertConfiguration: "fluid.transforms.value.invert"
    });

    fluid.transforms.value = fluid.identity;

    fluid.transforms.value.invert = function (transformSpec, transformer) {
        var togo = fluid.copy(transformSpec);
        // TODO: this will not behave correctly in the face of compound "value" which contains
        // further transforms
        togo.inputPath = fluid.model.composePaths(transformer.outputPrefix, transformSpec.outputPath);
        togo.outputPath = fluid.model.composePaths(transformer.inputPrefix, transformSpec.inputPath);
        return togo;
    };

    // Export the use of the "value" transform under the "identity" name for FLUID-5293
    fluid.transforms.identity = fluid.transforms.value;
    fluid.defaults("fluid.transforms.identity", {
        gradeNames: "fluid.transforms.value"
    });

    fluid.defaults("fluid.transforms.literalValue", {
        gradeNames: "fluid.standardOutputTransformFunction"
    });

    fluid.transforms.literalValue = function (transformSpec) {
        return transformSpec.value;
    };


    fluid.defaults("fluid.transforms.arrayValue", {
        gradeNames: "fluid.standardTransformFunction"
    });

    fluid.transforms.arrayValue = fluid.makeArray;


    fluid.defaults("fluid.transforms.stringToNumber", {
        gradeNames: ["fluid.standardTransformFunction"]
    });

    fluid.transforms.stringToNumber = function (value) {
        var newValue = Number(value);
        return isNaN(newValue) ? undefined : newValue;
    };

    fluid.defaults("fluid.transforms.count", {
        gradeNames: "fluid.standardTransformFunction"
    });

    fluid.transforms.count = function (value) {
        return fluid.makeArray(value).length;
    };


    fluid.defaults("fluid.transforms.round", {
        gradeNames: "fluid.standardTransformFunction"
    });

    fluid.transforms.round = function (value) {
        return Math.round(value);
    };


    fluid.defaults("fluid.transforms.delete", {
        gradeNames: "fluid.transformFunction"
    });

    fluid.transforms["delete"] = function (transformSpec, transformer) {
        var outputPath = fluid.model.composePaths(transformer.outputPrefix, transformSpec.outputPath);
        transformer.applier.requestChange(outputPath, null, "DELETE");
    };


    fluid.defaults("fluid.transforms.firstValue", {
        gradeNames: "fluid.transformFunction"
    });

    fluid.transforms.firstValue = function (transformSpec, transformer) {
        if (!transformSpec.values || !transformSpec.values.length) {
            fluid.fail("firstValue transformer requires an array of values at path named \"values\", supplied", transformSpec);
        }
        for (var i = 0; i < transformSpec.values.length; i++) {
            var value = transformSpec.values[i];
            // TODO: problem here - all of these transforms will have their side-effects (setValue) even if only one is chosen
            var expanded = transformer.expand(value);
            if (expanded !== undefined) {
                return expanded;
            }
        }
    };

    fluid.defaults("fluid.transforms.linearScale", {
        gradeNames: [ "fluid.multiInputTransformFunction", "fluid.standardOutputTransformFunction", "fluid.lens" ],
        invertConfiguration: "fluid.transforms.linearScale.invert",
        inputVariables: {
            value: null,
            factor: 1,
            offset: 0
        }
    });

    /* simple linear transformation */
    fluid.transforms.linearScale = function (inputs) {
        var value = inputs.value();
        var factor = inputs.factor();
        var offset = inputs.offset();

        if (typeof(value) !== "number" || typeof(factor) !== "number" || typeof(offset) !== "number") {
            return undefined;
        }
        return value * factor + offset;
    };

    /* TODO: This inversion doesn't work if the value and factors are given as paths in the source model */
    fluid.transforms.linearScale.invert = function  (transformSpec, transformer) {
        var togo = fluid.copy(transformSpec);

        if (togo.factor) {
            togo.factor = (togo.factor === 0) ? 0 : 1 / togo.factor;
        }
        if (togo.offset) {
            togo.offset = - togo.offset * (togo.factor !== undefined ? togo.factor : 1);
        }
        // TODO: This rubbish should be done by the inversion machinery by itself. We shouldn't have to repeat it in every
        // inversion rule
        togo.valuePath = fluid.model.composePaths(transformer.outputPrefix, transformSpec.outputPath);
        togo.outputPath = fluid.model.composePaths(transformer.inputPrefix, transformSpec.valuePath);
        return togo;
    };

    fluid.defaults("fluid.transforms.binaryOp", {
        gradeNames: [ "fluid.multiInputTransformFunction", "fluid.standardOutputTransformFunction" ],
        inputVariables: {
            left: null,
            right: null
        }
    });

    fluid.transforms.binaryLookup = {
        "===": function (a, b) { return a === b; },
        "!==": function (a, b) { return a !== b; },
        "<=": function (a, b) { return a <= b; },
        "<": function (a, b) { return a < b; },
        ">=": function (a, b) { return a >= b; },
        ">": function (a, b) { return a > b; },
        "+": function (a, b) { return a + b; },
        "-": function (a, b) { return a - b; },
        "*": function (a, b) { return a * b; },
        "/": function (a, b) { return a / b; },
        "%": function (a, b) { return a % b; },
        "&&": function (a, b) { return a && b; },
        "||": function (a, b) { return a || b; }
    };

    fluid.transforms.binaryOp = function (inputs, transformSpec, transformer) {
        var left = inputs.left();
        var right = inputs.right();

        var operator = fluid.model.transform.getValue(undefined, transformSpec.operator, transformer);

        var fun = fluid.transforms.binaryLookup[operator];
        return (fun === undefined || left === undefined || right === undefined) ?
            undefined : fun(left, right);
    };

    fluid.defaults("fluid.transforms.condition", {
        gradeNames: [ "fluid.multiInputTransformFunction", "fluid.standardOutputTransformFunction" ],
        inputVariables: {
            "true": null,
            "false": null,
            "condition": null
        }
    });

    fluid.transforms.condition = function (inputs) {
        var condition = inputs.condition();
        if (condition === null) {
            return undefined;
        }

        return inputs[condition ? "true" : "false"]();
    };

    fluid.defaults("fluid.transforms.valueMapper", {
        gradeNames: ["fluid.transformFunction", "fluid.lens"],
        invertConfiguration: "fluid.transforms.valueMapper.invert",
        collectInputPaths: "fluid.transforms.valueMapper.collect"
    });

    // unsupported, NON-API function
    fluid.model.transform.compareMatches = function (speca, specb) {
        return specb.matchValue - speca.matchValue;
    };

    // unsupported, NON-API function
    fluid.model.transform.matchValueMapperFull = function (outerValue, transformSpec, transformer) {
        var o = transformSpec.options;
        if (o.length === 0) {
            fluid.fail("valueMapper supplied empty list of options: ", transformSpec);
        }
        var matchPower = [];
        for (var i = 0; i < o.length; ++i) {
            var option = o[i];
            var value = fluid.firstDefined(fluid.model.transform.getValue(option.inputPath, undefined, transformer),
                outerValue);
            var matchValue = fluid.model.transform.matchValue(option.undefinedInputValue ? undefined :
                (option.inputValue === undefined ? transformSpec.defaultInputValue : option.inputValue), value, transformSpec.partialMatches || option.partialMatches);
            matchPower[i] = {index: i, matchValue: matchValue};
        }
        matchPower.sort(fluid.model.transform.compareMatches);
        return (matchPower[0].matchValue <= 0 || o.length > 1 && matchPower[0].matchValue === matchPower[1].matchValue) ? -1 : matchPower[0].index;
    };

    fluid.transforms.valueMapper = function (transformSpec, transformer) {
        if (!transformSpec.options) {
            fluid.fail("valueMapper requires a list or hash of options at path named \"options\", supplied ", transformSpec);
        }
        var value = fluid.model.transform.getValue(transformSpec.inputPath, undefined, transformer);
        var deref = fluid.isArrayable(transformSpec.options) ? // long form with list of records
            function (testVal) {
                var index = fluid.model.transform.matchValueMapperFull(testVal, transformSpec, transformer);
                return index === -1 ? null : transformSpec.options[index];
            } :
            function (testVal) {
                return transformSpec.options[testVal];
            };

        var indexed = deref(value);
        if (!indexed) {
            // if no branch matches, try again using this value - WARNING, this seriously
            // threatens invertibility
            indexed = deref(transformSpec.defaultInputValue);
        }
        if (!indexed) {
            return;
        }

        var outputPath = indexed.outputPath === undefined ? transformSpec.defaultOutputPath : indexed.outputPath;
        transformer.outputPrefixOp.push(outputPath);
        var outputValue;
        if (fluid.isPrimitive(indexed)) {
            outputValue = indexed;
        } else {
            // if undefinedOutputValue is set, outputValue should be undefined
            if (indexed.undefinedOutputValue) {
                outputValue = undefined;
            } else {
                // get value from outputValue or outputValuePath. If none is found set the outputValue to be that of defaultOutputValue (or undefined)
                outputValue = fluid.model.transform.resolveParam(indexed, transformer, "outputValue", undefined);
                outputValue = (outputValue === undefined) ? transformSpec.defaultOutputValue : outputValue;
            }
        }
        // output if outputPath or defaultOutputPath have been specified and the relevant child hasn't done the outputting
        if (typeof(outputPath) === "string" && outputValue !== undefined) {
            fluid.model.transform.setValue(undefined, outputValue, transformer, transformSpec.merge);
            outputValue = undefined;
        }
        transformer.outputPrefixOp.pop();
        return outputValue;
    };

    fluid.transforms.valueMapper.invert = function (transformSpec, transformer) {
        var options = [];
        var togo = {
            type: "fluid.transforms.valueMapper",
            options: options
        };
        var isArray = fluid.isArrayable(transformSpec.options);
        var findCustom = function (name) {
            return fluid.find(transformSpec.options, function (option) {
                if (option[name]) {
                    return true;
                }
            });
        };
        var anyCustomOutput = findCustom("outputPath");
        var anyCustomInput = findCustom("inputPath");
        if (!anyCustomOutput) {
            togo.inputPath = fluid.model.composePaths(transformer.outputPrefix, transformSpec.defaultOutputPath);
        }
        if (!anyCustomInput) {
            togo.defaultOutputPath = fluid.model.composePaths(transformer.inputPrefix, transformSpec.inputPath);
        }
        var def = fluid.firstDefined;
        fluid.each(transformSpec.options, function (option, key) {
            var outOption = {};
            var origInputValue = def(isArray ? option.inputValue : key, transformSpec.defaultInputValue);
            if (origInputValue === undefined) {
                fluid.fail("Failure inverting configuration for valueMapper - inputValue could not be resolved for record " + key + ": ", transformSpec);
            }
            outOption.outputValue = fluid.model.transform.literaliseValue(origInputValue);
            var origOutputValue = def(option.outputValue, transformSpec.defaultOutputValue);
            outOption.inputValue = fluid.model.transform.getValue(option.outputValuePath, origOutputValue, transformer);
            if (anyCustomOutput) {
                outOption.inputPath = fluid.model.composePaths(transformer.outputPrefix, def(option.outputPath, transformSpec.outputPath));
            }
            if (anyCustomInput) {
                outOption.outputPath = fluid.model.composePaths(transformer.inputPrefix, def(option.inputPath, transformSpec.inputPath));
            }
            if (option.outputValuePath) {
                outOption.inputValuePath = option.outputValuePath;
            }
            options.push(outOption);
        });
        return togo;
    };

    fluid.transforms.valueMapper.collect = function (transformSpec, transformer) {
        var togo = [];
        fluid.model.transform.accumulateInputPath(transformSpec.inputPath, transformer, togo);
        fluid.each(transformSpec.options, function (option) {
            fluid.model.transform.accumulateInputPath(option.inputPath, transformer, togo);
        });
        return togo;
    };

    /* -------- arrayToSetMembership and setMembershipToArray ---------------- */

    fluid.defaults("fluid.transforms.arrayToSetMembership", {
        gradeNames: ["fluid.standardInputTransformFunction", "fluid.lens"],
        invertConfiguration: "fluid.transforms.arrayToSetMembership.invert"
    });


    fluid.transforms.arrayToSetMembership = function (value, transformSpec, transformer) {
        var options = transformSpec.options;

        if (!value || !fluid.isArrayable(value)) {
            fluid.fail("arrayToSetMembership didn't find array at inputPath nor passed as value.", transformSpec);
        }
        if (!options) {
            fluid.fail("arrayToSetMembership requires an options block set");
        }

        if (transformSpec.presentValue === undefined) {
            transformSpec.presentValue = true;
        }

        if (transformSpec.missingValue === undefined) {
            transformSpec.missingValue = false;
        }

        fluid.each(options, function (outPath, key) {
            // write to output path given in options the value <presentValue> or <missingValue> depending on whether key is found in user input
            var outVal = (value.indexOf(key) !== -1) ? transformSpec.presentValue : transformSpec.missingValue;
            fluid.model.transform.setValue(outPath, outVal, transformer);
        });
        // TODO: Why does this transform make no return?
    };

    fluid.transforms.arrayToSetMembership.invert = function (transformSpec, transformer) {
        var togo = fluid.copy(transformSpec);
        delete togo.inputPath;
        togo.type = "fluid.transforms.setMembershipToArray";
        togo.outputPath = fluid.model.composePaths(transformer.inputPrefix, transformSpec.inputPath);
        var newOptions = {};
        fluid.each(transformSpec.options, function (path, oldKey) {
            var newKey = fluid.model.composePaths(transformer.outputPrefix, path);
            newOptions[newKey] = oldKey;
        });
        togo.options = newOptions;
        return togo;
    };

    fluid.defaults("fluid.transforms.setMembershipToArray", {
        gradeNames: ["fluid.standardOutputTransformFunction"]
    });

    fluid.transforms.setMembershipToArray = function (transformSpec, transformer) {
        var options = transformSpec.options;

        if (!options) {
            fluid.fail("setMembershipToArray requires an options block specified");
        }

        if (transformSpec.presentValue === undefined) {
            transformSpec.presentValue = true;
        }

        if (transformSpec.missingValue === undefined) {
            transformSpec.missingValue = false;
        }

        var outputArr = [];
        fluid.each(options, function (arrVal, inPath) {
            var val = fluid.model.transform.getValue(inPath, undefined, transformer);
            if (val === transformSpec.presentValue) {
                outputArr.push(arrVal);
            }
        });
        return outputArr;
    };

    /* -------- objectToArray and arrayToObject -------------------- */

    /**
     * Transforms the given array to an object.
     * Uses the transformSpec.options.key values from each object within the array as new keys.
     *
     * For example, with transformSpec.key = "name" and an input object like this:
     *
     * {
     *   b: [
     *     { name: b1, v: v1 },
     *     { name: b2, v: v2 }
     *   ]
     * }
     *
     * The output will be:
     * {
     *   b: {
     *     b1: {
     *       v: v1
     *     }
     *   },
     *   {
     *     b2: {
     *       v: v2
     *     }
     *   }
     * }
     */
    fluid.model.transform.applyPaths = function (operation, pathOp, paths) {
        for (var i = 0; i < paths.length; ++i) {
            if (operation === "push") {
                pathOp.push(paths[i]);
            } else {
                pathOp.pop();
            }
        }
    };

    fluid.model.transform.expandInnerValues = function (inputPath, outputPath, transformer, innerValues) {
        var inputPrefixOp = transformer.inputPrefixOp;
        var outputPrefixOp = transformer.outputPrefixOp;
        var apply = fluid.model.transform.applyPaths;

        apply("push", inputPrefixOp, inputPath);
        apply("push", outputPrefixOp, outputPath);
        var expanded = {};
        fluid.each(innerValues, function (innerValue) {
            var expandedInner = transformer.expand(innerValue);
            if (!fluid.isPrimitive(expandedInner)) {
                $.extend(true, expanded, expandedInner);
            } else {
                expanded = expandedInner;
            }
        });
        apply("pop", outputPrefixOp, outputPath);
        apply("pop", inputPrefixOp, inputPath);

        return expanded;
    };


    fluid.defaults("fluid.transforms.arrayToObject", {
        gradeNames: ["fluid.standardTransformFunction", "fluid.lens" ],
        invertConfiguration: "fluid.transforms.arrayToObject.invert"
    });
    
    /** Transforms an array of objects into an object of objects, by indexing using the option "key" which must be supplied within the transform specification.
    * The key of each element will be taken from the value held in each each original object's member derived from the option value in "key" - this member should
    * exist in each array element. The member with name agreeing with "key" and its value will be removed from each original object before inserting into the returned
    * object.
    * For example,
    * <code>fluid.transforms.arrayToObject([{k: "e1", b: 1, c: 2}, {k: "e2", b: 2: c: 3}], {key: "k"})</code> will output the object
    * <code>{e1: {b: 1, c: 2}, e2: {b: 2: c, 3}</code>
    * Note: This transform frequently arises in the context of data which arose in XML form, which often represents "morally indexed" data in repeating array-like
    * constructs where the indexing key is held, for example, in an attribute.
    */

    fluid.transforms.arrayToObject = function (arr, transformSpec, transformer) {
        if (transformSpec.key === undefined) {
            fluid.fail("arrayToObject requires a 'key' option.", transformSpec);
        }
        if (!fluid.isArrayable(arr)) {
            fluid.fail("arrayToObject didn't find array at inputPath.", transformSpec);
        }
        var newHash = {};
        var pivot = transformSpec.key;

        fluid.each(arr, function (v, k) {
            // check that we have a pivot entry in the object and it's a valid type:
            var newKey = v[pivot];
            var keyType = typeof(newKey);
            if (keyType !== "string" && keyType !== "boolean" && keyType !== "number") {
                fluid.fail("arrayToObject encountered untransformable array due to missing or invalid key", v);
            }
            // use the value of the key element as key and use the remaining content as value
            var content = fluid.copy(v);
            delete content[pivot];
            // fix sub Arrays if needed:
            if (transformSpec.innerValue) {
                content = fluid.model.transform.expandInnerValues([transformer.inputPrefix, transformSpec.inputPath, k.toString()],
                    [newKey], transformer, transformSpec.innerValue);
            }
            newHash[newKey] = content;
        });
        return newHash;
    };

    fluid.transforms.arrayToObject.invert = function (transformSpec, transformer) {
        var togo = fluid.copy(transformSpec);
        togo.type = "fluid.transforms.objectToArray";
        togo.inputPath = fluid.model.composePaths(transformer.outputPrefix, transformSpec.outputPath);
        togo.outputPath = fluid.model.composePaths(transformer.inputPrefix, transformSpec.inputPath);
        // invert transforms from innerValue as well:
        // TODO: The Model Transformations framework should be capable of this, but right now the
        // issue is that we use a "private contract" to operate the "innerValue" slot. We need to
        // spend time thinking of how this should be formalised
        if (togo.innerValue) {
            var innerValue = togo.innerValue;
            for (var i = 0; i < innerValue.length; ++i) {
                innerValue[i] = fluid.model.transform.invertConfiguration(innerValue[i]);
            }
        }
        return togo;
    };


    fluid.defaults("fluid.transforms.objectToArray", {
        gradeNames: "fluid.standardTransformFunction"
    });

    /**
     * Transforms an object of objects into an array of objects, by deindexing by the option "key" which must be supplied within the transform specification.
     * The key of each object will become split out into a fresh value in each array element which will be given the key held in the transformSpec option "key".
     * For example:
     * <code>fluid.transforms.objectToArray({e1: {b: 1, c: 2}, e2: {b: 2: c, 3}, {key: "k"})</code> will output the array
     * <code>[{k: "e1", b: 1, c: 2}, {k: "e2", b: 2: c: 3}]</code>
     * 
     * This performs the inverse transform of fluid.transforms.arrayToObject.
     */
    fluid.transforms.objectToArray = function (hash, transformSpec, transformer) {
        if (transformSpec.key === undefined) {
            fluid.fail("objectToArray requires a \"key\" option.", transformSpec);
        }

        var newArray = [];
        var pivot = transformSpec.key;

        fluid.each(hash, function (v, k) {
            var content = {};
            content[pivot] = k;
            if (transformSpec.innerValue) {
                v = fluid.model.transform.expandInnerValues([transformSpec.inputPath, k], [transformSpec.outputPath, newArray.length.toString()],
                    transformer, transformSpec.innerValue);
            }
            $.extend(true, content, v);
            newArray.push(content);
        });
        return newArray;
    };

    fluid.defaults("fluid.transforms.limitRange", {
        gradeNames: "fluid.standardTransformFunction"
    });

    fluid.transforms.limitRange = function (value, transformSpec) {
        var min = transformSpec.min;
        if (min !== undefined) {
            var excludeMin = transformSpec.excludeMin || 0;
            min += excludeMin;
            if (value < min) {
                value = min;
            }
        }
        var max = transformSpec.max;
        if (max !== undefined) {
            var excludeMax = transformSpec.excludeMax || 0;
            max -= excludeMax;
            if (value > max) {
                value = max;
            }
        }
        return value;
    };

    fluid.defaults("fluid.transforms.indexOf", {
        gradeNames: ["fluid.standardTransformFunction", "fluid.lens"],
        invertConfiguration: "fluid.transforms.indexOf.invert"
    });

    fluid.transforms.indexOf = function (value, transformSpec) {
        var offset = fluid.transforms.parseIndexationOffset(transformSpec.offset, "indexOf");
        var array = fluid.makeArray(transformSpec.array);
        var originalIndex = array.indexOf(value);
        return originalIndex === -1 && transformSpec.notFound ? transformSpec.notFound : originalIndex + offset;
    };

    fluid.transforms.indexOf.invert = function (transformSpec, transformer) {
        var togo = fluid.transforms.invertArrayIndexation(transformSpec, transformer);
        togo.type = "fluid.transforms.dereference";
        return togo;
    };

    fluid.defaults("fluid.transforms.dereference", {
        gradeNames: ["fluid.standardTransformFunction", "fluid.lens"],
        invertConfiguration: "fluid.transforms.dereference.invert"
    });

    fluid.transforms.dereference = function (value, transformSpec) {
        if (typeof (value) !== "number") {
            fluid.fail("dereference requires \"value\" to be a number. " + value + " is invalid.");
        }
        var offset = fluid.transforms.parseIndexationOffset(transformSpec.offset, "dereference");
        var array = fluid.makeArray(transformSpec.array);
        var index = value + offset;
        return index === -1 && transformSpec.notFound ? transformSpec.notFound : array[index];
    };

    fluid.transforms.dereference.invert = function (transformSpec, transformer) {
        var togo = fluid.transforms.invertArrayIndexation(transformSpec, transformer);
        togo.type = "fluid.transforms.indexOf";
        return togo;
    };

    fluid.transforms.parseIndexationOffset = function (offset, transformName) {
        var parsedOffset = 0;
        if (offset !== undefined) {
            parsedOffset = fluid.parseInteger(offset);
            if (isNaN(parsedOffset)) {
                fluid.fail(transformName + " requires the value of \"offset\" to be an integer or a string that can be converted to an integer. " + offset + " is invalid.");
            }
        }
        return parsedOffset;
    };

    fluid.transforms.invertArrayIndexation = function (transformSpec, transformer) {
        var togo = fluid.copy(transformSpec);
        togo.inputPath = fluid.model.composePaths(transformer.outputPrefix, transformSpec.outputPath);
        togo.outputPath = fluid.model.composePaths(transformer.inputPrefix, transformSpec.inputPath);
        if (!isNaN(Number(togo.offset))) {
            togo.offset = Number(togo.offset) * (-1);
        }
        return togo;
    };

    fluid.defaults("fluid.transforms.free", {
        gradeNames: "fluid.transformFunction"
    });

    fluid.transforms.free = function (transformSpec) {
        var args = fluid.makeArray(transformSpec.args);
        return fluid.invokeGlobalFunction(transformSpec.func, args);
    };

})(jQuery, fluid_2_0);
;/*
Copyright 2008-2009 University of Toronto
Copyright 2010-2011 OCAD University
Copyright 2015 Raising the Floor (International)

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var fluid_2_0 = fluid_2_0 || {};

(function ($, fluid) {
    "use strict";

    fluid.registerNamespace("fluid.contextAware");
    
    /** Construct an instance of a component as a child of the specified parent, with a well-known, unique name derived from its typeName
    * @param parentPath {String|Array of String} Parent of path where the new component is to be constructed, represented as a string or array of segments
    * @param options {String|Object} Options encoding the component to be constructed. If this is of type String, it is assumed to represent the component's typeName with no options
    * @param instantiator {Instantiator} [optional] The instantiator holding the component to be created - if blank, the global instantiator will be used
    */
    fluid.constructSingle = function (parentPath, options, instantiator) {
        instantiator = instantiator || fluid.globalInstantiator;
        parentPath = parentPath || "";
        var segs = fluid.model.parseToSegments(parentPath, instantiator.parseEL, true);
        if (typeof(options) === "string") {
            options = {type: options};
        }
        var type = options.type;
        if (!type) {
            fluid.fail("Cannot construct singleton object without a type entry");
        }
        options = $.extend({}, options);
        var gradeNames = options.gradeNames = fluid.makeArray(options.gradeNames);
        gradeNames.unshift(type); // principal type may be noninstantiable
        options.type = "fluid.component";
        var root = segs.length === 0;
        if (root) {
            gradeNames.push("fluid.resolveRoot");
        }
        var memberName = fluid.typeNameToMemberName(options.singleRootType || type);
        segs.push(memberName);
        fluid.construct(segs, options, instantiator);
    };
    
    /** Destroy an instance created by `fluid.constructSingle`
     * @param parentPath {String|Array of String} Parent of path where the new component is to be constructed, represented as a string or array of segments
     * @param typeName {String} The type name used to construct the component (either `type` or `singleRootType` of the `options` argument to `fluid.constructSingle`
     * @param instantiator {Instantiator} [optional] The instantiator holding the component to be created - if blank, the global instantiator will be used
    */
    fluid.destroySingle = function (parentPath, typeName, instantiator) {
        instantiator = instantiator || fluid.globalInstantiator;
        var segs = fluid.model.parseToSegments(parentPath, instantiator.parseEL, true);
        var memberName = fluid.typeNameToMemberName(typeName);
        segs.push(memberName);
        fluid.destroy(segs, instantiator);
    };
    
    fluid.defaults("fluid.contextAware.marker", {
        gradeNames: ["fluid.component"]
    });
    
    
    // unsupported, NON-API function
    fluid.contextAware.makeCheckMarkers = function (checks, path, instantiator) {
        fluid.each(checks, function (value, markerTypeName) {
            fluid.constructSingle(path, {
                type: markerTypeName,
                gradeNames: "fluid.contextAware.marker",
                value: value
            }, instantiator);
        });
        
    };
    /** Peforms the computation for `fluid.contextAware.makeChecks` and returns a structure suitable for being sent to `fluid.contextAware.makeCheckMarkers` - 
     *
     * @return A hash of marker type names to grade names - this can be sent to fluid.contextAware.makeCheckMarkers
     */
    // unsupported, NON-API function
    fluid.contextAware.performChecks = function (checkHash) {
        return fluid.transform(checkHash, function (checkRecord) {
            if (typeof(checkRecord) === "function") {
                checkRecord = {func: checkRecord};
            } else if (typeof(checkRecord) === "string") {
                checkRecord = {funcName: checkRecord};
            }
            if (fluid.isPrimitive(checkRecord)) {
                return checkRecord;
            } else if ("value" in checkRecord) {
                return checkRecord.value;
            } else if ("func" in checkRecord) {
                return checkRecord.func();
            } else if ("funcName" in checkRecord) {
                return fluid.invokeGlobalFunction(checkRecord.funcName);
            } else {
                fluid.fail("Error in contextAwareness check record ", checkRecord, " - must contain an entry with name value, func, or funcName");
            }
        });
    };

    /**
     * Takes an object whose keys are check context names and whose values are check records, designating a collection of context markers which might be registered at a location
     * in the component tree.
      
     * @param checkHash {Object} The keys in this structure are the context names to be supplied if the check passes, and the values are check records.
     * A check record contains: 
     *    ONE OF:
     *    value {Any} [optional] A literal value name to be attached to the context
     *    func {Function} [optional] A zero-arg function to be called to compute the value
     *    funcName {String} [optional] The name of a zero-arg global function which will compute the value
     * If the check record consists of a Number or Boolean, it is assumed to be the value given to "value". 
     * @param path {String|Array} [optional] The path in the component tree at which the check markers are to be registered. If omitted, "" is assumed
     * @param instantiator {Instantiator} [optional] The instantiator holding the component tree which will receive the markers. If omitted, use `fluid.globalInstantiator`.
     */
    fluid.contextAware.makeChecks = function (checkHash, path, instantiator) {
        var checkOptions = fluid.contextAware.performChecks(checkHash);
        fluid.contextAware.makeCheckMarkers(checkOptions, path, instantiator);
    };
    
    /**
     * Forgets a check made at a particular level of the component tree.
     * @param markerNames {Array of String} The marker typeNames whose check values are to be forgotten
     * @param path {String|Array} [optional] The path in the component tree at which the check markers are to be removed. If omitted, "" is assumed
     * @param instantiator {Instantiator} [optional] The instantiator holding the component tree the markers are to be removed from. If omitted, use `fluid.globalInstantiator`.
     */
    fluid.contextAware.forgetChecks = function (markerNames, path, instantiator) {
        instantiator = instantiator || fluid.globalInstantiator;
        path = path || [];
        var markerArray = fluid.makeArray(markerNames);
        fluid.each(markerArray, function (markerName) {
            var memberName = fluid.typeNameToMemberName(markerName);
            var segs = fluid.model.parseToSegments(path, instantiator.parseEL, true);
            segs.push(memberName);
            fluid.destroy(segs, instantiator);
        });
    };

    /** A grade to be given to a component which requires context-aware adaptation.
     * This grade consumes configuration held in the block named "contextAwareness", which is an object whose keys are check namespaces and whose values hold 
     * sequences of "checks" to be made in the component tree above the component. The value searched by
     * each check is encoded as the element named `contextValue` - this either represents an IoC reference to a component
     * or a particular value held at the component. If this reference has no path component, the path ".options.value" will be assumed.
     * These checks seek contexts which
     * have been previously registered using fluid.contextAware.makeChecks. The first context which matches
     * with a value of `true` terminates the search, and returns by applying the grade names held in `gradeNames` to the current component.
     * If no check matches, the grades held in `defaultGradeNames` will be applied.
     */
    fluid.defaults("fluid.contextAware", {
        gradeNames: ["{that}.check"],
        mergePolicy: {
            contextAwareness: "noexpand"
        },
        contextAwareness: {
            // Hash of names (check namespaces) to records: {
            //     checks: {}, // Hash of check namespace to: {
            //         contextValue: IoCExpression testing value in environment, 
            //         gradeNames: gradeNames which will be output, 
            //         priority: String/Number for priority of check [optional]
            //         equals: Value to be compared to contextValue [optional - default is `true`]
            //     defaultGradeNames: // String or Array of String holding default gradeNames which will be output if no check matches [optional]
            //     priority: // Number or String encoding priority relative to other records (same format as with event listeners) [optional]
            // }
        },
        invokers: {
            check: {
                funcName: "fluid.contextAware.check",
                args: ["{that}", "{that}.options.contextAwareness"]
            }
        }
    });
    
    fluid.contextAware.getCheckValue = function (that, reference) {
        // cf. core of distributeOptions!
        var targetRef = fluid.parseContextReference(reference);
        var targetComponent = fluid.resolveContext(targetRef.context, that);
        var path = targetRef.path || ["options", "value"];
        var value = fluid.getForComponent(targetComponent, path);
        return value;
    };

    // unsupported, NON-API function    
    fluid.contextAware.checkOne = function (that, contextAwareRecord) {
        if (contextAwareRecord.checks && contextAwareRecord.checks.contextValue) {
            fluid.fail("Nesting error in contextAwareness record ", contextAwareRecord, " - the \"checks\" entry must contain a hash and not a contextValue/gradeNames record at top level");
        }
        var checkList = fluid.hashToArray(contextAwareRecord.checks, "namespace", function (newElement, oldElement, index) {
            $.extend(newElement, oldElement);
            newElement.priority = fluid.parsePriority(oldElement.priority, index);
        });
        fluid.sortByPriority(checkList);
        return fluid.find(checkList, function (check) {
            if (!check.contextValue) {
                fluid.fail("Cannot perform check for contextAwareness record ", check, " without a valid field named \"contextValue\"");
            }
            var value = fluid.contextAware.getCheckValue(that, check.contextValue);
            if (check.equals === undefined ? value : value === check.equals) {
                return check.gradeNames;
            }
        }, contextAwareRecord.defaultGradeNames);
    };
    
    // unsupported, NON-API function
    fluid.contextAware.check = function (that, contextAwarenessOptions) {
        var gradeNames = [];
        var contextAwareList = fluid.hashToArray(contextAwarenessOptions, "namespace", function (newElement, oldElement, index) {
            $.extend(newElement, oldElement);
            newElement.priority = fluid.parsePriority(oldElement.priority, index, false, "context awareness records");
        });
        fluid.sortByPriority(contextAwareList);
        fluid.each(contextAwareList, function (record) {
            var matched = fluid.contextAware.checkOne(that, record);
            gradeNames = gradeNames.concat(fluid.makeArray(matched));
        });
        return gradeNames;
    };

    /** Given a set of options, broadcast an adaptation to all instances of a particular component in a particular context. ("new demands blocks").
     * This has the effect of fabricating a grade with a particular name with an options distribution to `{/ typeName}` for the required component,
     * and then constructing a single well-known instance of it.
     * Options layout:
     *  distributionName {String} A grade name - the name to be given to the fabricated grade
     *  targetName {String} A grade name - the name of the grade to receive the adaptation
     *  adaptationName {String} the name of the contextAwareness record to receive the record - this will be a simple string
     *  checkName {String} the name of the check within the contextAwareness record to receive the record - this will be a simple string
     *  record {Object} the record to be broadcast into contextAwareness - should contain entries 
     *      contextValue {IoC expression} the context value to be checked to activate the adaptation
     *      gradeNames {String/Array of String} the grade names to be supplied to the adapting target (matching advisedName)
     */
    fluid.contextAware.makeAdaptation = function (options) {
        fluid.expect("fluid.contextAware.makeAdaptation", options, ["distributionName", "targetName", "adaptationName", "checkName", "record"]);
        fluid.defaults(options.distributionName, {
            gradeNames: ["fluid.component"],
            distributeOptions: {
                target: "{/ " + options.targetName + "}.options.contextAwareness." + options.adaptationName + ".checks." + options.checkName,
                record: options.record
            }
        });
        fluid.constructSingle([], options.distributionName);
    };

    // Context awareness for the browser environment
    
    fluid.contextAware.isBrowser = function () {
        return typeof(window) !== "undefined" && window.document;
    };
    
    fluid.contextAware.makeChecks({
        "fluid.browser": {
            funcName: "fluid.contextAware.isBrowser"
        }
    });

})(jQuery, fluid_2_0);

;// -*- mode: javascript; tab-width: 2; indent-tabs-mode: nil; -*-
//------------------------------------------------------------------------------
// Web Array Math API - JavaScript polyfill
//
// Copyright(c) 2013 Marcus Geelnard
//
// This software is provided 'as-is', without any express or implied warranty.
// In no event will the authors be held liable for any damages arising from the
// use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not claim
//    that you wrote the original software. If you use this software in a
//    product, an acknowledgment in the product documentation would be
//    appreciated but is not required.
//
// 2. Altered source versions must be plainly marked as such, and must not be
//    misrepresented as being the original software.
//
// 3. This notice may not be removed or altered from any source distribution.
//------------------------------------------------------------------------------

"use strict";

//------------------------------------------------------------------------------
// interface ArrayMath
//------------------------------------------------------------------------------


(function () {
  var context = typeof (window) !== "undefined" ? window :
    typeof (self) !== "undefined" ? self :
    typeof module !== "undefined" && module.exports ? module.exports :
    global;

  if (context.ArrayMath) return;

  var ArrayMath = {};

  ArrayMath.add = function (dst, x, y) {
    var k;
    if (x instanceof Float32Array)
      for (k = Math.min(dst.length, x.length, y.length) - 1; k >= 0; --k)
        dst[k] = x[k] + y[k];
    else
      for (k = Math.min(dst.length, y.length) - 1; k >= 0; --k)
        dst[k] = x + y[k];
  };

  ArrayMath.sub = function (dst, x, y) {
    var k;
    if (x instanceof Float32Array)
      for (k = Math.min(dst.length, x.length, y.length) - 1; k >= 0; --k)
        dst[k] = x[k] - y[k];
    else
      for (k = Math.min(dst.length, y.length) - 1; k >= 0; --k)
        dst[k] = x - y[k];
  };

  ArrayMath.mul = function (dst, x, y) {
    var k;
    if (x instanceof Float32Array)
      for (k = Math.min(dst.length, x.length, y.length) - 1; k >= 0; --k)
        dst[k] = x[k] * y[k];
    else
      for (k = Math.min(dst.length, y.length) - 1; k >= 0; --k)
        dst[k] = x * y[k];
  };

  ArrayMath.mulCplx = function (dstReal, dstImag, xReal, xImag, yReal, yImag) {
    var k, xr, xi, yr, yi;
    if (xReal instanceof Float32Array)
      for (k = Math.min(dstReal.length, dstImag.length, xReal.length, xImag.length, yReal.length, yImag.length) - 1; k >= 0; --k) {
        xr = xReal[k], xi = xImag[k], yr = yReal[k], yi = yImag[k];
        dstReal[k] = xr * yr - xi * yi;
        dstImag[k] = xr * yi + xi * yr;
      }
    else
      for (k = Math.min(dstReal.length, dstImag.length, yReal.length, yImag.length) - 1; k >= 0; --k) {
        yr = yReal[k], yi = yImag[k];
        dstReal[k] = xReal * yr - xImag * yi;
        dstImag[k] = xReal * yi + xImag * yr;
      }
  };

  ArrayMath.div = function (dst, x, y) {
    var k;
    if (x instanceof Float32Array)
      for (k = Math.min(dst.length, x.length, y.length) - 1; k >= 0; --k)
        dst[k] = x[k] / y[k];
    else
      for (k = Math.min(dst.length, y.length) - 1; k >= 0; --k)
        dst[k] = x / y[k];
  };

  ArrayMath.divCplx = function (dstReal, dstImag, xReal, xImag, yReal, yImag) {
    var k, xr, xi, yr, yi, denom;
    if (xReal instanceof Float32Array)
      for (k = Math.min(dstReal.length, dstImag.length, xReal.length, xImag.length, yReal.length, yImag.length) - 1; k >= 0; --k) {
        xr = xReal[k], xi = xImag[k], yr = yReal[k], yi = yImag[k];
        denom = 1 / (yr * yr + yi * yi);
        dstReal[k] = (xr * yr + xi * yi) * denom;
        dstImag[k] = (xi * yr - xr * yi) * denom;
      }
    else {
      for (k = Math.min(dstReal.length, dstImag.length, yReal.length, yImag.length) - 1; k >= 0; --k) {
        yr = yReal[k], yi = yImag[k];
        denom = 1 / (yr * yr + yi * yi);
        dstReal[k] = (xReal * yr + xImag * yi) * denom;
        dstImag[k] = (xImag * yr - xReal * yi) * denom;
      }
    }
  };

  ArrayMath.madd = function (dst, x, y, z) {
    var k;
    if (x instanceof Float32Array)
      for (k = Math.min(dst.length, x.length, y.length, z.length) - 1; k >= 0; --k)
        dst[k] = x[k] * y[k] + z[k];
    else
      for (k = Math.min(dst.length, y.length, z.length) - 1; k >= 0; --k)
        dst[k] = x * y[k] + z[k];
  };

  ArrayMath.abs = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.abs(x[k]);
  };

  ArrayMath.absCplx = function (dst, real, imag) {
    for (var k = Math.min(dst.length, real.length, imag.length) - 1; k >= 0; --k)
      dst[k] = Math.sqrt(real[k] * real[k] + imag[k] * imag[k]);
  };

  ArrayMath.acos = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.acos(x[k]);
  };

  ArrayMath.asin = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.asin(x[k]);
  };

  ArrayMath.atan = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.atan(x[k]);
  };

  ArrayMath.atan2 = function (dst, y, x) {
    for (var k = Math.min(dst.length, x.length, y.length) - 1; k >= 0; --k)
      dst[k] = Math.atan2(y[k], x[k]);
  };

  ArrayMath.ceil = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.ceil(x[k]);
  };

  ArrayMath.cos = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.cos(x[k]);
  };

  ArrayMath.exp = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.exp(x[k]);
  };

  ArrayMath.floor = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.floor(x[k]);
  };

  ArrayMath.log = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.log(x[k]);
  };

  ArrayMath.max = function (x) {
    var ret = -Infinity;
    for (var k = x.length - 1; k >= 0; --k) {
      var val = x[k];
      if (val > ret)
        ret = val;
    }
    return ret;
  };

  ArrayMath.min = function (x) {
    var ret = Infinity;
    for (var k = x.length - 1; k >= 0; --k) {
      var val = x[k];
      if (val < ret)
        ret = val;
    }
    return ret;
  };

  ArrayMath.pow = function (dst, x, y) {
    var k;
    if (y instanceof Float32Array)
      for (k = Math.min(dst.length, x.length, y.length) - 1; k >= 0; --k)
        dst[k] = Math.pow(x[k], y[k]);
    else {
      for (k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
        dst[k] = Math.pow(x[k], y);
    }
  };

  ArrayMath.random = function (dst, low, high) {
    if (!low)
      low = 0;
    if (isNaN(parseFloat(high)))
      high = 1;
    var scale = high - low;
    for (var k = dst.length - 1; k >= 0; --k)
      dst[k] = Math.random() * scale + low;
  };

  ArrayMath.round = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.round(x[k]);
  };

  ArrayMath.sin = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.sin(x[k]);
  };

  ArrayMath.sqrt = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.sqrt(x[k]);
  };

  ArrayMath.tan = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.tan(x[k]);
  };

  ArrayMath.clamp = function (dst, x, xMin, xMax) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k) {
      var val = x[k];
      dst[k] = val < xMin ? xMin : val > xMax ? xMax : val;
    }
  };

  ArrayMath.fract = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k) {
      var val = x[k];
      dst[k] = val - Math.floor(val);
    }
  };

  ArrayMath.fill = function (dst, value) {
    for (var k = dst.length - 1; k >= 0; --k) {
      dst[k] = value;
    }
  };

  ArrayMath.ramp = function (dst, first, last) {
    var maxIdx = dst.length - 1;
    if (maxIdx >= 0)
      dst[0] = first;
    if (maxIdx > 0) {
      var step = (last - first) / maxIdx;
      for (var k = 1; k <= maxIdx; ++k)
        dst[k] = first + step * k;
    }
  };

  ArrayMath.sign = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = x[k] < 0 ? -1 : 1;
  };

  ArrayMath.sum = function (x) {
    // TODO(m): We should use pairwise summation or similar here.
    var ret = 0;
    for (var k = x.length - 1; k >= 0; --k)
      ret += x[k];
    return ret;
  };

  ArrayMath.sampleLinear = function (dst, x, t) {
    var xLen = x.length, maxIdx = xLen - 1;
    for (var k = Math.min(dst.length, t.length) - 1; k >= 0; --k) {
      var t2 = t[k];
      t2 = t2 < 0 ? 0 : t2 > maxIdx ? maxIdx : t2;
      var idx = Math.floor(t2);
      var w = t2 - idx;
      var p1 = x[idx];
      var p2 = x[idx < maxIdx ? idx + 1 : maxIdx];
      dst[k] = p1 + w * (p2 - p1);
    }
  };

  ArrayMath.sampleLinearRepeat = function (dst, x, t) {
    var xLen = x.length, maxIdx = xLen - 1;
    for (var k = Math.min(dst.length, t.length) - 1; k >= 0; --k) {
      var t2 = t[k];
      t2 = t2 - Math.floor(t2/xLen) * xLen;
      var idx = Math.floor(t2);
      var w = t2 - idx;
      var p1 = x[idx];
      var p2 = x[idx < maxIdx ? idx + 1 : 0];
      dst[k] = p1 + w * (p2 - p1);
    }
  };

  ArrayMath.sampleCubic = function (dst, x, t) {
    var xLen = x.length, maxIdx = xLen - 1;
    for (var k = Math.min(dst.length, t.length) - 1; k >= 0; --k) {
      var t2 = t[k];
      t2 = t2 < 0 ? 0 : t2 > maxIdx ? maxIdx : t2;
      var idx = Math.floor(t2);
      var w = t2 - idx;
      var w2 = w * w;
      var w3 = w2 * w;
      var h2 = -2*w3 + 3*w2;
      var h1 = 1 - h2;
      var h4 = w3 - w2;
      var h3 = h4 - w2 + w;
      var p1 = x[idx > 0 ? idx - 1 :  0];
      var p2 = x[idx];
      var p3 = x[idx < maxIdx ? idx + 1 : maxIdx];
      var p4 = x[idx < maxIdx - 1 ? idx + 2 : maxIdx];
      dst[k] = h1 * p2 + h2 * p3 + 0.5 * (h3 * (p3 - p1) + h4 * (p4 - p2));
    }
  };

  ArrayMath.sampleCubicRepeat = function (dst, x, t) {
    var xLen = x.length, maxIdx = xLen - 1;
    for (var k = Math.min(dst.length, t.length) - 1; k >= 0; --k) {
      var t2 = t[k];
      t2 = t2 - Math.floor(t2/xLen) * xLen;
      var idx = Math.floor(t2);
      var w = t2 - idx;
      var w2 = w * w;
      var w3 = w2 * w;
      var h2 = -2*w3 + 3*w2;
      var h1 = 1 - h2;
      var h4 = w3 - w2;
      var h3 = h4 - w2 + w;
      var p1 = x[idx > 0 ? idx - 1 : maxIdx];
      var p2 = x[idx];
      var p3 = x[idx < maxIdx ? idx + 1 : 0];
      var p4 = x[idx < maxIdx - 1 ? idx + 2 : (idx + 2 - Math.floor((idx + 2)/xLen) * xLen)];
      dst[k] = h1 * p2 + h2 * p3 + 0.5 * (h3 * (p3 - p1) + h4 * (p4 - p2));
    }
  };

  ArrayMath.pack = function (dst, offset, stride, src1, src2, src3, src4) {
    var dstCount = Math.floor(Math.max(0, (dst.length - offset)) / stride);
    var count = Math.min(dstCount, src1.length);
    if (src2) {
      var count = Math.min(count, src2.length);
      if (src3) {
        var count = Math.min(count, src3.length);
        if (src4) {
          var count = Math.min(count, src4.length);
          for (var k = 0; k < count; ++k) {
            dst[offset] = src1[k];
            dst[offset + 1] = src2[k];
            dst[offset + 2] = src3[k];
            dst[offset + 3] = src4[k];
            offset += stride;
          }
        }
        else
          for (var k = 0; k < count; ++k) {
            dst[offset] = src1[k];
            dst[offset + 1] = src2[k];
            dst[offset + 2] = src3[k];
            offset += stride;
          }
      }
      else
        for (var k = 0; k < count; ++k) {
          dst[offset] = src1[k];
          dst[offset + 1] = src2[k];
          offset += stride;
        }
    }
    else
      for (var k = 0; k < count; ++k) {
        dst[offset] = src1[k];
        offset += stride;
      }
  };

  ArrayMath.unpack = function (src, offset, stride, dst1, dst2, dst3, dst4) {
    var srcCount = Math.floor(Math.max(0, (src.length - offset)) / stride);
    var count = Math.min(srcCount, dst1.length);
    if (dst2) {
      var count = Math.min(count, dst2.length);
      if (dst3) {
        var count = Math.min(count, dst3.length);
        if (dst4) {
          var count = Math.min(count, dst4.length);
          for (var k = 0; k < count; ++k) {
            dst1[k] = src[offset];
            dst2[k] = src[offset + 1];
            dst3[k] = src[offset + 2];
            dst4[k] = src[offset + 3];
            offset += stride;
          }
        }
        else
          for (var k = 0; k < count; ++k) {
            dst1[k] = src[offset];
            dst2[k] = src[offset + 1];
            dst3[k] = src[offset + 2];
            offset += stride;
          }
      }
      else
        for (var k = 0; k < count; ++k) {
          dst1[k] = src[offset];
          dst2[k] = src[offset + 1];
          offset += stride;
        }
    }
    else
      for (var k = 0; k < count; ++k) {
        dst1[k] = src[offset];
        offset += stride;
      }
  };

  context.ArrayMath = ArrayMath;
})();


//------------------------------------------------------------------------------
// interface Filter
//------------------------------------------------------------------------------

(function () {
  var context = typeof (window) !== "undefined" ? window :
    typeof (self) !== "undefined" ? self :
    typeof module !== "undefined" && module.exports ? module.exports :
    global;

  if (context.Filter) return;

  var Filter = function (bSize, aSize) {
    if (isNaN(parseFloat(bSize)) || !isFinite(bSize))
      bSize = 1;
    if (!aSize)
      aSize = 0;
    this._b = new Float32Array(bSize);
    this._b[0] = 1;
    this._a = new Float32Array(aSize);
    this._bHist = new Float32Array(bSize);
    this._aHist = new Float32Array(aSize);
  };

  Filter.prototype.filter = function (dst, x) {
    // Put commonly accessed objects and properties in local variables
    var a = this._a, aLen = a.length,
        b = this._b, bLen = b.length,
        aHist = this._aHist, bHist = this._bHist,
        xLen = x.length, dstLen = dst.length;

    // Perform run-in part using the history (slow)
    var bHistRunIn = bLen - 1;
    var aHistRunIn = aLen;
    var k;
    for (k = 0; (bHistRunIn || aHistRunIn) && k < xLen; ++k) {
      var m, noHistLen;

      // FIR part
      noHistLen = bLen - bHistRunIn;
      bHistRunIn && bHistRunIn--;
      var res = b[0] * x[k];
      for (m = 1; m < noHistLen; ++m)
        res += b[m] * x[k - m];
      for (; m < bLen; ++m)
        res += b[m] * bHist[m - noHistLen];

      // Recursive part
      noHistLen = aLen - aHistRunIn;
      aHistRunIn && aHistRunIn--;
      for (m = 0; m < noHistLen; ++m)
        res -= a[m] * dst[k - 1 - m];
      for (; m < aLen; ++m)
        res -= a[m] * aHist[m - noHistLen];

      dst[k] = res;
    }

    // Perform history-free part (fast)
    if (bLen == 3 && aLen == 2) {
      // Optimized special case: biquad filter
      var b0 = b[0], b1 = b[1], b2 = b[2], a1 = a[0], a2 = a[1];
      var x0 = x[k-1], x1 = x[k-2], x2;
      var y0 = dst[k-1], y1 = dst[k-2], y2;
      for (; k < xLen; ++k) {
        x2 = x1;
        x1 = x0;
        x0 = x[k];
        y2 = y1;
        y1 = y0;
        y0 = b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
        dst[k] = y0;
      }
    }
    else {
      // Generic case
      for (; k < xLen; ++k) {
        var m;

        // FIR part
        var res = b[0] * x[k];
        for (m = 1; m < bLen; ++m)
          res += b[m] * x[k - m];

        // Recursive part
        for (m = 0; m < aLen; ++m)
          res -= a[m] * dst[k - 1 - m];

        dst[k] = res;
      }
    }

    // Update history state
    var histCopy = Math.min(bLen - 1, xLen);
    for (k = bLen - 2; k >= histCopy; --k)
      bHist[k] = bHist[k - histCopy];
    for (k = 0; k < histCopy; ++k)
      bHist[k] = x[xLen - 1 - k];
    histCopy = Math.min(aLen, dstLen);
    for (k = aLen - 1; k >= histCopy; --k)
      aHist[k] = aHist[k - histCopy];
    for (k = 0; k < histCopy; ++k)
      aHist[k] = dst[xLen - 1 - k];
  };

  Filter.prototype.clearHistory = function () {
    for (var k = this._bHist.length - 1; k >= 0; --k)
      this._bHist[k] = 0;
    for (var k = this._aHist.length - 1; k >= 0; --k)
      this._aHist[k] = 0;
  };

  Filter.prototype.setB = function (values) {
    var len = Math.min(this._b.length, values.length);
    for (var k = 0; k < len; ++k)
      this._b[k] = values[k];
  };

  Filter.prototype.setA = function (values) {
    var len = Math.min(this._a.length, values.length);
    for (var k = 0; k < len; ++k)
      this._a[k] = values[k];
  };

  context.Filter = Filter;
})();


//------------------------------------------------------------------------------
// interface FFT
//
// NOTE: This is essentially a hand-translation of the C language Kiss FFT
// library, copyright by Mark Borgerding, relicensed with permission from the
// author.
//
// The algorithm implements mixed radix FFT and supports transforms of any size
// (not just powers of 2). For optimal performance, use sizes that can be
// factorized into factors 2, 3, 4 and 5.
//------------------------------------------------------------------------------

(function () {
  var context = typeof (window) !== "undefined" ? window :
    typeof (self) !== "undefined" ? self :
    typeof module !== "undefined" && module.exports ? module.exports :
    global;
    
  if (context.FFT) return;

  var butterfly2 = function (outRe, outIm, outIdx, stride, twRe, twIm, m) {
    var scratch0Re, scratch0Im,
        out0Re, out0Im, out1Re, out1Im,
        tRe, tIm;

    var tw1 = 0,
        idx0 = outIdx,
        idx1 = outIdx + m;

    var scale = 0.7071067811865475; // sqrt(1/2)
    var idx0End = idx0 + m;
    while (idx0 < idx0End) {
      // out0 = out[idx0] / sqrt(2)
      out0Re = outRe[idx0] * scale;
      out0Im = outIm[idx0] * scale;
      // out1 = out[idx1] / sqrt(2)
      out1Re = outRe[idx1] * scale;
      out1Im = outIm[idx1] * scale;

      // scratch0 = out1 * tw[tw1]
      tRe = twRe[tw1]; tIm = twIm[tw1];
      scratch0Re = out1Re * tRe - out1Im * tIm;
      scratch0Im = out1Re * tIm + out1Im * tRe;

      // out[idx1] = out0 - scratch0
      outRe[idx1] = out0Re - scratch0Re;
      outIm[idx1] = out0Im - scratch0Im;

      // out[idx0] = out0 + scratch0
      outRe[idx0] = out0Re + scratch0Re;
      outIm[idx0] = out0Im + scratch0Im;

      tw1 += stride;
      ++idx0; ++idx1;
    }
  };

  var butterfly3 = function (outRe, outIm, outIdx, stride, twRe, twIm, m) {
    var scratch0Re, scratch0Im, scratch1Re, scratch1Im,
        scratch2Re, scratch2Im, scratch3Re, scratch3Im,
        out0Re, out0Im, out1Re, out1Im, out2Re, out2Im,
        tRe, tIm;

    var tw1 = 0,
        tw2 = 0,
        stride2 = 2 * stride,
        idx0 = outIdx,
        idx1 = outIdx + m,
        idx2 = outIdx + 2 * m;

    var epi3Im = twIm[stride*m];

    var scale = 0.5773502691896258; // sqrt(1/3)
    var idx0End = idx0 + m;
    while (idx0 < idx0End) {
      // out0 = out[idx0] / sqrt(3)
      out0Re = outRe[idx0] * scale;
      out0Im = outIm[idx0] * scale;
      // out1 = out[idx1] / sqrt(3)
      out1Re = outRe[idx1] * scale;
      out1Im = outIm[idx1] * scale;
      // out2 = out[idx2] / sqrt(3)
      out2Re = outRe[idx2] * scale;
      out2Im = outIm[idx2] * scale;

      // scratch1 = out1 * tw[tw1]
      tRe = twRe[tw1]; tIm = twIm[tw1];
      scratch1Re = out1Re * tRe - out1Im * tIm;
      scratch1Im = out1Re * tIm + out1Im * tRe;

      // scratch2 = out2 * tw[tw2]
      tRe = twRe[tw2]; tIm = twIm[tw2];
      scratch2Re = out2Re * tRe - out2Im * tIm;
      scratch2Im = out2Re * tIm + out2Im * tRe;

      // scratch3 = scratch1 + scratch2
      scratch3Re = scratch1Re + scratch2Re;
      scratch3Im = scratch1Im + scratch2Im;

      // scratch0 = scratch1 - scratch2
      scratch0Re = scratch1Re - scratch2Re;
      scratch0Im = scratch1Im - scratch2Im;

      // out1 = out0 - scratch3 / 2
      out1Re = out0Re - scratch3Re * 0.5;
      out1Im = out0Im - scratch3Im * 0.5;

      // scratch0 *= epi3.i
      scratch0Re *= epi3Im;
      scratch0Im *= epi3Im;

      // out[idx0] = out0 + scratch3
      outRe[idx0] = out0Re + scratch3Re;
      outIm[idx0] = out0Im + scratch3Im;

      outRe[idx2] = out1Re + scratch0Im;
      outIm[idx2] = out1Im - scratch0Re;

      outRe[idx1] = out1Re - scratch0Im;
      outIm[idx1] = out1Im + scratch0Re;

      tw1 += stride; tw2 += stride2;
      ++idx0; ++idx1; ++idx2;
    }
  };

  var butterfly4 = function (outRe, outIm, outIdx, stride, twRe, twIm, m, inverse) {
    var scratch0Re, scratch0Im, scratch1Re, scratch1Im, scratch2Re, scratch2Im,
        scratch3Re, scratch3Im, scratch4Re, scratch4Im, scratch5Re, scratch5Im,
        out0Re, out0Im, out1Re, out1Im, out2Re, out2Im, out3Re, out3Im,
        tRe, tIm;

    var tw1 = 0,
        tw2 = 0,
        tw3 = 0,
        stride2 = 2 * stride,
        stride3 = 3 * stride,
        idx0 = outIdx,
        idx1 = outIdx + m,
        idx2 = outIdx + 2 * m,
        idx3 = outIdx + 3 * m;

    var scale = 0.5; // sqrt(1/4)
    var idx0End = idx0 + m;
    while (idx0 < idx0End) {
      // out0 = out[idx0] / sqrt(4)
      out0Re = outRe[idx0] * scale;
      out0Im = outIm[idx0] * scale;
      // out1 = out[idx1] / sqrt(4)
      out1Re = outRe[idx1] * scale;
      out1Im = outIm[idx1] * scale;
      // out2 = out[idx2] / sqrt(4)
      out2Re = outRe[idx2] * scale;
      out2Im = outIm[idx2] * scale;
      // out3 = out[idx3] / sqrt(4)
      out3Re = outRe[idx3] * scale;
      out3Im = outIm[idx3] * scale;

      // scratch0 = out1 * tw[tw1]
      tRe = twRe[tw1]; tIm = twIm[tw1];
      scratch0Re = out1Re * tRe - out1Im * tIm;
      scratch0Im = out1Re * tIm + out1Im * tRe;

      // scratch1 = out2 * tw[tw2]
      tRe = twRe[tw2]; tIm = twIm[tw2];
      scratch1Re = out2Re * tRe - out2Im * tIm;
      scratch1Im = out2Re * tIm + out2Im * tRe;

      // scratch2 = out3 * tw[tw3]
      tRe = twRe[tw3]; tIm = twIm[tw3];
      scratch2Re = out3Re * tRe - out3Im * tIm;
      scratch2Im = out3Re * tIm + out3Im * tRe;

      // scratch5 = out0 - scratch1
      scratch5Re = out0Re - scratch1Re;
      scratch5Im = out0Im - scratch1Im;

      // out0 += scratch1
      out0Re += scratch1Re;
      out0Im += scratch1Im;

      // scratch3 = scratch0 + scratch2
      scratch3Re = scratch0Re + scratch2Re;
      scratch3Im = scratch0Im + scratch2Im;

      // scratch4 = scratch0 - scratch2
      scratch4Re = scratch0Re - scratch2Re;
      scratch4Im = scratch0Im - scratch2Im;

      // out[idx2] = out0 - scratch3
      outRe[idx2] = out0Re - scratch3Re;
      outIm[idx2] = out0Im - scratch3Im;

      // out[idx0] = out0 + scratch3
      outRe[idx0] = out0Re + scratch3Re;
      outIm[idx0] = out0Im + scratch3Im;

      if (inverse) {
        outRe[idx1] = scratch5Re - scratch4Im;
        outIm[idx1] = scratch5Im + scratch4Re;
        outRe[idx3] = scratch5Re + scratch4Im;
        outIm[idx3] = scratch5Im - scratch4Re;
      }
      else {
        outRe[idx1] = scratch5Re + scratch4Im;
        outIm[idx1] = scratch5Im - scratch4Re;
        outRe[idx3] = scratch5Re - scratch4Im;
        outIm[idx3] = scratch5Im + scratch4Re;
      }

      tw1 += stride; tw2 += stride2; tw3 += stride3;
      ++idx0; ++idx1; ++idx2; ++idx3;
    }
  };

  var butterfly5 = function (outRe, outIm, outIdx, stride, twRe, twIm, m) {
    var scratch0Re, scratch0Im, scratch1Re, scratch1Im, scratch2Re, scratch2Im,
        scratch3Re, scratch3Im, scratch4Re, scratch4Im, scratch5Re, scratch5Im,
        scratch6Re, scratch6Im, scratch7Re, scratch7Im, scratch8Re, scratch8Im,
        scratch9Re, scratch9Im, scratch10Re, scratch10Im, scratch11Re, scratch11Im,
        scratch12Re, scratch12Im,
        out0Re, out0Im, out1Re, out1Im, out2Re, out2Im, out3Re, out3Im, out4Re, out4Im,
        tRe, tIm;

    var tw1 = 0,
        tw2 = 0,
        tw3 = 0,
        tw4 = 0,
        stride2 = 2 * stride,
        stride3 = 3 * stride,
        stride4 = 4 * stride;

    var idx0 = outIdx,
        idx1 = outIdx + m,
        idx2 = outIdx + 2 * m,
        idx3 = outIdx + 3 * m,
        idx4 = outIdx + 4 * m;

    // ya = tw[stride*m];
    var yaRe = twRe[stride * m],
        yaIm = twIm[stride * m];
    // yb = tw[stride*2*m];
    var ybRe = twRe[stride * 2 * m],
        ybIm = twIm[stride * 2 * m];

    var scale = 0.4472135954999579; // sqrt(1/5)
    var idx0End = idx0 + m;
    while (idx0 < idx0End) {
      // out0 = out[idx0] / sqrt(5)
      out0Re = outRe[idx0] * scale;
      out0Im = outIm[idx0] * scale;
      // out1 = out[idx1] / sqrt(5)
      out1Re = outRe[idx1] * scale;
      out1Im = outIm[idx1] * scale;
      // out2 = out[idx2] / sqrt(5)
      out2Re = outRe[idx2] * scale;
      out2Im = outIm[idx2] * scale;
      // out3 = out[idx3] / sqrt(5)
      out3Re = outRe[idx3] * scale;
      out3Im = outIm[idx3] * scale;
      // out4 = out[idx4] / sqrt(5)
      out4Re = outRe[idx4] * scale;
      out4Im = outIm[idx4] * scale;

      // scratch0 = out0;
      scratch0Re = out0Re;
      scratch0Im = out0Im;

      // scratch1 = out1 * tw[tw1]
      tRe = twRe[tw1]; tIm = twIm[tw1];
      scratch1Re = out1Re * tRe - out1Im * tIm;
      scratch1Im = out1Re * tIm + out1Im * tRe;
      // scratch2 = out2 * tw[tw2]
      tRe = twRe[tw2]; tIm = twIm[tw2];
      scratch2Re = out2Re * tRe - out2Im * tIm;
      scratch2Im = out2Re * tIm + out2Im * tRe;
      // scratch3 = out3 * tw[tw3]
      tRe = twRe[tw3]; tIm = twIm[tw3];
      scratch3Re = out3Re * tRe - out3Im * tIm;
      scratch3Im = out3Re * tIm + out3Im * tRe;
      // scratch4 = out4 * tw[tw4]
      tRe = twRe[tw4]; tIm = twIm[tw4];
      scratch4Re = out4Re * tRe - out4Im * tIm;
      scratch4Im = out4Re * tIm + out4Im * tRe;

      // scratch7 = scratch1 + scratch4
      scratch7Re = scratch1Re + scratch4Re;
      scratch7Im = scratch1Im + scratch4Im;
      // scratch10 = scratch1 - scratch4
      scratch10Re = scratch1Re - scratch4Re;
      scratch10Im = scratch1Im - scratch4Im;
      // scratch8 = scratch2 + scratch2
      scratch8Re = scratch2Re + scratch3Re;
      scratch8Im = scratch2Im + scratch3Im;
      // scratch9 = scratch2 - scratch3
      scratch9Re = scratch2Re - scratch3Re;
      scratch9Im = scratch2Im - scratch3Im;

      // out[idx0] = out0 + scratch7 + scratch8
      outRe[idx0] = out0Re + scratch7Re + scratch8Re;
      outIm[idx0] = out0Im + scratch7Im + scratch8Im;

      scratch5Re = scratch0Re + scratch7Re * yaRe + scratch8Re * ybRe;
      scratch5Im = scratch0Im + scratch7Im * yaRe + scratch8Im * ybRe;

      scratch6Re = scratch10Im * yaIm + scratch9Im * ybIm;
      scratch6Im = -scratch10Re * yaIm - scratch9Re * ybIm;

      // out[idx1] = scratch5 - scratch6
      outRe[idx1] = scratch5Re - scratch6Re;
      outIm[idx1] = scratch5Im - scratch6Im;
      // out[idx4] = scratch5 + scratch6
      outRe[idx4] = scratch5Re + scratch6Re;
      outIm[idx4] = scratch5Im + scratch6Im;

      scratch11Re = scratch0Re + scratch7Re * ybRe + scratch8Re * yaRe;
      scratch11Im = scratch0Im + scratch7Im * ybRe + scratch8Im * yaRe;

      scratch12Re = -scratch10Im * ybIm + scratch9Im * yaIm;
      scratch12Im = scratch10Re * ybIm - scratch9Re * yaIm;

      // out[idx2] = scratch11 + scratch12
      outRe[idx2] = scratch11Re + scratch12Re;
      outIm[idx2] = scratch11Im + scratch12Im;
      // out[idx3] = scratch11 - scratch12
      outRe[idx3] = scratch11Re - scratch12Re;
      outIm[idx3] = scratch11Im - scratch12Im;

      tw1 += stride; tw2 += stride2; tw3 += stride3; tw4 += stride4;
      ++idx0; ++idx1; ++idx2; ++idx3; ++idx4;
    }
  };

  var butterflyN = function (outRe, outIm, outIdx, stride, twRe, twIm, m, p, size) {
    var u, q1, q, idx0;
    var out0Re, out0Im, aRe, aIm, tRe, tIm;

    // FIXME: Allocate statically
    var scratchRe = new Float32Array(p);
    var scratchIm = new Float32Array(p);

    var scale = Math.sqrt(1 / p);
    for (u = 0; u < m; ++u) {
      idx0 = outIdx + u;
      for (q1 = 0; q1 < p; ++q1) {
        // scratch[q1] = out[idx0] / sqrt(p)
        scratchRe[q1] = outRe[idx0] * scale;
        scratchIm[q1] = outIm[idx0] * scale;
        idx0 += m;
      }

      idx0 = outIdx + u;
      var tw1Incr = stride * u;
      for (q1 = 0; q1 < p; ++q1) {
        // out0 = scratch[0]
        out0Re = scratchRe[0];
        out0Im = scratchIm[0];

        var tw1 = 0;
        for (q = 1; q < p; ++q) {
          tw1 += tw1Incr;
          if (tw1 >= size)
            tw1 -= size;

          // out0 += scratch[q] * tw[tw1]
          aRe = scratchRe[q], aIm = scratchIm[q];
          tRe = twRe[tw1], tIm = twIm[tw1];
          out0Re += aRe * tRe - aIm * tIm;
          out0Im += aRe * tIm + aIm * tRe;
        }

        // out[idx0] = out0
        outRe[idx0] = out0Re;
        outIm[idx0] = out0Im;

        idx0 += m;
        tw1Incr += stride;
      }
    }
  };

  var work = function (outRe, outIm, outIdx, fRe, fIm, fIdx, stride, inStride, factors, factorsIdx, twRe, twIm, size, inverse) {
    var p = factors[factorsIdx++];  // Radix
    var m = factors[factorsIdx++];  // Stage's FFT length / p

    var outIdxBeg = outIdx;
    var outIdxEnd = outIdx + p * m;

    var fIdxIncr = stride * inStride;
    if (m == 1) {
      do {
        outRe[outIdx] = fRe[fIdx];
        outIm[outIdx] = fIm[fIdx];
        fIdx += fIdxIncr;
        ++outIdx;
      }
      while (outIdx != outIdxEnd);
    }
    else {
      do {
        // DFT of size m*p performed by doing p instances of smaller DFTs of
        // size m, each one takes a decimated version of the input.
        work(outRe, outIm, outIdx, fRe, fIm, fIdx, stride * p, inStride, factors, factorsIdx, twRe, twIm, size, inverse);
        fIdx += fIdxIncr;
        outIdx += m;
      }
      while (outIdx != outIdxEnd);
    }

    outIdx = outIdxBeg;

    // Recombine the p smaller DFTs
    switch (p) {
      case 2:  butterfly2(outRe, outIm, outIdx, stride, twRe, twIm, m); break;
      case 3:  butterfly3(outRe, outIm, outIdx, stride, twRe, twIm, m); break;
      case 4:  butterfly4(outRe, outIm, outIdx, stride, twRe, twIm, m, inverse); break;
      case 5:  butterfly5(outRe, outIm, outIdx, stride, twRe, twIm, m); break;
      default: butterflyN(outRe, outIm, outIdx, stride, twRe, twIm, m, p, size); break;
    }
  };

  /*  facBuf is populated by p1,m1,p2,m2, ...
      where
      p[i] * m[i] = m[i-1]
      m0 = n                  */
  var factor = function (n, facBuf) {
    // Factor out powers of 4, powers of 2, then any remaining primes
    var p = 4;
    var floorSqrt = Math.floor(Math.sqrt(n));
    var idx = 0;
    do {
      while (n % p) {
        switch (p) {
          case 4:  p = 2; break;
          case 2:  p = 3; break;
          default: p += 2; break;
        }
        if (p > floorSqrt)
          p = n;
      }
      n = Math.floor(n / p);
      facBuf[idx++] = p;
      facBuf[idx++] = n;
    }
    while (n > 1);
  };

  var FFT = function (size) {
    if (!size)
      size = 256;
    Object.defineProperty(this, "size", {
      configurable: false,
      writable: false,
      value: size
    });

    // Allocate arrays for twiddle factors
    this._twiddlesFwdRe = new Float32Array(size);
    this._twiddlesFwdIm = new Float32Array(size);
    this._twiddlesInvRe = this._twiddlesFwdRe;
    this._twiddlesInvIm = new Float32Array(size);

    // Init twiddle factors (both forward & reverse)
    for (var i = 0; i < size; ++i) {
        var phase = -2 * Math.PI * i / size;
        var cosPhase = Math.cos(phase), sinPhase = Math.sin(phase);
        this._twiddlesFwdRe[i] = cosPhase;
        this._twiddlesFwdIm[i] = sinPhase;
        this._twiddlesInvIm[i] = -sinPhase;
    }

    // Allocate arrays for radix plan
    this._factors = new Int32Array(2 * 32);  // MAXFACTORS = 32

    // Init radix factors (mixed radix breakdown)
    // FIXME: Something seems to go wrong when using an FFT size that can be
    // factorized into more than one butterflyN (e.g. try an FFT size of 11*13).
    factor(size, this._factors);
  };

  FFT.prototype.forwardCplx = function (dstReal, dstImag, xReal, xImag) {
    var twRe = this._twiddlesFwdRe;
    var twIm = this._twiddlesFwdIm;
    work(dstReal, dstImag, 0, xReal, xImag, 0, 1, 1, this._factors, 0, twRe, twIm, this.size, false);
  };

  FFT.prototype.forward = function (dstReal, dstImag, x) {
    // FIXME: Optimize this case (real input signal)
    this.forwardCplx(dstReal, dstImag, x, new Float32Array(this.size));
  };

  FFT.prototype.inverseCplx = function (dstReal, dstImag, xReal, xImag) {
    var twRe = this._twiddlesInvRe;
    var twIm = this._twiddlesInvIm;
    work(dstReal, dstImag, 0, xReal, xImag, 0, 1, 1, this._factors, 0, twRe, twIm, this.size, true);
  };

  FFT.prototype.inverse = function (dst, xReal, xImag) {
    // FIXME: Optimize this case (real output signal)
    this.inverseCplx(dst, new Float32Array(this.size), xReal, xImag);
  };

  context.FFT = FFT;
})();
;
/** Random.js library.
 *
 * The code is licensed as LGPL.
*/

/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_genrand(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
 */

var Random = function(seed) {
	seed = (seed === undefined) ? (new Date()).getTime() : seed;
	if (typeof(seed) !== 'number'                             // ARG_CHECK
		|| Math.ceil(seed) != Math.floor(seed)) {             // ARG_CHECK
		throw new TypeError("seed value must be an integer"); // ARG_CHECK
	}                                                         // ARG_CHECK


	/* Period parameters */
	this.N = 624;
	this.M = 397;
	this.MATRIX_A = 0x9908b0df;   /* constant vector a */
	this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
	this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

	this.mt = new Array(this.N); /* the array for the state vector */
	this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

	//this.init_genrand(seed);
	this.init_by_array([seed], 1);
};

/* initializes mt[N] with a seed */
Random.prototype.init_genrand = function(s) {
	this.mt[0] = s >>> 0;
	for (this.mti=1; this.mti<this.N; this.mti++) {
		var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
		this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
		+ this.mti;
		/* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
		/* In the previous versions, MSBs of the seed affect   */
		/* only MSBs of the array mt[].                        */
		/* 2002/01/09 modified by Makoto Matsumoto             */
		this.mt[this.mti] >>>= 0;
		/* for >32 bit machines */
	}
};

/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
Random.prototype.init_by_array = function(init_key, key_length) {
	var i, j, k;
	this.init_genrand(19650218);
	i=1; j=0;
	k = (this.N>key_length ? this.N : key_length);
	for (; k; k--) {
		var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
		this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
		+ init_key[j] + j; /* non linear */
		this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
		i++; j++;
		if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
		if (j>=key_length) j=0;
	}
	for (k=this.N-1; k; k--) {
		var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
		this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
		- i; /* non linear */
		this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
		i++;
		if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
	}

	this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
};

/* generates a random number on [0,0xffffffff]-interval */
Random.prototype.genrand_int32 = function() {
	var y;
	var mag01 = new Array(0x0, this.MATRIX_A);
	/* mag01[x] = x * MATRIX_A  for x=0,1 */

	if (this.mti >= this.N) { /* generate N words at one time */
		var kk;

		if (this.mti == this.N+1)   /* if init_genrand() has not been called, */
			this.init_genrand(5489); /* a default initial seed is used */

		for (kk=0;kk<this.N-this.M;kk++) {
			y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
			this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		for (;kk<this.N-1;kk++) {
			y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
			this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
		this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

		this.mti = 0;
	}

	y = this.mt[this.mti++];

	/* Tempering */
	y ^= (y >>> 11);
	y ^= (y << 7) & 0x9d2c5680;
	y ^= (y << 15) & 0xefc60000;
	y ^= (y >>> 18);

	return y >>> 0;
};

/* generates a random number on [0,0x7fffffff]-interval */
Random.prototype.genrand_int31 = function() {
	return (this.genrand_int32()>>>1);
};

/* generates a random number on [0,1]-real-interval */
Random.prototype.genrand_real1 = function() {
	return this.genrand_int32()*(1.0/4294967295.0);
	/* divided by 2^32-1 */
};

/* generates a random number on [0,1)-real-interval */
Random.prototype.random = function() {
	if (this.pythonCompatibility) {
		if (this.skip) {
			this.genrand_int32();
		}
		this.skip = true;
	}
	return this.genrand_int32()*(1.0/4294967296.0);
	/* divided by 2^32 */
};

/* generates a random number on (0,1)-real-interval */
Random.prototype.genrand_real3 = function() {
	return (this.genrand_int32() + 0.5)*(1.0/4294967296.0);
	/* divided by 2^32 */
};

/* generates a random number on [0,1) with 53-bit resolution*/
Random.prototype.genrand_res53 = function() {
	var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6;
	return(a*67108864.0+b)*(1.0/9007199254740992.0);
};

/* These real versions are due to Isaku Wada, 2002/01/09 added */


/**************************************************************************/
Random.prototype.LOG4 = Math.log(4.0);
Random.prototype.SG_MAGICCONST = 1.0 + Math.log(4.5);

Random.prototype.exponential = function (lambda) {
	if (arguments.length != 1) {                         // ARG_CHECK
		throw new SyntaxError("exponential() must "     // ARG_CHECK
				+ " be called with 'lambda' parameter"); // ARG_CHECK
	}                                                   // ARG_CHECK

	var r = this.random();
	return -Math.log(r) / lambda;
};

Random.prototype.gamma = function (alpha, beta) {
	if (arguments.length != 2) {                         // ARG_CHECK
		throw new SyntaxError("gamma() must be called"  // ARG_CHECK
				+ " with alpha and beta parameters"); // ARG_CHECK
	}                                                   // ARG_CHECK

	/* Based on Python 2.6 source code of random.py.
	 */

	if (alpha > 1.0) {
		var ainv = Math.sqrt(2.0 * alpha - 1.0);
		var bbb = alpha - this.LOG4;
		var ccc = alpha + ainv;

		while (true) {
			var u1 = this.random();
			if ((u1 < 1e-7) || (u > 0.9999999)) {
				continue;
			}
			var u2 = 1.0 - this.random();
			var v = Math.log(u1 / (1.0 - u1)) / ainv;
			var x = alpha * Math.exp(v);
			var z = u1 * u1 * u2;
			var r = bbb + ccc * v - x;
			if ((r + this.SG_MAGICCONST - 4.5 * z >= 0.0) || (r >= Math.log(z))) {
				return x * beta;
			}
		}
	} else if (alpha == 1.0) {
		var u = this.random();
		while (u <= 1e-7) {
			u = this.random();
		}
		return - Math.log(u) * beta;
	} else {
		while (true) {
			var u = this.random();
			var b = (Math.E + alpha) / Math.E;
			var p = b * u;
			if (p <= 1.0) {
				var x = Math.pow(p, 1.0 / alpha);
			} else {
				var x = - Math.log((b - p) / alpha);
			}
			var u1 = this.random();
			if (p > 1.0) {
				if (u1 <= Math.pow(x, (alpha - 1.0))) {
					break;
				}
			} else if (u1 <= Math.exp(-x)) {
				break;
			}
		}
		return x * beta;
	}

};

Random.prototype.normal = function (mu, sigma) {
	if (arguments.length != 2) {                          // ARG_CHECK
		throw new SyntaxError("normal() must be called"  // ARG_CHECK
				+ " with mu and sigma parameters");      // ARG_CHECK
	}                                                    // ARG_CHECK

	var z = this.lastNormal;
	this.lastNormal = NaN;
	if (!z) {
		var a = this.random() * 2 * Math.PI;
		var b = Math.sqrt(-2.0 * Math.log(1.0 - this.random()));
		z = Math.cos(a) * b;
		this.lastNormal = Math.sin(a) * b;
	}
	return mu + z * sigma;
};

Random.prototype.pareto = function (alpha) {
	if (arguments.length != 1) {                         // ARG_CHECK
		throw new SyntaxError("pareto() must be called" // ARG_CHECK
				+ " with alpha parameter");             // ARG_CHECK
	}                                                   // ARG_CHECK

	var u = this.random();
	return 1.0 / Math.pow((1 - u), 1.0 / alpha);
};

Random.prototype.triangular = function (lower, upper, mode) {
	// http://en.wikipedia.org/wiki/Triangular_distribution
	if (arguments.length != 3) {                         // ARG_CHECK
		throw new SyntaxError("triangular() must be called" // ARG_CHECK
		+ " with lower, upper and mode parameters");    // ARG_CHECK
	}                                                   // ARG_CHECK

	var c = (mode - lower) / (upper - lower);
	var u = this.random();

	if (u <= c) {
		return lower + Math.sqrt(u * (upper - lower) * (mode - lower));
	} else {
		return upper - Math.sqrt((1 - u) * (upper - lower) * (upper - mode));
	}
};

Random.prototype.uniform = function (lower, upper) {
	if (arguments.length != 2) {                         // ARG_CHECK
		throw new SyntaxError("uniform() must be called" // ARG_CHECK
		+ " with lower and upper parameters");    // ARG_CHECK
	}                                                   // ARG_CHECK
	return lower + this.random() * (upper - lower);
};

Random.prototype.weibull = function (alpha, beta) {
	if (arguments.length != 2) {                         // ARG_CHECK
		throw new SyntaxError("weibull() must be called" // ARG_CHECK
		+ " with alpha and beta parameters");    // ARG_CHECK
	}                                                   // ARG_CHECK
	var u = 1.0 - this.random();
	return alpha * Math.pow(-Math.log(u), 1.0 / beta);
};

if (typeof window === "undefined" && typeof module !== "undefined" && module.exports) {
    module.exports = Random;
}
;/*! Flocking 0.1, Copyright 2011-2014 Colin Clark | flockingjs.org */

/*
 * Flocking - Creative audio synthesis for the Web!
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2011-2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require, Float32Array, window, AudioContext, webkitAudioContext*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    var $ = fluid.registerNamespace("jQuery");

    flock.fluid = fluid;

    flock.init = function (options) {
        var enviroOpts = !options ? undefined : {
            components: {
                audioSystem: {
                    options: {
                        model: options
                    }
                }
            }
        };

        var enviro = flock.enviro(enviroOpts);

        // flock.enviro.shared is deprecated. Use "flock.environment"
        // or an IoC reference to {enviro} instead
        flock.environment = flock.enviro.shared = enviro;

        return enviro;
    };

    flock.ALL_CHANNELS = 32; // TODO: This should go.
    flock.OUT_UGEN_ID = "flocking-out";

    flock.PI = Math.PI;
    flock.TWOPI = 2.0 * Math.PI;
    flock.HALFPI = Math.PI / 2.0;
    flock.LOG01 = Math.log(0.1);
    flock.LOG001 = Math.log(0.001);
    flock.ROOT2 = Math.sqrt(2);

    flock.rates = {
        AUDIO: "audio",
        CONTROL: "control",
        SCHEDULED: "scheduled",
        DEMAND: "demand",
        CONSTANT: "constant"
    };

    fluid.registerNamespace("flock.debug");
    flock.debug.failHard = true;

    flock.browser = function () {
        if (typeof navigator === "undefined") {
            return {};
        }

        // This is a modified version of jQuery's browser detection code,
        // which they removed from jQuery 2.0.
        // Some of us still have to live in the messy reality of the web.
        var ua = navigator.userAgent.toLowerCase(),
            browser = {},
            match,
            matched;

        match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

        matched = {
            browser: match[1] || "",
            version: match[2] || "0"
        };

        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }

        // Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }

        return browser;
    };

    // TODO: Move to components in the static environment and into the appropriate platform files.
    fluid.registerNamespace("flock.platform");
    flock.platform.isBrowser = typeof window !== "undefined";
    flock.platform.hasRequire = typeof require !== "undefined";
    flock.platform.os = flock.platform.isBrowser ? window.navigator.platform : fluid.require("os").platform();
    flock.platform.isLinux = flock.platform.os.indexOf("Linux") > -1;
    flock.platform.isAndroid = flock.platform.isLinux && flock.platform.os.indexOf("arm") > -1;
    flock.platform.isIOS = flock.platform.os === "iPhone" || flock.platform.os === "iPad" || flock.platform.os === "iPod";
    flock.platform.isMobile = flock.platform.isAndroid || flock.platform.isIOS;
    flock.platform.browser = flock.browser();
    flock.platform.isWebAudio = typeof AudioContext !== "undefined" || typeof webkitAudioContext !== "undefined";
    flock.platform.audioEngine = flock.platform.isBrowser ? "webAudio" : "nodejs";

    flock.shim = {
        URL: flock.platform.isBrowser ? (window.URL || window.webkitURL || window.msURL) : undefined
    };


    flock.requireModule = function (moduleName, globalName) {
        if (flock.platform.isBrowser) {
            return window[globalName || moduleName];
        }

        if (!flock.platform.hasRequire) {
            return undefined;
        }

        var resolvedName = flock.requireModule.paths[moduleName] || moduleName;
        var togo = require(resolvedName);

        return globalName ? togo[globalName] : togo;
    };

    flock.requireModule.paths = {
        webarraymath: "../third-party/webarraymath/js/webarraymath.js",
        Random: "../third-party/simjs/js/random-0.26.js"
    };

    /*************
     * Utilities *
     *************/

    flock.noOp = function () {};

    flock.isIterable = function (o) {
        var type = typeof o;
        return o && o.length !== undefined && type !== "string" && type !== "function";
    };

    flock.hasTag = function (obj, tag) {
        if (!obj || !tag) {
            return false;
        }
        return obj.tags && obj.tags.indexOf(tag) > -1;
    };

    // TODO: Chrome profiler marks this function as unoptimized.
    // This should probably be factored into separate functions for
    // new and existing arrays. (e.g. "generate" vs. "fill")
    flock.generate = function (bufOrSize, generator) {
        var buf = typeof bufOrSize === "number" ? new Float32Array(bufOrSize) : bufOrSize,
            isFunc = typeof generator === "function",
            i;

        for (i = 0; i < buf.length; i++) {
            buf[i] = isFunc ? generator(i, buf) : generator;
        }

        return buf;
    };

    flock.generate.silence = function (bufOrSize) {
        if (typeof bufOrSize === "number") {
            return new Float32Array(bufOrSize);
        }

        var buf = bufOrSize,
            i;
        for (i = 0; i < buf.length; i++) {
            buf[i] = 0.0;
        }
        return buf;
    };

    /**
     * Performs an in-place reversal of all items in the array.
     *
     * @arg {Iterable} b a buffer or array to reverse
     * @return {Iterable} the buffer, reversed
     */
    flock.reverse = function (b) {
        if (!b || !flock.isIterable(b) || b.length < 2) {
            return b;
        }

        // A native implementation of reverse() exists for regular JS arrays
        // and is partially implemented for TypedArrays. Use it if possible.
        if (typeof b.reverse === "function") {
            return b.reverse();
        }

        var t;
        for (var l = 0, r = b.length - 1; l < r; l++, r--) {
            t = b[l];
            b[l] = b[r];
            b[r] = t;
        }

        return b;
    };

    /**
     * Randomly selects an index from the specified array.
     */
    flock.randomIndex = function (arr) {
        var max = arr.length - 1;
        return Math.round(Math.random() * max);
    };

    /**
     * Randomly selects an item from an array-like object.
     *
     * @param {Array-like object} arr the array to choose from
     * @param {Function} a selection strategy; defaults to flock.randomIndex
     * @return a randomly selected list item
     */
    flock.arrayChoose = function (arr, strategy) {
        strategy = strategy || flock.randomIndex;
        arr = fluid.makeArray(arr);
        var idx = strategy(arr);
        return arr[idx];
    };

    /**
     * Randomly selects an item from an array or object.
     *
     * @param {Array-like object|Object} collection the object to choose from
     * @return a randomly selected item from collection
     */
    flock.choose = function (collection, strategy) {
        var key, val;

        if (flock.isIterable(collection)) {
            val = flock.arrayChoose(collection, strategy);
            return val;
        }

        key = flock.arrayChoose(collection.keys, strategy);
        val = collection[key];
        return val;
    };

    /**
     * Normalizes the specified buffer in place to the specified value.
     *
     * @param {Arrayable} buffer the buffer to normalize
     * @param {Number} normal the value to normalize the buffer to
     * @param {Arrayable} a buffer to output values into; if omitted, buffer will be modified in place
     * @return the buffer, normalized in place
     */
    flock.normalize = function (buffer, normal, output) {
        output = output || buffer;

        var maxVal = 0.0,
            i,
            current,
            val;

        normal = normal === undefined ? 1.0 : normal;
        // Find the maximum value in the buffer.
        for (i = 0; i < buffer.length; i++) {
            current = Math.abs(buffer[i]);
            if (current > maxVal) {
                maxVal = current;
            }
        }

        // And then normalize the buffer in place.
        if (maxVal > 0.0) {
            for (i = 0; i < buffer.length; i++) {
                val = buffer[i];
                output[i] = (val / maxVal) * normal;
            }
        }

        return output;
    };

    flock.generateFourierTable = function (size, scale, numHarms, phase, amps) {
        phase *= flock.TWOPI;

        return flock.generate(size, function (i) {
            var harm,
                amp,
                w,
                val = 0.0;

            for (harm = 0; harm < numHarms; harm++) {
                amp = amps ? amps[harm] : 1.0;
                w = (harm + 1) * (i * scale);
                val += amp * Math.cos(w + phase);
            }

            return val;
        });
    };

    flock.generateNormalizedFourierTable = function (size, scale, numHarms, phase, ampGenFn) {
        var amps = flock.generate(numHarms, function (harm) {
            return ampGenFn(harm + 1); //  Harmonics are indexed from 1 instead of 0.
        });

        var table = flock.generateFourierTable(size, scale, numHarms, phase, amps);
        return flock.normalize(table);
    };

    flock.fillTable = function (sizeOrTable, fillFn) {
        var len = typeof (sizeOrTable) === "number" ? sizeOrTable : sizeOrTable.length;
        return fillFn(sizeOrTable, flock.TWOPI / len);
    };

    flock.tableGenerators = {
        sin: function (size, scale) {
            return flock.generate(size, function (i) {
                return Math.sin(i * scale);
            });
        },

        tri: function (size, scale) {
            return flock.generateNormalizedFourierTable(size, scale, 1000, 1.0, function (harm) {
                // Only odd harmonics,
                // amplitudes decreasing by the inverse square of the harmonic number
                return harm % 2 === 0 ? 0.0 : 1.0 / (harm * harm);
            });
        },

        saw: function (size, scale) {
            return flock.generateNormalizedFourierTable(size, scale, 10, -0.25, function (harm) {
                // All harmonics,
                // amplitudes decreasing by the inverse of the harmonic number
                return 1.0 / harm;
            });
        },

        square: function (size, scale) {
            return flock.generateNormalizedFourierTable(size, scale, 10, -0.25, function (harm) {
                // Only odd harmonics,
                // amplitudes decreasing by the inverse of the harmonic number
                return harm % 2 === 0 ? 0.0 : 1.0 / harm;
            });
        },

        hann: function (size) {
            // Hanning envelope: sin^2(i) for i from 0 to pi
            return flock.generate(size, function (i) {
                var y = Math.sin(Math.PI * i / size);
                return y * y;
            });
        },

        sinWindow: function (size) {
            return flock.generate(size, function (i) {
                return Math.sin(Math.PI * i / size);
            });
        }
    };

    flock.range = function (buf) {
        var range = {
            max: Number.NEGATIVE_INFINITY,
            min: Infinity
        };
        var i, val;

        for (i = 0; i < buf.length; i++) {
            val = buf[i];
            if (val > range.max) {
                range.max = val;
            }
            if (val < range.min) {
                range.min = val;
            }
        }

        return range;
    };

    flock.scale = function (buf) {
        if (!buf) {
            return;
        }

        var range = flock.range(buf),
            mul = (range.max - range.min) / 2,
            sub = (range.max + range.min) / 2,
            i;

        for (i = 0; i < buf.length; i++) {
            buf[i] = (buf[i] - sub) / mul;
        }

        return buf;
    };

    flock.copyBuffer = function (buffer, start, end) {
        if (end === undefined) {
            end = buffer.length;
        }

        var len = end - start,
            target = new Float32Array(len),
            i,
            j;

        for (i = start, j = 0; i < end; i++, j++) {
            target[j] = buffer[i];
        }

        return target;
    };

    flock.parseMidiString = function (midiStr) {
        if (!midiStr || midiStr.length < 2) {
            return NaN;
        }

        midiStr = midiStr.toLowerCase();

        var secondChar = midiStr.charAt(1),
            splitIdx = secondChar === "#" || secondChar === "b" ? 2 : 1,
            note = midiStr.substring(0, splitIdx),
            octave = Number(midiStr.substring(splitIdx)),
            pitchClass = flock.midiFreq.noteNames[note],
            midiNum = octave * 12 + pitchClass;

        return midiNum;
    };

    flock.midiFreq = function (midi, a4Freq, a4NoteNum, notesPerOctave) {
        a4Freq = a4Freq === undefined ? 440 : a4Freq;
        a4NoteNum = a4NoteNum === undefined ? 69 : a4NoteNum;
        notesPerOctave = notesPerOctave || 12;

        if (typeof midi === "string") {
            midi = flock.parseMidiString(midi);
        }

        return a4Freq * Math.pow(2, (midi - a4NoteNum) * 1 / notesPerOctave);
    };

    flock.midiFreq.noteNames = {
        "b#": 0,
        "c": 0,
        "c#": 1,
        "db": 1,
        "d": 2,
        "d#": 3,
        "eb": 3,
        "e": 4,
        "e#": 5,
        "f": 5,
        "f#": 6,
        "gb": 6,
        "g": 7,
        "g#": 8,
        "ab": 8,
        "a": 9,
        "a#": 10,
        "bb": 10,
        "b": 11,
        "cb": 11
    };

    flock.interpolate = {
        /**
         * Performs simple truncation.
         */
        none: function (idx, table) {
            idx = idx % table.length;

            return table[idx | 0];
        },

        /**
         * Performs linear interpolation.
         */
        linear: function (idx, table) {
            var len = table.length;
            idx = idx % len;

            var i1 = idx | 0,
                i2 = (i1 + 1) % len,
                frac = idx - i1,
                y1 = table[i1],
                y2 = table[i2];

            return y1 + frac * (y2 - y1);
        },

        /**
         * Performs Hermite cubic interpolation.
         *
         * Based on Laurent De Soras' implementation at:
         * http://www.musicdsp.org/showArchiveComment.php?ArchiveID=93
         *
         * @param idx {Number} an index into the table
         * @param table {Arrayable} the table from which values around idx should be drawn and interpolated
         * @return {Number} an interpolated value
         */
        hermite: function (idx, table) {
            var len = table.length,
                intPortion = Math.floor(idx),
                i0 = intPortion % len,
                frac = idx - intPortion,
                im1 = i0 > 0 ? i0 - 1 : len - 1,
                i1 = (i0 + 1) % len,
                i2 = (i0 + 2) % len,
                xm1 = table[im1],
                x0 = table[i0],
                x1 = table[i1],
                x2 = table[i2],
                c = (x1 - xm1) * 0.5,
                v = x0 - x1,
                w = c + v,
                a = w + v + (x2 - x0) * 0.5,
                bNeg = w + a,
                val = (((a * frac) - bNeg) * frac + c) * frac + x0;

            return val;
        }
    };

    flock.interpolate.cubic = flock.interpolate.hermite;

    flock.log = {
        fail: function (msg) {
            fluid.log(fluid.logLevel.FAIL, msg);
        },

        warn: function (msg) {
            fluid.log(fluid.logLevel.WARN, msg);
        },

        debug: function (msg) {
            fluid.log(fluid.logLevel.INFO, msg);
        }
    };

    flock.fail = function (msg) {
        if (flock.debug.failHard) {
            throw new Error(msg);
        } else {
            flock.log.fail(msg);
        }
    };

    flock.pathParseError = function (root, path, token) {
        var msg = "Error parsing path '" + path + "'. Segment '" + token +
            "' could not be resolved. Root object was: " + fluid.prettyPrintJSON(root);

        flock.fail(msg);
    };

    flock.get = function (root, path) {
        if (!root) {
            return fluid.getGlobalValue(path);
        }

        if (arguments.length === 1 && typeof root === "string") {
            return fluid.getGlobalValue(root);
        }

        if (!path || path === "") {
            return;
        }

        var tokenized = path === "" ? [] : String(path).split("."),
            valForSeg = root[tokenized[0]],
            i;

        for (i = 1; i < tokenized.length; i++) {
            if (valForSeg === null || valForSeg === undefined) {
                flock.pathParseError(root, path, tokenized[i - 1]);
                return;
            }
            valForSeg = valForSeg[tokenized[i]];
        }

        return valForSeg;
    };

    flock.set = function (root, path, value) {
        if (!root || !path || path === "") {
            return;
        }

        var tokenized = String(path).split("."),
            l = tokenized.length,
            prop = tokenized[0],
            i,
            type;

        for (i = 1; i < l; i++) {
            root = root[prop];
            type = typeof root;
            if (type !== "object") {
                flock.fail("Error while setting a value at path '" + path +
                    "'. A non-container object was found at segment '" + prop + "'. Value: " + root);

                return;
            }
            prop = tokenized[i];
            if (root[prop] === undefined) {
                root[prop] = {};
            }
        }
        root[prop] = value;

        return value;
    };

    flock.invoke = function (root, path, args) {
        var fn = typeof root === "function" ? root : flock.get(root, path);
        if (typeof fn !== "function") {
            flock.fail("Path '" + path + "' does not resolve to a function.");
            return;
        }
        return fn.apply(null, args);
    };


    flock.input = {};

    flock.input.shouldExpand = function (inputName) {
        return flock.parse.specialInputs.indexOf(inputName) < 0;
    };

    // TODO: Replace this with a regular expression;
    // this produces too much garbage!
    flock.input.pathExpander = function (path) {
        var segs = fluid.model.parseEL(path),
            separator = "inputs",
            len = segs.length,
            penIdx = len - 1,
            togo = [],
            i;

        for (i = 0; i < penIdx; i++) {
            var seg = segs[i];
            var nextSeg = segs[i + 1];

            togo.push(seg);

            if (nextSeg === "model" || nextSeg === "options") {
                togo = togo.concat(segs.slice(i + 1, penIdx));
                break;
            }

            if (!isNaN(Number(nextSeg))) {
                continue;
            }

            togo.push(separator);
        }

        togo.push(segs[penIdx]);

        return togo.join(".");
    };

    flock.input.expandPaths = function (paths) {
        var expanded = {},
            path,
            expandedPath,
            value;

        for (path in paths) {
            expandedPath = flock.input.pathExpander(path);
            value = paths[path];
            expanded[expandedPath] = value;
        }

        return expanded;
    };

    flock.input.expandPath = function (path) {
        return (typeof path === "string") ? flock.input.pathExpander(path) : flock.input.expandPaths(path);
    };

    flock.input.getValueForPath = function (root, path) {
        path = flock.input.expandPath(path);
        var input = flock.get(root, path);

        // If the unit generator is a valueType ugen, return its value, otherwise return the ugen itself.
        return flock.hasTag(input, "flock.ugen.valueType") ? input.inputs.value : input;
    };

    flock.input.getValuesForPathArray = function (root, paths) {
        var values = {},
            i,
            path;

        for (i = 0; i < paths.length; i++) {
            path = paths[i];
            values[path] = flock.input.get(root, path);
        }

        return values;
    };

    flock.input.getValuesForPathObject = function (root, pathObj) {
        var key;

        for (key in pathObj) {
            pathObj[key] = flock.input.get(root, key);
        }

        return pathObj;
    };

    /**
     * Gets the value of the ugen at the specified path.
     *
     * @param {String} path the ugen's path within the synth graph
     * @return {Number|UGen} a scalar value in the case of a value ugen, otherwise the ugen itself
     */
    flock.input.get = function (root, path) {
        return typeof path === "string" ? flock.input.getValueForPath(root, path) :
            flock.isIterable(path) ? flock.input.getValuesForPathArray(root, path) :
            flock.input.getValuesForPathObject(root, path);
    };

    flock.input.resolveValue = function (root, path, val, target, inputName, previousInput, valueParser) {
        // Check to see if the value is actually a "get expression"
        // (i.e. an EL path wrapped in ${}) and resolve it if necessary.
        if (typeof val === "string") {
            var extracted = fluid.extractEL(val, flock.input.valueExpressionSpec);
            if (extracted) {
                var resolved = flock.input.getValueForPath(root, extracted);
                if (resolved === undefined) {
                    flock.log.debug("The value expression '" + val + "' resolved to undefined. " +
                    "If this isn't expected, check to ensure that your path is valid.");
                }

                return resolved;
            }
        }

        return flock.input.shouldExpand(inputName) && valueParser ?
            valueParser(val, path, target, previousInput) : val;
    };

    flock.input.valueExpressionSpec = {
        ELstyle: "${}"
    };

    flock.input.setValueForPath = function (root, path, val, baseTarget, valueParser) {
        path = flock.input.expandPath(path);

        var previousInput = flock.get(root, path),
            lastDotIdx = path.lastIndexOf("."),
            inputName = path.slice(lastDotIdx + 1),
            target = lastDotIdx > -1 ? flock.get(root, path.slice(0, path.lastIndexOf(".inputs"))) :
                baseTarget,
            resolvedVal = flock.input.resolveValue(root, path, val, target, inputName, previousInput, valueParser);

        flock.set(root, path, resolvedVal);

        if (target && target.onInputChanged) {
            target.onInputChanged(inputName);
        }

        return resolvedVal;
    };

    flock.input.setValuesForPaths = function (root, valueMap, baseTarget, valueParser) {
        var resultMap = {},
            path,
            val,
            result;

        for (path in valueMap) {
            val = valueMap[path];
            result = flock.input.set(root, path, val, baseTarget, valueParser);
            resultMap[path] = result;
        }

        return resultMap;
    };

    /**
     * Sets the value of the ugen at the specified path.
     *
     * @param {String} path the ugen's path within the synth graph
     * @param {Number || UGenDef} val a scalar value (for Value ugens) or a UGenDef object
     * @return {UGen} the newly created UGen that was set at the specified path
     */
    flock.input.set = function (root, path, val, baseTarget, valueParser) {
        return typeof path === "string" ?
            flock.input.setValueForPath(root, path, val, baseTarget, valueParser) :
            flock.input.setValuesForPaths(root, path, baseTarget, valueParser);
    };


    fluid.defaults("flock.nodeList", {
        gradeNames: ["fluid.component"],

        members: {
            nodes: [],
            namedNodes: {}
        },

        invokers: {
            insert: {
                funcName: "flock.nodeList.insert",
                // TODO: Backwards arguments?
                args: [
                    "{arguments}.0", // The index to insert it at.
                    "{arguments}.1", // The node to insert.
                    "{that}.nodes",
                    "{that}.events.onInsert.fire"
                ]
            },

            head: {
                func: "{that}.insert",
                args: [0, "{arguments}.0"]
            },

            tail: {
                funcName: "flock.nodeList.tail",
                args: ["{arguments}.0", "{that}.nodes", "{that}.insert"]
            },

            before: {
                funcName: "flock.nodeList.before",
                args: [
                    "{arguments}.0", // Reference node.
                    "{arguments}.1", // Node to add.
                    "{that}.nodes",
                    "{that}.insert"
                ]
            },

            after: {
                funcName: "flock.nodeList.after",
                args: [
                    "{arguments}.0", // Reference node.
                    "{arguments}.1", // Node to add.
                    "{that}.nodes",
                    "{that}.insert"
                ]
            },

            remove: {
                funcName: "flock.nodeList.remove",
                args: [
                    "{arguments}.0", // Node to remove.
                    "{that}.nodes",
                    "{that}.events.onRemove.fire"
                ]
            },

            replace: {
                funcName: "flock.nodeList.replace",
                args: [
                    // TODO: Backwards arguments?
                    "{arguments}.0", // New node.
                    "{arguments}.1", // Old node.
                    "{that}.nodes",
                    "{that}.head",
                    "{that}.events.onRemove.fire",
                    "{that}.events.onInsert.fire"
                ]
            },

            clearAll: {
                func: "{that}.events.onClearAll.fire"
            }
        },

        events: {
            onInsert: null,
            onRemove: null,
            onClearAll: null
        },

        listeners: {
            onClearAll: [
                {
                    func: "fluid.clear",
                    args: "{that}.nodes"
                },
                {
                    func: "fluid.clear",
                    args: "{that}.namedNodes"
                }
            ],

            onInsert: {
                funcName: "flock.nodeList.registerNode",
                args: ["{arguments}.0", "{that}.namedNodes"]
            },

            onRemove: {
                funcName: "flock.nodeList.unregisterNode",
                args: ["{arguments}.0", "{that}.namedNodes"]
            }
        }
    });

    flock.nodeList.insert = function (idx, node, nodes, onInsert) {
        if (idx < 0) {
            idx = 0;
        }

        nodes.splice(idx, 0, node);
        onInsert(node, idx);

        return idx;
    };

    flock.nodeList.registerNode = function (node, namedNodes) {
        var name = node.name || node.id;
        if (name) {
            namedNodes[name] = node;
        }
    };

    flock.nodeList.before = function (refNode, node, nodes, insertFn) {
        var refIdx = nodes.indexOf(refNode);
        return insertFn(refIdx, node);
    };

    flock.nodeList.after = function (refNode, node, nodes, insertFn) {
        var refIdx = nodes.indexOf(refNode),
            atIdx = refIdx + 1;

        return insertFn(atIdx, node);
    };

    flock.nodeList.tail = function (node, nodes, insertFn) {
        var idx = nodes.length;
        return insertFn(idx, node);
    };

    flock.nodeList.remove = function (node, nodes, onRemove) {
        var idx = nodes.indexOf(node);
        if (idx > -1) {
            nodes.splice(idx, 1);
            onRemove(node);
        }

        return idx;
    };

    flock.nodeList.unregisterNode = function (node, namedNodes) {
        var name = node.name || node.id;
        if (name) {
            delete namedNodes[name];
        }
    };

    flock.nodeList.replace = function (newNode, oldNode, nodes, notFoundFn, onRemove, onInsert) {
        var idx = nodes.indexOf(oldNode);
        if (idx < 0) {
            return notFoundFn(newNode);
        }

        nodes[idx] = newNode;
        onRemove(oldNode);
        onInsert(newNode);

        return idx;
    };


    /***********************
     * Synths and Playback *
     ***********************/

    fluid.defaults("flock.audioSystem", {
        gradeNames: ["fluid.modelComponent"],

        channelRange: {
            min: 1,
            max: 32
        },

        outputBusRange: {
            min: 2,
            max: 1024
        },

        inputBusRange: {
            min: 1, // TODO: This constraint should be removed.
            max: 32
        },

        model: {
            rates: {
                audio: 44100,
                control: 689.0625,
                scheduled: 0,
                demand: 0,
                constant: 0
            },
            blockSize: 64,
            numBlocks: 16,
            chans: 2,
            numInputBuses: 2,
            numBuses: 8,
            bufferSize: "@expand:flock.audioSystem.defaultBufferSize()"
        },

        modelRelay: [
            {
                target: "rates.control",
                singleTransform: {
                    type: "fluid.transforms.binaryOp",
                    left: "{that}.model.rates.audio",
                    operator: "/",
                    right: "{that}.model.blockSize"
                }
            },
            {
                target: "numBlocks",
                singleTransform: {
                    type: "fluid.transforms.binaryOp",
                    left: "{that}.model.bufferSize",
                    operator: "/",
                    right: "{that}.model.blockSize"
                }
            },
            {
                target: "chans",
                singleTransform: {
                    type: "fluid.transforms.limitRange",
                    input: "{that}.model.chans",
                    min: "{that}.options.channelRange.min",
                    max: "{that}.options.channelRange.max"
                }
            },
            {
                target: "numInputBuses",
                singleTransform: {
                    type: "fluid.transforms.limitRange",
                    input: "{that}.model.numInputBuses",
                    min: "{that}.options.inputBusRange.min",
                    max: "{that}.options.inputBusRange.max"
                }
            },
            {
                target: "numBuses",
                singleTransform: {
                    type: "fluid.transforms.free",
                    func: "flock.audioSystem.clampNumBuses",
                    args: ["{that}.model.numBuses", "{that}.options.outputBusRange", "{that}.model.chans"]
                }
            }
        ]
    });

    flock.audioSystem.clampNumBuses = function (numBuses, outputBusRange, chans) {
        numBuses = Math.max(numBuses, Math.max(chans, outputBusRange.min));
        numBuses = Math.min(numBuses, outputBusRange.max);

        return numBuses;
    };

    flock.audioSystem.defaultBufferSize = function () {
        return flock.platform.isMobile ? 8192 :
            flock.platform.browser.mozilla ? 2048 : 1024;
    };


    /*****************
     * Node Evalutor *
     *****************/

    fluid.defaults("flock.nodeEvaluator", {
        gradeNames: ["fluid.modelComponent"],

        model: "{audioSystem}.model",

        members: {
            nodes: "{enviro}.nodes",
            buses: "{busManager}.buses"
        },

        invokers: {
            gen: {
                funcName: "flock.nodeEvaluator.gen",
                args: ["{that}.nodes"]
            },

            clearBuses: {
                funcName: "flock.nodeEvaluator.clearBuses",
                args: [
                    "{that}.model.numBuses",
                    "{that}.model.blockSize",
                    "{that}.buses"
                ]
            }
        }
    });

    flock.nodeEvaluator.gen = function (nodes) {
        var i,
            node;

        // Now evaluate each node.
        for (i = 0; i < nodes.length; i++) {
            node = nodes[i];
            node.genFn(node);
        }
    };


    flock.nodeEvaluator.clearBuses = function (numBuses, busLen, buses) {
        for (var i = 0; i < numBuses; i++) {
            var bus = buses[i];
            for (var j = 0; j < busLen; j++) {
                bus[j] = 0;
            }
        }
    };


    // TODO: Refactor how buses work so that they're clearly
    // delineated into types--input, output, and interconnect.
    // TODO: Get rid of the concept of buses altogether.
    fluid.defaults("flock.busManager", {
        gradeNames: ["fluid.modelComponent"],

        model: {
            nextAvailableBus: {
                input: 0,
                interconnect: 0
            }
        },

        members: {
            buses: {
                expander: {
                    funcName: "flock.enviro.createAudioBuffers",
                    args: ["{audioSystem}.model.numBuses", "{audioSystem}.model.blockSize"]
                }
            }
        },

        invokers: {
            acquireNextBus: {
                funcName: "flock.busManager.acquireNextBus",
                args: [
                    "{arguments}.0", // The type of bus, either "input" or "interconnect".
                    "{that}.buses",
                    "{that}.applier",
                    "{that}.model",
                    "{audioSystem}.model.chans",
                    "{audioSystem}.model.numInputBuses"
                ]
            }
        }
    });

    flock.busManager.acquireNextBus = function (type, buses, applier, m, chans, numInputBuses) {
        var busNum = m.nextAvailableBus[type];

        if (busNum === undefined) {
            flock.fail("An invalid bus type was specified when invoking " +
                "flock.busManager.acquireNextBus(). Type was: " + type);
            return;
        }

        // Input buses start immediately after the output buses.
        var offsetBusNum = busNum + chans,
            offsetBusMax = chans + numInputBuses;

        // Interconnect buses are after the input buses.
        if (type === "interconnect") {
            offsetBusNum += numInputBuses;
            offsetBusMax = buses.length;
        }

        if (offsetBusNum >= offsetBusMax) {
            flock.fail("Unable to aquire a bus. There are insufficient buses available. " +
                "Please use an existing bus or configure additional buses using the enviroment's " +
                "numBuses and numInputBuses parameters.");
            return;
        }

        applier.change("nextAvailableBus." + type, ++busNum);

        return offsetBusNum;
    };


    fluid.defaults("flock.outputManager", {
        gradeNames: ["fluid.modelComponent"],

        model: {
            audioSettings: "{audioSystem}.model"
        },

        invokers: {
            start: "{that}.events.onStart.fire()",
            stop: "{that}.events.onStop.fire()",
            reset: "{that}.events.onReset.fire"
        },

        events: {
            onStart: "{enviro}.events.onStart",
            onStop: "{enviro}.events.onStop",
            onReset: "{enviro}.events.onReset"
        }
    });

    // TODO: Factor out buffer logic into a separate component.
    fluid.defaults("flock.enviro", {
        gradeNames: [
            "flock.nodeList",
            "fluid.modelComponent",
            "fluid.resolveRootSingle"
        ],

        singleRootType: "flock.enviro",

        members: {
            buffers: {},
            bufferSources: {}
        },

        components: {
            asyncScheduler: {
                type: "flock.scheduler.async"
            },

            nodeEvaluator: {
                type: "flock.nodeEvaluator"
            },

            audioSystem: {
                type: "flock.audioSystem"
            },

            busManager: {
                type: "flock.busManager"
            }
        },

        model: {
            isPlaying: false
        },

        invokers: {
            /**
             * Generates a block of samples by evaluating all registered nodes.
             */
            gen: "flock.enviro.gen({that}.nodeEvaluator)",

            /**
             * Starts generating samples from all synths.
             *
             * @param {Number} dur optional duration to play in seconds
             */
            start: "flock.enviro.start({that}.model, {that}.events.onStart.fire)",

            /**
             * Deprecated. Use start() instead.
             */
            play: "{that}.start",

            /**
             * Stops generating samples.
             */
            stop: "flock.enviro.stop({that}.model, {that}.events.onStop.fire)",


            /**
             * Fully resets the state of the environment.
             */
            reset: "{that}.events.onReset.fire()",

            /**
             * Registers a shared buffer.
             *
             * @param {BufferDesc} bufDesc the buffer description object to register
             */
            registerBuffer: "flock.enviro.registerBuffer({arguments}.0, {that}.buffers)",

            /**
             * Releases a shared buffer.
             *
             * @param {String|BufferDesc} bufDesc the buffer description (or string id) to release
             */
            releaseBuffer: "flock.enviro.releaseBuffer({arguments}.0, {that}.buffers)",

            /**
             * Saves a buffer to the user's computer.
             *
             * @param {String|BufferDesc} id the id of the buffer to save
             * @param {String} path the path to save the buffer to (if relevant)
             */
            saveBuffer: {
                funcName: "flock.enviro.saveBuffer",
                args: [
                    "{arguments}.0",
                    "{that}.buffers",
                    "{audioSystem}"
                ]
            }
        },

        events: {
            onStart: null,
            onPlay: "{that}.events.onStart", // Deprecated. Use onStart instead.
            onStop: null,
            onReset: null
        },

        listeners: {
            onStart: [
                "{that}.applier.change(isPlaying, true)",
            ],

            onStop: [
                "{that}.applier.change(isPlaying, false)"
            ],

            onReset: [
                "{that}.stop()",
                "{asyncScheduler}.clearAll()",
                {
                    func: "{that}.applier.change",
                    args: ["nextAvailableBus.input", []]
                },
                {
                    func: "{that}.applier.change",
                    args: ["nextAvailableBus.interconnect", []]
                },
                "{that}.clearAll()"
            ]
        }
    });

    flock.enviro.registerBuffer = function (bufDesc, buffers) {
        if (bufDesc.id) {
            buffers[bufDesc.id] = bufDesc;
        }
    };

    flock.enviro.releaseBuffer = function (bufDesc, buffers) {
        if (!bufDesc) {
            return;
        }

        var id = typeof bufDesc === "string" ? bufDesc : bufDesc.id;
        delete buffers[id];
    };

    flock.enviro.saveBuffer = function (o, buffers, audioSystem) {
        if (typeof o === "string") {
            o = {
                buffer: o
            };
        }

        if (typeof o.buffer === "string") {
            var id = o.buffer;
            o.buffer = buffers[id];
            o.buffer.id = id;
        }

        o.type = o.type || "wav";
        o.path = o.path || o.buffer.id + "." + o.type;
        o.format = o.format || "int16";

        return audioSystem.bufferWriter.save(o, o.buffer);
    };

    flock.enviro.gen = function (nodeEvaluator) {
        nodeEvaluator.clearBuses();
        nodeEvaluator.gen();
    };

    flock.enviro.start = function (model, onStart) {
        if (!model.isPlaying) {
            onStart();
        }
    };

    flock.enviro.stop = function (model, onStop) {
        if (model.isPlaying) {
            onStop();
        }
    };

    flock.enviro.createAudioBuffers = function (numBufs, blockSize) {
        var bufs = [],
            i;
        for (i = 0; i < numBufs; i++) {
            bufs[i] = new Float32Array(blockSize);
        }
        return bufs;
    };


    fluid.defaults("flock.autoEnviro", {
        gradeNames: ["fluid.component"],

        members: {
            enviro: "@expand:flock.autoEnviro.initEnvironment()"
        }
    });

    flock.autoEnviro.initEnvironment = function () {
        if (!flock.environment) {
            flock.init();
        }

        return flock.environment;
    };


    fluid.defaults("flock.node", {
        gradeNames: ["flock.autoEnviro", "fluid.modelComponent"],

        addToEnvironment: "tail",

        model: {},

        members: {
            genFn: "@expand:fluid.getGlobalValue({that}.options.invokers.gen.funcName)"
        },

        components: {
            enviro: "{flock.enviro}"
        },

        invokers: {
            /**
             * Plays the node. This is a convenience method that will add the
             * node to the tail of the environment's node graph and then play
             * the environmnent.
             *
             * @param {Number} dur optional duration to play this synth in seconds
             */
            play: {
                funcName: "flock.node.play",
                args: ["{that}", "{that}.enviro", "{that}.addToEnvironment"]
            },

            /**
             * Stops the synth if it is currently playing.
             * This is a convenience method that will remove the synth from the environment's node graph.
             */
            pause: {
                funcName: "flock.node.removeFromEnvironment",
                args: ["{that}", "{that}.enviro"]
            },

            /**
             * Must be overridden by implementing grades.
             */
            gen: {
                funcName: "fluid.notImplemented"
            },

            /**
             * Adds the node to its environment's list of active nodes.
             *
             * @param {String || Boolean || Number} position the place to insert the node at;
             *     if undefined, the node's addToEnvironment option will be used.
             */
            addToEnvironment: {
                funcName: "flock.node.addToEnvironment",
                args: ["{that}", "{arguments}.0", "{that}.options", "{that}.enviro"]
            },

            /**
             * Removes the node from its environment's list of active nodes.
             */
            removeFromEnvironment: {
                funcName: "flock.node.removeFromEnvironment",
                args: ["{that}", "{arguments}.0"]
            }
        },

        listeners: {
            onCreate: [
                "{that}.addToEnvironment({that}.options.addToEnvironment)"
            ],

            onDestroy: [
                "{that}.removeFromEnvironment()"
            ]
        }
    });

    flock.node.addToEnvironment = function (node, position, enviro) {
        if (position === undefined) {
            position = node.options.addToEnvironment;
        }

        enviro = enviro || node.enviro;

        // Add this node to the tail of the synthesis environment if appropriate.
        if (position === undefined || position === null || position === false) {
            return;
        }

        var type = typeof (position);
        if (type === "string" && position === "head" || position === "tail") {
            node.enviro[position](node);
        } else if (type === "number") {
            node.enviro.insert(position, node);
        } else {
            node.enviro.tail(node);
        }
    };

    flock.node.removeFromEnvironment = function (node, enviro) {
        enviro = enviro || node.enviro;
        enviro.remove(node);
    };

    flock.node.play = function (node, enviro, addToEnviroFn) {
        if (enviro.nodes.indexOf(node) === -1) {
            var position = node.options.addToEnvironment || "tail";
            addToEnviroFn(position);
        }

        // TODO: This behaviour is confusing
        // since calling mySynth.play() will cause
        // all synths in the environment to be played.
        // This functionality should be removed.
        if (!enviro.model.isPlaying) {
            enviro.play();
        }
    };


    fluid.defaults("flock.noteTarget", {
        gradeNames: "fluid.component",

        noteChanges: {
            on: {
                "env.gate": 1
            },

            off: {
                "env.gate": 0
            }
        },

        invokers: {
            set: {
                funcName: "fluid.notImplemented"
            },

            noteOn: {
                func: "{that}.events.noteOn.fire"
            },

            noteOff: {
                func: "{that}.events.noteOff.fire"
            },

            noteChange: {
                funcName: "flock.noteTarget.change",
                args: [
                    "{that}",
                    "{arguments}.0", // The type of note; either "on" or "off"
                    "{arguments}.1"  // The change to apply for this note.
                ]
            }
        },

        events: {
            noteOn: null,
            noteOff: null
        },

        listeners: {
            "noteOn.handleChange": [
                "{that}.noteChange(on, {arguments}.0)"
            ],

            "noteOff.handleChange": [
                "{that}.noteChange(off, {arguments}.0)"
            ]
        }
    });

    flock.noteTarget.change = function (that, type, changeSpec) {
        var baseChange = that.options.noteChanges[type];
        var mergedChange = $.extend({}, baseChange, changeSpec);
        that.set(mergedChange);
    };


    fluid.defaults("flock.ugenNodeList", {
        gradeNames: ["flock.nodeList"],

        invokers: {
            /**
             * Inserts a unit generator and all its inputs into the node list,
             * starting at the specified index.
             *
             * Note that the node itself will not be inserted into the list at this index;
             * its inputs must must be ahead of it in the list.
             *
             * @param {Number} idx the index to start adding the new node and its inputs at
             * @param {UGen} node the node to add, along with its inputs
             * @return {Number} the index at which the specified node was inserted
             */
            insertTree: {
                funcName: "flock.ugenNodeList.insertTree",
                args: [
                    "{arguments}.0", // The index at whcih to add the new node.
                    "{arguments}.1", // The node to add.
                    "{that}.insert"
                ]
            },

            /**
             * Removes the specified unit generator and all its inputs from the node list.
             *
             * @param {UGen} node the node to remove along with its inputs
             * @return {Number} the index at which the node was removed
             */
            removeTree: {
                funcName: "flock.ugenNodeList.removeTree",
                args: [
                    "{arguments}.0", // The node to remove.
                    "{that}.remove"
                ]
            },

            /**
             * Replaces one node and all its inputs with a new node and its inputs.
             *
             * @param {UGen} newNode the node to add to the list
             * @param {UGen} oldNode the node to remove from the list
             * @return {Number} idx the index at which the new node was added
             */
            //flock.ugenNodeList.replaceTree = function (newNode, oldNode, insertFn, removeFn) {
            replaceTree: {
                funcName: "flock.ugenNodeList.replaceTree",
                args: [
                    "{arguments}.0", // The node to add.
                    "{arguments}.1", // The node to replace.
                    "{that}.nodes",
                    "{that}.insert",
                    "{that}.remove"
                ]
            },

            /**
             * Swaps one node in the list for another in place, attaching the previous unit generator's
             * inputs to the new one. If a list of inputsToReattach is specified, only these inputs will
             * be swapped.
             *
             * Note that this function will directly modify the nodes in question.
             *
             * @param {UGen} newNode the node to add to the list, swapping it in place for the old one
             * @param {UGen} oldNode the node remove from the list
             * @param {Array} inputsToReattach a list of inputNames to attach to the new node from the old one
             * @return the index at which the new node was inserted
             */
            //flock.ugenNodeList.swapTree = function (newNode, oldNode, inputsToReattach, removeFn, replaceTreeFn, replaceFn) {

            swapTree: {
                funcName: "flock.ugenNodeList.swapTree",
                args: [
                    "{arguments}.0", // The node to add.
                    "{arguments}.1", // The node to replace.
                    "{arguments}.2", // A list of inputs to attach to the new node from the old.
                    "{that}.remove",
                    "{that}.replaceTree",
                    "{that}.replace"
                ]
            }
        }
    });

    flock.ugenNodeList.insertTree = function (idx, node, insertFn) {
        var inputs = node.inputs,
            key,
            input;

        for (key in inputs) {
            input = inputs[key];
            if (flock.isUGen(input)) {
                idx = flock.ugenNodeList.insertTree(idx, input, insertFn);
                idx++;
            }
        }

        return insertFn(idx, node);
    };

    flock.ugenNodeList.removeTree = function (node, removeFn) {
        var inputs = node.inputs,
            key,
            input;

        for (key in inputs) {
            input = inputs[key];
            if (flock.isUGen(input)) {
                flock.ugenNodeList.removeTree(input, removeFn);
            }
        }

        return removeFn(node);
    };

    flock.ugenNodeList.replaceTree = function (newNode, oldNode, nodes, insertFn, removeFn) {
        if (!oldNode) {
             // Can't use .tail() because it won't recursively add inputs.
            return flock.ugenNodeList.insertTree(nodes.length, newNode, insertFn);
        }

        var idx = flock.ugenNodeList.removeTree(oldNode, removeFn);
        flock.ugenNodeList.insertTree(idx, newNode, insertFn);

        return idx;
    };

    flock.ugenNodeList.swapTree = function (newNode, oldNode, inputsToReattach, removeFn, replaceTreeFn, replaceFn) {
        if (!inputsToReattach) {
            newNode.inputs = oldNode.inputs;
        } else {
            flock.ugenNodeList.reattachInputs(newNode, oldNode, inputsToReattach, removeFn);
            flock.ugenNodeList.replaceInputs(newNode, oldNode, inputsToReattach, replaceTreeFn);
        }

        return replaceFn(newNode, oldNode);
    };

    flock.ugenNodeList.reattachInputs = function (newNode, oldNode, inputsToReattach, removeFn) {
        for (var inputName in oldNode.inputs) {
            if (inputsToReattach.indexOf(inputName) < 0) {
                flock.ugenNodeList.removeTree(oldNode.inputs[inputName], removeFn);
            } else {
                newNode.inputs[inputName] = oldNode.inputs[inputName];
            }
        }
    };

    flock.ugenNodeList.replaceInputs = function (newNode, oldNode, inputsToReattach, replaceTreeFn) {
        for (var inputName in newNode.inputs) {
            if (inputsToReattach.indexOf(inputName) < 0) {
                replaceTreeFn(
                    newNode.inputs[inputName],
                    oldNode.inputs[inputName]
                );
            }
        }
    };


    /**
     * Synths represent a collection of signal-generating units,
     * wired together to form an instrument.
     * They are created with a synthDef object, which is a declarative structure
     * that describes the synth's unit generator graph.
     */
    fluid.defaults("flock.synth", {
        gradeNames: ["flock.node", "flock.noteTarget"],

        rate: flock.rates.AUDIO,

        addToEnvironment: true,

        members: {
            rate: "{that}.options.rate",
            audioSettings: "{enviro}.audioSystem.model" // TODO: Move this.
        },

        model: {
            blockSize: "@expand:flock.synth.calcBlockSize({that}.rate, {enviro}.audioSystem.model)"
        },

        components: {
            ugens: {
                type: "flock.synth.ugenTree"
            }
        },

        invokers: {
            /**
             * Sets the value of the ugen at the specified path.
             *
             * @param {String} path the ugen's path within the synth graph
             * @param {Number || UGenDef} val a scalar value (for Value ugens) or a UGenDef object
             * @param {Boolean} swap ??
             * @return {UGen} the newly created UGen that was set at the specified path
             */
            set: {
                funcName: "flock.synth.set",
                args: ["{that}", "{ugenTree}.namedNodes", "{arguments}.0", "{arguments}.1", "{arguments}.2"]
            },

            /**
             * Gets the value of the ugen at the specified path.
             *
             * @param {String} path the ugen's path within the synth graph
             * @return {Number|UGen} a scalar value in the case of a value ugen, otherwise the ugen itself
             */
            get: {
                funcName: "flock.input.get",
                args: ["{ugenTree}.namedNodes", "{arguments}.0"]
            },

            /**
             * Deprecated.
             *
             * Gets or sets the value of a ugen at the specified path
             *
             * @param {String} path the ugen's path within the synth graph
             * @param {Number || UGenDef || Array} val an optional value to to set--a scalar value, a UGenDef object, or an array of UGenDefs
             * @param {Boolean || Object} swap specifies if the existing inputs should be swapped onto the new value
             * @return {Number || UGenDef || Array} the value that was set or retrieved
             */
            input: {
                funcName: "flock.synth.input",
                args: [
                    "{arguments}",
                    "{that}.get",
                    "{that}.set"
                ]
            },

            /**
             * Generates one block of audio rate signal by evaluating this synth's unit generator graph.
             */
            gen: {
                funcName: "flock.synth.gen",
                args: "{that}"
            }
        }
    });

    flock.synth.calcBlockSize = function (rate, audioSettings) {
        return rate === flock.rates.AUDIO ? audioSettings.blockSize : 1;
    };

    flock.synth.set = function (that, namedNodes, path, val, swap) {
        return flock.input.set(namedNodes, path, val, undefined, function (ugenDef, path, target, prev) {
            return flock.synth.ugenValueParser(that, ugenDef, prev, swap);
        });
    };

    flock.synth.gen = function (that) {
        var nodes = that.ugens.nodes,
            m = that.model,
            i,
            node;

        for (i = 0; i < nodes.length; i++) {
            node = nodes[i];
            if (node.gen !== undefined) {
                node.gen(node.model.blockSize); // TODO: De-thatify.
            }

            m.value = node.model.value;
        }
    };

    flock.synth.input = function (args, getFn, setFn) {
        //path, val, swap
        var path = args[0];

        return !path ? undefined : typeof path === "string" ?
            args.length < 2 ? getFn(path) : setFn.apply(null, args) :
            flock.isIterable(path) ? getFn(path) : setFn.apply(null, args);
    };

    // TODO: Reduce all these dependencies on "that" (i.e. a synth instance).
    flock.synth.ugenValueParser = function (that, ugenDef, prev, swap) {
        if (ugenDef === null || ugenDef === undefined) {
            return prev;
        }

        var parsed = flock.parse.ugenDef(ugenDef, {
            audioSettings: that.audioSettings,
            buses: that.enviro.buses,
            buffers: that.enviro.buffers
        });

        var newUGens = flock.isIterable(parsed) ? parsed : (parsed !== undefined ? [parsed] : []),
            oldUGens = flock.isIterable(prev) ? prev : (prev !== undefined ? [prev] : []);

        var replaceLen = Math.min(newUGens.length, oldUGens.length),
            replaceFn = swap ? that.ugens.swapTree : that.ugens.replaceTree,
            i,
            atIdx,
            j;

        // TODO: Improve performance by handling arrays inline instead of repeated function calls.
        for (i = 0; i < replaceLen; i++) {
            atIdx = replaceFn(newUGens[i], oldUGens[i]);
        }

        for (j = i; j < newUGens.length; j++) {
            atIdx++;
            that.ugens.insertTree(atIdx, newUGens[j]);
        }

        for (j = i; j < oldUGens.length; j++) {
            that.ugens.removeTree(oldUGens[j]);
        }

        return parsed;
    };

    // TODO: Should this also take on the role of evaluating nodes?
    // TODO: Naming.
    fluid.defaults("flock.synth.ugenTree", {
        gradeNames: "flock.ugenNodeList",

        synthDef: "{synth}.options.synthDef",
        rate: "{synth}.options.rate",

        members: {
            root: null
        },

        listeners: {
            onCreate: [
                {
                    funcName: "flock.synth.ugenTree.instantiateUGens",
                    args: [
                        "{that}",
                        "{enviro}"
                    ]
                }
            ]
        }
    });

    flock.synth.ugenTree.instantiateUGens = function (that, enviro) {
        if (!that.options.synthDef) {
            fluid.log(fluid.logLevel.IMPORTANT,
                "Warning: Instantiating a flock.synth instance with an empty synth def.");
        }

        // At demand or schedule rates, override the rate of all non-constant ugens.
        var rate = that.options.rate;
        var overrideRate = rate === flock.rates.SCHEDULED ||
            rate === flock.rates.DEMAND;

        // Parse the synthDef into a graph of unit generators.
        that.root = flock.parse.synthDef(that.options.synthDef, {
            rate: rate,
            overrideRate: overrideRate,
            visitors: that.tail,
            buffers: enviro.buffers,
            buses: enviro.busManager.buses,
            audioSettings: enviro.audioSystem.model
        });
    };


    fluid.defaults("flock.synth.value", {
        gradeNames: ["flock.synth"],

        rate: "demand",

        addToEnvironment: false,

        invokers: {
            value: {
                funcName: "flock.synth.value.genValue",
                args: ["{that}.model", "{that}.gen"]
            }
        }
    });

    flock.synth.value.genValue = function (m, genFn) {
        genFn(1);
        return m.value;
    };


    fluid.defaults("flock.synth.frameRate", {
        gradeNames: ["flock.synth.value"],

        rate: "scheduled",

        fps: 60,

        audioSettings: {
            rates: {
                scheduled: "{that}.options.fps"
            }
        }
    });


    /*******************************
     * Error Handling Conveniences *
     *******************************/

    flock.bufferDesc = function () {
        throw new Error("flock.bufferDesc is not defined. Did you forget to include the buffers.js file?");
    };
}());
;/*
 * Flocking Synth Group
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2011-2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    fluid.defaults("flock.synth.group", {
        gradeNames: ["flock.node", "flock.noteTarget", "flock.nodeList"],

        methodEventMap: {
            "onSet": "set"
        },

        invokers: {
            play: "{that}.events.onPlay.fire",
            pause: "{that}.events.onPause.fire",
            set: "{that}.events.onSet.fire",
            get: "flock.synth.group.get({arguments}, {that}.nodes)",

            // Deprecated. Use set() instead.
            input: {
                funcName: "flock.synth.group.input",
                args: ["{arguments}", "{that}.get", "{that}.events.onSet.fire"]
            },

            gen: {
                funcName: "flock.synth.group.gen",
                args: "{that}"
            }
        },

        events: {
            onSet: null,
            onGen: null,
            onPlay: null,
            onPause: null
        },

        listeners: {
            onInsert: [
                {
                    funcName: "flock.synth.group.bindMethods",
                    args: [
                        "{arguments}.0", // The newly added node.
                        "{that}.options.methodEventMap",
                        "{that}.events",
                        "addListener"
                    ]
                },

                {
                    funcName: "flock.node.removeFromEnvironment",
                    args: ["{arguments}.0", "{that}.enviro"]
                }
            ],

            onRemove: {
                funcName: "flock.synth.group.bindMethods",
                args: [
                    "{arguments}.0", // The removed node.
                    "{that}.options.methodEventMap",
                    "{that}.events",
                    "removeListener"
                ]
            }
        }
    });

    flock.synth.group.gen = function (that) {
        flock.nodeEvaluator.gen(that.nodes);
    };

    flock.synth.group.get = function (args, nodes) {
        var tailIdx = nodes.length - 1,
            tailNode = nodes[tailIdx];

        return tailNode.get.apply(tailNode, args);
    };

    flock.synth.group.input = function (args, onGet, onSet) {
        var evt = args.length > 1 ? onSet : onGet;
        return evt.apply(null, args);
    };

    flock.synth.group.bindMethods = function (node, methodEventMap, events, eventActionName) {
        for (var eventName in methodEventMap) {
            var methodName = methodEventMap[eventName],
                method = node[methodName],
                firer = events[eventName],
                eventAction = firer[eventActionName];

            eventAction(method);
        }
    };
}());
;/*
 * Flocking Polyphonic Synth
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2011-2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    var $ = fluid.registerNamespace("jQuery");

    fluid.defaults("flock.synth.polyphonic", {
        gradeNames: ["flock.synth.group"],

        maxVoices: 16,
        amplitudeNormalizer: "static", // "dynamic", "static", Function, falsey
        amplitudeKey: "env.sustain",

        // Deprecated. Will be removed in Flocking 0.3.0.
        // Use "noteChanges" instead.
        noteSpecs: "{that}.options.noteChanges",

        distributeOptions: {
            source: "{that}.options.voiceAllocatorOptions",
            target: "{that flock.synth.voiceAllocator}.options",
            removeSource: true
        },

        voiceAllocatorOptions: {
            synthDef: "{polyphonic}.options.synthDef",
            maxVoices: "{polyphonic}.options.maxVoices",
            amplitudeNormalizer: "{polyphonic}.options.amplitudeNormalizer",
            amplitudeKey: "{polyphonic}.options.amplitudeKey",

            listeners: {
                onCreateVoice: "{polyphonic}.tail({arguments}.0)"
            }
        },

        components: {
            voiceAllocator: {
                type: "flock.synth.voiceAllocator.lazy"
            }
        },

        invokers: {
            noteChange: {
                funcName: "flock.synth.polyphonic.noteChange",
                args: [
                    "{that}",
                    "{arguments}.0", // The note event name (i.e. "on" or "off").
                    "{arguments}.1", // The voice to change.
                    "{arguments}.2" // The note change specification to apply.
                ]
            },

            createVoice: {
                func: "{voiceAllocator}.createVoice",
                args: ["{that}.options", "{that}.insert"]
            }
        },

        listeners: {
            "noteOn.handleChange": [
                {
                    funcName: "flock.synth.polyphonic.noteOn",
                    args: [
                        "{that}",
                        "{arguments}.0", // The voice name.
                        "{arguments}.1" // [optional] a change specification to apply for this note.
                    ]
                }
            ],

            "noteOff.handleChange": [
                {
                    funcName: "flock.synth.polyphonic.noteOff",
                    args: [
                        "{that}",
                        "{arguments}.0", // The voice name.
                        "{arguments}.1" // [optional] a change specification to apply for this note.
                    ]
                }
            ]
        }
    });

    flock.synth.polyphonic.noteChange = function (that, type, voice, changeSpec) {
        var changeBase = that.options.noteChanges[type];
        var mergedChange = $.extend({}, changeBase, changeSpec);
        voice.set(mergedChange);
    };

    flock.synth.polyphonic.noteOn = function (that, voiceName, changeSpec) {
        var voice = that.voiceAllocator.getFreeVoice();
        if (that.voiceAllocator.activeVoices[voiceName]) {
            that.noteOff(voiceName);
        }
        that.voiceAllocator.activeVoices[voiceName] = voice;
        that.noteChange("on", voice, changeSpec);

        return voice;
    };

    flock.synth.polyphonic.noteOff = function (that, voiceName, changeSpec) {
        var voice = that.voiceAllocator.activeVoices[voiceName];
        if (!voice) {
            return null;
        }

        that.noteChange("off", voice, changeSpec);
        delete that.voiceAllocator.activeVoices[voiceName];
        that.voiceAllocator.freeVoices.push(voice);

        return voice;
    };

    fluid.defaults("flock.synth.voiceAllocator", {
        gradeNames: ["fluid.component"],

        maxVoices: 16,
        amplitudeNormalizer: "static", // "dynamic", "static", Function, falsey
        amplitudeKey: "env.sustain",

        members: {
            activeVoices: {},
            freeVoices: []
        },

        invokers: {
            createVoice: {
                funcName: "flock.synth.voiceAllocator.createVoice",
                args: ["{that}.options", "{that}.events.onCreateVoice.fire"]
            }
        },

        events: {
            onCreateVoice: null
        }
    });


    flock.synth.voiceAllocator.createVoice = function (options, onCreateVoice) {
        var voice = flock.synth({
            synthDef: options.synthDef,
            addToEnvironment: false
        });

        var normalizer = options.amplitudeNormalizer,
            ampKey = options.amplitudeKey,
            normValue;

        if (normalizer) {
            if (typeof normalizer === "function") {
                normalizer(voice, ampKey);
            } else if (normalizer === "static") {
                normValue = 1.0 / options.maxVoices;
                voice.input(ampKey, normValue);
            }
            // TODO: Implement dynamic voice normalization.
        }

        onCreateVoice(voice);

        return voice;
    };

    fluid.defaults("flock.synth.voiceAllocator.lazy", {
        gradeNames: ["flock.synth.voiceAllocator"],

        invokers: {
            getFreeVoice: {
                funcName: "flock.synth.voiceAllocator.lazy.get",
                args: [
                    "{that}.freeVoices",
                    "{that}.activeVoices",
                    "{that}.createVoice",
                    "{that}.options.maxVoices"
                ]
            }
        }
    });

    flock.synth.voiceAllocator.lazy.get = function (freeVoices, activeVoices, createVoiceFn, maxVoices) {
        return freeVoices.length > 1 ?
            freeVoices.pop() : Object.keys(activeVoices).length > maxVoices ?
            null : createVoiceFn();
    };

    fluid.defaults("flock.synth.voiceAllocator.pool", {
        gradeNames: ["flock.synth.voiceAllocator"],

        invokers: {
            getFreeVoice: "flock.synth.voiceAllocator.pool.get({that}.freeVoices)"
        }
    });

    flock.synth.voiceAllocator.pool.get = function (freeVoices) {
        if (freeVoices.length > 0) {
            return freeVoices.pop();
        }
    };

    flock.synth.voiceAllocator.pool.allocateVoices = function (freeVoices, createVoiceFn, maxVoices) {
        for (var i = 0; i < maxVoices; i++) {
            freeVoices[i] = createVoiceFn();
        }
    };
}());
;/*
 * Flocking Band
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2013-2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion");

(function () {
    "use strict";

    /**
     * flock.band provides an IoC-friendly interface for a collection of named synths.
     */
    // TODO: Unit tests.
    fluid.defaults("flock.band", {
        gradeNames: ["fluid.component"],

        invokers: {
            play: {
                func: "{that}.events.onPlay.fire"
            },

            pause: {
                func: "{that}.events.onPause.fire"
            },

            set: {
                func: "{that}.events.onSet.fire"
            }
        },

        events: {
            onPlay: null,
            onPause: null,
            onSet: null
        },

        distributeOptions: [
            {
                source: "{that}.options.childListeners",
                removeSource: true,
                target: "{that fluid.component}.options.listeners"
            },
            {
                source: "{that}.options.synthListeners",
                removeSource: true,
                target: "{that flock.synth}.options.listeners"
            }
        ],

        childListeners: {
            "{band}.events.onDestroy": {
                func: "{that}.destroy"
            }
        },

        synthListeners: {
            "{band}.events.onPlay": {
                func: "{that}.play"
            },

            "{band}.events.onPause": {
                func: "{that}.pause"
            },

            "{band}.events.onSet": {
                func: "{that}.set"
            }
        }
    });
}());
;/*
* Flocking Audio Buffers
* http://github.com/colinbdclark/flocking
*
* Copyright 2013-14, Colin Clark
* Dual licensed under the MIT and GPL Version 2 licenses.
*/

/*global require, AudioBuffer*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    // Based on Brian Cavalier and John Hann's Tiny Promises library.
    // https://github.com/unscriptable/promises/blob/master/src/Tiny2.js
    function Promise() {
        var resolve = function (result) {
            complete("resolve", result);
            promise.state = "fulfilled";
        };

        var reject = function (err) {
            complete("reject", err);
            promise.state = "rejected";
        };

        var then = function (resolve, reject) {
            if (callbacks) {
                callbacks.push({
                    resolve: resolve,
                    reject: reject
                });
            } else {
                var fn = promise.state === "fulfilled" ? resolve : reject;
                fn(promise.value);
            }

            return this;
        };

        var callbacks = [],
            promise = {
                state: "pending",
                value: undefined,
                resolve: resolve,
                reject: reject,
                then: then,
                safe: {
                    then: function safeThen(resolve, reject) {
                        promise.then(resolve, reject);
                        return this;
                    }
                }
            };


        function complete(type, result) {
            var rejector = function (resolve, reject) {
                reject(result);
                return this;
            };

            var resolver = function (resolve) {
                resolve(result);
                return this;
            };

            promise.value = result;
            promise.then = type === "reject" ? rejector : resolver;
            promise.resolve = promise.reject = function () {
                throw new Error("Promise already completed");
            };

            invokeCallbacks(type, result);
        }

        function invokeCallbacks (type, result) {
            var i,
                cb;

            for (i = 0; i < callbacks.length; i++) {
                cb = callbacks[i];

                if (cb[type]) {
                    cb[type](result);
                }
            }

            callbacks = null;
        }

        return promise;
    }

    fluid.defaults("flock.promise", {
        gradeNames: ["fluid.component"],

        members: {
            promise: {
                expander: {
                    funcName: "flock.promise.make"
                }
            }
        }
    });

    flock.promise.make = function () {
        return new Promise();
    };

    // TODO: This is actually part of the interpreter's expansion process
    // and should be clearly named as such.
    flock.bufferDesc = function (data, sampleRate, numChannels) {
        var fn = flock.platform.isWebAudio && data instanceof AudioBuffer ?
            flock.bufferDesc.fromAudioBuffer : flock.isIterable(data) ?
            flock.bufferDesc.fromChannelArray : flock.bufferDesc.expand;

        return fn(data, sampleRate, numChannels);
    };

    flock.bufferDesc.inferFormat = function (bufDesc, sampleRate, numChannels) {
        var format = bufDesc.format,
            data = bufDesc.data;

        format.sampleRate = sampleRate || format.sampleRate || 44100;
        format.numChannels = numChannels || format.numChannels || bufDesc.data.channels.length;
        format.numSampleFrames = format.numSampleFrames ||
            data.channels.length > 0 ? data.channels[0].length : 0;
        format.duration = format.numSampleFrames / format.sampleRate;

        return bufDesc;
    };

    flock.bufferDesc.fromChannelArray = function (arr, sampleRate, numChannels) {
        if (arr instanceof Float32Array) {
            arr = [arr];
        }

        var bufDesc = {
            container: {},

            format: {
                numChannels: numChannels,
                sampleRate: sampleRate,
                numSampleFrames: arr[0].length
            },

            data: {
                channels: arr
            }
        };

        return flock.bufferDesc.inferFormat(bufDesc, sampleRate, numChannels);
    };

    flock.bufferDesc.expand = function (bufDesc, sampleRate, numChannels) {
        bufDesc = bufDesc || {
            data: {
                channels: []
            }
        };

        bufDesc.container = bufDesc.container || {};
        bufDesc.format = bufDesc.format || {};
        bufDesc.format.numChannels = numChannels ||
            bufDesc.format.numChannels || bufDesc.data.channels.length; // TODO: Duplication with inferFormat.

        if (bufDesc.data && bufDesc.data.channels) {
            // Special case for an unwrapped single-channel array.
            if (bufDesc.format.numChannels === 1 && bufDesc.data.channels.length !== 1) {
                bufDesc.data.channels = [bufDesc.data.channels];
            }

            if (bufDesc.format.numChannels !== bufDesc.data.channels.length) {
                throw new Error("The specified number of channels does not match " +
                    "the actual channel data. " +
                    "numChannels was: " + bufDesc.format.numChannels +
                    " but the sample data contains " + bufDesc.data.channels.length + " channels.");
            }
        }

        return flock.bufferDesc.inferFormat(bufDesc, sampleRate, numChannels);
    };

    flock.bufferDesc.fromAudioBuffer = function (audioBuffer) {
        var desc = {
            container: {},
            format: {
                sampleRate: audioBuffer.sampleRate,
                numChannels: audioBuffer.numberOfChannels,
                numSampleFrames: audioBuffer.length,
                duration: audioBuffer.duration
            },
            data: {
                channels: []
            }
        },
        i;

        for (i = 0; i < audioBuffer.numberOfChannels; i++) {
            desc.data.channels.push(audioBuffer.getChannelData(i));
        }

        return desc;
    };

    flock.bufferDesc.toAudioBuffer = function (context, bufDesc) {
        var buffer = context.createBuffer(bufDesc.format.numChannels,
            bufDesc.format.numSampleFrames, bufDesc.format.sampleRate);

        for (var i = 0; i < bufDesc.format.numChannels; i++) {
            buffer.copyToChannel(bufDesc.data.channels[i], i);
        }

        return buffer;
    };

    /**
     * Represents a source for fetching buffers.
     */
    fluid.defaults("flock.bufferSource", {
        gradeNames: ["fluid.modelComponent"],

        model: {
            state: "start",
            src: null
        },

        components: {
            bufferPromise: {
                createOnEvent: "onRefreshPromise",
                type: "flock.promise",
                options: {
                    listeners: {
                        onCreate: {
                            "this": "{that}.promise",
                            method: "then",
                            args: ["{bufferSource}.events.afterFetch.fire", "{bufferSource}.events.onError.fire"]
                        }
                    }
                }
            }
        },

        invokers: {
            get: {
                funcName: "flock.bufferSource.get",
                args: ["{that}", "{arguments}.0"]
            },

            set: {
                funcName: "flock.bufferSource.set",
                args: ["{that}", "{arguments}.0"]
            },

            error: {
                funcName: "flock.bufferSource.error",
                args: ["{that}", "{arguments}.0"]
            }
        },

        listeners: {
            onCreate: {
                funcName: "{that}.events.onRefreshPromise.fire"
            },

            onRefreshPromise: {
                changePath: "state",
                value: "start"
            },

            onFetch: {
                changePath: "state",
                value: "in-progress"
            },

            afterFetch: [
                {
                    changePath: "state",
                    value: "fetched"
                },
                {
                    funcName: "{that}.events.onBufferUpdated.fire", // TODO: Replace with boiling?
                    args: ["{arguments}.0"]
                }
            ],

            onBufferUpdated: "{enviro}.registerBuffer({arguments}.0)",

            onError: {
                changePath: "state",
                value: "error"
            }
        },

        events: {
            onRefreshPromise: null,
            onError: null,
            onFetch: null,
            afterFetch: null,
            onBufferUpdated: null
        }
    });

    flock.bufferSource.get = function (that, bufDef) {
        if (that.model.state === "in-progress" || (bufDef.src === that.model.src && !bufDef.replace)) {
            // We've already fetched the buffer or are in the process of doing so.
            return that.bufferPromise.promise;
        }

        if (bufDef.src) {
            if ((that.model.state === "fetched" || that.model.state === "errored") &&
                (that.model.src !== bufDef.src || bufDef.replace)) {
                that.events.onRefreshPromise.fire();
            }

            if (that.model.state === "start") {
                that.model.src = bufDef.src;
                that.events.onFetch.fire(bufDef);
                flock.audio.decode({
                    src: bufDef.src,
                    success: function (bufDesc) {
                        if (bufDef.id) {
                            bufDesc.id = bufDef.id;
                        }

                        that.set(bufDesc);
                    },
                    error: that.error
                });
            }
        }

        return that.bufferPromise.promise;
    };

    flock.bufferSource.set = function (that, bufDesc) {
        var state = that.model.state;
        if (state === "start" || state === "in-progress") {
            that.bufferPromise.promise.resolve(bufDesc);
        }

        return that.bufferPromise.promise;
    };

    flock.bufferSource.error = function (that, msg) {
        that.bufferPromise.promise.reject(msg);

        return that.bufferPromise.promise;
    };

    /**
     * A Buffer Loader is responsible for loading a collection
     * of buffers asynchronously, and will fire an event when they
     * are all ready.
     */
    fluid.defaults("flock.bufferLoader", {
        gradeNames: ["fluid.component"],

        members: {
            buffers: []
        },

        // A list of BufferDef objects to resolve.
        bufferDefs: [],

        events: {
            afterBuffersLoaded: null
        },

        listeners: {
            onCreate: {
                funcName: "flock.bufferLoader.loadBuffers",
                args: ["{that}.options.bufferDefs", "{that}.buffers", "{that}.events.afterBuffersLoaded.fire"]
            }
        }
    });

    flock.bufferLoader.idFromURL = function (url) {
        var lastSlash = url.lastIndexOf("/"),
            idStart = lastSlash > -1 ? lastSlash + 1 : 0,
            ext = url.lastIndexOf("."),
            idEnd = ext > -1 ? ext : url.length;

        return url.substring(idStart, idEnd);
    };

    flock.bufferLoader.idsFromURLs = function (urls) {
        return fluid.transform(urls, flock.bufferLoader.idFromURL);
    };

    flock.bufferLoader.expandFileSequence = function (fileURLs) {
        fileURLs = fileURLs || [];

        var bufDefs = [],
            i,
            url,
            id;

        for (i = 0; i < fileURLs.length; i++) {
            url = fileURLs[i];
            id = flock.bufferLoader.idFromURL(url);
            bufDefs.push({
                id: id,
                url: url
            });
        }

        return bufDefs;
    };

    flock.bufferLoader.loadBuffers = function (bufferDefs, decodedBuffers, afterBuffersLoaded) {
        bufferDefs = fluid.makeArray(bufferDefs);

        // TODO: This is a sign that flock.parse.bufferForDef is still terribly broken.
        var bufferTarget = {
            setBuffer: function (decoded) {
                decodedBuffers.push(decoded);

                if (decodedBuffers.length === bufferDefs.length) {
                    afterBuffersLoaded(decodedBuffers);
                }
            }
        };

        for (var i = 0; i < bufferDefs.length; i++) {
            var bufDef = bufferDefs[i];
            if (bufDef.id === undefined && bufDef.url !== undefined) {
                bufDef.id = flock.bufferLoader.idFromURL(bufDef.url);
            }

            // TODO: Hardcoded reference to the shared environment.
            flock.parse.bufferForDef(bufferDefs[i], bufferTarget, flock.environment);
        }
    };

}());
;/*
* Flocking Parser
* http://github.com/colinbdclark/flocking
*
* Copyright 2011-2014, Colin Clark
* Dual licensed under the MIT and GPL Version 2 licenses.
*/

/*global require, Float32Array*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    var $ = fluid.registerNamespace("jQuery");
    fluid.registerNamespace("flock.parse");

    flock.parse.synthDef = function (ugenDef, options) {
        if (!ugenDef) {
            ugenDef = [];
        }

        if (!flock.parse.synthDef.hasOutUGen(ugenDef)) {
            // We didn't get an out ugen specified, so we need to make one.
            ugenDef = flock.parse.synthDef.makeOutUGen(ugenDef, options);
        }

        return flock.parse.ugenForDef(ugenDef, options);
    };

    flock.parse.synthDef.hasOutUGen = function (synthDef) {
        // TODO: This is hostile to third-party extension.
        return !flock.isIterable(synthDef) && (
            synthDef.id === flock.OUT_UGEN_ID ||
            synthDef.ugen === "flock.ugen.out" ||
            synthDef.ugen === "flock.ugen.valueOut"
        );
    };

    flock.parse.synthDef.makeOutUGen = function (ugenDef, options) {
        ugenDef = {
            id: flock.OUT_UGEN_ID,
            ugen: "flock.ugen.valueOut",
            inputs: {
                sources: ugenDef
            }
        };

        if (options.rate === flock.rates.AUDIO) {
            ugenDef.ugen = "flock.ugen.out";
            ugenDef.inputs.bus = 0;
            ugenDef.inputs.expand = options.audioSettings.chans;
        }

        return ugenDef;
    };

    flock.parse.makeUGen = function (ugenDef, parsedInputs, options) {
        var rates = options.audioSettings.rates,
            blockSize = options.audioSettings.blockSize;

        // Assume audio rate if no rate was specified by the user.
        if (!ugenDef.rate) {
            ugenDef.rate = flock.rates.AUDIO;
        }

        var sampleRate;
        // Set the ugen's sample rate value according to the rate the user specified.
        if (ugenDef.options && ugenDef.options.sampleRate !== undefined) {
            sampleRate = ugenDef.options.sampleRate;
        } else {
            sampleRate = rates[ugenDef.rate];
        }

        // TODO: Infusion options merging!
        ugenDef.options = $.extend(true, {}, ugenDef.options, {
            sampleRate: sampleRate,
            rate: ugenDef.rate,
            audioSettings: {
                rates: rates,
                blockSize: blockSize
            }
        });

        var outputBufferSize = ugenDef.rate === flock.rates.AUDIO ? blockSize : 1,
            outputBuffers;

        if (flock.hasTag(ugenDef.options, "flock.ugen.multiChannelOutput")) {
            var numOutputs = ugenDef.options.numOutputs || 1;
            outputBuffers = [];

            for (var i = 0; i < numOutputs; i++) {
                outputBuffers.push(new Float32Array(outputBufferSize));
            }
        } else {
            outputBuffers = new Float32Array(outputBufferSize);
        }

        var ugenOpts = fluid.copy(ugenDef.options);
        ugenOpts.buffers = options.buffers;
        ugenOpts.buses = options.buses;

        return flock.invoke(undefined, ugenDef.ugen, [
            parsedInputs,
            outputBuffers,
            ugenOpts
        ]);
    };


    flock.parse.reservedWords = ["id", "ugen", "rate", "inputs", "options"];
    flock.parse.specialInputs = ["value", "buffer", "list", "table", "envelope", "durations", "values"];

    flock.parse.expandInputs = function (ugenDef) {
        if (ugenDef.inputs) {
            return ugenDef;
        }

        var inputs = {},
            prop;

        // Copy any non-reserved properties from the top-level ugenDef object into the inputs property.
        for (prop in ugenDef) {
            if (flock.parse.reservedWords.indexOf(prop) === -1) {
                inputs[prop] = ugenDef[prop];
                delete ugenDef[prop];
            }
        }
        ugenDef.inputs = inputs;

        return ugenDef;
    };

    flock.parse.ugenDefForConstantValue = function (value) {
        return {
            ugen: "flock.ugen.value",
            rate: flock.rates.CONSTANT,
            inputs: {
                value: value
            }
        };
    };

    flock.parse.expandValueDef = function (ugenDef) {
        var type = typeof (ugenDef);
        if (type === "number") {
            return flock.parse.ugenDefForConstantValue(ugenDef);
        }

        if (type === "object") {
            return ugenDef;
        }

        throw new Error("Invalid value type found in ugen definition. UGenDef was: " +
            fluid.prettyPrintJSON(ugenDef));
    };

    flock.parse.rateMap = {
        "ar": flock.rates.AUDIO,
        "kr": flock.rates.CONTROL,
        "sr": flock.rates.SCHEDULED,
        "dr": flock.rates.DEMAND,
        "cr": flock.rates.CONSTANT
    };

    flock.parse.expandRate = function (ugenDef, options) {
        ugenDef.rate = flock.parse.rateMap[ugenDef.rate] || ugenDef.rate;
        if (options.overrideRate && ugenDef.rate !== flock.rates.CONSTANT) {
            ugenDef.rate = options.rate;
        }

        return ugenDef;
    };

    flock.parse.ugenDef = function (ugenDefs, options) {
        var parseFn = flock.isIterable(ugenDefs) ? flock.parse.ugensForDefs : flock.parse.ugenForDef;
        var parsed = parseFn(ugenDefs, options);
        return parsed;
    };

    flock.parse.ugenDef.mergeOptions = function (ugenDef) {
        // TODO: Infusion options merging.
        var defaults = flock.ugenDefaults(ugenDef.ugen) || {};

        // TODO: Insane!
        defaults = fluid.copy(defaults);
        defaults.options = defaults.ugenOptions;
        delete defaults.ugenOptions;
        //

        return $.extend(true, {}, defaults, ugenDef);
    };

    flock.parse.ugensForDefs = function (ugenDefs, options) {
        var parsed = [],
            i;
        for (i = 0; i < ugenDefs.length; i++) {
            parsed[i] = flock.parse.ugenForDef(ugenDefs[i], options);
        }
        return parsed;
    };

    /**
     * Creates a unit generator for the specified unit generator definition spec.
     *
     * ugenDefs are plain old JSON objects describing the characteristics of the desired unit generator, including:
     *      - ugen: the type of unit generator, as string (e.g. "flock.ugen.sinOsc")
     *      - rate: the rate at which the ugen should be run, either "audio", "control", or "constant"
     *      - id: an optional unique name for the unit generator, which will make it available as a synth input
     *      - inputs: a JSON object containing named key/value pairs for inputs to the unit generator
     *           OR
     *      - inputs keyed by name at the top level of the ugenDef
     *
     * @param {UGenDef} ugenDef the unit generator definition to parse
     * @param {Object} options an options object containing:
     *           {Object} audioSettings the environment's audio settings
     *           {Array} buses the environment's global buses
     *           {Array} buffers the environment's global buffers
     *           {Array of Functions} visitors an optional list of visitor functions to invoke when the ugen has been created
     * @return the parsed unit generator object
     */
    flock.parse.ugenForDef = function (ugenDef, options) {
        options = $.extend(true, {
            audioSettings: flock.environment.audioSystem.model,
            buses: flock.environment.busManager.buses,
            buffers: flock.environment.buffers
        }, options);

        var o = options,
            visitors = o.visitors,
            rates = o.audioSettings.rates;

        // If we receive a plain scalar value, expand it into a value ugenDef.
        ugenDef = flock.parse.expandValueDef(ugenDef);

        // We received an array of ugen defs.
        if (flock.isIterable(ugenDef)) {
            return flock.parse.ugensForDefs(ugenDef, options);
        }

        ugenDef = flock.parse.expandInputs(ugenDef);

        flock.parse.expandRate(ugenDef, options);
        ugenDef = flock.parse.ugenDef.mergeOptions(ugenDef, options);

        var inputDefs = ugenDef.inputs,
            inputs = {},
            inputDef;

        // TODO: This notion of "special inputs" should be refactored as a pluggable system of
        // "input expanders" that are responsible for processing input definitions of various sorts.
        // In particular, buffer management should be here so that we can initialize bufferDefs more
        // proactively and remove this behaviour from flock.ugen.buffer.
        for (inputDef in inputDefs) {
            var inputDefVal = inputDefs[inputDef];

            if (inputDefVal === null) {
                continue; // Skip null inputs.
            }

            // Create ugens for all inputs except special inputs.
            inputs[inputDef] = flock.input.shouldExpand(inputDef, ugenDef) ?
                flock.parse.ugenForDef(inputDefVal, options) : // Parse the ugendef and create a ugen instance.
                inputDefVal; // Don't instantiate a ugen, just pass the def on as-is.
        }

        if (!ugenDef.ugen) {
            throw new Error("Unit generator definition lacks a 'ugen' property; " +
                "can't initialize the synth graph. Value: " + fluid.prettyPrintJSON(ugenDef));
        }

        var ugen = flock.parse.makeUGen(ugenDef, inputs, options);
        if (ugenDef.id) {
            ugen.id = ugenDef.id;
        }

        ugen.options.ugenDef = ugenDef;

        if (visitors) {
            visitors = fluid.makeArray(visitors);
            fluid.each(visitors, function (visitor) {
                visitor(ugen, ugenDef, rates);
            });
        }

        return ugen;
    };

    flock.parse.expandBufferDef = function (bufDef) {
        return typeof bufDef === "string" ? {id: bufDef} :
            (flock.isIterable(bufDef) || bufDef.data || bufDef.format) ?
            flock.bufferDesc(bufDef) : bufDef;
    };

    flock.parse.bufferForDef = function (bufDef, ugen, enviro) {
        bufDef = flock.parse.expandBufferDef(bufDef);

        if (bufDef.data && bufDef.data.channels) {
            bufDef = flock.bufferDesc(bufDef);
            flock.parse.bufferForDef.resolveBuffer(bufDef, ugen, enviro);
        } else {
            flock.parse.bufferForDef.resolveDef(bufDef, ugen, enviro);
        }
    };

    flock.parse.bufferForDef.findSource = function (defOrDesc, enviro) {
        var source;

        if (enviro && defOrDesc.id) {
            source = enviro.bufferSources[defOrDesc.id];
            if (!source) {
                source = enviro.bufferSources[defOrDesc.id] = flock.bufferSource();
            }
        } else {
            source = flock.bufferSource();
        }

        return source;
    };

    flock.parse.bufferForDef.bindToPromise = function (p, source, ugen) {
        // TODO: refactor this.
        var success = function (bufDesc) {
            source.events.onBufferUpdated.addListener(success);
            if (ugen) {
                ugen.setBuffer(bufDesc);
            }
        };

        var error = function (msg) {
            if (!msg && source.model.src && source.model.src.indexOf(".aif")) {
                msg = "if this is an AIFF file, you might need to include" +
                " flocking-audiofile-compatibility.js in some browsers.";
            }
            throw new Error("Error while resolving buffer " + source.model.src + ": " + msg);
        };

        p.then(success, error);
    };

    flock.parse.bufferForDef.resolveDef = function (bufDef, ugen, enviro) {
        var source = flock.parse.bufferForDef.findSource(bufDef, enviro),
            p;

        bufDef.src = bufDef.url || bufDef.src;
        if (bufDef.selector && typeof(document) !== "undefined") {
            bufDef.src = document.querySelector(bufDef.selector).files[0];
        }

        p = source.get(bufDef);
        flock.parse.bufferForDef.bindToPromise(p, source, ugen);
    };


    flock.parse.bufferForDef.resolveBuffer = function (bufDesc, ugen, enviro) {
        var source = flock.parse.bufferForDef.findSource(bufDesc, enviro),
            p = source.set(bufDesc);

        flock.parse.bufferForDef.bindToPromise(p, source, ugen);
    };

}());
;/*
 * Flocking Audio File Utilities
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2011-2014, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require, ArrayBuffer, Uint8Array, File, FileReader */
/*jshint white: false, newcap: true, regexp: true, browser: true,
forin: false, nomen: true, bitwise: false, maxerr: 100,
indent: 4, plusplus: false, curly: true, eqeqeq: true,
freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {

    "use strict";

    /**
     * Applies the specified function in the next round of the event loop.
     */
    // TODO: Replace this and the code that depends on it with a good Promise implementation.
    flock.applyDeferred = function (fn, args, delay) {
        if (!fn) {
            return;
        }

        delay = typeof (delay) === "undefined" ? 0 : delay;
        setTimeout(function () {
            fn.apply(null, args);
        }, delay);
    };


    /*********************
     * Network utilities *
     *********************/

    fluid.registerNamespace("flock.net");

    /**
     * Loads an ArrayBuffer into memory using XMLHttpRequest.
     */
    flock.net.readBufferFromUrl = function (options) {
        var src = options.src,
            xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    options.success(xhr.response, flock.file.parseFileExtension(src));
                } else {
                    if (!options.error) {
                        throw new Error(xhr.statusText);
                    }

                    options.error(xhr.statusText);
                }
            }
        };

        xhr.open(options.method || "GET", src, true);
        xhr.responseType = options.responseType || "arraybuffer";
        xhr.send(options.data);
    };


    /*****************
     * File Utilties *
     *****************/

    fluid.registerNamespace("flock.file");

    flock.file.mimeTypes = {
        "audio/wav": "wav",
        "audio/x-wav": "wav",
        "audio/wave": "wav",
        "audio/x-aiff": "aiff",
        "audio/aiff": "aiff",
        "sound/aiff": "aiff"
    };

    flock.file.typeAliases = {
        "aif": "aiff",
        "wave": "wav"
    };

    flock.file.parseFileExtension = function (fileName) {
        var lastDot = fileName.lastIndexOf("."),
            ext,
            alias;

        // TODO: Better error handling in cases where we've got unrecognized file extensions.
        //       i.e. we should try to read the header instead of relying on extensions.
        if (lastDot < 0) {
            return undefined;
        }

        ext = fileName.substring(lastDot + 1);
        ext = ext.toLowerCase();
        alias =  flock.file.typeAliases[ext];

        return alias || ext;
    };

    flock.file.parseMIMEType = function (mimeType) {
        return flock.file.mimeTypes[mimeType];
    };

    /**
     * Converts a binary string to an ArrayBuffer, suitable for use with a DataView.
     *
     * @param {String} s the raw string to convert to an ArrayBuffer
     *
     * @return {Uint8Array} the converted buffer
     */
    flock.file.stringToBuffer = function (s) {
        var len = s.length,
            b = new ArrayBuffer(len),
            v = new Uint8Array(b),
            i;
        for (i = 0; i < len; i++) {
            v[i] = s.charCodeAt(i);
        }
        return v.buffer;
    };

    /**
     * Asynchronously parses the specified data URL into an ArrayBuffer.
     */
    flock.file.readBufferFromDataUrl = function (options) {
        var url = options.src,
            delim = url.indexOf(","),
            header = url.substring(0, delim),
            data = url.substring(delim + 1),
            base64Idx = header.indexOf(";base64"),
            isBase64 =  base64Idx > -1,
            mimeTypeStartIdx = url.indexOf("data:") + 5,
            mimeTypeEndIdx = isBase64 ? base64Idx : delim,
            mimeType = url.substring(mimeTypeStartIdx, mimeTypeEndIdx);

        if (isBase64) {
            data = atob(data);
        }

        flock.applyDeferred(function () {
            var buffer = flock.file.stringToBuffer(data);
            options.success(buffer, flock.file.parseMIMEType(mimeType));
        });
    };

    /**
     * Asynchronously reads the specified File into an ArrayBuffer.
     */
    flock.file.readBufferFromFile = function (options) {
        var reader  = new FileReader();
        reader.onload = function (e) {
            options.success(e.target.result, flock.file.parseFileExtension(options.src.name));
        };
        reader.readAsArrayBuffer(options.src);

        return reader;
    };


    fluid.registerNamespace("flock.audio");

    /**
     * Asychronously loads an ArrayBuffer into memory.
     *
     * Options:
     *  - src: the URL to load the array buffer from
     *  - method: the HTTP method to use (if applicable)
     *  - data: the data to be sent as part of the request (it's your job to query string-ize this if it's an HTTP request)
     *  - success: the success callback, which takes the ArrayBuffer response as its only argument
     *  - error: a callback that will be invoked if an error occurs, which takes the error message as its only argument
     */
    flock.audio.loadBuffer = function (options) {
        var src = options.src || options.url;
        if (!src) {
            return;
        }

        if (src instanceof ArrayBuffer) {
            flock.applyDeferred(options.success, [src, options.type]);
        }

        var reader = flock.audio.loadBuffer.readerForSource(src);

        reader(options);
    };

    flock.audio.loadBuffer.readerForSource = function (src) {
        return (typeof (File) !== "undefined" && src instanceof File) ? flock.file.readBufferFromFile :
            src.indexOf("data:") === 0 ? flock.file.readBufferFromDataUrl : flock.net.readBufferFromUrl;
    };


    /**
     * Loads and decodes an audio file. By default, this is done asynchronously in a Web Worker.
     * This decoder currently supports WAVE and AIFF file formats.
     */
    flock.audio.decode = function (options) {
        var success = options.success;

        var wrappedSuccess = function (rawData, type) {
            var strategies = flock.audio.decoderStrategies,
                strategy = strategies[type] || strategies["default"];

            if (options.decoder) {
                strategy = typeof (options.decoder) === "string" ?
                     fluid.getGlobalValue(options.decoder) : options.decoder;
            }

            strategy({
                rawData: rawData,
                type: type,
                success: success,
                error: options.error,
                sampleRate: options.sampleRate ||
                    (flock.environment ? flock.environment.audioSystem.model.rates.audio : undefined)
            });
        };

        options.success = wrappedSuccess;
        flock.audio.loadBuffer(options);
    };

    /**
     * Asynchronously decodes the specified ArrayBuffer rawData using
     * the browser's Web Audio Context.
     */
    flock.audio.decode.webAudio = function (o) {
        var ctx = flock.environment.audioSystem.context,
            success = function (audioBuffer) {
                var bufDesc = flock.bufferDesc.fromAudioBuffer(audioBuffer);
                o.success(bufDesc);
            };

        ctx.decodeAudioData(o.rawData, success, o.error);
    };

    flock.audio.decoderStrategies = {
        "default": flock.audio.decode.webAudio
    };

    flock.audio.registerDecoderStrategy = function (type, strategy) {
        if (!type) {
            return;
        }

        if (typeof type === "object") {
            for (var key in type) {
                flock.audio.decoderStrategies[key] = type[key];
            }

            return;
        }

        if (typeof strategy === "string") {
            strategy = fluid.getGlobalValue(strategy);
        }

        flock.audio.decoderStrategies[type] = strategy;
    };
}());
;/*
 * Flocking Audio Encoders
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require, ArrayBuffer, Uint8Array */
/*jshint white: false, newcap: true, regexp: true, browser: true,
forin: false, nomen: true, bitwise: false, maxerr: 100,
indent: 4, plusplus: false, curly: true, eqeqeq: true,
freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {

    "use strict";

    fluid.registerNamespace("flock.audio.encode");

    flock.audio.interleave = function (bufDesc) {
        var numFrames = bufDesc.format.numSampleFrames,
            chans = bufDesc.data.channels,
            numChans = bufDesc.format.numChannels,
            numSamps = numFrames * numChans,
            out = new Float32Array(numSamps),
            outIdx = 0,
            frame,
            chan;

        for (frame = 0; frame < numFrames; frame++) {
            for (chan = 0; chan < numChans; chan++) {
                out[outIdx] = chans[chan][frame];
                outIdx++;
            }
        }

        return out;
    };

    flock.audio.encode = function (bufDesc, type, format) {
        type = type || "wav";
        if (type.toLowerCase() !== "wav") {
            flock.fail("Flocking currently only supports encoding WAVE files.");
        }

        return flock.audio.encode.wav(bufDesc, format);
    };

    flock.audio.encode.writeFloat32Array = function (offset, dv, buf) {
        for (var i = 0; i < buf.length; i++) {
            dv.setFloat32(offset, buf[i], true);
            offset += 4;
        }

        return dv;
    };

    flock.audio.encode.setString = function (dv, offset, str){
        for (var i = 0; i < str.length; i++){
            dv.setUint8(offset + i, str.charCodeAt(i));
        }
    };

    flock.audio.encode.setBytes = function (dv, offset, bytes) {
        for (var i = 0; i < bytes.length; i++) {
            dv.setUint8(offset + i, bytes[i]);
        }
    };


    flock.audio.encode.writeAsPCM = function (formatSpec, offset, dv, buf) {
        if (formatSpec.setter === "setFloat32" && buf instanceof Float32Array) {
            return flock.audio.encode.writeFloat32Array(offset, dv, buf);
        }

        for (var i = 0; i < buf.length; i++) {
            // Clamp to within bounds.
            var s = Math.min(1.0, buf[i]);
            s = Math.max(-1.0, s);

            // Scale to the otuput number format.
            s = s < 0 ? s * formatSpec.scaleNeg : s * formatSpec.scalePos;

            // Write the sample to the DataView.
            dv[formatSpec.setter](offset, s, true);
            offset += formatSpec.width;
        }

        return dv;
    };

    flock.audio.pcm = {
        int16: {
            scalePos: 32767,
            scaleNeg: 32768,
            setter: "setInt16",
            width: 2
        },

        int32: {
            scalePos: 2147483647,
            scaleNeg: 2147483648,
            setter: "setInt32",
            width: 4
        },

        float32: {
            scalePos: 1,
            scaleNeg: 1,
            setter: "setFloat32",
            width: 4
        }
    };

    flock.audio.encode.wav = function (bufDesc, format) {
        format = format || flock.audio.pcm.int16;

        var formatSpec = typeof format === "string" ? flock.audio.pcm[format] : format;
        if (!formatSpec) {
            flock.fail("Flocking does not support encoding " + format + " format PCM wave files.");
        }

        var interleaved = flock.audio.interleave(bufDesc),
            numChans = bufDesc.format.numChannels,
            sampleRate = bufDesc.format.sampleRate,
            isPCM = formatSpec.setter !== "setFloat32",
            riffHeaderSize = 8,
            formatHeaderSize = 12,
            formatBodySize = 16,
            formatTag = 1,
            dataHeaderSize = 8,
            dataBodySize = interleaved.length * formatSpec.width,
            dataChunkSize = dataHeaderSize + dataBodySize,
            bitsPerSample = 8 * formatSpec.width;

        if (numChans > 2 || !isPCM) {
            var factHeaderSize = 8,
                factBodySize = 4,
                factChunkSize = factHeaderSize + factBodySize;

            formatBodySize += factChunkSize;

            if (numChans > 2) {
                formatBodySize += 24;
                formatTag = 0xFFFE; // Extensible.
            } else {
                formatBodySize += 2;
                formatTag = 3; // Two-channel IEEE float.
            }
        }

        var formatChunkSize = formatHeaderSize + formatBodySize,
            riffBodySize = formatChunkSize + dataChunkSize,
            numBytes = riffHeaderSize + riffBodySize,
            out = new ArrayBuffer(numBytes),
            dv = new DataView(out);

        // RIFF chunk header.
        flock.audio.encode.setString(dv, 0, "RIFF"); // ckID
        dv.setUint32(4, riffBodySize, true); // cksize

        // Format Header
        flock.audio.encode.setString(dv, 8, "WAVE"); // WAVEID
        flock.audio.encode.setString(dv, 12, "fmt "); // ckID
        dv.setUint32(16, formatBodySize, true); // cksize, length of the format chunk.

        // Format Body
        dv.setUint16(20, formatTag, true); // wFormatTag
        dv.setUint16(22, numChans, true); // nChannels
        dv.setUint32(24, sampleRate, true); // nSamplesPerSec
        dv.setUint32(28, sampleRate * 4, true); // nAvgBytesPerSec (sample rate * block align)
        dv.setUint16(32, numChans * formatSpec.width, true); //nBlockAlign (channel count * bytes per sample)
        dv.setUint16(34, bitsPerSample, true); // wBitsPerSample

        var offset = 36;
        if (formatTag === 3) {
            // IEEE Float. Write out a fact chunk.
            dv.setUint16(offset, 0, true); // cbSize: size of the extension
            offset += 2;
            offset = flock.audio.encode.wav.writeFactChunk(dv, offset, bufDesc.format.numSampleFrames);
        } else if (formatTag === 0xFFFE) {
            // Extensible format (i.e. > 2 channels).
            // Write out additional format fields and fact chunk.
            dv.setUint16(offset, 22, true); // cbSize: size of the extension
            offset += 2;

            // Additional format fields.
            offset = flock.audio.encode.wav.additionalFormat(offset, dv, bitsPerSample, isPCM);

            // Fact chunk.
            offset = flock.audio.encode.wav.writeFactChunk(dv, offset, bufDesc.format.numSampleFrames);
        }

        flock.audio.encode.wav.writeDataChunk(formatSpec, offset, dv, interleaved, dataBodySize);

        return dv.buffer;
    };

    flock.audio.encode.wav.subformats = {
        pcm: new Uint8Array([1, 0, 0, 0, 0, 0, 16, 0, 128, 0, 0, 170, 0, 56, 155, 113]),
        float: new Uint8Array([3, 0, 0, 0, 0, 0, 16, 0, 128, 0, 0, 170, 0, 56, 155, 113])
    };

    flock.audio.encode.wav.additionalFormat = function (offset, dv, bitsPerSample, isPCM) {
        dv.setUint16(offset, bitsPerSample, true); // wValidBitsPerSample
        offset += 2;

        dv.setUint32(offset, 0x80000000, true); // dwChannelMask, hardcoded to SPEAKER_RESERVED
        offset += 4;

        // Subformat GUID.
        var subformat = flock.audio.encode.wav.subformats[isPCM ? "pcm" : "float"];
        flock.audio.encode.setBytes(dv, offset, subformat);
        offset += 16;

        return offset;
    };

    flock.audio.encode.wav.writeFactChunk = function (dv, offset, numSampleFrames) {
        flock.audio.encode.setString(dv, offset, "fact"); // ckID
        offset += 4;

        dv.setUint32(offset, 4, true); //cksize
        offset += 4;

        dv.setUint32(offset, numSampleFrames, true); // dwSampleLength
        offset += 4;

        return offset;
    };

    flock.audio.encode.wav.writeDataChunk = function (formatSpec, offset, dv, interleaved, numSampleBytes) {
        // Data chunk Header
        flock.audio.encode.setString(dv, offset, "data");
        offset += 4;
        dv.setUint32(offset, numSampleBytes, true); // Length of the datahunk.
        offset += 4;

        flock.audio.encode.writeAsPCM(formatSpec, offset, dv, interleaved);
    };
}());
;/*
* Flocking Scheduler
* http://github.com/colinbdclark/flocking
*
* Copyright 2013-2014, Colin Clark
* Dual licensed under the MIT and GPL Version 2 licenses.
*/

/*global require, self*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    // TODO: This duplicates code in flocking-core and should be factored differently.
    flock.shim = {
        URL: typeof window !== "undefined" ? window.URL || window.webkitURL || window.msURL : undefined
    };

    flock.worker = function (code) {
        var type = typeof code,
            url,
            blob;

        if (type === "function") {
            code = "(" + code.toString() + ")();";
        } else if (type !== "string") {
            throw new Error("A flock.worker must be initialized with a String or a Function.");
        }

        if (window.Blob) {
            blob = new Blob([code], {
                type: "text/javascript"
            });
            url = flock.shim.URL.createObjectURL(blob);
        } else {
            url = "data:text/javascript;base64," + window.btoa(code);
        }
        return new Worker(url);
    };


    fluid.registerNamespace("flock.scheduler");


    /**********
     * Clocks *
     **********/
    fluid.defaults("flock.scheduler.clock", {
        gradeNames: ["fluid.component"],

        events: {
            tick: null
        }
    });

    fluid.defaults("flock.scheduler.intervalClock", {
        gradeNames: ["flock.scheduler.clock"],

        members: {
            scheduled: {}
        },

        invokers: {
            schedule: {
                funcName: "flock.scheduler.intervalClock.schedule",
                args: [
                    "{arguments}.0", // The inverval to clear.
                    "{that}.scheduled",
                    "{that}.events.tick.fire",
                    "{that}.events.onClear.fire"
                ]
            },

            clear: {
                funcName: "flock.scheduler.intervalClock.clear",
                args:[
                    "{arguments}.0", // The inverval to clear.
                    "{that}.scheduled",
                    "{that}.events.onClear.fire"
                ]
            },

            clearAll: {
                funcName: "flock.scheduler.intervalClock.clearAll",
                args: ["{that}.scheduled", "{that}.events.onClear.fire"]
            },

            end: "{that}.clearAll"
        }
    });

    flock.scheduler.intervalClock.schedule = function (interval, scheduled, onTick) {
        var id = setInterval(function () {
            onTick(interval);
        }, interval);
        scheduled[interval] = id;
    };

    flock.scheduler.intervalClock.clear = function (interval, scheduled) {
        var id = scheduled[interval];
        clearInterval(id);
        delete scheduled[interval];
    };

    flock.scheduler.intervalClock.clearAll = function (scheduled, onClear) {
        for (var interval in scheduled) {
            flock.scheduler.intervalClock.clear(interval, scheduled, onClear);
        }
    };


    fluid.defaults("flock.scheduler.scheduleClock", {
        gradeNames: ["flock.scheduler.clock"],

        members: {
            scheduled: []
        },

        invokers: {
            schedule: {
                funcName: "flock.scheduler.scheduleClock.schedule",
                args: [
                    "{arguments}.0",
                    "{that}.scheduled",
                    "{that}.events"
                ]
            },

            clear: {
                funcName: "flock.scheduler.scheduleClock.clear",
                args: [
                    "{arguments}.0",
                    "{arguments}.1",
                    "{that}.scheduled",
                    "{that}.events.onClear.fire"
                ]
            },

            clearAll: {
                funcName: "flock.scheduler.scheduleClock.clearAll",
                args: [
                    "{that}.scheduled",
                    "{that}.events.onClear.fire"
                ]
            },

            end: "{that}.clearAll"
        }
    });

    flock.scheduler.scheduleClock.schedule = function (timeFromNow, scheduled, events) {
        var id;
        id = setTimeout(function () {
            clearTimeout(id);
            events.tick.fire(timeFromNow);
        }, timeFromNow);

        scheduled.push(id);
    };

    flock.scheduler.scheduleClock.clear = function (id, idx, scheduled) {
        idx = idx === undefined ? scheduled.indexOf(id) : idx;
        if (idx > -1) {
            scheduled.splice(idx, 1);
            clearTimeout(id);
        }
    };

    flock.scheduler.scheduleClock.clearAll = function (scheduled) {
        for (var i = 0; i < scheduled.length; i++) {
            var id = scheduled[i];
            clearTimeout(id);
        }

        scheduled.length = 0;
    };


    fluid.defaults("flock.scheduler.webWorkerClock", {
        gradeNames: ["fluid.component"],

        members: {
            worker: {
                expander: {
                    funcName: "flock.worker",
                    args: "@expand:fluid.getGlobalValue(flock.scheduler.webWorkerClock.workerImpl)"
                }
            }
        },

        invokers: {
            postToWorker: {
                funcName: "flock.scheduler.webWorkerClock.postToWorker",
                args: [
                    "{arguments}.0", // Message name.
                    "{arguments}.1", // Value.
                    "{that}.options.messages",
                    "{that}.worker"
                ]
            },

            schedule: "{that}.postToWorker(schedule, {arguments}.0)",

            clear: "{that}.postToWorker(clear, {arguments}.0)",

            clearAll: "{that}.postToWorker(clearAll)",

            end: "{that}.postToWorker(end)"
        },

        events: {
            tick: null
        },

        listeners: {
            onCreate: {
                funcName: "flock.scheduler.webWorkerClock.init",
                args: ["{that}"]
            }
        },

        startMsg: {
            msg: "start",
            value: "{that}.options.clockType"
        },

        messages: {
            schedule: {
                msg: "schedule"
            },

            clear: {
                msg: "clear"
            },

            clearAll: {
                msg: "clearAll"
            },

            end: {
                msg: "end"
            }
        }
    });

    flock.scheduler.webWorkerClock.init = function (that) {
        that.worker.addEventListener("message", function (e) {
            that.events.tick.fire(e.data.value);
        }, false);

        that.worker.postMessage(that.options.startMsg);
    };

    flock.scheduler.webWorkerClock.postToWorker = function (msgName, value, messages, worker) {
        var msg = messages[msgName];
        if (value !== undefined) {
            msg.value = value;
        }
        worker.postMessage(msg);
    };

    // This code is only intended to run from within a Worker, via flock.worker.
    flock.scheduler.webWorkerClock.workerImpl = function () {
        "use strict"; // jshint ignore:line

        var flock = flock || {};
        flock.worker = flock.worker || {};

        flock.worker.clock = function () {
            var that = {};

            that.tick = function (interval) {
                self.postMessage({
                    msg: "tick",
                    value: interval
                });
            };

            return that;
        };

        flock.worker.intervalClock = function () {
            var that = flock.worker.clock();
            that.scheduled = {};

            // TODO: Copy-pasted from flock.scheduler.intervalClock.
            that.schedule = function (interval) {
                var id = setInterval(function () {
                    that.tick(interval);
                }, interval);
                that.scheduled[interval] = id;
            };

            // TODO: Copy-pasted from flock.scheduler.intervalClock.
            that.clear = function (interval) {
                var id = that.scheduled[interval];
                clearInterval(id);
                delete that.scheduled[interval];
            };

            // TODO: Copy-pasted from flock.scheduler.intervalClock.
            that.clearAll = function () {
                for (var interval in that.scheduled) {
                    that.clear(interval);
                }
            };

            return that;
        };

        flock.worker.scheduleClock = function () {
            var that = flock.worker.clock();
            that.scheduled = [];

            // TODO: Copy-pasted from flock.scheduler.scheduleClock.
            that.schedule = function (timeFromNow) {
                var id;
                id = setTimeout(function () {
                    that.clear(id);
                    that.tick(timeFromNow);
                }, timeFromNow);
                that.scheduled.push(id);
            };

            // TODO: Copy-pasted from flock.scheduler.scheduleClock.
            that.clear = function (id, idx) {
                idx = idx === undefined ? that.scheduled.indexOf(id) : idx;
                if (idx > -1) {
                    that.scheduled.splice(idx, 1);
                }
                clearTimeout(id);
            };

            // TODO: Copy-pasted from flock.scheduler.scheduleClock.
            that.clearAll = function () {
                for (var i = 0; i < that.scheduled.length; i++) {
                    var id = that.scheduled[i];
                    clearTimeout(id);
                }
                that.scheduled.length = 0;
            };

            return that;
        };

        self.addEventListener("message", function (e) {
            if (e.data.msg === "start") {
                flock.clock = flock.worker[e.data.value]();
            } else if (e.data.msg === "end") {
                if (flock.clock) {
                    flock.clock.clearAll();
                    self.close();
                }
            } else if (flock.clock) {
                flock.clock[e.data.msg](e.data.value);
            }
        }, false);
    };

    fluid.defaults("flock.scheduler.webWorkerIntervalClock", {
        gradeNames: ["flock.scheduler.webWorkerClock"],
        clockType: "intervalClock"
    });

    fluid.defaults("flock.scheduler.webWorkerScheduleClock", {
        gradeNames: ["flock.scheduler.webWorkerClock"],
        clockType: "scheduleClock"
    });


    /**************
     * Schedulers *
     **************/

    fluid.defaults("flock.scheduler", {
        gradeNames: ["fluid.component"],

        events: {
            onScheduled: null,
            onFinished: null,
            onClearAll: null
        },

        listeners: {
            onClearAll: [
                "{that}.clock.clearAll()"
            ]
        }
    });

    flock.scheduler.addListener = function (listener, listeners, onAdded) {
        listeners.push(listener);
        onAdded(listener);

        return listener;
    };

    flock.scheduler.removeListener = function (listener, listeners, onRemoved) {
        if (!listener) {
            return;
        }

        var idx = listeners.indexOf(listener);
        if (idx > -1) {
            listeners.splice(idx, 1);
            onRemoved(listener);
        } else if (listener.wrappedListener) {
            flock.scheduler.removeListener(listener.wrappedListener, listeners, onRemoved);
        }
    };

    fluid.defaults("flock.scheduler.repeat", {
        gradeNames: ["flock.scheduler"],

        members: {
            listeners: {}
        },

        components: {
            clock: {
                type: "flock.scheduler.webWorkerIntervalClock"
            }
        },

        invokers: {
            schedule: {
                funcName: "flock.scheduler.repeat.schedule",
                args: [
                    "{arguments}.0", // The interval to schedule.
                    "{arguments}.1", // The listener.
                    "{timeConverter}",
                    "{synthContext}",
                    "{that}.listeners",
                    "{that}.events.onScheduled.fire"
                ]
            },

            clear: "{that}.events.onFinished.fire",

            clearAll: {
                funcName: "flock.scheduler.repeat.clearAll",
                args: [
                    "{that}.listeners",
                    "{that}.events.onFinished.fire",
                    "{that}.events.onClearAll.fire"
                ]
            },

            clearInterval: {
                funcName: "flock.scheduler.repeat.clearInterval",
                args: ["{arguments}.0", "{that}.listeners", "{that}.events.onFinished.fire"]
            },

            addIntervalListener: {
                funcName: "flock.scheduler.repeat.addIntervalListener",
                args: [
                    "{arguments}.0", // Interval
                    "{arguments}.1", // Listener
                    "{that}.listeners",
                    "{that}.clock.events.tick.addListener"
                ]
            },

            removeIntervalListener: {
                funcName: "flock.scheduler.repeat.removeIntervalListener",
                args: [
                    "{arguments}.0", // Interval
                    "{arguments}.1", // Listener
                    "{that}.listeners",
                    "{that}.clock.events.tick.removeListener"
                ]
            }
        },

        listeners: {
            onScheduled: [
                "{that}.addIntervalListener({arguments}.0, {arguments}.1)",
                "{that}.clock.schedule({arguments}.0)"
            ],
            onFinished: [
                "{that}.removeIntervalListener({arguments}.0, {arguments}.1)"
            ]
        }
    });

    flock.scheduler.repeat.intervalListeners = function (interval, listeners) {
        return listeners[interval];
    };

    flock.scheduler.repeat.addIntervalListener = function (interval, listener, listeners, afterAdd) {
        var listenersForInterval = flock.scheduler.repeat.intervalListeners(interval, listeners);
        flock.scheduler.addListener(listener, listenersForInterval, afterAdd);
    };

    flock.scheduler.repeat.removeIntervalListener = function (interval, listener, listeners, afterRemove) {
        var listenersForInterval = flock.scheduler.repeat.intervalListeners(interval, listeners);
        flock.scheduler.removeListener(listener, listenersForInterval, afterRemove);
    };

    flock.scheduler.repeat.schedule = function (interval, listener, timeConverter, synthContext, listeners, onScheduled) {
        interval = timeConverter.value(interval);
        listener = flock.scheduler.async.prepareListener(listener, synthContext);

        var wrapper = flock.scheduler.repeat.wrapValueListener(interval, listener);

        flock.scheduler.repeat.addInterval(interval, listeners);
        onScheduled(interval, wrapper);

        return wrapper;
    };

    flock.scheduler.repeat.wrapValueListener = function (value, listener) {
        var wrapper = function (time) {
            if (time === value) {
                listener(time);
            }
        };

        wrapper.wrappedListener = listener;

        return wrapper;
    };

    flock.scheduler.repeat.addInterval = function (interval, listeners) {
        var listenersForInterval = listeners[interval];
        if (!listenersForInterval) {
            listenersForInterval = listeners[interval] = [];
        }
    };

    flock.scheduler.repeat.clearAll = function (listeners, onFinished, onClearAll) {
        for (var interval in listeners) {
            flock.scheduler.repeat.clearInterval(interval, listeners, onFinished);
        }

        onClearAll();
    };

    flock.scheduler.repeat.clearInterval = function (interval, listeners, onFinished) {
        var listenersForInterval = listeners[interval];

        if (!listenersForInterval) {
            return;
        }

        for (var i = 0; i < listenersForInterval.length; i++) {
            var listener = listenersForInterval[i];
            onFinished(interval, listener);
        }
    };


    fluid.defaults("flock.scheduler.once", {
        gradeNames: ["flock.scheduler"],

        members: {
            listeners: []
        },

        components: {
            clock: {
                type: "flock.scheduler.webWorkerScheduleClock"
            }
        },

        invokers: {
            schedule: {
                funcName: "flock.scheduler.once.schedule",
                args: [
                    "{arguments}.0", // The scheduled time.
                    "{arguments}.1", // The listener.
                    "{timeConverter}",
                    "{synthContext}",
                    "{that}.clear",
                    "{that}.events.onScheduled.fire"
                ]
            },

            clear: "{that}.events.onFinished.fire",

            clearAll: {
                funcName: "flock.scheduler.once.clearAll",
                args: [
                    "{that}.listeners",
                    "{that}.events.onFinished.fire",
                    "{that}.events.onClearAll.fire"
                ]
            }
        },

        listeners: {
            onScheduled: [
                {
                    funcName: "flock.scheduler.addListener",
                    args: [
                        "{arguments}.1", // The listener.
                        "{that}.listeners", // All registered listeners.
                        "{that}.clock.events.tick.addListener"
                    ]
                },
                {
                    func: "{that}.clock.schedule",
                    args: ["{arguments}.0"]
                }
            ],
            onFinished: {
                funcName: "flock.scheduler.removeListener",
                args: [
                    "{arguments}.0",    // The listener.
                    "{that}.listeners", // All registered listeners.
                    "{that}.clock.events.tick.removeListener"
                ]
            }
        }
    });

    flock.scheduler.once.wrapValueListener = function (value, listener, removeFn) {
        var wrapper = function (time) {
            if (time === value) {
                listener(time);
                removeFn(wrapper);
            }
        };

        wrapper.wrappedListener = listener;

        return wrapper;
    };

    flock.scheduler.once.schedule = function (time, listener, timeConverter, synthContext, removeFn, onScheduled) {
        time = timeConverter.value(time);
        listener = flock.scheduler.async.prepareListener(listener, synthContext);

        var wrapper = flock.scheduler.once.wrapValueListener(time, listener, removeFn);
        onScheduled(time, wrapper);

        return wrapper;
    };

    flock.scheduler.once.clearAll = function (listeners, onFinished, onClearAll) {
        for (var i = 0; i < listeners.length; i++) {
            onFinished(listeners[i]);
        }

        onClearAll();
    };


    fluid.defaults("flock.scheduler.async", {
        gradeNames: ["fluid.component"],

        subSchedulerOptions: {
            components: {
                timeConverter: "{async}.timeConverter"
            },

            listeners: {
                "{async}.events.onClear": "{that}.clear()",
                "{async}.events.onClearAll": "{that}.clearAll()",
                "{async}.events.onEnd": "{that}.clock.end()"
            }
        },

        distributeOptions: {
            source: "{that}.options.subSchedulerOptions",
            removeSource: true,
            target: "{that flock.scheduler}.options"
        },

        components: {
            timeConverter: {
                type: "flock.convert.seconds"
            },

            onceScheduler: {
                type: "flock.scheduler.once"
            },

            repeatScheduler: {
                type: "flock.scheduler.repeat"
            },

            // This is user-specified.
            // Typically a flock.band instance or a synth itself,
            // but can be anything that has a set of named synths.
            synthContext: undefined
        },

        invokers: {
            /**
             * Schedules a listener to be invoked repeatedly at the specified interval.
             *
             * @param {Number} interval the interval to schedule
             * @param {Function} listener the listener to invoke
             */
            repeat: {
                func: "{repeatScheduler}.schedule",
                args: ["{arguments}.0", "{arguments}.1"]
            },

            /**
             * Schedules a listener to be invoked once at a future time.
             *
             * @param {Number} time the time (relative to now) when the listener should be invoked
             * @param {Function} listener the listener to invoke
             */
            once: {
                func: "{onceScheduler}.schedule",
                args: ["{arguments}.0", "{arguments}.1"]
            },

            /**
             * Schedules a series of "once" events.
             *
             * @param {Array} times an array of times to schedule
             * @param {Object} changeSpec the change spec that should be applied
             */
            sequence: {
                funcName: "flock.scheduler.async.sequence",
                args: [
                    "{arguments}.0", // Array of times to schedule.
                    "{arguments}.1", // The changeSpec to schedule.
                    "{that}.once"
                ]
            },

            /**
             * Schedules a score.
             *
             * @param {Array} score an array of score object
             */
            schedule: {
                funcName: "flock.scheduler.async.schedule",
                args: ["{arguments}.0", "{that}"]
            },

            /**
             * Deprecated.
             *
             * Clears a previously-registered listener.
             *
             * Note that this function is relatively ineffecient, and
             * a direct call to the clear() method of either the repeatScheduler
             * or the onceScheduler is more effective.
             *
             * @param {Function} listener the listener to clear
             */
            clear: "{that}.events.onClear.fire",

            /**
             * Clears all listeners for all scheduled and repeating events.
             */
            clearAll: "{that}.events.onClearAll.fire",

            /**
             * Clears all registered listeners and stops this scheduler's
             * clocks.
             */
            end: "{that}.events.onEnd.fire"
        },

        events: {
            onClear: null,
            onClearAll: null,
            onEnd: null
        },

        listeners: {
            onCreate: "{that}.schedule({that}.options.score)",
            onEnd: "{that}.clearAll",
            onDestroy: "{that}.end()"
        }
    });

    flock.scheduler.async.sequence = function (times, changeSpec, onceFn) {
        var listeners = [];

        for (var i = 0; i < times.length; i++) {
            var listener = onceFn(times[i], changeSpec);
            listeners.push(listener);
        }

        return listeners;
    };

    // TODO: This function is implemented suspiciously.
    flock.scheduler.async.schedule = function (schedules, that) {
        if (!schedules) {
            return;
        }

        schedules = flock.isIterable(schedules) ? schedules : [schedules];

        for (var i = 0; i < schedules.length; i++) {
            var schedule = schedules[i];
            flock.invoke(that, schedule.interval, [schedule.time, schedule.change]);
        }
    };

    flock.scheduler.async.prepareListener = function (changeSpec, synthContext) {
        return typeof changeSpec === "function" ? changeSpec :
            flock.scheduler.async.evaluateChangeSpec(changeSpec, synthContext);
    };

    flock.scheduler.async.getTargetSynth = function (changeSpec, synthContext) {
        var synthPath = changeSpec.synth;
        return !synthPath ?
            synthContext : typeof synthPath !== "string" ?
            synthPath : fluid.get(synthContext, synthPath);
    };

    flock.scheduler.async.makeSynthUpdater = function (synths, changeSpec, staticChanges, synthContext) {
        return function () {
            for (var path in synths) {
                var synth = synths[path];
                staticChanges[path] = synth.value();
            }

            var targetSynth = flock.scheduler.async.getTargetSynth(changeSpec, synthContext);

            if (!targetSynth) {
                flock.fail("A target synth named " + changeSpec.synth +
                    " could not be found in the specified synthContext. Synth context was: " + synthContext);
            } else {
                targetSynth.set(staticChanges);
            }
        };
    };

    flock.scheduler.async.evaluateChangeSpec = function (changeSpec, synthContext) {
        var synths = {},
            staticChanges = {};

        // Find all synthDefs and create demand rate synths for them.
        for (var path in changeSpec.values) {
            var change = changeSpec.values[path];
            if (change.synthDef) {
                synths[path] = flock.synth.value(change);
            } else {
                staticChanges[path] = change;
            }
        }

        return flock.scheduler.async.makeSynthUpdater(synths, changeSpec, staticChanges, synthContext);
    };

    fluid.defaults("flock.scheduler.async.tempo", {
        gradeNames: ["flock.scheduler.async"],

        bpm: 60,

        components: {
            timeConverter: {
                type: "flock.convert.beats",
                options: {
                    bpm: "{tempo}.options.bpm"
                }
            }
        }
    });


    /*******************
     * Time Conversion *
     *******************/

    fluid.registerNamespace("flock.convert");

    fluid.defaults("flock.convert.ms", {
        gradeNames: ["fluid.component"],

        invokers: {
            value: "fluid.identity({arguments}.0)"
        }
    });


    fluid.defaults("flock.convert.seconds", {
        gradeNames: ["fluid.component"],

        invokers: {
            value: "flock.convert.seconds.toMillis({arguments}.0)"
        }
    });

    flock.convert.seconds.toMillis = function (secs) {
        return secs * 1000;
    };


    fluid.defaults("flock.convert.beats", {
        gradeNames: ["fluid.component"],

        bpm: 60,

        invokers: {
            value: "flock.convert.beats.toMillis({arguments}.0, {that}.options.bpm)"
        }
    });

    flock.convert.beats.toMillis = function (beats, bpm) {
        return bpm <= 0 ? 0 : (beats / bpm) * 60000;
    };

}());
;/*
 * Flocking Web Audio Core
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2013-2014, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    fluid.registerNamespace("flock.webAudio");

    flock.webAudio.createNode = function (context, nodeSpec) {
        var args = nodeSpec.args ? fluid.makeArray(nodeSpec.args) : undefined;

        var creatorName = "create" + nodeSpec.node,
            nodeStrIdx = creatorName.indexOf("Node");

        // Trim off "Node" if it is present.
        if (nodeStrIdx > -1) {
            creatorName = creatorName.substring(0, nodeStrIdx);
        }

        var node = context[creatorName].apply(context, args);
        flock.webAudio.initNodeParams(context, node, nodeSpec);
        flock.webAudio.initNodeProperties(node, nodeSpec);
        flock.webAudio.initNodeInputs(node, nodeSpec);

        return node;
    };

    flock.webAudio.setAudioParamValue = function (context, param, value, atTime) {
        atTime = atTime || 0.0;
        var scheduledTime = context.currentTime + atTime;
        param.setValueAtTime(value, scheduledTime);
    };

    // TODO: Add support for other types of AudioParams.
    flock.webAudio.initNodeParams = function (context, node, nodeSpec) {
        var params = nodeSpec.params;

        if (!node || !params) {
            return;
        }

        for (var paramName in params) {
            var param = node[paramName],
                value = params[paramName];

            flock.webAudio.setAudioParamValue(context, param, value);
        }

        return node;
    };

    flock.webAudio.safariPropertyProhibitions = [
        "channelCount",
        "channelCountMode"
    ];

    flock.webAudio.shouldSetProperty = function (propName) {
        return flock.platform.browser.safari ?
            flock.webAudio.safariPropertyProhibitions.indexOf(propName) < 0 :
            true;
    };

    flock.webAudio.initNodeProperties = function (node, nodeSpec) {
        var props = nodeSpec.props;
        if (!props) {
            return;
        }

        for (var propName in props) {
            var value = props[propName];

            if (flock.webAudio.shouldSetProperty(propName)) {
                node[propName] = value;
            }
        }

        return node;
    };

    flock.webAudio.connectInput = function (node, inputNum, input, outputNum) {
        input.connect(node, outputNum, inputNum);
    };

    // TODO: Add the ability to specify the output channel of the connection.
    // TODO: Unify this with AudioParams so they all just look like "inputs".
    flock.webAudio.initNodeInputs = function (node, nodeSpec) {
        var inputs = nodeSpec.inputs;

        for (var inputName in inputs) {
            var inputNodes = inputs[inputName],
                inputNum = parseInt(inputName, 10);

            inputNodes = fluid.makeArray(inputNodes);

            for (var i = 0; i < inputNodes.length; i++) {
                var input = inputNodes[i];
                flock.webAudio.connectInput(node, inputNum, input);
            }
        }
    };


    fluid.defaults("flock.webAudio.node", {
        gradeNames: ["fluid.modelComponent"],

        members: {
            node: "@expand:flock.webAudio.createNode({audioSystem}.context, {that}.options.nodeSpec)"
        },

        nodeSpec: {
            args: [],
            params: {},
            properties: {}
        }
    });


    fluid.defaults("flock.webAudio.gain", {
        gradeNames: ["flock.webAudio.node"],

        members: {
            node: "@expand:flock.webAudio.createNode({audioSystem}.context, {that}.options.nodeSpec)"
        },

        nodeSpec: {
            node: "Gain"
        }
    });


    fluid.defaults("flock.webAudio.scriptProcessor", {
        gradeNames: ["flock.webAudio.node"],

        nodeSpec: {
            node: "ScriptProcessor",
            args: [
                "{audioSystem}.model.bufferSize",
                "{audioSystem}.model.numInputBuses",
                "{audioSystem}.model.chans"
            ],
            params: {},
            properties: {
                channelCountMode: "explicit"
            }
        }
    });

    fluid.defaults("flock.webAudio.channelMerger", {
        gradeNames: ["flock.webAudio.node"],

        nodeSpec: {
            node: "ChannelMerger",
            args: ["{audioSystem}.model.numInputBuses"],
            properties: {
                channelCountMode: "discrete"
            }
        }
    });

    fluid.defaults("flock.webAudio.outputFader", {
        gradeNames: ["fluid.component"],

        fadeDuration: 0.5,

        gainSpec: {
            node: "Gain",

            params: {
                gain: 0.0
            },

            properties: {
                channelCount: "{flock.enviro}.audioSystem.model.chans",
                channelCountMode: "explicit"
            }
        },

        members: {
            gainNode: "@expand:flock.webAudio.outputFader.createGainNode({flock.enviro}.audioSystem.nativeNodeManager, {that}.options.gainSpec)",
            context: "{flock.enviro}.audioSystem.context"
        },

        invokers: {
            fadeIn: {
                funcName: "flock.webAudio.outputFader.fadeIn",
                args: [
                    "{that}.context",
                    "{that}.gainNode",
                    "{arguments}.0", // Target amplitude
                    "{that}.options.fadeDuration"
                ]
            },

            fadeTo: {
                funcName: "flock.webAudio.outputFader.fadeTo",
                args: [
                    "{that}.context",
                    "{that}.gainNode",
                    "{arguments}.0", // Target amplitude
                    "{that}.options.fadeDuration"
                ]
            }
        }
    });

    flock.webAudio.outputFader.createGainNode = function (nativeNodeManager, gainSpec) {
        var gainNode = nativeNodeManager.createOutputNode(gainSpec);
        return gainNode;
    };

    flock.webAudio.outputFader.fade = function (context, gainNode, start, end, duration) {
        duration = duration || 0.0;

        var now = context.currentTime,
            endTime = now + duration;

        // Set the current value now, then ramp to the target.
        flock.webAudio.setAudioParamValue(context, gainNode.gain, start);
        gainNode.gain.linearRampToValueAtTime(end, endTime);
    };

    flock.webAudio.outputFader.fadeTo = function (context, gainNode, end, duration) {
        flock.webAudio.outputFader.fade(context, gainNode, gainNode.gain.value, end, duration);
    };

    flock.webAudio.outputFader.fadeIn = function (context, gainNode, end, duration) {
        flock.webAudio.outputFader.fade(context, gainNode, 0, end, duration);
    };

}());
;/*
* Flocking Web Audio System
* http://github.com/colinbdclark/flocking
*
* Copyright 2013-2015, Colin Clark
* Dual licensed under the MIT and GPL Version 2 licenses.
*/

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {

    "use strict";

    fluid.defaults("flock.webAudio.audioSystem", {
        gradeNames: ["flock.audioSystem"],

        channelRange: {
            min: "@expand:flock.webAudio.audioSystem.calcMinChannels()",
            max: "@expand:flock.webAudio.audioSystem.calcMaxChannels({that}.context.destination)"
        },

        members: {
            context: "@expand:flock.webAudio.audioSystem.createContext()"
        },

        model: {
            rates: {
                audio: "{that}.context.sampleRate"
            }
        },

        components: {
            outputManager: {
                type: "flock.webAudio.outputManager"
            },

            nativeNodeManager: {
                type: "flock.webAudio.nativeNodeManager"
            },

            inputDeviceManager: {
                type: "flock.webAudio.inputDeviceManager"
            },

            bufferWriter: {
                type: "flock.webAudio.bufferWriter"
            }
        },

        listeners: {
            onCreate: [
                "flock.webAudio.audioSystem.configureDestination({that}.context, {that}.model.chans)"
            ]
        }
    });

    flock.webAudio.audioSystem.createContext = function () {
        var system = flock.webAudio.audioSystem;
        if (!system.audioContextSingleton) {
            system.audioContextSingleton = new flock.shim.AudioContext();
        }

        return system.audioContextSingleton;
    };

    flock.webAudio.audioSystem.calcMaxChannels = function (destination) {
        return flock.platform.browser.safari ? destination.channelCount :
            destination.maxChannelCount;
    };

    flock.webAudio.audioSystem.calcMinChannels = function () {
        return flock.platform.browser.safari ? 2 : 1;
    };

    flock.webAudio.audioSystem.configureDestination = function (context, chans) {
        // Safari will throw an InvalidStateError DOM Exception 11 when
        // attempting to set channelCount on the audioContext's destination.
        // TODO: Remove this conditional when Safari adds support for multiple channels.
        if (!flock.platform.browser.safari) {
            context.destination.channelCount = chans;
            context.destination.channelCountMode = "explicit";
            context.destination.channelInterpretation = "discrete";
        }
    };

    fluid.defaults("flock.webAudio.enviroContextDistributor", {
        gradeNames: ["fluid.component"],

        distributeOptions: [
            {
                target: "{/ flock.enviro > audioSystem}.options",
                record: {
                    gradeNames: "flock.webAudio.audioSystem"
                }
            }
        ]
    });

    fluid.constructSingle([], {
        singleRootType: "flock.webAudio.enviroContextDistributor",
        type: "flock.webAudio.enviroContextDistributor"
    });
}());
;/*
 * Flocking Web Audio Buffer Writer
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2013-2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    fluid.defaults("flock.webAudio.bufferWriter", {
        gradeNames: "fluid.component",

        invokers: {
            save: "flock.webAudio.bufferWriter.saveBuffer({arguments}.0)"
        }
    });

    // TODO: This should move into its own component.
    flock.webAudio.bufferWriter.saveBuffer = function (o) {
        try {
            var encoded = flock.audio.encode.wav(o.buffer, o.format),
                blob = new Blob([encoded], {
                    type: "audio/wav"
                });

            flock.webAudio.bufferWriter.download(o.path, blob);

            if (o.success) {
                o.success(encoded);
            }

            return encoded;
        } catch (e) {
            if (!o.error) {
                flock.fail("There was an error while trying to download the buffer named " +
                    o.buffer.id + ". Error: " + e);
            } else {
                o.error(e);
            }
        }
    };

    flock.webAudio.bufferWriter.download = function (fileName, blob) {
        var dataURL = flock.shim.URL.createObjectURL(blob),
            a = window.document.createElement("a"),
            click = document.createEvent("Event");

        // TODO: This approach currently only works in Chrome.
        // Although Firefox apparently supports it, this method of
        // programmatically clicking the link doesn't seem to have an
        // effect in it.
        // http://caniuse.com/#feat=download
        a.href = dataURL;
        a.download = fileName;
        click.initEvent("click", true, true);
        a.dispatchEvent(click);
    };
}());
;/*
 * Flocking Web Audio Input Manager
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2013-2014, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require, MediaStreamTrack, jQuery*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    // TODO: Remove this when Chrome implements navigator.getMediaDevices().
    fluid.registerNamespace("flock.webAudio.chrome");

    flock.webAudio.chrome.getSources = function (callback) {
        return MediaStreamTrack.getSources(function (infoSpecs) {
            var normalized = fluid.transform(infoSpecs, function (infoSpec) {
                infoSpec.deviceId = infoSpec.id;
                return infoSpec;
            });

            callback(normalized);
        });
    };

    flock.webAudio.mediaStreamFailure = function () {
        flock.fail("Media Capture and Streams are not supported on this browser.");
    };

    var webAudioShims = {
        AudioContext: window.AudioContext || window.webkitAudioContext,

        getUserMediaImpl: navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia || flock.webAudio.mediaStreamFailure,

        getUserMedia: function () {
            flock.shim.getUserMediaImpl.apply(navigator, arguments);
        },

        getMediaDevicesImpl: navigator.getMediaDevices ? navigator.getMediaDevices :
            typeof window.MediaStreamTrack !== "undefined" ?
            flock.webAudio.chrome.getSources : flock.webAudio.mediaStreamFailure,

        getMediaDevice: function () {
            flock.shim.getMediaDevicesImpl.apply(navigator, arguments);
        }
    };

    jQuery.extend(flock.shim, webAudioShims);

    /**
     * Manages audio input devices using the Web Audio API.
     */
    // Add a means for disconnecting audio input nodes.
    fluid.defaults("flock.webAudio.inputDeviceManager", {
        gradeNames: ["fluid.component"],

        invokers: {
            /**
             * Opens the specified audio device.
             * If no device is specified, the default device is opened.
             *
             * @param {Object} deviceSpec a device spec containing, optionally, an 'id' or 'label' parameter
             */
            openAudioDevice: {
                funcName: "flock.webAudio.inputDeviceManager.openAudioDevice",
                args: [
                    "{arguments}.0",
                    "{that}.openAudioDeviceWithId",
                    "{that}.openFirstAudioDeviceWithLabel",
                    "{that}.openAudioDeviceWithConstraints"
                ]
            },

            /**
             * Opens an audio device with the specified WebRTC constraints.
             * If no constraints are specified, the default audio device is opened.
             *
             * @param {Object} constraints a WebRTC-compatible constraints object
             */
            openAudioDeviceWithConstraints: {
                funcName: "flock.webAudio.inputDeviceManager.openAudioDeviceWithConstraints",
                args: [
                    "{audioSystem}.context",
                    "{enviro}",
                    "{nativeNodeManager}.createMediaStreamInput",
                    "{arguments}.0"
                ]
            },

            /**
             * Opens an audio device with the specified WebRTC device id.
             *
             * @param {string} id a device identifier
             */
            openAudioDeviceWithId: {
                funcName: "flock.webAudio.inputDeviceManager.openAudioDeviceWithId",
                args: ["{arguments}.0", "{that}.openAudioDeviceWithConstraints"]
            },

            /**
             * Opens the first audio device found with the specified label.
             * The label must be an exact, case-insensitive match.
             *
             * @param {string} label a device label
             */
            openFirstAudioDeviceWithLabel: {
                funcName: "flock.webAudio.inputDeviceManager.openFirstAudioDeviceWithLabel",
                args: ["{arguments}.0", "{that}.openAudioDeviceWithId"]
            }
        }
    });

    flock.webAudio.inputDeviceManager.openAudioDevice = function (sourceSpec, idOpener, labelOpener, specOpener) {
        if (sourceSpec) {
            if (sourceSpec.id) {
                return idOpener(sourceSpec.id);
            } else if (sourceSpec.label) {
                return labelOpener(sourceSpec.label);
            }
        }

        return specOpener();
    };


    flock.webAudio.inputDeviceManager.openAudioDeviceWithId = function (id, deviceOpener) {
        var options = {
            audio: {
                optional: [
                    {
                        sourceId: id
                    }
                ]
            }
        };

        deviceOpener(options);
    };

    flock.webAudio.inputDeviceManager.openFirstAudioDeviceWithLabel = function (label, deviceOpener) {
        if (!label) {
            return;
        }

        // TODO: Can't access device labels until the user agrees
        // to allow access to the current device.
        flock.shim.getMediaDevices(function (deviceInfoSpecs) {
            var matches = deviceInfoSpecs.filter(function (device) {
                if (device.label.toLowerCase() === label.toLowerCase()) {
                    return true;
                }
            });

            if (matches.length > 0) {
                deviceOpener(matches[0].deviceId);
            } else {
                fluid.log(fluid.logLevel.IMPORTANT,
                    "An audio device named '" + label + "' could not be found.");
            }
        });
    };

    flock.webAudio.inputDeviceManager.openAudioDeviceWithConstraints = function (context, enviro, openMediaStream, options) {
        options = options || {
            audio: true
        };

        // Acquire an input bus ahead of time so we can synchronously
        // notify the client where its output will be.
        var busNum = enviro.busManager.acquireNextBus("input");

        function error (err) {
            fluid.log(fluid.logLevel.IMPORTANT,
                "An error occurred while trying to access the user's microphone. " +
                err);
        }

        function success (mediaStream) {
            openMediaStream(mediaStream, busNum);
        }


        flock.shim.getUserMedia(options, success, error);

        return busNum;
    };

}());
;/*
 * Flocking Web MIDI
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2014, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require, Promise, console*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {

    "use strict";

    fluid.registerNamespace("flock.midi");

    flock.midi.requestAccess = function (sysex, onAccessGranted, onError) {
        if (!navigator.requestMIDIAccess) {
            var msg = "The Web MIDI API is not available. You may need to enable it in your browser's settings.";
            fluid.log(fluid.logLevel.WARN, msg);
            onError(msg);
            return;
        }

        var p = navigator.requestMIDIAccess({
            sysex: sysex
        });

        p.then(onAccessGranted, onError);
    };

    flock.midi.getPorts = function (access) {
        var ports = {},
            portCollector = typeof access.inputs === "function" ?
                flock.midi.collectPortsLegacy : flock.midi.collectPorts;

        portCollector("inputs", access, ports);
        portCollector("outputs", access, ports);

        return ports;
    };

    flock.midi.requestPorts = function (success, error) {
        function wrappedSuccess (access) {
            var ports = flock.midi.getPorts(access);
            success(ports);
        }

        flock.midi.requestAccess(false, wrappedSuccess, error);
    };

    flock.midi.createPortViews = function (portsArray) {
        return fluid.transform(portsArray, function (port) {
            return {
                id: port.id,
                name: port.name,
                manufacturer: port.manufacturer,
                state: port.state,
                connection: port.connection
            };
        });
    };

    flock.midi.prettyPrintPorts = function (ports) {
        return fluid.prettyPrintJSON({
            inputs: flock.midi.createPortViews(ports.inputs),
            outputs: flock.midi.createPortViews(ports.outputs)
        });
    };

    flock.midi.logPorts = function () {
        function success (ports) {
            var printed = flock.midi.prettyPrintPorts(ports);
            console.log(printed);
        }

        function error (err) {
            console.log(err);
        }

        flock.midi.requestPorts(success, error);
    };

    flock.midi.collectPorts = function (type, access, ports) {
        var portsForType = ports[type] = ports[type] || [],
            iterator = access[type].values();

        // TODO: Switch to ES6 for..of syntax when it's safe to do so
        // across all supported Flocking environments
        // (i.e. when Node.js and eventually IE support it).
        var next = iterator.next();
        while (!next.done) {
            portsForType.push(next.value);
            next = iterator.next();
        }

        return ports;
    };

    // TODO: Remove this when the new Web MIDI API makes it
    // into the Chrome release channel.
    flock.midi.collectPortsLegacy = function (type, access, ports) {
        if (access[type]) {
            ports[type] = access[type]();
        }

        return ports;
    };

    flock.midi.read = function (data) {
        var status = data[0],
            type = status >> 4,
            chan = status & 0xf,
            fn;

        switch (type) {
            case 8:
                fn = flock.midi.read.noteOff;
                break;
            case 9:
                fn = data[2] > 0 ? flock.midi.read.noteOn : flock.midi.read.noteOff;
                break;
            case 10:
                fn = flock.midi.read.polyAftertouch;
                break;
            case 11:
                fn = flock.midi.read.controlChange;
                break;
            case 12:
                fn = flock.midi.read.programChange;
                break;
            case 13:
                fn = flock.midi.read.channelAftertouch;
                break;
            case 14:
                fn = flock.midi.read.pitchbend;
                break;
            case 15:
                fn = flock.midi.read.sysex;
                break;
            default:
                throw new Error("Recieved an unrecognized MIDI message: " + data);
        }

        return fn(chan, data);
    };

    flock.midi.read.note = function (type, chan, data) {
        return {
            type: type,
            chan: chan,
            note: data[1],
            velocity: data[2]
        };
    };

    flock.midi.read.noteOn = function (chan, data) {
        return flock.midi.read.note("noteOn", chan, data);
    };

    flock.midi.read.noteOff = function (chan, data) {
        return flock.midi.read.note("noteOff", chan, data);
    };

    flock.midi.read.polyAftertouch = function (chan, data) {
        return {
            type: "aftertouch",
            chan: chan,
            note: data[1],
            pressure: data[2]
        };
    };

    flock.midi.read.controlChange = function (chan, data) {
        return {
            type: "control",
            chan: chan,
            number: data[1],
            value: data[2]
        };
    };

    flock.midi.read.programChange = function (chan, data) {
        return {
            type: "program",
            chan: chan,
            program: data[1]
        };
    };

    flock.midi.read.channelAftertouch = function (chan, data) {
        return {
            type: "aftertouch",
            chan: chan,
            pressure: data[1]
        };
    };

    flock.midi.read.pitchbend = function (chan, data) {
        return {
            type: "pitchbend",
            chan: chan,
            value: (data[1] << 7) | data[2]
        };
    };

    flock.midi.read.sysex = function (chan, data) {
        return {
            type: "system",
            chan: chan,
            data: data.subarray(1)
        };
    };


    /**
     * Represents the overall Web MIDI system,
     * including references to all the available MIDI ports
     * and the MIDIAccess object.
     */
    // TODO: This should be a model component!
    fluid.defaults("flock.midi.system", {
        gradeNames: ["fluid.component"],

        sysex: false,

        members: {
            access: undefined,
            ports: undefined
        },

        invokers: {
            requestAccess: {
                funcName: "flock.midi.requestAccess",
                args: [
                    "{that}.options.sysex",
                    "{that}.events.onAccessGranted.fire",
                    "{that}.events.onAccessError.fire"
                ]
            },

            refreshPorts: {
                funcName: "flock.midi.system.refreshPorts",
                args: ["{that}", "{that}.access", "{that}.events.onPortsAvailable.fire"]
            }
        },

        events: {
            onAccessGranted: null,
            onAccessError: null,
            onReady: null,
            onPortsAvailable: null
        },

        listeners: {
            onCreate: {
                func: "{that}.requestAccess"
            },

            onAccessGranted: [
                "flock.midi.system.setAccess({that}, {arguments}.0)",
                "{that}.refreshPorts()",
                "{that}.events.onReady.fire({that}.ports)"
            ],

            onAccessError: {
                funcName: "fluid.log",
                args: [fluid.logLevel.WARN, "MIDI Access Error: ", "{arguments}.0"]
            }
        }
    });

    flock.midi.system.setAccess = function (that, access) {
        that.access = access;
    };

    flock.midi.system.refreshPorts = function (that, access, onPortsAvailable) {
        that.ports = flock.midi.getPorts(access);
        onPortsAvailable(that.ports);
    };


    /**
     * An abstract grade that the defines the event names
     * for receiving MIDI messages
     */
    fluid.defaults("flock.midi.receiver", {
        gradeNames: ["fluid.component"],

        events: {
            raw: null,
            message: null,
            note: null,
            noteOn: null,
            noteOff: null,
            control: null,
            program: null,
            aftertouch: null,
            pitchbend: null
        }
    });


    /*
     * A MIDI Connection represents a connection between an arbitrary set of
     * input and output ports across one or more MIDI devices connected to the system.
     */
    // TODO: Handle port disconnection events.
    fluid.defaults("flock.midi.connection", {
        gradeNames: ["flock.midi.receiver"],

        openImmediately: false,

        sysex: false,

        distributeOptions: {
            source: "{that}.options.sysex",
            target: "{that > system}.options.sysex"
        },

        // Supported PortSpec formats:
        //  - Number: the index of the input and output port to use (this is the default)
        //  - { manufacturer: "akai", name: "LPD8"}
        //  - { input: Number, output: Number}
        //  - { input: { manufacturer: "akai", name: "LPD8"}, output: {manufacturer: "korg", name: "output"}}
        ports: 0,

        invokers: {
            send: {
                func: "{that}.events.onSendMessage.fire"
            },

            open: {
                funcName: "flock.midi.connection.bind",
                args: [
                    "{system}.ports",
                    "{that}.options.ports",
                    "{that}.events.onReady.fire",
                    "{that}.events.raw.fire",
                    "{that}.events.onSendMessage"
                ]
            },

            close: {
                funcName: "flock.midi.connection.close",
                args: [
                    "{system}.ports",
                    "{that}.events.raw.fire"
                ]
            }
        },

        components: {
            system: {
                type: "flock.midi.system",
                options: {
                    events: {
                        onReady: "{connection}.events.onPortsAvailable"
                    }
                }
            }
        },

        events: {
            onPortsAvailable: null,
            onReady: null,
            onError: null,
            onSendMessage: null
        },

        listeners: {
            onPortsAvailable: {
                funcName: "flock.midi.connection.autoOpen",
                args: [
                    "{connection}.options.openImmediately", "{connection}.open"
                ]
            },

            onError: {
                funcName: "fluid.log",
                args: [fluid.logLevel.WARN, "{arguments}.0"]
            },

            raw: {
                funcName: "flock.midi.connection.fireEvent",
                args: ["{arguments}.0", "{that}.events"]
            },

            onDestroy: [
                "{that}.close()"
            ]
        }
    });

    flock.midi.connection.autoOpen = function (openImmediately, openFn) {
        if (openImmediately) {
            openFn();
        }
    };

    flock.midi.findPorts = function (ports, portSpecs) {
        portSpecs = fluid.makeArray(portSpecs);

        var matches = [];

        fluid.each(portSpecs, function (portSpec) {
            var portFinder = flock.midi.findPorts.portFinder(portSpec),
                matchesForSpec = portFinder(ports);

            matches = matches.concat(matchesForSpec);
        });

        return matches;
    };

    flock.midi.findPorts.portFinder = function (portSpec) {
        if (typeof portSpec === "number") {
            return flock.midi.findPorts.byIndex(portSpec);
        }

        if (typeof portSpec === "string") {
            portSpec = {
                name: portSpec
            };
        }

        var matcher = portSpec.id ? flock.midi.findPorts.idMatcher(portSpec.id) :
            portSpec.manufacturer && portSpec.name ?
            flock.midi.findPorts.bothMatcher(portSpec.manufacturer, portSpec.name) :
            portSpec.manufacturer ? flock.midi.findPorts.manufacturerMatcher(portSpec.manufacturer) :
            flock.midi.findPorts.nameMatcher(portSpec.name);

        return function (ports) {
            return ports.filter(matcher);
        };
    };

    flock.midi.findPorts.byIndex = function (idx) {
        return function (ports) {
            var port = ports[idx];
            return port ? [port] : [];
        };
    };

    flock.midi.findPorts.lowerCaseContainsMatcher = function (matchSpec) {
        return function (obj) {
            var isMatch;
            for (var prop in matchSpec) {
                var objVal = obj[prop];
                var matchVal = matchSpec[prop];

                isMatch = (matchVal === "*") ? true :
                    objVal && (objVal.toLowerCase().indexOf(matchVal.toLowerCase()) > -1);

                if (!isMatch) {
                    break;
                }
            }

            return isMatch;
        };
    };

    flock.midi.findPorts.idMatcher = function (id) {
        return function (port) {
            return port.id === id;
        };
    };

    flock.midi.findPorts.bothMatcher = function (manu, name) {
        return flock.midi.findPorts.lowerCaseContainsMatcher({
            manufacturer: manu,
            name: name
        });
    };

    flock.midi.findPorts.manufacturerMatcher = function (manu) {
        return flock.midi.findPorts.lowerCaseContainsMatcher({
            manufacturer: manu
        });
    };

    flock.midi.findPorts.nameMatcher = function (name) {
        return flock.midi.findPorts.lowerCaseContainsMatcher({
            name: name
        });
    };

    flock.midi.findPorts.eachPortOfType = function (port, type, fn) {
        var ports = fluid.makeArray(port);
        fluid.each(ports, function (port) {
            if (port.type === type) {
                fn(port);
            }
        });
    };

    flock.midi.connection.openPort = function (port, openPromises) {
        // Remove this conditional when Chrome 43 has been released.
        if (port.open) {
            var p = port.open();
            openPromises.push(p);
        }

        return openPromises;
    };

    flock.midi.connection.listen = function (port, onRaw, openPromises) {
        flock.midi.findPorts.eachPortOfType(port, "input", function (port) {
            flock.midi.connection.openPort(port, openPromises);
            port.addEventListener("midimessage", onRaw, false);
        });

        return openPromises;
    };

    flock.midi.connection.stopListening = function (port, onRaw) {
        flock.midi.findPorts.eachPortOfType(port, "input", function (port) {
            port.close();
            port.removeEventListener("midimessage", onRaw, false);
        });
    };

    flock.midi.connection.bindSender = function (port, onSendMessage, openPromises) {
        var ports = fluid.makeArray(port);

        fluid.each(ports, function (port) {
            flock.midi.connection.openPort(port, openPromises);
            onSendMessage.addListener(port.send.bind(port));
        });

        return openPromises;
    };

    flock.midi.connection.fireReady = function (openPromises, onReady) {
        if (!openPromises || openPromises.length < 1) {
            return;
        }

        Promise.all(openPromises).then(onReady);
    };

    flock.midi.connection.bind = function (ports, portSpec, onReady, onRaw, onSendMessage) {
        portSpec = flock.midi.connection.expandPortSpec(portSpec);

        var input = flock.midi.findPorts(ports.inputs, portSpec.input),
            output = flock.midi.findPorts(ports.outputs, portSpec.output),
            openPromises = [];

        if (input && input.length > 0) {
            flock.midi.connection.listen(input, onRaw, openPromises);
        } else if (portSpec.input !== undefined) {
            flock.midi.connection.logNoMatchedPorts("input", portSpec);
        }

        if (output && output.length > 0) {
            flock.midi.connection.bindSender(output, onSendMessage, openPromises);
        } else if (portSpec.output !== undefined) {
            flock.midi.connection.logNoMatchedPorts("output", portSpec);
        }

        flock.midi.connection.fireReady(openPromises, onReady);
    };

    flock.midi.connection.close = function (ports, onRaw) {
        flock.midi.connection.stopListening(ports.inputs, onRaw);
        // TODO: Come up with some scheme for unbinding port senders
        // since they use Function.bind().
    };

    flock.midi.connection.logNoMatchedPorts = function (type, portSpec) {
        fluid.log(fluid.logLevel.WARN,
            "No matching " + type + " ports were found for port specification: ", portSpec[type]);
    };

    flock.midi.connection.expandPortSpec = function (portSpec) {
        if (portSpec.input !== undefined || portSpec.output !== undefined) {
            return portSpec;
        }

        var expanded = {
            input: {},
            output: {}
        };

        if (typeof portSpec === "number") {
            expanded.input = expanded.output = portSpec;
        } else {
            flock.midi.connection.expandPortSpecProperty("manufacturer", portSpec, expanded);
            flock.midi.connection.expandPortSpecProperty("name", portSpec, expanded);
        }

        return expanded;
    };

    flock.midi.connection.expandPortSpecProperty = function (propName, portSpec, expanded) {
        expanded.input[propName] = expanded.output[propName] = portSpec[propName];
        return expanded;
    };

    flock.midi.connection.fireEvent = function (midiEvent, events) {
        var model = flock.midi.read(midiEvent.data),
            eventForType = model.type ? events[model.type] : undefined;

        events.message.fire(model);

        // TODO: Remove this special-casing of noteOn/noteOff events into note events.
        if (model.type === "noteOn" || model.type === "noteOff") {
            events.note.fire(model);
        }

        if (eventForType) {
            eventForType.fire(model);
        }
    };


    fluid.defaults("flock.midi.controller", {
        gradeNames: ["fluid.component"],

        members: {
            controlMap: "@expand:flock.midi.controller.optimizeControlMap({that}.options.controlMap)",
            noteMap: "{that}.options.noteMap"
        },

        controlMap: {},                       // Control and note maps
        noteMap: {},                          // need to be specified by the user.

        components: {
            synthContext: {                   // Also user-specified. Typically a flock.band instance,
                type: "flock.band"            // but can be anything that has a set of named synths,
            },                                // including a synth itself.

            connection: {
                type: "flock.midi.connection",
                options: {
                    ports: {
                        input: "*"              // Connect to the first available input port.
                    },

                    openImmediately: true,    // Immediately upon instantiating the connection.

                    listeners: {
                        control: {
                            func: "{controller}.mapControl"
                        },
                        note: {
                            func: "{controller}.mapNote"
                        }
                    }
                }
            }
        },

        invokers: {
            mapControl: {
                funcName: "flock.midi.controller.mapControl",
                args: ["{arguments}.0", "{that}.synthContext", "{that}.controlMap"]
            },

            mapNote: {
                funcName: "flock.midi.controller.mapNote",
                args: ["{arguments}.0", "{that}.synthContext", "{that}.noteMap"]
            }
        }
    });

    flock.midi.controller.optimizeControlMap = function (controlMap) {
        var controlMapArray = new Array(127);
        fluid.each(controlMap, function (mapSpec, controlNum) {
            var idx = Number(controlNum);
            controlMapArray[idx] = mapSpec;
        });

        return controlMapArray;
    };

    flock.midi.controller.expandControlMapSpec = function (valueUGenID, mapSpec) {
        mapSpec.transform.id = valueUGenID;

        // TODO: The key "valuePath" is confusing;
        // it actually points to the location in the
        // transform synth where the value will be set.
        mapSpec.valuePath = mapSpec.valuePath || "value";

        if (!mapSpec.transform.ugen) {
            mapSpec.transform.ugen = "flock.ugen.value";
        }

        return mapSpec;
    };

    flock.midi.controller.makeValueSynth = function (value, id, mapSpec) {
        mapSpec = flock.midi.controller.expandControlMapSpec(id, mapSpec);

        var transform = mapSpec.transform,
            valuePath = mapSpec.valuePath;

        flock.set(transform, valuePath, value);

        // Instantiate the new value synth.
        var valueSynth = flock.synth.value({
            synthDef: transform
        });

        // Update the value path so we can quickly update the synth's input value.
        mapSpec.valuePath = id + "." + valuePath;

        return valueSynth;
    };

    flock.midi.controller.transformValue = function (value, mapSpec) {
        var transform = mapSpec.transform,
            type = typeof transform;

        if (type === "function") {
            return transform(value);
        }
        // TODO: Add support for string-based transforms
        // that bind to globally-defined synths
        // (e.g. "flock.synth.midiFreq" or "flock.synth.midiAmp")
        // TODO: Factor this into a separate function.
        if (!mapSpec.transformSynth) {
            // We have a raw synthDef.
            // Instantiate a value synth to transform incoming control values.

            // TODO: In order to support multiple inputs (e.g. a multi-arg OSC message),
            // this special path needs to be scoped to the argument name. In the case of MIDI,
            // this would be the CC number. In the case of OSC, it would be a combination of
            // OSC message address and argument index.
            mapSpec.transformSynth = flock.midi.controller.makeValueSynth(
                value, "flock-midi-controller-in", mapSpec);
        } else {
            // TODO: When the new node architecture is in in place, we can directly connect this
            // synth to the target synth at instantiation time.
            // TODO: Add support for arrays of values, such as multi-arg OSC messages.
            mapSpec.transformSynth.set(mapSpec.valuePath, value);
        }

        return mapSpec.transformSynth.value();
    };

    flock.midi.controller.setMappedValue = function (value, map, synthContext) {
        if (!map) {
            return;
        }

        value = map.transform ? flock.midi.controller.transformValue(value, map) : value;
        var synth = synthContext[map.synth] || synthContext;

        synth.set(map.input, value);
    };

    flock.midi.controller.mapControl = function (midiMsg, synthContext, controlMap) {
        var map = controlMap[midiMsg.number],
            value = midiMsg.value;

        flock.midi.controller.setMappedValue(value, map, synthContext);
    };

    // TODO: Add support for defining listener filters or subsets
    // of all midi notes (e.g. for controllers like the Quneo).
    flock.midi.controller.mapNote = function (midiMsg, synthContext, noteMap) {
        var keyMap = noteMap.note,
            key = midiMsg.note,
            velMap = noteMap.velocity,
            vel = midiMsg.velocity;

        if (keyMap) {
            flock.midi.controller.setMappedValue(key, keyMap, synthContext);
        }

        if (velMap) {
            flock.midi.controller.setMappedValue(vel, velMap, synthContext);
        }
    };

}());
;/*
 * Flocking Web Audio Native Node Manager
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2013-2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    /**
     * Manages a collection of input nodes and an output node,
     * with a JS node in between.
     *
     * Note: this component is slated for removal when Web Audio
     * "islands" are implemented.
     */
    fluid.defaults("flock.webAudio.nativeNodeManager", {
        gradeNames: ["fluid.component"],

        members: {
            outputNode: undefined,
            inputNodes: []
        },

        components: {
            scriptProcessor: {
                createOnEvent: "onCreateScriptProcessor",
                type: "flock.webAudio.scriptProcessor",
                options: {
                    nodeSpec: {
                        inputs: {
                            "0": "{inputMerger}"
                        }
                    }
                }
            },

            merger: {
                type: "flock.webAudio.channelMerger"
            }
        },

        invokers: {
            connect: "{that}.events.onConnect.fire",

            disconnect: "{that}.events.onDisconnect.fire",

            createNode: {
                funcName: "flock.webAudio.createNode",
                args: [
                    "{audioSystem}.context",
                    "{arguments}.0" // The nodeSpec
                ]
            },

            createInputNode: {
                funcName: "flock.webAudio.nativeNodeManager.createInputNode",
                args: [
                    "{that}",
                    "{arguments}.0", // The nodeSpec.
                    "{arguments}.1", // {optional} The input bus number to insert it at.
                ]
            },

            createMediaStreamInput: {
                funcName: "flock.webAudio.nativeNodeManager.createInputNode",
                args: [
                    "{that}",
                    {
                        node: "MediaStreamSource",
                        args: ["{arguments}.0"] // The MediaStream
                    },
                    "{arguments}.1"  // {optional} The input bus number to insert it at.
                ]
            },

            createMediaElementInput: {
                funcName: "flock.webAudio.nativeNodeManager.createInputNode",
                args: [
                    "{that}",
                    {
                        node: "MediaElementSource",
                        args: ["{arguments}.0"] // The HTMLMediaElement
                    },
                    "{arguments}.1"  // {optional} The input bus number to insert it at.
                ]
            },

            createOutputNode: {
                funcName: "flock.webAudio.nativeNodeManager.createOutputNode",
                args: [
                    "{that}",
                    "{arguments}.0" // The nodeSpec
                ]
            },

            insertInput: {
                funcName: "flock.webAudio.nativeNodeManager.insertInput",
                args: [
                    "{that}",
                    "{audioSystem}.model",
                    "{enviro}",
                    "{arguments}.0", // The node to insert.
                    "{arguments}.1"  // {optional} The bus number to insert it at.
                ]
            },

            removeInput: {
                funcName: "flock.webAudio.nativeNodeManager.removeInput",
                args: ["{arguments}.0", "{that}.inputNodes"]
            },

            removeAllInputs: {
                funcName: "flock.webAudio.nativeNodeManager.removeAllInputs",
                args: "{that}.inputNodes"
            },

            insertOutput: {
                funcName: "flock.webAudio.nativeNodeManager.insertOutput",
                args: ["{that}", "{arguments}.0"]
            },

            removeOutput: {
                funcName: "flock.webAudio.nativeNodeManager.removeOutput",
                args: ["{scriptProcessor}.node"]
            }
        },

        events: {
            // TODO: Normalize these with other components
            // that reference the same events. Bump them up to {audioSystem}
            // or use cross-component listener references?
            onStart: "{enviro}.events.onStart",
            onStop: "{enviro}.events.onStop",
            onReset: "{enviro}.events.onReset",

            onCreateScriptProcessor: null,
            onConnect: null,
            onDisconnect: null
        },

        listeners: {
            onCreate: [
                "{that}.events.onCreateScriptProcessor.fire()",
                {
                    func: "{that}.insertOutput",
                    args: "{scriptProcessor}.node"
                }
            ],

            onStart: [
                "{that}.connect()"
            ],

            onConnect: [
                {
                    "this": "{merger}.node",
                    method: "connect",
                    args: ["{scriptProcessor}.node"]
                },
                {
                    "this": "{that}.outputNode",
                    method: "connect",
                    args: ["{audioSystem}.context.destination"]
                },
                {
                    funcName: "flock.webAudio.nativeNodeManager.connectOutput",
                    args: ["{scriptProcessor}.node", "{that}.outputNode"]
                }
            ],

            onStop: [
                "{that}.disconnect()"
            ],

            onDisconnect: [
                {
                    "this": "{merger}.node",
                    method: "disconnect",
                    args: [0]
                },
                {
                    "this": "{scriptProcessor}.node",
                    method: "disconnect",
                    args: [0]
                },
                {
                    "this": "{that}.outputNode",
                    method: "disconnect",
                    args: [0]
                }
            ],

            onReset: [
                "{that}.removeAllInputs",
                "{that}.events.onCreateScriptProcessor.fire()"
            ]
        }
    });

    flock.webAudio.nativeNodeManager.createInputNode = function (that, nodeSpec, busNum) {
        var node = that.createNode(nodeSpec);
        return that.insertInput(node, busNum);
    };

    flock.webAudio.nativeNodeManager.createOutputNode = function (that, nodeSpec) {
        var node = that.createNode(nodeSpec);
        return that.insertOutput(node);
    };

    flock.webAudio.nativeNodeManager.connectOutput = function (jsNode, outputNode) {
        if (jsNode !== outputNode) {
            jsNode.connect(outputNode);
        }
    };

    flock.webAudio.nativeNodeManager.removeAllInputs = function (inputNodes) {
        for (var i = 0; i < inputNodes.length; i++) {
            var node = inputNodes[i];
            node.disconnect(0);
        }
        inputNodes.length = 0;
    };

    flock.webAudio.nativeNodeManager.insertInput = function (that, audioSettings, enviro, node, busNum) {
        var maxInputs = audioSettings.numInputBuses;
        if (that.inputNodes.length >= maxInputs) {
            flock.fail("There are too many input nodes connected to Flocking. " +
                "The maximum number of input buses is currently set to " + maxInputs + ". " +
                "Either remove an existing input node or increase Flockings numInputBuses option.");

            return;
        }

        busNum = busNum === undefined ? enviro.busManager.acquireNextBus("input") : busNum;
        var idx = busNum - audioSettings.chans;

        that.inputNodes.push(node);
        node.connect(that.merger.node, 0, idx);

        return busNum;
    };

    flock.webAudio.nativeNodeManager.removeInput = function (node, inputNodes) {
        var idx = inputNodes.indexOf(node);
        if (idx > -1) {
            inputNodes.splice(idx, 1);
        }

        node.disconnect(0);
    };

    flock.webAudio.nativeNodeManager.insertOutput = function (that, node) {
        if (that.outputNode) {
            that.outputNode.disconnect(0);
        }

        that.outputNode = node;

        return node;
    };

    flock.webAudio.nativeNodeManager.removeOutput = function (jsNode) {
        // Replace the current output node with the jsNode.
        flock.webAudio.nativeNodeManager.insertOutput(jsNode);
    };

}());
;/*
 * Flocking Web Audio Output Manager
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2013-2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    /**
     * Web Audio API Output Manager
     */
    fluid.defaults("flock.webAudio.outputManager", {
        gradeNames: ["flock.outputManager"],

        model: {
            isGenerating: false,
            shouldInitIOS: flock.platform.isIOS,
            audioSettings: {}
        },

        invokers: {
            bindAudioProcess: {
                funcName: "flock.webAudio.outputManager.bindAudioProcess",
                args: ["{nodeEvaluator}", "{nativeNodeManager}", "{that}.model"]
            },

            unbindAudioProcess: {
                funcName: "flock.webAudio.outputManager.unbindAudioProcess",
                args: ["{nativeNodeManager}"]
            }
        },

        listeners: {
            "{nativeNodeManager}.events.onConnect": [
                "{that}.bindAudioProcess()"
            ],

            "{nativeNodeManager}.events.onDisconnect": [
                "{that}.unbindAudioProcess()"
            ],

            onStart: [
                {
                    func: "{that}.applier.change",
                    args: ["isGenerating", true]
                },
                {
                    // TODO: Replace this with some progressive enhancement action.
                    priority: "last",
                    funcName: "flock.webAudio.outputManager.iOSStart",
                    args: [
                        "{that}", "{audioSystem}.context", "{scriptProcessor}.node"
                    ]
                }
            ],

            onStop: [
                {
                    func: "{that}.applier.change",
                    args: ["isGenerating", false]
                }
            ]
        }
    });


    flock.webAudio.outputManager.bindAudioProcess = function (nodeEvaluator,
        nativeNodeManager, model) {
        var jsNode = nativeNodeManager.scriptProcessor.node;

        jsNode.model = model;
        jsNode.evaluator = nodeEvaluator;
        jsNode.inputNodes = nativeNodeManager.inputNodes;
        jsNode.onaudioprocess = flock.webAudio.outputManager.writeSamples;
    };

    flock.webAudio.outputManager.unbindAudioProcess = function (nativeNodeManager) {
        nativeNodeManager.scriptProcessor.node.onaudioprocess = undefined;
    };

    /**
     * Writes samples to a ScriptProcessorNode's output buffers.
     *
     * This function must be bound as a listener to the node's
     * onaudioprocess event. It expects to be called in the context
     * of a "this" instance containing the following properties:
     *  - model: the outputManager's model
     *  - inputNodes: a list of native input nodes to be read into input buses
     *  - nodeEvaluator: a nodeEvaluator instance
     */
    flock.webAudio.outputManager.writeSamples = function (e) {
        var numInputNodes = this.inputNodes.length,
            evaluator = this.evaluator,
            nodes = evaluator.nodes,
            s = this.model.audioSettings,
            inBufs = e.inputBuffer,
            outBufs = e.outputBuffer,
            numBlocks = s.numBlocks,
            buses = evaluator.buses,
            numBuses = s.numBuses,
            blockSize = s.blockSize,
            chans = s.chans,
            inChans = inBufs.numberOfChannels,
            chan,
            i,
            samp;

        // If there are no nodes providing samples, write out silence.
        if (evaluator.nodes.length < 1) {
            for (chan = 0; chan < chans; chan++) {
                flock.generate.silence(outBufs.getChannelData(chan));
            }
            return;
        }

        // TODO: Make a formal distinction between input buses,
        // output buses, and interconnect buses in the environment!
        for (i = 0; i < numBlocks; i++) {
            var offset = i * blockSize;

            flock.nodeEvaluator.clearBuses(numBuses, blockSize, buses);

            // Read this ScriptProcessorNode's input buffers
            // into the environment.
            if (numInputNodes > 0) {
                for (chan = 0; chan < inChans; chan++) {
                    var inBuf = inBufs.getChannelData(chan),
                        inBusNumber = chans + chan, // Input buses are located after output buses.
                        targetBuf = buses[inBusNumber];

                    for (samp = 0; samp < blockSize; samp++) {
                        targetBuf[samp] = inBuf[samp + offset];
                    }
                }
            }

            flock.nodeEvaluator.gen(nodes);

            // Output the environment's signal
            // to this ScriptProcessorNode's output channels.
            for (chan = 0; chan < chans; chan++) {
                var sourceBuf = buses[chan],
                    outBuf = outBufs.getChannelData(chan);

                // And output each sample.
                for (samp = 0; samp < blockSize; samp++) {
                    outBuf[samp + offset] = sourceBuf[samp];
                }
            }
        }
    };

    flock.webAudio.outputManager.iOSStart = function (that, ctx, jsNode) {
        // Work around a bug in iOS Safari where it now requires a noteOn()
        // message to be invoked before sound will work at all. Just connecting a
        // ScriptProcessorNode inside a user event handler isn't sufficient.
        if (that.model.shouldInitIOS) {
            var s = ctx.createBufferSource();
            s.connect(jsNode);
            s.start(0);
            s.stop(0);
            s.disconnect(0);
            that.applier.change("shouldInitIOS", false);
        }
    };
}());
;/*
 * Flocking Core Unit Generators
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2011-2014, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    var $ = fluid.registerNamespace("jQuery");

    flock.ugenDefaults = function (path, defaults) {
        if (arguments.length === 1) {
            return flock.ugenDefaults.store[path];
        }

        flock.ugenDefaults.store[path] = defaults;

        return defaults;
    };

    flock.ugenDefaults.store = {};


    flock.isUGen = function (obj) {
        return obj && obj.tags && obj.tags.indexOf("flock.ugen") > -1;
    };

    // TODO: Check API; write unit tests.
    flock.aliasUGen = function (sourcePath, aliasName, inputDefaults, defaultOptions) {
        var root = flock.get(sourcePath);
        flock.set(root, aliasName, function (inputs, output, options) {
            options = $.extend(true, {}, defaultOptions, options);
            return root(inputs, output, options);
        });
        flock.ugenDefaults(sourcePath + "." + aliasName, inputDefaults);
    };

    // TODO: Check API; write unit tests.
    flock.aliasUGens = function (sourcePath, aliasesSpec) {
        var aliasName,
            settings;

        for (aliasName in aliasesSpec) {
            settings = aliasesSpec[aliasName];
            flock.aliasUGen(sourcePath, aliasName, {inputs: settings.inputDefaults}, settings.options);
        }
    };

    flock.krMul = function (numSamps, output, mulInput) {
        var mul = mulInput.output[0],
            i;

        for (i = 0; i < numSamps; i++) {
            output[i] = output[i] * mul;
        }
    };

    flock.mul = function (numSamps, output, mulInput) {
        var mul = mulInput.output,
            i;

        for (i = 0; i < numSamps; i++) {
            output[i] = output[i] * mul[i];
        }
    };

    flock.krAdd = function (numSamps, output, mulInput, addInput) {
        var add = addInput.output[0],
            i;

        for (i = 0; i < numSamps; i++) {
            output[i] = output[i] + add;
        }
    };

    flock.add = function (numSamps, output, mulInput, addInput) {
        var add = addInput.output,
            i;

        for (i = 0; i < numSamps; i++) {
            output[i] = output[i] + add[i];
        }
    };

    flock.krMulAdd = function (numSamps, output, mulInput, addInput) {
        var mul = mulInput.output[0],
            add = addInput.output,
            i;

        for (i = 0; i < numSamps; i++) {
            output[i] = output[i] * mul + add[i];
        }
    };

    flock.mulKrAdd = function (numSamps, output, mulInput, addInput) {
        var mul = mulInput.output,
            add = addInput.output[0],
            i;

        for (i = 0; i < numSamps; i++) {
            output[i] = output[i] * mul[i] + add;
        }
    };

    flock.krMulKrAdd = function (numSamps, output, mulInput, addInput) {
        var mul = mulInput.output[0],
            add = addInput.output[0],
            i;

        for (i = 0; i < numSamps; i++) {
            output[i] = output[i] * mul + add;
        }
    };

    flock.mulAdd = function (numSamps, output, mulInput, addInput) {
        var mul = mulInput.output,
            add = addInput.output,
            i;

        for (i = 0; i < numSamps; i++) {
            output[i] = output[i] * mul[i] + add[i];
        }
    };

    flock.onMulAddInputChanged = function (that) {
        var mul = that.inputs.mul,
            add = that.inputs.add,
            fn;

        // If we have no mul or add inputs, bail immediately.
        if (!mul && !add) {
            that.mulAdd = flock.noOp;
            return;
        }

        if (!mul) { // Only add.
            fn = add.rate !== flock.rates.AUDIO ? flock.krAdd : flock.add;
        } else if (!add) { // Only mul.
            fn = mul.rate !== flock.rates.AUDIO ? flock.krMul : flock.mul;
        } else { // Both mul and add.
            fn = mul.rate !== flock.rates.AUDIO ?
                (add.rate !== flock.rates.AUDIO ? flock.krMulKrAdd : flock.krMulAdd) :
                (add.rate !== flock.rates.AUDIO ? flock.mulKrAdd : flock.mulAdd);
        }

        that.mulAdd = function (numSamps) {
            fn(numSamps, that.output, mul, add);
        };
    };


    flock.ugen = function (inputs, output, options) {
        options = options || {};

        var that = {
            rate: options.rate || flock.rates.AUDIO,
            inputs: inputs,
            output: output,
            options: options,
            model: options.model || {
                unscaledValue: 0.0,
                value: 0.0
            },
            multiInputs: {},
            tags: ["flock.ugen"]
        };
        that.lastOutputIdx = that.output.length - 1;

        that.get = function (path) {
            return flock.input.get(that.inputs, path);
        };

        /**
         * Sets the value of the input at the specified path.
         *
         * @param {String} path the inputs's path relative to this ugen
         * @param {Number || UGenDef} val a scalar value (for Value ugens) or a UGenDef object
         * @return {UGen} the newly-created UGen that was set at the specified path
         */
        that.set = function (path, val) {
            return flock.input.set(that.inputs, path, val, that, function (ugenDef) {
                if (ugenDef === null || ugenDef === undefined) {
                    return;
                }

                return flock.parse.ugenDef(ugenDef, {
                    audioSettings: that.options.audioSettings,
                    buses: that.buses,
                    buffers: that.buffers
                });
            });
        };

        /**
         * Gets or sets the named unit generator input.
         *
         * @param {String} path the input path
         * @param {UGenDef} val [optional] a scalar value, ugenDef, or array of ugenDefs that will be assigned to the specified input name
         * @return {Number|UGen} a scalar value in the case of a value ugen, otherwise the ugen itself
         */
        that.input = function (path, val) {
            return !path ? undefined : typeof (path) === "string" ?
                arguments.length < 2 ? that.get(path) : that.set(path, val) :
                flock.isIterable(path) ? that.get(path) : that.set(path, val);
        };

        // TODO: Move this into a grade.
        that.calculateStrides = function () {
            var m = that.model,
                strideNames = that.options.strideInputs,
                inputs = that.inputs,
                i,
                name,
                input;

            m.strides = m.strides || {};

            if (!strideNames) {
                return;
            }

            for (i = 0; i < strideNames.length; i++) {
                name = strideNames[i];
                input = inputs[name];

                if (input) {
                    m.strides[name] = input.rate === flock.rates.AUDIO ? 1 : 0;
                } else {
                    fluid.log(fluid.logLevel.WARN, "An invalid input ('" +
                        name + "') was found on a unit generator: " + that);
                }
            }
        };

        that.collectMultiInputs = function () {
            var multiInputNames = that.options.multiInputNames,
                multiInputs = that.multiInputs,
                i,
                inputName,
                inputChannelCache,
                input;

            for (i = 0; i < multiInputNames.length; i++) {
                inputName = multiInputNames[i];
                inputChannelCache = multiInputs[inputName];

                if (!inputChannelCache) {
                    inputChannelCache = multiInputs[inputName] = [];
                } else {
                    // Clear the current array of buffers.
                    inputChannelCache.length = 0;
                }

                input = that.inputs[inputName];
                flock.ugen.collectMultiInputs(input, inputChannelCache);
            }
        };

        // Base onInputChanged() implementation.
        that.onInputChanged = function (inputName) {
            var multiInputNames = that.options.multiInputNames;

            flock.onMulAddInputChanged(that);
            if (that.options.strideInputs) {
                that.calculateStrides();
            }

            if (multiInputNames && (!inputName || multiInputNames.indexOf(inputName))) {
                that.collectMultiInputs();
            }
        };

        that.init = function () {
            var tags = fluid.makeArray(that.options.tags),
                m = that.model,
                o = that.options,
                i,
                s,
                valueDef;

            for (i = 0; i < tags.length; i++) {
                that.tags.push(tags[i]);
            }

            s = o.audioSettings = o.audioSettings || flock.environment.audioSystem.model;
            m.sampleRate = o.sampleRate || s.rates[that.rate];
            m.nyquistRate = m.sampleRate;
            m.blockSize = that.rate === flock.rates.AUDIO ? s.blockSize : 1;
            m.sampleDur = 1.0 / m.sampleRate;

            // Assigns an interpolator function to the UGen.
            // This is inactive by default, but can be used in custom gen() functions.
            that.interpolate = flock.interpolate.none;
            if (o.interpolation) {
                var fn = flock.interpolate[o.interpolation];
                if (!fn) {
                    fluid.log(fluid.logLevel.IMPORTANT,
                        "An invalid interpolation type of '" + o.interpolation +
                        "' was specified. Defaulting to none.");
                } else {
                    that.interpolate = fn;
                }
            }

            if (that.rate === flock.rates.DEMAND && that.inputs.freq) {
                valueDef = flock.parse.ugenDefForConstantValue(1.0);
                that.inputs.freq = flock.parse.ugenDef(valueDef);
            }
        };

        that.init();
        return that;
    };

    // The term "multi input" is a bit ambiguous,
    // but it provides a very light (and possibly poor) abstraction for two different cases:
    //   1. inputs that consist of an array of multiple unit generators
    //   2. inputs that consist of a single unit generator that has multiple ouput channels
    // In either case, each channel of each input unit generator will be gathered up into
    // an array of "proxy ugen" objects and keyed by the input name, making easy to iterate
    // over sources of input quickly.
    // A proxy ugen consists of a simple object conforming to this contract:
    //   {rate: <rate of parent ugen>, output: <Float32Array>}
    flock.ugen.collectMultiInputs = function (inputs, inputChannelCache) {
        if (!flock.isIterable(inputs)) {
            inputs = inputs = fluid.makeArray(inputs);
        }

        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            flock.ugen.collectChannelsForInput(input, inputChannelCache);
        }

        return inputChannelCache;
    };

    flock.ugen.collectChannelsForInput = function (input, inputChannelCache) {
        var isMulti = flock.hasTag(input, "flock.ugen.multiChannelOutput"),
            channels = isMulti ? input.output : [input.output],
            i;

        for (i = 0; i < channels.length; i++) {
            inputChannelCache.push({
                rate: input.rate,
                output: channels[i]
            });
        }

        return inputChannelCache;
    };

    flock.ugen.lastOutputValue = function (numSamps, out) {
        return out[numSamps - 1];
    };


    /**
     * Mixes buffer-related functionality into a unit generator.
     */
    flock.ugen.buffer = function (that) {
        that.onBufferInputChanged = function (inputName) {
            var m = that.model,
                inputs = that.inputs;

            if (m.bufDef !== inputs.buffer || inputName === "buffer") {
                m.bufDef = inputs.buffer;
                flock.parse.bufferForDef(m.bufDef, that, flock.environment); // TODO: Shared enviro reference.
            }
        };

        that.setBuffer = function (bufDesc) {
            that.buffer = bufDesc;
            if (that.onBufferReady) {
                that.onBufferReady(bufDesc);
            }
        };

        that.initBuffer = function () {
            // Start with a zeroed buffer, since the buffer input may be loaded asynchronously.
            that.buffer = that.model.bufDef = flock.bufferDesc({
                format: {
                    sampleRate: that.options.audioSettings.rates.audio
                },
                data: {
                    channels: [new Float32Array(that.output.length)]
                }
            });
        };
    };


    flock.ugen.value = function (inputs, output, options) {
        var that = flock.ugen(inputs, output, options);

        that.value = function () {
            return that.model.value;
        };

        that.dynamicGen = function (numSamps) {
            var out = that.output,
                m = that.model;

            for (var i = 0; i < numSamps; i++) {
                out[i] = m.unscaledValue;
            }

            that.mulAdd(numSamps);
            m.value = flock.ugen.lastOutputValue(numSamps, out);
        };

        that.onInputChanged = function () {
            var inputs = that.inputs,
                m = that.model;

            m.value = m.unscaledValue = inputs.value;

            if (that.rate !== "constant") {
                that.gen = that.dynamicGen;
            } else {
                that.gen = undefined;
            }

            flock.onMulAddInputChanged(that);
            that.dynamicGen(1);
        };

        that.onInputChanged();
        return that;
    };

    flock.ugenDefaults("flock.ugen.value", {
        rate: "control",

        inputs: {
            value: 1.0,
            mul: null,
            add: null
        },

        ugenOptions: {
            model: {
                unscaledValue: 1.0,
                value: 1.0
            },

            tags: ["flock.ugen.valueType"]
        }
    });


    flock.ugen.silence = function (inputs, output, options) {
        var that = flock.ugen(inputs, output, options);

        that.onInputChanged = function () {
            for (var i = 0; i < that.output.length; i++) {
                that.output[i] = 0.0;
            }
        };

        that.onInputChanged();
        return that;
    };

    flock.ugenDefaults("flock.ugen.silence", {
        rate: "constant"
    });


    flock.ugen.passThrough = function (inputs, output, options) {
        var that = flock.ugen(inputs, output, options);

        that.gen = function (numSamps) {
            var m = that.model,
                source = that.inputs.source.output,
                out = that.output,
                i,
                val;

            for (i = 0; i < source.length; i++) {
                out[i] = val = source[i];
            }

            for (; i < numSamps; i++) {
                out[i] = val = 0.0;
            }

            m.unscaledValue = val;
            that.mulAdd(numSamps);
            m.value = flock.ugen.lastOutputValue(numSamps, out);
        };

        that.onInputChanged();
        return that;
    };

    flock.ugenDefaults("flock.ugen.passThrough", {
        rate: "audio",

        inputs: {
            source: null,
            mul: null,
            add: null
        }
    });


    flock.ugen.out = function (inputs, output, options) {
        var that = flock.ugen(inputs, output, options);

        // TODO: Implement a "straight out" gen function for cases where the number
        // of sources matches the number of output buses (i.e. where no expansion is necessary).
        // TODO: This function is marked as unoptimized by the Chrome profiler.
        that.gen = function (numSamps) {
            var m = that.model,
                sources = that.multiInputs.sources,
                buses = that.options.buses,
                bufStart = that.inputs.bus.output[0],
                expand = that.inputs.expand.output[0],
                numSources,
                numOutputBuses,
                i,
                j,
                source,
                rate,
                bus,
                inc,
                outIdx;

            numSources = sources.length;
            numOutputBuses = Math.max(expand, numSources);

            if (numSources < 1) {
                return;
            }

            for (i = 0; i < numOutputBuses; i++) {
                source = sources[i % numSources];
                rate = source.rate;
                bus = buses[bufStart + i];
                inc = rate === flock.rates.AUDIO ? 1 : 0;
                outIdx = 0;

                for (j = 0; j < numSamps; j++, outIdx += inc) {
                    // TODO: Support control rate interpolation.
                    // TODO: Don't attempt to write to buses beyond the available number.
                    //       Provide an error at onInputChanged time if the unit generator is configured
                    //       with more sources than available buffers.
                    bus[j] = bus[j] + source.output[outIdx];
                }
            }

            // TODO: Consider how we should handle "value" when the number
            // of input channels for "sources" can be variable.
            // In the meantime, we just output the last source's last sample.
            m.value = m.unscaledValue = source.output[outIdx];
            that.mulAdd(numSamps); // TODO: Does this even work?
        };

        that.init = function () {
            that.sourceBuffers = [];
            that.onInputChanged();
        };

        that.init();
        return that;
    };

    flock.ugenDefaults("flock.ugen.out", {
        rate: "audio",
        inputs: {
            sources: null,
            bus: 0,
            expand: 2
        },
        ugenOptions: {
            tags: ["flock.ugen.outputType"],
            multiInputNames: ["sources"]
        }
    });


    // Note: this unit generator currently only outputs values at control rate.
    // TODO: Unit tests.
    flock.ugen.valueOut = function (inputs, output, options) {
        var that = flock.ugen(inputs, output, options);

        that.arraySourceGen = function () {
            var m = that.model,
                sources = that.inputs.sources,
                i;

            for (i = 0; i < sources.length; i++) {
                m.value[i] = sources[i].output[0];
            }
        };

        that.ugenSourceGen = function () {
            that.model.value = that.model.unscaledValue = that.inputs.sources.output[0];
        };

        that.onInputChanged = function () {
            var m = that.model,
                sources = that.inputs.sources;

            if (flock.isIterable(sources)) {
                that.gen = that.arraySourceGen;
                m.value = new Float32Array(sources.length);
                m.unscaledValue = m.value;
            } else {
                that.gen = that.ugenSourceGen;
            }
        };

        that.onInputChanged();
        return that;
    };

    flock.ugenDefaults("flock.ugen.valueOut", {
        rate: "control",

        inputs: {
            sources: null
        },

        ugenOptions: {
            model: {
                unscaledValue: null,
                value: null
            },

            tags: ["flock.ugen.outputType", "flock.ugen.valueType"]
        }
    });


    // TODO: fix naming.
    // TODO: Make this a proper multiinput ugen.
    flock.ugen["in"] = function (inputs, output, options) {
        var that = flock.ugen(inputs, output, options);

        that.singleBusGen = function (numSamps) {
            var m = that.model,
                out = that.output;

            flock.ugen.in.readBus(numSamps, out, that.inputs.bus,
                that.options.buses);

            m.unscaledValue = flock.ugen.lastOutputValue(numSamps, out);
            that.mulAdd(numSamps);
            m.value = flock.ugen.lastOutputValue(numSamps, out);
        };

        that.multiBusGen = function (numSamps) {
            var m = that.model,
                busesInput = that.inputs.bus,
                enviroBuses = that.options.buses,
                out = that.output,
                i,
                j,
                busIdx,
                val;

            for (i = 0; i < numSamps; i++) {
                val = 0; // Clear previous output values before summing a new set.
                for (j = 0; j < busesInput.length; j++) {
                    busIdx = busesInput[j].output[0] | 0;
                    val += enviroBuses[busIdx][i];
                }
                out[i] = val;
            }

            m.unscaledValue = val;
            that.mulAdd(numSamps);
            m.value = flock.ugen.lastOutputValue(numSamps, out);
        };

        that.onInputChanged = function () {
            that.gen = flock.isIterable(that.inputs.bus) ? that.multiBusGen : that.singleBusGen;
            flock.onMulAddInputChanged(that);
        };

        that.onInputChanged();
        return that;
    };

    flock.ugen.in.readBus = function (numSamps, out, busInput, buses) {
        var busNum = busInput.output[0] | 0,
            bus = buses[busNum],
            i;

        for (i = 0; i < numSamps; i++) {
            out[i] = bus[i];
        }
    };

    flock.ugenDefaults("flock.ugen.in", {
        rate: "audio",
        inputs: {
            bus: 0,
            mul: null,
            add: null
        }
    });


    flock.ugen.audioIn = function (inputs, output, options) {
        var that = flock.ugen(inputs, output, options);

        that.gen = function (numSamps) {
            var m = that.model,
                out = that.output,
                bus = that.bus,
                i,
                val;

            for (i = 0; i < numSamps; i++) {
                out[i] = val = bus[i];
            }

            m.unscaledValue = val;
            that.mulAdd(numSamps);
            m.value = flock.ugen.lastOutputValue(numSamps, out);
        };

        that.onInputChanged = function () {
            flock.onMulAddInputChanged(that);
        };

        that.init = function () {
            // TODO: Direct reference to the shared environment.
            var busNum = flock.environment.audioSystem.inputDeviceManager.openAudioDevice(options);
            that.bus = that.options.buses[busNum];
            that.onInputChanged();
        };

        that.init();
        return that;
    };

    flock.ugenDefaults("flock.ugen.audioIn", {
        rate: "audio",
        inputs: {
            mul: null,
            add: null
        }
    });

}());
;
    window.fluid = fluid;

    return flock;
}));
