import dynamoose from 'dynamoose';

export enum EUserRole {
    Admin = 1,
    Professor = 2
}

const userModel = dynamoose.model('User', {
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
    },
    verified: {
        type: Boolean
    },
    role: {
        type: Number
    }
});

export default userModel;