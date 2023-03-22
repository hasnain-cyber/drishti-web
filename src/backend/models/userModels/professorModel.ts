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
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    }
});