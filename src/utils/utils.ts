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
}

export {
    addDevice, 
    randomInt
};