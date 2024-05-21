const ASSISTANT_ID = "asst_hS2gwGqcdzjWEO8ONpNR3TtN"
const OpenAI = require('openai')

async function get_openai_client() {
    const openai = await new OpenAI({
        apiKey: ''
    })

    return openai;
}

async function create_thread(openai) {
    const thread = await openai.beta.threads.create();
    return thread.id;
}

async function create_message(openai, thread_id, message) {
    const threadMessages = await openai.beta.threads.messages.create(
        thread_id,
        {role: "user",
        content: message}
    );
    return threadMessages
}

async function run_thread(openai, thread_id) {
    const run = await openai.beta.threads.runs.create(
        thread_id,
        { assistant_id:  ASSISTANT_ID}
    );

    var run_status;
    do{
        run_status = await openai.beta.threads.runs.retrieve(
            thread_id,
            run.id
        );
    }while (run_status.status!="completed")

    return; 
}

async function list_messages(openai, thread_id) {
    const threadMessages = await openai.beta.threads.messages.list(
        thread_id
    );
    return threadMessages.body.data;
}

module.exports = {get_openai_client, create_thread, create_message, run_thread, list_messages }