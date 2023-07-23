import { ParamType } from './ParamType'
import { v1 as uuid } from 'uuid'
import { writeFileSync } from 'hexo-fs'

export class Parser {
    private readonly raw: string = ''
    private full_source: string = ''
    private _content: string = ''

    private paramArray: { type: ParamType; name: string; value: string | Array<string> }[] = []
    private paramObj: { [key: string]: string | Array<string> } = {}

    constructor(raw: string, full_source: string) {
        this.raw = raw
        this.full_source = full_source
    }

    public build(): Parser {
        // parse full text
        const patternFullText = /^(-{3,})\n([\s\S]+?\n)\1\n?([\s\S]*)/

        let matchFullText = patternFullText.exec(this.raw)
        if (matchFullText) {
            let params = matchFullText[2]
            this._content = matchFullText[3]

            // parse single line of params
            const patternSingle = /(\w+):[^\n]\s*(.*?)\n/g
            let matchSingle
            while ((matchSingle = patternSingle.exec(params))) {
                // add param
                this.paramArray = this.paramArray.concat({ type: ParamType.SINGLE, name: matchSingle[1], value: matchSingle[2] })
                this.paramObj = { ...this.paramObj, ...{ [matchSingle[1]]: matchSingle[2] } }
            }

            // parse multiple lines of params
            const patternMultiple = /(\w+):\s*\n((?:\s+-\s+.+\n)*)/g
            let matchMultiple
            while ((matchMultiple = patternMultiple.exec(params))) {
                let multiParamKey = matchMultiple[1]
                let multiParamValue = matchMultiple[2]

                // parse subparameter
                const patternSon = /-\s(.*?)\n/g
                let matchSon
                let sonArray: Array<string> = []
                while ((matchSon = patternSon.exec(multiParamValue))) {
                    sonArray = sonArray.concat(matchSon[1])
                }
                // add param
                this.paramArray = this.paramArray.concat({ type: ParamType.MULTIPLE, name: multiParamKey, value: sonArray })
                this.paramObj = { ...this.paramObj, ...{ [multiParamKey]: sonArray } }
            }
        }
        return this
    }

    public getParamsArray() {
        return this.paramArray
    }

    public getSingleParamsArray() {
        return this.paramArray.filter(item => item.type === 0)
    }

    public getMultipleParamsArray() {
        return this.paramArray.filter(item => item.type === 1)
    }

    public getContent() {
        return this._content
    }

    public getParamsObj() {
        return this.paramObj
    }

    public addUUID(): Parser {
        // add param
        let curUUID = uuid()
        this.paramArray = this.paramArray.concat({ type: ParamType.SINGLE, name: 'uuidlink', value: curUUID })
        this.paramObj = { ...this.paramObj, ...{ ['uuidlink']: curUUID } }
        return this
    }

    public generate(): void {
        let resultPost: string = `---\n`
        this.paramArray.forEach(item => {
            if (item.type === 0) {
                resultPost = resultPost + `${item.name}: ${item.value}\n`
            }
            if (item.type === 1) {
                resultPost = resultPost + `${item.name}:\n`
                let sonArray = item.value as Array<string>
                sonArray.forEach(item => {
                    resultPost = resultPost + `  - ${item}\n`
                })
            }
        })
        resultPost = resultPost + `---\n` + `${this._content}`
        writeFileSync(this.full_source, resultPost, 'utf-8')
    }
}
