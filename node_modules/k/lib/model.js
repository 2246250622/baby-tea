'use strict'

const mysql = require('mysql2/promise')
const fs = require('fs')
const lodash = require('lodash')
module.exports = function (model_path, mysql_config) {
    const db_instances = {}
    const execute_sql = []

    class Model {
        constructor(_table_name) {
            if (_table_name !== undefined) this.table_name = _table_name
            this._page = null
        }

        async findAll(conditions, _sort, fields = '*', _limit) {
            let sort = _sort ? ' ORDER BY ' + _sort : ''
            let [where, params] = this._where(conditions)
            let sql = ' FROM ' + this.table_name + where
            let limit = ''
            if (_limit === undefined || typeof _limit === 'string') {
                sql += (_limit === undefined) ? '' : ' LIMIT ' + _limit
            } else {
                let total = await this.query('SELECT COUNT(*) AS M_COUNTER ' + sql, params)
                if (!total[0]['M_COUNTER'] || total[0]['M_COUNTER'] == 0) return false
                limit = lodash.merge([1, 10, 10], _limit)
                limit = this.pager(limit[0], limit[1], limit[2], total[0]['M_COUNTER'])
                limit = lodash.isEmpty(limit) ? '' : ' LIMIT ' + limit['offset'] + ',' + limit['limit']
            }
            return this.query('SELECT ' + fields + sql + sort + limit, params)
        }

        async create(row) {
            let sql = 'INSERT INTO ' + this.table_name
                + ' (' + Object.keys(row).map((k) => '`' + k + '`').join(', ')
                + ') VALUES (' + Object.keys(row).map((k) => ':' + k).join(', ')
                + ')'
            let res = await this.execute(sql, row)
            return res.insertId
        }

        async find(conditions, _sort, fields = '*') {
            let res = await this.findAll(conditions, _sort, fields, 1)
            return !lodash.isEmpty(res) ? res.pop() : false
        }

        async update(conditions, row) {
            let [where, params] = this._where(conditions)
            let values = {}
            let sql = 'UPDATE ' + this.table_name
                + ' SET ' + lodash.map(row, (v, k) => {
                    values[k] = v
                    return '`' + k + '` = :' + k
                }).join(', ')
                + where
            let res = await this.execute(sql, lodash.merge(params, values))
            return res.affectedRows
        }

        async delete(conditions) {
            let [where, params] = this._where(conditions)
            let res = await this.execute('DELETE FROM ' + this.table_name + where, params)
            return res.affectedRows
        }

        async findCount(conditions) {
            let [where, params] = this._where(conditions)
            let res = await this.query('SELECT COUNT(*) AS M_COUNTER FROM ' + this.table_name + where, params)
            return res[0]['M_COUNTER'] || 0
        }

        async incr(conditions, field, optval = 1) {
            let [where, params] = this._where(conditions)
            let sql = 'UPDATE ' + this.table_name + ' SET `' + field + '` = `'
                + field + '` + :M_INCR_VAL' + where
            let res = await this.execute(sql, lodash.merge(params, {'M_INCR_VAL': optval}))
            return res.affectedRows
        }

        decr(conditions, field, optval = 1) {
            return this.incr(conditions, field, -optval)
        }

        dumpSql() {
            return execute_sql
        }

        pager(page, pageSize = 10, scope = 10, total) {
            this._page = null
            if (total === undefined) throw new Error('Pager total would not be undefined')
            if (total > pageSize) {
                let total_page = Math.ceil(total / pageSize)
                page = Math.min(parseInt(Math.max(page, 1)), total)
                this._page = {
                    'total_count': total,
                    'page_size': pageSize,
                    'total_page': total_page,
                    'first_page': 1,
                    'prev_page': ( ( 1 == page ) ? 1 : (page - 1) ),
                    'next_page': ( ( page == total_page ) ? total_page : (page + 1)),
                    'last_page': total_page,
                    'current_page': page,
                    'all_pages': [],
                    'offset': (page - 1) * pageSize,
                    'limit': pageSize
                }
                if (total_page <= scope) {
                    this._page.all_pages = lodash.range(1, total_page)
                } else if (page <= scope / 2) {
                    this._page.all_pages = lodash.range(1, scope)
                } else if (page <= total_page - scope / 2) {
                    let right = page + parseInt(scope / 2)
                    this._page.all_pages = lodash.range(right - scope + 1, right)
                } else {
                    this._page.all_pages = lodash.range(total_page - scope + 1, total_page)
                }
            }
            return this._page
        }

        _where(conditions) {
            let result = [" ", {}]
            if (typeof conditions === 'object' && !lodash.isEmpty(conditions)) {
                let sql = null
                if (conditions['where'] !== undefined) {
                    sql = conditions['where']
                    conditions['where'] = undefined
                }
                if (!sql) sql = Object.keys(conditions).map((k) => '`' + k + '` = :' + k).join(" AND ")
                result[0] = " WHERE " + sql
                result[1] = conditions
            }
            return result
        }

        query(_sql, _values) {
            return this.execute(_sql, _values, true)
        }

        async execute(_sql, _values, readonly = false) {
            let connection
            if (readonly === true && mysql_config.slave !== undefined) {
                let instance_key = Math.floor(Math.random() * (mysql_config.slave.length))
                connection = await this._db_instance(mysql_config.slave[instance_key], 'slave_' + instance_key)
            } else {
                connection = await this._db_instance(mysql_config, 'master')
            }
            let sql = connection.format(_sql, _values)
            let [results, _] = await connection.query(sql)
            execute_sql.push(sql)
            return results
        }

        async _db_instance(db_config, instance_key) {
            if (db_instances[instance_key] === undefined) {
                db_config.queryFormat = function (query, values) {
                    if (!values) return query
                    return query.replace(/\:(\w+)/g, function (txt, key) {
                        if (values.hasOwnProperty(key)) {
                            return this.escape(values[key])
                        }
                        return txt
                    }.bind(this))
                }
                db_instances[instance_key] = await mysql.createConnection(db_config)
            }
            return db_instances[instance_key]
        }

        get sql() {
            return execute_sql
        }

        get page() {
            return this._page
        }

        set table(_table_name) {
            this.table_name = _table_name
        }
    }

    return async (ctx, next) => {
        const modelObj = {}
        ctx.model = function (model_name) {
            if (model_name === undefined || typeof model_name !== 'string') {
                const modelInst = new Model()
                return modelInst
            } else {
                if (!(model_name in modelObj)) {
                    let the_model_path = model_path + '/' + model_name + '.js'
                    if (fs.existsSync(the_model_path)) {
                        let modelClass = require(the_model_path)(Model)
                        modelObj[model_name] = new modelClass(model_name)
                    } else {
                        throw new Error('Model file ' + the_model_path + ' is not exists.')
                    }
                }
                return modelObj[model_name]
            }
        }
        await next()
    }
}
