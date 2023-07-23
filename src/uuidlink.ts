import { Parser } from './components/Parser'

hexo.extend.filter.register('before_post_render', post => {

    // Skip drafts and others
    if (post.source.indexOf('_drafts') >= 0 || post.layout !== 'post') {
        return post
    }

    let parser = new Parser(post.raw, post.full_source).build()

    // Skip articles that contain the uuidlink property that is not "" or null
    let paramsObj = parser.getParamsObj()
    if (paramsObj.hasOwnProperty('uuidlink')) {
        if (paramsObj.uuidlink !== '' && paramsObj.uuidlink !== null) {
            return post
        }
    }

    // Add the uuidlink attribute and assign it a uuid
    parser.addUUID().generate()

}, 10)
