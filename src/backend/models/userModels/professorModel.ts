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
});

export interface DBProfessorType {
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
    salt: string;
    department: string;
    institute: string;
    about: string;
    contactNumber: string;
    linkedIn: {
        name: string;
        url: string;
    }
}