const axios = require('axios');

axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-3.5-turbo",
    messages: [{
        role: 'user',
        content: 'Find me local activities in plano for seniors'
    }]
}, {
    headers: {
        'Authorization': 'Bearer'
    }
}).then(res => {
    console.log(res.data.choices[0].message);
    console.log(res.data);
}).catch(error => {
    console.error(error);
});
