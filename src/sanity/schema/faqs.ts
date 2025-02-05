export default {
    name: 'faq',  // The name of the schema
    title: 'FAQ',
    type: 'document',
    fields: [
      {
        name: 'id', // Manually adding _id field
        title: 'ID',
        type: 'string',
        description: 'The unique ID of the FAQ (Optional: if you want to manage IDs manually)',
      },
      {
        name: 'question',  // Field for the FAQ question
        title: 'Question',
        type: 'string',
      },
      {
        name: 'answer',  // Field for the FAQ answer
        title: 'Answer',
        type: 'text', // "text" for longer answers
      },
    ],
  };
  