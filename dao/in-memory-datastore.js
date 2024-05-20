const map = new Map();

function add_item(key, value) {
    map.set(key, value);
}

function get_item(key) {
    return map.get(key)
}

function item_exists(key)  {
    return map.has(key);
}

module.exports = {item_exists, add_item, get_item }