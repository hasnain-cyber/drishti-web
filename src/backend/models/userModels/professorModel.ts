import dynamoose from 'dynamoose';

export default dynamoose.model('Professor', {
    id: {
        type: String,
        hashKey: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: {
            name: 'email-index'
        },
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    institute: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    linkedIn: {
        type: Object,
        schema: new dynamoose.Schema({
            name: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }),
        required: true,
    },
    profileImageUrl: {
        type: String,
        required: true,
    },
});