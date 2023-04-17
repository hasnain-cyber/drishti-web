import dynamoose from 'dynamoose';

const subTopicSchema = new dynamoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const topicSchema = new dynamoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subTopics: {
        type: Array,
        schema: [subTopicSchema],
        required: true,
    },
});

export const courseSchema = {
    id: {
        type: String,
        hashKey: true,
        required: true,
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
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    }
};

export default dynamoose.model('Course', courseSchema);