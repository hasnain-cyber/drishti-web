import dynamoose from 'dynamoose';

const topicSchema = new dynamoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});


const courseModel = dynamoose.model('Course', {
    id: {
        type: String,
        hashKey: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    topics: {
        type: Array,
        schema: [topicSchema],
    },
});

export default courseModel;