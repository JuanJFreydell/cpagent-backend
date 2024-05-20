const express = require('express');
const app = express();
const port = 8080;
const { get_openai_client,
        create_thread,
        create_message,
        run_thread,
        list_messages } = require('./utils/openai')
const { add_item, get_item, item_exists} = require('./dao/in-memory-datastore')

app.get('/:user/:message', async (req, res) => {
    const openai = await get_openai_client();

    var thread_id;
    if (item_exists(req.params.user)) {
        thread_id = get_item(req.params.user);
    } else {
        thread_id = await create_thread(openai);
        add_item(req.params.user, thread_id);
    }
        await create_message(openai, thread_id, req.params.message)
        // run the thread
        await run_thread(openai, thread_id)
        // wait till the thread is done running and list the messages
        const data = await list_messages(openai, thread_id)

    
    res.json({"message": data});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

