// Name export - Has a name, Have as may as needed.
// Default export - Has no name, You can only have one.

const message = 'Some message from MyModule.js'
const name = 'Suresh Kumar'
const location = 'India'

const getGreeting = (name) => {
    return `Welcom to the course ${name}`
};

export {
    message, name, getGreeting, location as default
}