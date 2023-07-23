const Hexo = require('hexo');
const uuid = require("uuid");
const expect = require('chai').expect;
const { Parser } = require('./Parser');

const postRaw = {
    title: 'Hello World',
    date: '2022-12-26T16:19:29+08:00',
    source: '_posts/hello-world.md',
    raw: '---\n' +
        'title: Hello World\n' +
        'date: 2022-12-26 16:19:29\n' +
        'categories:\n' +
        '  - backend\n' +
        'tags:\n' +
        '  - git\n' +
        '  - java\n' +
        '---\n' +
        '\n' +
        'Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check\n' +
        '[documentation](https://hexo.io/docs/) for more info. If you get any problems\n' +
        'when using Hexo, you can find the answer in\n' +
        '[troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me\n' +
        'on [GitHub](https://github.com/hexojs/hexo/issues).\n' +
        '\n' +
        '## Quick Start\n' +
        '\n' +
        '### Create a new post\n' +
        '\n' +
        '``` bash\n' +
        '$ hexo new "My New Post"\n' +
        '```\n' +
        '\n' +
        '### Run server\n' +
        '\n' +
        '\n' +
        '``` bash\n' +
        '$ hexo server\n' +
        '```\n' +
        '\n' +
        '### Generate static files\n' +
        '\n' +
        '``` bash\n' +
        '$ hexo generate\n' +
        '```\n' +
        '\n' +
        '### Deploy to remote sites\n' +
        '\n' +
        '``` bash\n' +
        '$ hexo deploy\n' +
        '```',
    slug: 'hello-world',
    published: true,
    updated: '2023-07-22T09:15:29+08:00',
    comments: true,
    layout: 'post',
    photos: [],
    link: '',
    _id: 'clkdbjkrd0000bgvl7f5ublps',
    path: false,
    permalink: false,
    full_source: 'f1fda7c17b20',
    asset_dir: false,
    tags: false,
    categories: false,
    site: { data: {} }
}

var hexo = new Hexo(process.cwd(), {
    silent: true
});

let parser = null

// init Parser
hexo.on('new', post => {
    parser = new Parser(post.raw, post.full_source).build()
});

describe('after executing the new command.', () => {

    // create post
    hexo.emit('new', postRaw);

    it('Check the uuidlink status:', () => {
        expect(parser.getParamsObj().uuidlink).equal(undefined);
    });

});
