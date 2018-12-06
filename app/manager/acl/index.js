/**
 * @author wbding
 * @date 2018/10/15.
 * @description
 */

let {Acl,RedisStore }= require('@aclify/aclify');

let redis = require('redis');
let CONFIG = require('../../config');

//Redis
let RedisClient =redis.createClient(CONFIG.redis[0]);
let acl = new Acl(new RedisStore(RedisClient,CONFIG.redis_prefix));

acl.addRoleParents('member', 'guest');
acl.addRoleParents('superMember', 'member');
acl.addRoleParents('admin', 'superMember');

module.exports = acl;

