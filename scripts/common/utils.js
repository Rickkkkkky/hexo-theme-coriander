const descriptors = {
    doc: Symbol('@doc'),
    type: Symbol('@type'),
    format: Symbol('@format'),
    required: Symbol('@required'),
    requires: Symbol('@requires'),
    defaultValue: Symbol('@defaultValue')
}

const is = (() => ({
    number (val) {
        return typeof val === 'number'
    },
    string (val) {
        return typeof val === 'string'
    },
    array (val) {
        return Array.isArray(val)
    },
    boolean (val) {
        return typeof val === 'boolean'
    },
    object (val) {
        return typeof val === 'object' && val.constructor == Object
    },
    function (val) {
        return typeof val === 'function'
    },
    regexp (val) {
        return val instanceof RegExp
    },
    undefined (val) {
        return typeof val === 'undefined'
    },
    null (val) {
        return val === null
    },
    spec (val) {
        const { type, doc, required, requires, format } = descriptors
        if (!val.hasOwnProperty(type)
                || (!is.string(val[type]) && !is.array(val[type]))
                || (val.hasOwnProperty(doc) && !is.string(val[doc]))
                || (val.hasOwnProperty(required) && !is.boolean(val[required]))
                || (val.hasOwnProperty(requires) && !is.function(val[requires]))
                || (val.hasOwnProperty(format) && !is.regexp(val[format]))) {
            return false
        } else {
            return true
        }
    }
}))()

const errors = (() => {
    class ConfigError extends Error {
        constructor (spec, path) {
            super()
            this.spec = spec
            this.path = path
        }
    }

    class InvalidSpecError extends ConfigError {
        constructor (spec, path) {
            super(spec, path)
            this.message = `The specification '${path.join('.')}' is invalid.`
        }
    }

    class MissingRequiredError extends ConfigError {
        constructor (spec, path) {
            super(spec, path)
            this.config = config
            this.message = `Configuration file do not have the required '${path.join('.')}' field.`
        }
    }

    class TypeMismatchError extends ConfigError {
        constructor (spec, path) {
            super(spec, path)
            this.config = config
            this.message = `Configuration '${path.join('.')}' do not match the format '${spec[format]}'.`
        }
    }

    class VersionError extends Error {}

    class VersionNotFoundError extends VersionError {
        constructor () {
            super(`Version number is not found in the configuration file.`)
        }
    }

    class VersionMalformedError extends VersionError {
        constructor (version) {
            super(`Version number ${version} is malformed.`)
            this.version = version
        }
    }

    class VersionMismatchError extends VersionError {
        constructor (specVersion, configVersion, isConfigVersionSmaller) {
            super()
            this.specVersion = specVersion
            this.configVersion = configVersion
            if (isConfigVersionSmaller) {
                this.message = `The configuration version ${configVersion} is far behind the specification version ${specVersion}.`
            } else {
                this.message = `The configuration version ${configVersion} is way ahead of the specification version ${specVersion}.`
            }
        }
    }

    return {
        ConfigError,
        InvalidSpecError,
        MissingRequiredError,
        TypeMismatchError,
        VersionError,
        VersionNotFoundError,
        VersionMalformedError,
        VersionMismatchError
    }
})()

module.exports = {
    is, descriptors, errors
}