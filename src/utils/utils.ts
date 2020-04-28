import resourcesJson from '../resources/resources.json'; 

const addDevice = (id, name, description, sensors= {}, actuators = {}) => {
    if (!resourcesJson.hasOwnProperty('things')){
        resourcesJson['things'] = {};
    }

    resourcesJson['things'][id] = {
        'name': name, 
        'description': description,
        'sensors': sensors,
        'actuators': actuators
    }
};

const randomInt = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

const extractFields = (fields, object, target = {}) => {
    const arrayLength = fields.length;
    for (let i = 0; i < arrayLength; i++) {
        const field = fields[i];
        target[field] = object[field];
    }
    return target;
};

const modelToResources = (subModel, withValue) => {
    const resources = [];
    Object.keys(subModel).forEach(function(key) {
        const val = subModel[key];
        const resource = {};
        resource['id'] = key;
        resource['name'] = val['name'];
        if(withValue) resource['values'] = val.data[val.data.length-1];
        resources.push(resource);
    });
    return resources;
};

const isoTimestamp = () => {
    const date = new Date();
    return date.toISOString();
};

export {
    addDevice, 
    randomInt,
    extractFields,
    modelToResources,
    isoTimestamp
};
