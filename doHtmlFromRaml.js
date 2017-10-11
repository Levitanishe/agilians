const fs = require('fs');
const raml2html = require('raml2html');
const config = raml2html.getDefaultConfig();

raml2html.render('./Leave_Request_API-v0.2/api.raml', config)
    .then(result => {
        console.log(result);
        fs.writeFileSync('./htmlOfAPI.html', result);

    },error => {
        console.log(error);
    });

