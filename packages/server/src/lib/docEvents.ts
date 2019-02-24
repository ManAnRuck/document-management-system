import Events from 'events';

const docEvents = new Events.EventEmitter();

export default docEvents;

export const NEW_FILE_SAVED = 'NEW_FILE_SAVED';
