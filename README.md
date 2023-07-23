# hexo-uuidlink

The plugin can generate permalink for articles based on UUID.

## Usage

Currently, the plugin can handle all **published articles** (Excluding drafts). Here are the specific usage instructions:

**1. Install**

Execute this command in the root directory of your blog’s source code.

``` bash
$ npm install hexo-uuidlink --save
```

**2. Clean**

Execute the cleaning process.

``` bash
$ hexo clean
```

**3. Regenerate**

Regenerate the articles.

``` bash
$ hexo g
```

After executing the above command, the `uuidlink` parameter will be added to the header of all articles.

```bash
---
title: Hello World
date: 2022-12-26 16:19:29
categories:
  - backend
tags:
  - git
  - java
uuidlink: e179a7bb-197c-4b37-9b8d-f1fda7c17b20
---
```

**4. Modify the `_config.yml`**

Find the `permalink` item in `_config.yml` and modify its value to `:uuidlink/` or any other format that includes that field. Then you execute `hexo s` to start the service.

```bash
# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: http://example.com
permalink: :uuidlink/
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true # Set to false to remove trailing '.html' from permalinks
```

## License

hexo-uuidlink is [MIT license](https://spdx.org/licenses/MIT).

## Changelog

### [0.0.1](https://github.com/inspiration-lab/hexo-uuidlink/compare/v0.0.1...v0.0.1) (2023-07-23)

- Initial release