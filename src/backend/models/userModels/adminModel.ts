import dynamoose from 'dynamoose';

export default dynamoose.model('Admin', {
    id: {
        type: String,
        hashKey: true,
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
})